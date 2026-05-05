"""
JHS IT Admin - FastAPI Backend with MongoDB (pymongo sync version)
main.py

Requirements:
    pip install fastapi uvicorn passlib[bcrypt] python-multipart pymongo

Run:
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import datetime
from typing import Optional
from bson import ObjectId
from bson.errors import InvalidId
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import os

# ============================================================================
# APP INITIALIZATION
# ============================================================================

app = FastAPI(
    title="JHS IT Admin API",
    description="Backend API for JHS IT Admin Panel — MongoDB Edition",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# PASSWORD HASHING
# ============================================================================

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    password = password[:72]
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    plain = plain[:72]
    return pwd_context.verify(plain, hashed)

# ============================================================================
# MONGODB CONNECTION (pymongo — no motor needed)
# ============================================================================

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME   = os.getenv("MONGO_DB")


client = MongoClient(MONGO_URI)
db     = client[DB_NAME]

# Collections
users_col     = db["users"]
entries_col   = db["laptop_entries"]
inventory_col = db["laptop_inventory"]
repairs_col   = db["repair_entries"]
admin_col = db["admin"]

# Create unique indexes
users_col.create_index("email", unique=True)
entries_col.create_index("jhs_code", unique=True)
inventory_col.create_index("jhs_tag", unique=True)
admin_col.create_index("email", unique=True)


print("=" * 55)
print("  ✓ MongoDB connected —", MONGO_URI)
print("  ✓ Database:", DB_NAME)
print("  ✓ Collections ready & users seeded")
print("=" * 55)

# ============================================================================
# BSON HELPER
# ============================================================================

def fix_id(doc: dict) -> dict:
    if doc is None:
        return None
    doc = dict(doc)
    if "_id" in doc:
        doc["id"] = str(doc.pop("_id"))
    return doc

def fix_ids(docs) -> list:
    return [fix_id(d) for d in docs]

# ============================================================================
# PYDANTIC MODELS
# ============================================================================

class LoginRequest(BaseModel):
    email:    str
    password: str

class LaptopEntryCreate(BaseModel):
    jhs_code:   str
    date:       Optional[str] = ""
    name:       Optional[str] = ""
    contact_no: Optional[str] = ""
    status:     Optional[str] = "IN"
    processor:  Optional[str] = ""
    ram:        Optional[str] = ""
    ssd:        Optional[str] = ""
    mouse:      Optional[str] = ""
    other:      Optional[str] = ""

class LaptopEntryUpdate(BaseModel):
    date:       Optional[str] = ""
    name:       Optional[str] = ""
    contact_no: Optional[str] = ""
    status:     Optional[str] = "IN"
    processor:  Optional[str] = ""
    ram:        Optional[str] = ""
    ssd:        Optional[str] = ""
    mouse:      Optional[str] = ""
    other:      Optional[str] = ""

class StatusUpdate(BaseModel):
    status: str

class InventoryCreate(BaseModel):
    jhs_tag:   str
    brand:     Optional[str] = ""
    processor: Optional[str] = ""
    ram:       Optional[str] = ""
    ssd:       Optional[str] = ""

class RepairCreate(BaseModel):
    jhs_tag:          str
    employee_name:    Optional[str] = ""
    employee_contact: Optional[str] = ""
    issue:            str
    date:             str
    status:           str
    notes:            Optional[str] = ""

class RepairStatusUpdate(BaseModel):
    status: str
    notes:  Optional[str] = ""

# ============================================================================
# SERVE STATIC FILES
# ============================================================================

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def root():
    return RedirectResponse(url="/static/login.html")

# ============================================================================
# HEALTH & ROOT
# ============================================================================

@app.get("/health")
def health():
    return {
        "status":    "ok",
        "message":   "JHS IT Admin backend (MongoDB) is running",
        "database":  DB_NAME,
        "timestamp": datetime.now().isoformat()
    }


# ============================================================================
# AUTH ROUTES
# ============================================================================

@app.post("/auth/login")
def login(req: LoginRequest):

    email = req.email.strip().lower()

    user = admin_col.find_one({"email": email})

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(req.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "email": user["email"],
        "name": user["name"],
        "role": user["role"]
    }

# ============================================================================
# LAPTOP ENTRY ROUTES
# ============================================================================

@app.get("/laptop-entries")
def get_laptop_entries():
    docs = list(entries_col.find().sort("created_at", -1))
    return fix_ids(docs)


@app.post("/laptop-entries")
def create_laptop_entry(entry: LaptopEntryCreate):
    if entries_col.find_one({"jhs_code": entry.jhs_code}):
        raise HTTPException(status_code=400, detail=f"JHS Code '{entry.jhs_code}' already exists.")

    now = datetime.now().isoformat()
    doc = {**entry.dict(), "created_at": now, "updated_at": now}
    result  = entries_col.insert_one(doc)
    created = entries_col.find_one({"_id": result.inserted_id})

    if entry.status == "Out":
        _auto_create_repair(
            entry.jhs_code, entry.name, entry.contact_no,
            entry.date, entry.processor, entry.ram, entry.ssd
        )

    return fix_id(created)


@app.put("/laptop-entries/{jhs_code}")
def update_laptop_entry(jhs_code: str, entry: LaptopEntryUpdate):
    existing = entries_col.find_one({"jhs_code": jhs_code})
    if not existing:
        raise HTTPException(status_code=404, detail="Entry not found.")

    old_status = existing.get("status")
    now = datetime.now().isoformat()

    entries_col.update_one(
        {"jhs_code": jhs_code},
        {"$set": {**entry.dict(), "updated_at": now}}
    )

    if entry.status == "Out" and old_status != "Out":
        _auto_create_repair(
            jhs_code, entry.name, entry.contact_no,
            entry.date, entry.processor, entry.ram, entry.ssd
        )
    elif entry.status == "IN" and old_status == "Out":
        _close_repair_entries(jhs_code)

    updated = entries_col.find_one({"jhs_code": jhs_code})
    return fix_id(updated)


@app.patch("/laptop-entries/{jhs_code}/status")
def update_laptop_status(jhs_code: str, body: StatusUpdate):
    existing = entries_col.find_one({"jhs_code": jhs_code})
    if not existing:
        raise HTTPException(status_code=404, detail="Entry not found.")

    old_status = existing.get("status")
    now = datetime.now().isoformat()

    entries_col.update_one(
        {"jhs_code": jhs_code},
        {"$set": {"status": body.status, "updated_at": now}}
    )

    if body.status == "Out" and old_status != "Out":
        _auto_create_repair(
            jhs_code,
            existing.get("name", ""),
            existing.get("contact_no", ""),
            existing.get("date", ""),
            existing.get("processor", ""),
            existing.get("ram", ""),
            existing.get("ssd", "")
        )
    elif body.status == "IN" and old_status == "Out":
        _close_repair_entries(jhs_code)

    updated = entries_col.find_one({"jhs_code": jhs_code})
    return fix_id(updated)


@app.delete("/laptop-entries/{jhs_code}")
def delete_laptop_entry(jhs_code: str):
    result = entries_col.delete_one({"jhs_code": jhs_code})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Entry not found.")
    return {"message": f"Entry {jhs_code} deleted."}

# ============================================================================
# LAPTOP INVENTORY ROUTES
# ============================================================================

@app.get("/laptop-inventory")
def get_inventory():
    docs = list(inventory_col.find().sort("created_at", -1))
    return fix_ids(docs)


@app.post("/laptop-inventory")
def create_inventory(entry: InventoryCreate):
    if inventory_col.find_one({"jhs_tag": entry.jhs_tag}):
        raise HTTPException(status_code=400, detail=f"JHS Tag '{entry.jhs_tag}' already exists.")

    now = datetime.now().isoformat()
    doc = {**entry.dict(), "created_at": now, "updated_at": now}
    result  = inventory_col.insert_one(doc)
    created = inventory_col.find_one({"_id": result.inserted_id})
    return fix_id(created)


@app.delete("/laptop-inventory/{jhs_tag}")
def delete_inventory(jhs_tag: str):
    result = inventory_col.delete_one({"jhs_tag": jhs_tag})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inventory entry not found.")
    return {"message": f"Inventory entry {jhs_tag} deleted."}

# ============================================================================
# REPAIR ENTRY ROUTES
# ============================================================================

@app.get("/repair-entries")
def get_repair_entries():
    docs = list(repairs_col.find().sort("created_at", -1))
    return fix_ids(docs)


@app.post("/repair-entries")
def create_repair_entry(entry: RepairCreate):
    now = datetime.now().isoformat()
    doc = {**entry.dict(), "created_at": now, "updated_at": now}
    result  = repairs_col.insert_one(doc)
    created = repairs_col.find_one({"_id": result.inserted_id})

    if entry.status == "Repaired":
        _set_employee_to_in(entry.jhs_tag)

    return fix_id(created)


@app.patch("/repair-entries/{repair_id}/status")
def update_repair_status(repair_id: str, body: RepairStatusUpdate):
    try:
        oid = ObjectId(repair_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid repair ID.")

    existing = repairs_col.find_one({"_id": oid})
    if not existing:
        raise HTTPException(status_code=404, detail="Repair entry not found.")

    now       = datetime.now().isoformat()
    old_notes = existing.get("notes") or ""
    new_notes = f"{old_notes} | {body.notes}".strip(" | ") if body.notes else old_notes

    repairs_col.update_one(
        {"_id": oid},
        {"$set": {"status": body.status, "notes": new_notes, "updated_at": now}}
    )

    if body.status == "Repaired":
        _set_employee_to_in(existing["jhs_tag"])

    updated = repairs_col.find_one({"_id": oid})
    return fix_id(updated)


@app.delete("/repair-entries/{repair_id}")
def delete_repair_entry(repair_id: str):
    try:
        oid = ObjectId(repair_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid repair ID.")

    result = repairs_col.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Repair entry not found.")
    return {"message": f"Repair entry {repair_id} deleted."}

# ============================================================================
# INTERNAL HELPERS
# ============================================================================

def _auto_create_repair(jhs_code, name, contact, date, processor, ram, ssd):
    # NOTE: We do NOT insert into inventory_col here.
    # Employee entries must NEVER appear in Laptop Inventory.
    # Only manually added inventory entries should appear there.

    pending = repairs_col.find_one({"jhs_tag": jhs_code, "status": "In Repair"})
    if not pending:
        now = datetime.now().isoformat()
        repairs_col.insert_one({
            "jhs_tag":          jhs_code,
            "employee_name":    name or "",
            "employee_contact": contact or "",
            "issue":            "Sent for repair (Employee OUT)",
            "date":             date or datetime.now().strftime("%Y-%m-%d"),
            "status":           "In Repair",
            "notes":            "Auto-created from Employee Entry status change to OUT",
            "created_at":       now,
            "updated_at":       now
        })


def _close_repair_entries(jhs_code: str):
    note = f"Auto-closed: Employee status set back to IN on {datetime.now().strftime('%Y-%m-%d')}"
    now  = datetime.now().isoformat()
    docs = list(repairs_col.find({"jhs_tag": jhs_code, "status": "In Repair"}))
    for doc in docs:
        old_notes = doc.get("notes") or ""
        new_notes = f"{old_notes} | {note}".strip(" | ")
        repairs_col.update_one(
            {"_id": doc["_id"]},
            {"$set": {"status": "Repaired", "notes": new_notes, "updated_at": now}}
        )


def _set_employee_to_in(jhs_code: str):
    now = datetime.now().isoformat()
    entries_col.update_one(
        {"jhs_code": jhs_code, "status": "Out"},
        {"$set": {"status": "IN", "updated_at": now}}
    )

# ============================================================================
# ONE-TIME CLEANUP UTILITY
# Run this endpoint ONCE to remove bad inventory entries that were
# auto-created from employee entries by the old buggy code.
# Call: POST /admin/cleanup-inventory
# After running, you can remove this endpoint if you wish.
# ============================================================================

@app.post("/admin/cleanup-inventory")
def cleanup_bad_inventory():
    """
    Removes any laptop_inventory entries whose jhs_tag matches a jhs_code
    in laptop_entries. These were incorrectly inserted by the old _auto_create_repair bug.
    """
    employee_codes = [e["jhs_code"] for e in entries_col.find({}, {"jhs_code": 1})]
    result = inventory_col.delete_many({"jhs_tag": {"$in": employee_codes}})
    return {
        "message": f"Cleanup complete. Removed {result.deleted_count} bad inventory entries.",
        "deleted_count": result.deleted_count
    }

# ============================================================================
# RUN
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    print("=" * 55)
    print("  JHS IT Admin - Backend Server v3.0")
    print("  Database: MongoDB (pymongo)")
    print("=" * 55)
    print(f"  URL:      http://localhost:8000")
    print(f"  Docs:     http://localhost:8000/docs")
    print(f"  MongoDB:  {MONGO_URI}")
    print(f"  DB Name:  {DB_NAME}")
    print("=" * 55)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)