// // // /* =====================================================
// // //    JHS IT Admin - script.js  v3.0
// // //    Full API integration — all data stored in MongoDB via FastAPI
// // //    ===================================================== */

// // // const API = "http://localhost:8000";

// // // // =====================================================
// // // // Utility: API fetch wrapper
// // // // =====================================================
// // // async function apiFetch(path, options = {}) {
// // //   try {
// // //     const res = await fetch(API + path, {
// // //       headers: { "Content-Type": "application/json", ...(options.headers || {}) },
// // //       ...options
// // //     });
// // //     if (!res.ok) {
// // //       const err = await res.json().catch(() => ({ detail: "Unknown error" }));
// // //       throw new Error(err.detail || "Request failed");
// // //     }
// // //     return await res.json();
// // //   } catch (e) {
// // //     console.error("API Error:", path, e);
// // //     throw e;
// // //   }
// // // }

// // // // =====================================================
// // // // Toast — centered on screen
// // // // =====================================================
// // // function toast(msg, type = "success") {
// // //   // Remove any existing toast
// // //   const existing = document.getElementById("__toast__");
// // //   if (existing) existing.remove();

// // //   const el = document.createElement("div");
// // //   el.id = "__toast__";
// // //   const colors = {
// // //     success: "bg-green-600",
// // //     error:   "bg-red-600",
// // //     info:    "bg-blue-600",
// // //     warn:    "bg-yellow-500"
// // //   };
// // //   const icons = {
// // //     success: "fa-circle-check",
// // //     error:   "fa-circle-xmark",
// // //     info:    "fa-circle-info",
// // //     warn:    "fa-triangle-exclamation"
// // //   };
// // //   el.className = `fixed z-[99999] px-8 py-4 rounded-2xl text-white text-base font-semibold shadow-2xl
// // //                   ${colors[type] || colors.success}
// // //                   flex items-center gap-3
// // //                   transition-all duration-300 ease-out
// // //                   left-1/2 -translate-x-1/2`;
// // //   el.style.cssText += `
// // //     top: 50%;
// // //     transform: translate(-50%, -50%) scale(0.8);
// // //     opacity: 0;
// // //     min-width: 280px;
// // //     max-width: 480px;
// // //     text-align: center;
// // //     justify-content: center;
// // //   `;
// // //   el.innerHTML = `<i class="fa-solid ${icons[type] || icons.success} text-xl"></i><span>${msg}</span>`;
// // //   document.body.appendChild(el);

// // //   // Animate in
// // //   requestAnimationFrame(() => {
// // //     el.style.transform = "translate(-50%, -50%) scale(1)";
// // //     el.style.opacity = "1";
// // //   });

// // //   // Animate out
// // //   setTimeout(() => {
// // //     el.style.transform = "translate(-50%, -50%) scale(0.8)";
// // //     el.style.opacity = "0";
// // //     setTimeout(() => el.remove(), 350);
// // //   }, 2800);
// // // }

// // // // =====================================================
// // // // User Initialization
// // // // =====================================================
// // // (function () {
// // //   const userEmail = localStorage.getItem("userEmail") || "";
// // //   const userRole  = localStorage.getItem("userRole")  || "";

// // //   function getFirstName(email) {
// // //     if (!email) return "User";
// // //     const namePart  = email.split("@")[0];
// // //     const firstName = namePart.split(".")[0];
// // //     return firstName.charAt(0).toUpperCase() + firstName.slice(1);
// // //   }

// // //   const firstName = getFirstName(userEmail);
// // //   const initial   = firstName.charAt(0).toUpperCase();

// // //   document.addEventListener("DOMContentLoaded", function () {
// // //     document.getElementById("welcomeUserName").textContent = firstName;
// // //     document.getElementById("displayUserName").textContent = firstName;
// // //     document.getElementById("displayUserRole").textContent =
// // //       userRole.charAt(0).toUpperCase() + userRole.slice(1);
// // //     document.getElementById("userInitial").textContent = initial;
// // //   });
// // // })();

// // // // =====================================================
// // // // Theme Toggle
// // // // =====================================================
// // // document.addEventListener("DOMContentLoaded", function () {
// // //   const themeToggle = document.getElementById("theme-toggle");
// // //   const icon = themeToggle.querySelector("i");

// // //   if (localStorage.getItem("theme") === "dark") {
// // //     document.documentElement.classList.add("dark");
// // //     icon.classList.replace("fa-moon", "fa-sun");
// // //   }

// // //   themeToggle.addEventListener("click", function () {
// // //     document.documentElement.classList.toggle("dark");
// // //     const isDark = document.documentElement.classList.contains("dark");
// // //     icon.classList.toggle("fa-moon", !isDark);
// // //     icon.classList.toggle("fa-sun",  isDark);
// // //     localStorage.setItem("theme", isDark ? "dark" : "light");
// // //   });
// // // });

// // // // =====================================================
// // // // Sidebar Navigation
// // // // =====================================================
// // // document.addEventListener("DOMContentLoaded", function () {
// // //   document.querySelectorAll(".sidebar-btn").forEach(function (btn) {
// // //     btn.addEventListener("click", function () {
// // //       document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));
// // //       btn.classList.add("active");
// // //       document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
// // //       const target = document.getElementById(btn.getAttribute("data-section"));
// // //       if (target) target.classList.remove("hidden");
// // //     });
// // //   });
// // // });

// // // // =====================================================
// // // // Logout — centered confirm + toast
// // // // =====================================================
// // // document.addEventListener("DOMContentLoaded", function () {
// // //   document.getElementById("logout").addEventListener("click", function () {
// // //     showConfirmDialog(
// // //       "Logout",
// // //       "Are you sure you want to logout?",
// // //       "fa-arrow-right-from-bracket",
// // //       function () {
// // //         toast("Logging out…", "info");
// // //         setTimeout(() => {
// // //           localStorage.removeItem("userEmail");
// // //           localStorage.removeItem("userRole");
// // //           localStorage.removeItem("isLoggedIn");
// // //           localStorage.removeItem("loginTime");
// // //           window.location.href = "login.html";
// // //         }, 1200);
// // //       }
// // //     );
// // //   });
// // // });

// // // // =====================================================
// // // // Centered Confirm Dialog (replaces browser confirm())
// // // // =====================================================
// // // function showConfirmDialog(title, message, iconClass, onConfirm) {
// // //   const overlay = document.createElement("div");
// // //   overlay.id = "__confirm_overlay__";
// // //   overlay.className = "fixed inset-0 bg-black/60 z-[99998] flex items-center justify-center";
// // //   overlay.style.backdropFilter = "blur(4px)";

// // //   overlay.innerHTML = `
// // //     <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center transform transition-all duration-200 scale-95 opacity-0" id="__confirm_box__">
// // //       <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
// // //         <i class="fa-solid ${iconClass || 'fa-question'} text-red-600 dark:text-red-400 text-2xl"></i>
// // //       </div>
// // //       <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${title}</h3>
// // //       <p class="text-gray-600 dark:text-gray-400 mb-6">${message}</p>
// // //       <div class="flex gap-3 justify-center">
// // //         <button id="__confirm_cancel__" class="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">Cancel</button>
// // //         <button id="__confirm_ok__" class="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">Confirm</button>
// // //       </div>
// // //     </div>
// // //   `;
// // //   document.body.appendChild(overlay);

// // //   requestAnimationFrame(() => {
// // //     const box = document.getElementById("__confirm_box__");
// // //     box.style.transform = "scale(1)";
// // //     box.style.opacity = "1";
// // //   });

// // //   function close() {
// // //     overlay.remove();
// // //   }

// // //   document.getElementById("__confirm_cancel__").addEventListener("click", close);
// // //   document.getElementById("__confirm_ok__").addEventListener("click", function () {
// // //     close();
// // //     onConfirm();
// // //   });
// // //   overlay.addEventListener("click", function (e) {
// // //     if (e.target === overlay) close();
// // //   });
// // // }

// // // // =====================================================
// // // // Laptop Section - Card Navigation
// // // // =====================================================
// // // function showEmployeeEntry() {
// // //   document.getElementById("laptopCardsSection").classList.add("hidden");
// // //   document.getElementById("employeeEntrySection").classList.remove("hidden");
// // //   document.getElementById("laptopInventorySection").classList.add("hidden");
// // //   activateEmployeeTab("addNew");
// // // }

// // // function showLaptopInventory() {
// // //   document.getElementById("laptopCardsSection").classList.add("hidden");
// // //   document.getElementById("employeeEntrySection").classList.add("hidden");
// // //   document.getElementById("laptopInventorySection").classList.remove("hidden");
// // //   activateInventoryTab("addInventory");
// // // }

// // // function backToLaptopCards() {
// // //   document.getElementById("laptopCardsSection").classList.remove("hidden");
// // //   document.getElementById("employeeEntrySection").classList.add("hidden");
// // //   document.getElementById("laptopInventorySection").classList.add("hidden");
// // // }

// // // // =====================================================
// // // // Employee Entry Tabs
// // // // =====================================================
// // // document.addEventListener("DOMContentLoaded", function () {
// // //   document.querySelectorAll(".employee-tab-btn").forEach(function (btn) {
// // //     btn.addEventListener("click", function () {
// // //       activateEmployeeTab(btn.getAttribute("data-employee-tab"));
// // //     });
// // //   });
// // // });

// // // function activateEmployeeTab(tabName) {
// // //   document.querySelectorAll(".employee-tab-btn").forEach(b => b.classList.remove("active"));
// // //   document.querySelectorAll(".employee-content").forEach(c => c.classList.add("hidden"));

// // //   const activeBtn = document.querySelector(`[data-employee-tab="${tabName}"]`);
// // //   if (activeBtn) activeBtn.classList.add("active");

// // //   const tabMap = {
// // //     addNew:   "addNewEntrySection",
// // //     update:   "updateEntrySection",
// // //     history:  "historySection",
// // //     analysis: "analysisSection"
// // //   };

// // //   const targetId = tabMap[tabName];
// // //   if (targetId) {
// // //     document.getElementById(targetId).classList.remove("hidden");
// // //     if (tabName === "history")  loadLaptopEntries();
// // //     if (tabName === "analysis") loadAnalysis();
// // //   }
// // // }

// // // // =====================================================
// // // // Inventory Tabs
// // // // =====================================================
// // // document.addEventListener("DOMContentLoaded", function () {
// // //   document.querySelectorAll(".inventory-tab-btn").forEach(function (btn) {
// // //     btn.addEventListener("click", function () {
// // //       activateInventoryTab(btn.getAttribute("data-inventory-tab"));
// // //     });
// // //   });
// // // });

// // // function activateInventoryTab(tabName) {
// // //   document.querySelectorAll(".inventory-tab-btn").forEach(b => b.classList.remove("active"));
// // //   document.querySelectorAll(".inventory-content").forEach(c => c.classList.add("hidden"));

// // //   const activeBtn = document.querySelector(`[data-inventory-tab="${tabName}"]`);
// // //   if (activeBtn) activeBtn.classList.add("active");

// // //   const tabMap = {
// // //     addInventory:     "addInventorySection",
// // //     inventoryHistory: "inventoryHistorySection",
// // //     repairing:        "repairingSection"
// // //   };

// // //   const targetId = tabMap[tabName];
// // //   if (targetId) {
// // //     document.getElementById(targetId).classList.remove("hidden");
// // //     if (tabName === "inventoryHistory") loadInventoryEntries();
// // //     if (tabName === "repairing")        loadRepairEntries();
// // //   }
// // // }

// // // // =====================================================
// // // // Add New Entry Table Rows
// // // // =====================================================
// // // var rowCount = 1;

// // // function addNewRow() {
// // //   rowCount++;
// // //   const tbody = document.querySelector("#addTable tbody");
// // //   const tr = document.createElement("tr");
// // //   tr.className = "bg-red-50/50 dark:bg-gray-800/50";
// // //   tr.innerHTML = `
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">${rowCount}</td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <button onclick="openModalForRow(${rowCount - 1})" class="text-blue-600 hover:text-blue-800">
// // //         <i class="fa-solid fa-eye"></i>
// // //       </button>
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Enter JHS Code" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="date" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Enter Name" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="tel" placeholder="Enter Contact No" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Mouse" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Other" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <button onclick="removeRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
// // //     </td>
// // //   `;
// // //   tbody.appendChild(tr);
// // // }

// // // function removeRow(btn) {
// // //   const row = btn.closest("tr");
// // //   const tbody = row.parentElement;
// // //   if (tbody.rows.length > 1) {
// // //     row.remove();
// // //     Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
// // //     toast("Row removed.", "warn");
// // //   } else {
// // //     toast("At least one row is required.", "warn");
// // //   }
// // // }

// // // // =====================================================
// // // // Save All Employee Entries → API
// // // // NOTE: No status field — entries are saved without status
// // // //       Status is only set via Update Entry tab
// // // // =====================================================
// // // async function saveAllEntries() {
// // //   const rows = document.querySelectorAll("#addTable tbody tr");
// // //   let saved = 0, errors = 0;

// // //   const btn = document.getElementById("saveAllBtn");
// // //   btn.disabled = true;
// // //   btn.textContent = "Saving...";

// // //   for (const row of rows) {
// // //     const inputs  = row.querySelectorAll("input");
// // //     // columns: [JHS Code, Date, Name, Contact, Processor, RAM, SSD, Mouse, Other]
// // //     const jhsCode = inputs[0] ? inputs[0].value.trim() : "";
// // //     if (!jhsCode) continue;

// // //     const payload = {
// // //       jhs_code:   jhsCode,
// // //       date:       inputs[1] ? inputs[1].value : "",
// // //       name:       inputs[2] ? inputs[2].value : "",
// // //       contact_no: inputs[3] ? inputs[3].value : "",
// // //       status:     "",          // No status on initial add
// // //       processor:  inputs[4] ? inputs[4].value : "",
// // //       ram:        inputs[5] ? inputs[5].value : "",
// // //       ssd:        inputs[6] ? inputs[6].value : "",
// // //       mouse:      inputs[7] ? inputs[7].value : "",
// // //       other:      inputs[8] ? inputs[8].value : ""
// // //     };

// // //     try {
// // //       try {
// // //         await apiFetch("/laptop-entries", { method: "POST", body: JSON.stringify(payload) });
// // //       } catch (e) {
// // //         if (e.message.includes("already exists")) {
// // //           const { jhs_code, ...updatePayload } = payload;
// // //           await apiFetch(`/laptop-entries/${jhsCode}`, { method: "PUT", body: JSON.stringify(updatePayload) });
// // //         } else throw e;
// // //       }
// // //       saved++;
// // //     } catch (e) {
// // //       errors++;
// // //       console.error("Failed to save row:", jhsCode, e);
// // //     }
// // //   }

// // //   btn.disabled = false;
// // //   btn.textContent = "Save All Entries";

// // //   if (errors === 0) {
// // //     toast(`✓ ${saved} ${saved === 1 ? "entry" : "entries"} saved successfully!`, "success");
// // //   } else {
// // //     toast(`Saved ${saved}, failed ${errors}. Check console.`, "warn");
// // //   }
// // // }

// // // // =====================================================
// // // // Load Laptop Entries → History Table
// // // // Status shown as plain badge (read-only) — no dropdown
// // // // Searchable by JHS Code, Name, Contact
// // // // =====================================================
// // // var _allLaptopEntries = [];

// // // async function loadLaptopEntries() {
// // //   const tbody = document.getElementById("laptopEntriesTableBody");
// // //   tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-gray-400">
// // //     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

// // //   try {
// // //     _allLaptopEntries = await apiFetch("/laptop-entries");
// // //   } catch (e) {
// // //     tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-red-500">
// // //       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend. Make sure server is running.</td></tr>`;
// // //     return;
// // //   }

// // //   renderHistoryTable(_allLaptopEntries);
// // // }

// // // function renderHistoryTable(entries) {
// // //   const tbody = document.getElementById("laptopEntriesTableBody");

// // //   if (entries.length === 0) {
// // //     tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-gray-500">No entries found.</td></tr>`;
// // //     return;
// // //   }

// // //   tbody.innerHTML = "";
// // //   entries.forEach(function (entry, index) {
// // //     const tr = document.createElement("tr");
// // //     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

// // //     // Status badge — read only, no dropdown
// // //     let statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">—</span>`;
// // //     if (entry.status === "IN") {
// // //       statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">IN</span>`;
// // //     } else if (entry.status === "Out") {
// // //       statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Out</span>`;
// // //     }

// // //     tr.innerHTML = `
// // //       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_code}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.name || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.contact_no || "—"}</td>
// // //       <td class="p-4">${statusBadge}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.mouse || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.other || "—"}</td>
// // //       <td class="p-4">
// // //         <button onclick="deleteEntry('${entry.jhs_code}')"
// // //           class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">
// // //           Delete
// // //         </button>
// // //       </td>
// // //     `;
// // //     tbody.appendChild(tr);
// // //   });
// // // }

// // // // =====================================================
// // // // History Search
// // // // =====================================================
// // // function filterHistory() {
// // //   const q = (document.getElementById("historySearch")?.value || "").toLowerCase().trim();
// // //   if (!q) {
// // //     renderHistoryTable(_allLaptopEntries);
// // //     return;
// // //   }
// // //   const filtered = _allLaptopEntries.filter(e =>
// // //     (e.jhs_code   || "").toLowerCase().includes(q) ||
// // //     (e.name       || "").toLowerCase().includes(q) ||
// // //     (e.contact_no || "").toLowerCase().includes(q) ||
// // //     (e.status     || "").toLowerCase().includes(q) ||
// // //     (e.date       || "").toLowerCase().includes(q) ||
// // //     (e.processor  || "").toLowerCase().includes(q)
// // //   );
// // //   renderHistoryTable(filtered);
// // // }

// // // // =====================================================
// // // // Delete Entry
// // // // =====================================================
// // // async function deleteEntry(jhsCode) {
// // //   showConfirmDialog(
// // //     "Delete Entry",
// // //     `Delete entry for <strong>${jhsCode}</strong>? This cannot be undone.`,
// // //     "fa-trash",
// // //     async function () {
// // //       try {
// // //         await apiFetch(`/laptop-entries/${jhsCode}`, { method: "DELETE" });
// // //         toast(`Entry ${jhsCode} deleted.`, "success");
// // //         loadLaptopEntries();
// // //         loadAnalysis();
// // //       } catch (e) {
// // //         toast(`Delete failed: ${e.message}`, "error");
// // //       }
// // //     }
// // //   );
// // // }

// // // // =====================================================
// // // // Analysis
// // // // =====================================================
// // // async function loadAnalysis() {
// // //   try {
// // //     const entries  = await apiFetch("/laptop-entries");
// // //     const inCount  = entries.filter(e => e.status === "IN").length;
// // //     const outCount = entries.filter(e => e.status === "Out").length;
// // //     document.getElementById("totalEntries").textContent = entries.length;
// // //     document.getElementById("inCount").textContent      = inCount;
// // //     document.getElementById("outCount").textContent     = outCount;
// // //   } catch (e) {
// // //     document.getElementById("totalEntries").textContent = "—";
// // //     document.getElementById("inCount").textContent      = "—";
// // //     document.getElementById("outCount").textContent     = "—";
// // //   }
// // // }

// // // // =====================================================
// // // // Update Entry (Search & Edit)
// // // // Status is set ONLY here — IN / OUT dropdown
// // // // After saving, History is refreshed automatically
// // // // =====================================================
// // // async function searchAndEdit() {
// // //   const jhsCode = document.getElementById("searchJhsCode").value.trim();
// // //   if (!jhsCode) { toast("Please enter a JHS Code to search.", "warn"); return; }

// // //   try {
// // //     const entries = await apiFetch("/laptop-entries");
// // //     const entry   = entries.find(e => e.jhs_code === jhsCode);
// // //     if (!entry) { toast("No entry found for JHS Code: " + jhsCode, "warn"); return; }

// // //     document.getElementById("updateJhsCode").value   = entry.jhs_code;
// // //     document.getElementById("updateDate").value       = entry.date || "";
// // //     document.getElementById("updateName").value       = entry.name || "";
// // //     document.getElementById("updateContactNo").value  = entry.contact_no || "";
// // //     document.getElementById("updateStatus").value     = entry.status || "";
// // //     document.getElementById("updateProcessor").value  = entry.processor || "";
// // //     document.getElementById("updateRam").value        = entry.ram || "";
// // //     document.getElementById("updateSsd").value        = entry.ssd || "";
// // //     document.getElementById("updateMouse").value      = entry.mouse || "";
// // //     document.getElementById("updateOther").value      = entry.other || "";

// // //     document.getElementById("updateFormContainer").classList.remove("hidden");
// // //   } catch (e) {
// // //     toast("Search failed: " + e.message, "error");
// // //   }
// // // }

// // // async function saveUpdate() {
// // //   const jhsCode = document.getElementById("updateJhsCode").value.trim();
// // //   const payload = {
// // //     date:       document.getElementById("updateDate").value,
// // //     name:       document.getElementById("updateName").value,
// // //     contact_no: document.getElementById("updateContactNo").value,
// // //     status:     document.getElementById("updateStatus").value,
// // //     processor:  document.getElementById("updateProcessor").value,
// // //     ram:        document.getElementById("updateRam").value,
// // //     ssd:        document.getElementById("updateSsd").value,
// // //     mouse:      document.getElementById("updateMouse").value,
// // //     other:      document.getElementById("updateOther").value
// // //   };

// // //   try {
// // //     await apiFetch(`/laptop-entries/${jhsCode}`, {
// // //       method: "PUT",
// // //       body: JSON.stringify(payload)
// // //     });

// // //     if (payload.status === "Out") {
// // //       toast("Entry updated. Status set to OUT — repair entry auto-created.", "info");
// // //     } else if (payload.status === "IN") {
// // //       toast("Entry updated. Status set to IN — pending repairs auto-closed.", "success");
// // //     } else {
// // //       toast("Entry updated successfully!", "success");
// // //     }

// // //     document.getElementById("updateFormContainer").classList.add("hidden");
// // //     document.getElementById("searchJhsCode").value = "";

// // //     // Refresh history & analysis so changes reflect immediately
// // //     loadLaptopEntries();
// // //     loadAnalysis();

// // //   } catch (e) {
// // //     toast("Update failed: " + e.message, "error");
// // //   }
// // // }

// // // // =====================================================
// // // // Modal (Preview / Edit for addTable row)
// // // // =====================================================
// // // var currentModalRowIndex = -1;

// // // function openModalForRow(rowIndex) {
// // //   currentModalRowIndex = rowIndex;
// // //   const rows = document.querySelectorAll("#addTable tbody tr");
// // //   const row  = rows[rowIndex];
// // //   if (!row) { document.getElementById("previewModal").classList.remove("hidden"); return; }

// // //   // inputs: [JHS Code, Date, Name, Contact, Processor, RAM, SSD, Mouse, Other]
// // //   const inputs = row.querySelectorAll("input");
// // //   document.getElementById("modalSNo").textContent     = rowIndex + 1;
// // //   document.getElementById("modalJhsCode").value       = inputs[0] ? inputs[0].value : "";
// // //   document.getElementById("modalDate").value          = inputs[1] ? inputs[1].value : "";
// // //   document.getElementById("modalName").value          = inputs[2] ? inputs[2].value : "";
// // //   document.getElementById("modalContactNo").value     = inputs[3] ? inputs[3].value : "";
// // //   document.getElementById("modalProcessor").value     = inputs[4] ? inputs[4].value : "";
// // //   document.getElementById("modalRam").value           = inputs[5] ? inputs[5].value : "";
// // //   document.getElementById("modalSsd").value           = inputs[6] ? inputs[6].value : "";
// // //   document.getElementById("modalMouse").value         = inputs[7] ? inputs[7].value : "";
// // //   document.getElementById("modalOther").value         = inputs[8] ? inputs[8].value : "";

// // //   document.getElementById("previewModal").classList.remove("hidden");
// // // }

// // // function saveModalEntry() {
// // //   const rows = document.querySelectorAll("#addTable tbody tr");
// // //   const row  = rows[currentModalRowIndex];
// // //   if (!row) { closeModal(); return; }

// // //   const inputs = row.querySelectorAll("input");
// // //   if (inputs[0]) inputs[0].value = document.getElementById("modalJhsCode").value;
// // //   if (inputs[1]) inputs[1].value = document.getElementById("modalDate").value;
// // //   if (inputs[2]) inputs[2].value = document.getElementById("modalName").value;
// // //   if (inputs[3]) inputs[3].value = document.getElementById("modalContactNo").value;
// // //   if (inputs[4]) inputs[4].value = document.getElementById("modalProcessor").value;
// // //   if (inputs[5]) inputs[5].value = document.getElementById("modalRam").value;
// // //   if (inputs[6]) inputs[6].value = document.getElementById("modalSsd").value;
// // //   if (inputs[7]) inputs[7].value = document.getElementById("modalMouse").value;
// // //   if (inputs[8]) inputs[8].value = document.getElementById("modalOther").value;

// // //   toast("Row updated from modal.", "success");
// // //   closeModal();
// // // }

// // // function closeModal() {
// // //   document.getElementById("previewModal").classList.add("hidden");
// // // }

// // // // =====================================================
// // // // Inventory Table Rows
// // // // =====================================================
// // // var inventoryRowCount = 1;

// // // function addInventoryRow() {
// // //   inventoryRowCount++;
// // //   const tbody = document.querySelector("#inventoryAddTable tbody");
// // //   const tr = document.createElement("tr");
// // //   tr.className = "bg-red-50/50 dark:bg-gray-800/50";
// // //   tr.innerHTML = `
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">${inventoryRowCount}</td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <button onclick="openInventoryModalForRow(${inventoryRowCount - 1})" class="text-blue-600 hover:text-blue-800">
// // //         <i class="fa-solid fa-eye"></i>
// // //       </button>
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Enter JHS Tag" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Enter Brand" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// // //     </td>
// // //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// // //       <button onclick="removeInventoryRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
// // //     </td>
// // //   `;
// // //   tbody.appendChild(tr);
// // // }

// // // function removeInventoryRow(btn) {
// // //   const row = btn.closest("tr");
// // //   const tbody = row.parentElement;
// // //   if (tbody.rows.length > 1) {
// // //     row.remove();
// // //     Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
// // //     toast("Row removed.", "warn");
// // //   } else {
// // //     toast("At least one row is required.", "warn");
// // //   }
// // // }

// // // // =====================================================
// // // // Save All Inventory Entries → API
// // // // =====================================================
// // // async function saveAllInventoryEntries() {
// // //   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
// // //   let saved = 0, errors = 0;

// // //   const btn = document.getElementById("saveAllInventoryBtn");
// // //   btn.disabled = true;
// // //   btn.textContent = "Saving...";

// // //   for (const row of rows) {
// // //     const inputs = row.querySelectorAll("input");
// // //     const jhsTag = inputs[0] ? inputs[0].value.trim() : "";
// // //     if (!jhsTag) continue;

// // //     const payload = {
// // //       jhs_tag:   jhsTag,
// // //       brand:     inputs[1] ? inputs[1].value : "",
// // //       processor: inputs[2] ? inputs[2].value : "",
// // //       ram:       inputs[3] ? inputs[3].value : "",
// // //       ssd:       inputs[4] ? inputs[4].value : ""
// // //     };

// // //     try {
// // //       try {
// // //         await apiFetch("/laptop-inventory", { method: "POST", body: JSON.stringify(payload) });
// // //       } catch (e) {
// // //         if (e.message.includes("already exists")) {
// // //           toast(`JHS Tag '${jhsTag}' already exists in inventory, skipped.`, "warn");
// // //         } else throw e;
// // //       }
// // //       saved++;
// // //     } catch (e) {
// // //       errors++;
// // //       console.error("Failed inventory row:", jhsTag, e);
// // //     }
// // //   }

// // //   btn.disabled = false;
// // //   btn.textContent = "Save All Entries";

// // //   if (errors === 0) {
// // //     toast(`✓ ${saved} inventory ${saved === 1 ? "entry" : "entries"} saved!`, "success");
// // //   } else {
// // //     toast(`Saved ${saved}, failed ${errors}.`, "warn");
// // //   }
// // // }

// // // // =====================================================
// // // // Load Inventory Entries History
// // // // =====================================================
// // // async function loadInventoryEntries() {
// // //   const tbody = document.getElementById("inventoryEntriesTableBody");
// // //   tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400">
// // //     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

// // //   let entries;
// // //   try {
// // //     entries = await apiFetch("/laptop-inventory");
// // //   } catch (e) {
// // //     tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-red-500">
// // //       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
// // //     return;
// // //   }

// // //   if (entries.length === 0) {
// // //     tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-500">No inventory entries found.</td></tr>`;
// // //     return;
// // //   }

// // //   tbody.innerHTML = "";
// // //   entries.forEach(function (entry, index) {
// // //     const tr = document.createElement("tr");
// // //     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";
// // //     tr.innerHTML = `
// // //       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.brand || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
// // //       <td class="p-4">
// // //         <button onclick="deleteInventoryEntry('${entry.jhs_tag}')"
// // //           class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">Delete</button>
// // //       </td>
// // //     `;
// // //     tbody.appendChild(tr);
// // //   });
// // // }

// // // async function deleteInventoryEntry(jhsTag) {
// // //   showConfirmDialog(
// // //     "Delete Inventory",
// // //     `Delete inventory entry for <strong>${jhsTag}</strong>?`,
// // //     "fa-trash",
// // //     async function () {
// // //       try {
// // //         await apiFetch(`/laptop-inventory/${jhsTag}`, { method: "DELETE" });
// // //         toast(`Inventory ${jhsTag} deleted.`, "success");
// // //         loadInventoryEntries();
// // //       } catch (e) {
// // //         toast(`Delete failed: ${e.message}`, "error");
// // //       }
// // //     }
// // //   );
// // // }

// // // // =====================================================
// // // // Inventory Modal
// // // // =====================================================
// // // var currentInventoryModalRowIndex = -1;

// // // function openInventoryModalForRow(rowIndex) {
// // //   currentInventoryModalRowIndex = rowIndex;
// // //   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
// // //   const row  = rows[rowIndex];
// // //   if (!row) { document.getElementById("inventoryPreviewModal").classList.remove("hidden"); return; }

// // //   const inputs = row.querySelectorAll("input");
// // //   document.getElementById("inventoryModalSNo").textContent  = rowIndex + 1;
// // //   document.getElementById("inventoryModalJhsTag").value     = inputs[0] ? inputs[0].value : "";
// // //   document.getElementById("inventoryModalBrand").value      = inputs[1] ? inputs[1].value : "";
// // //   document.getElementById("inventoryModalProcessor").value  = inputs[2] ? inputs[2].value : "";
// // //   document.getElementById("inventoryModalRam").value        = inputs[3] ? inputs[3].value : "";
// // //   document.getElementById("inventoryModalSsd").value        = inputs[4] ? inputs[4].value : "";

// // //   document.getElementById("inventoryPreviewModal").classList.remove("hidden");
// // // }

// // // function saveInventoryModalEntry() {
// // //   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
// // //   const row  = rows[currentInventoryModalRowIndex];
// // //   if (!row) { closeInventoryModal(); return; }

// // //   const inputs = row.querySelectorAll("input");
// // //   if (inputs[0]) inputs[0].value = document.getElementById("inventoryModalJhsTag").value;
// // //   if (inputs[1]) inputs[1].value = document.getElementById("inventoryModalBrand").value;
// // //   if (inputs[2]) inputs[2].value = document.getElementById("inventoryModalProcessor").value;
// // //   if (inputs[3]) inputs[3].value = document.getElementById("inventoryModalRam").value;
// // //   if (inputs[4]) inputs[4].value = document.getElementById("inventoryModalSsd").value;

// // //   toast("Row updated from modal.", "success");
// // //   closeInventoryModal();
// // // }

// // // function closeInventoryModal() {
// // //   document.getElementById("inventoryPreviewModal").classList.add("hidden");
// // // }

// // // // =====================================================
// // // // Repair — Search
// // // // =====================================================
// // // async function searchForRepair() {
// // //   const jhsTag = document.getElementById("repairJhsTag").value.trim();
// // //   if (!jhsTag) { toast("Please enter a JHS Tag to search.", "warn"); return; }

// // //   try {
// // //     const inventory = await apiFetch("/laptop-inventory");
// // //     const invEntry  = inventory.find(e => e.jhs_tag === jhsTag);

// // //     if (!invEntry) {
// // //       const empEntries = await apiFetch("/laptop-entries");
// // //       const empEntry   = empEntries.find(e => e.jhs_code === jhsTag);
// // //       if (!empEntry) {
// // //         toast("No inventory or employee entry found for JHS Tag: " + jhsTag, "warn");
// // //         return;
// // //       }
// // //     }

// // //     document.getElementById("repairJhsCode").value = jhsTag;
// // //     document.getElementById("repairFormContainer").classList.remove("hidden");
// // //   } catch (e) {
// // //     toast("Search failed: " + e.message, "error");
// // //   }
// // // }

// // // // =====================================================
// // // // Save Repair Entry → API
// // // // =====================================================
// // // async function saveRepair() {
// // //   const jhsTag = document.getElementById("repairJhsCode").value.trim();
// // //   const issue  = document.getElementById("repairIssue").value.trim();
// // //   const date   = document.getElementById("repairDate").value;
// // //   const status = document.getElementById("repairStatus").value;
// // //   const notes  = document.getElementById("repairNotes").value.trim();

// // //   if (!jhsTag || !issue || !date || !status) {
// // //     toast("Please fill in all required fields.", "warn");
// // //     return;
// // //   }

// // //   let empName = "", empContact = "";
// // //   try {
// // //     const entries = await apiFetch("/laptop-entries");
// // //     const emp = entries.find(e => e.jhs_code === jhsTag);
// // //     if (emp) { empName = emp.name || ""; empContact = emp.contact_no || ""; }
// // //   } catch (_) {}

// // //   const payload = {
// // //     jhs_tag: jhsTag,
// // //     employee_name: empName,
// // //     employee_contact: empContact,
// // //     issue, date, status, notes
// // //   };

// // //   try {
// // //     await apiFetch("/repair-entries", { method: "POST", body: JSON.stringify(payload) });

// // //     if (status === "Repaired") {
// // //       toast(`Repair entry saved. Employee entry for ${jhsTag} set back to IN.`, "success");
// // //     } else {
// // //       toast("Repair entry saved!", "success");
// // //     }

// // //     document.getElementById("repairFormContainer").classList.add("hidden");
// // //     document.getElementById("repairJhsTag").value  = "";
// // //     document.getElementById("repairIssue").value   = "";
// // //     document.getElementById("repairDate").value    = "";
// // //     document.getElementById("repairStatus").value  = "";
// // //     document.getElementById("repairNotes").value   = "";
// // //     loadRepairEntries();
// // //   } catch (e) {
// // //     toast("Failed to save repair: " + e.message, "error");
// // //   }
// // // }

// // // // =====================================================
// // // // Load Repair Entries → Repair History Table
// // // // =====================================================
// // // async function loadRepairEntries() {
// // //   const tbody = document.getElementById("repairEntriesTableBody");
// // //   tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">
// // //     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

// // //   let entries;
// // //   try {
// // //     entries = await apiFetch("/repair-entries");
// // //   } catch (e) {
// // //     tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-red-500">
// // //       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
// // //     return;
// // //   }

// // //   if (entries.length === 0) {
// // //     tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-500">No repair entries found.</td></tr>`;
// // //     return;
// // //   }

// // //   tbody.innerHTML = "";
// // //   entries.forEach(function (entry, index) {
// // //     const tr = document.createElement("tr");
// // //     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

// // //     const statusColors = {
// // //       "In Repair":   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
// // //       "Repaired":    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
// // //       "Irreparable": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
// // //     };
// // //     const colorClass = statusColors[entry.status] || "bg-gray-100 text-gray-800";

// // //     const actionBtns = entry.status === "In Repair"
// // //       ? `<button onclick="markRepairStatus('${entry.id}', 'Repaired')"
// // //            class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700 transition mb-1 block w-full">
// // //            ✓ Repaired
// // //          </button>
// // //          <button onclick="markRepairStatus('${entry.id}', 'Irreparable')"
// // //            class="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-700 transition mb-1 block w-full">
// // //            ✗ Irreparable
// // //          </button>`
// // //       : "";

// // //     tr.innerHTML = `
// // //       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">
// // //         <div class="font-medium">${entry.employee_name || "—"}</div>
// // //         <div class="text-xs text-gray-500">${entry.employee_contact || ""}</div>
// // //       </td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.issue || "—"}</td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
// // //       <td class="p-4">
// // //         <span class="px-2 py-1 rounded-full text-xs font-semibold ${colorClass}">${entry.status}</span>
// // //       </td>
// // //       <td class="p-4 text-gray-700 dark:text-gray-300 text-xs">${entry.notes || "—"}</td>
// // //       <td class="p-4 min-w-[150px]">
// // //         ${actionBtns}
// // //         <button onclick="deleteRepairEntry('${entry.id}')"
// // //           class="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700 transition block w-full mt-1">
// // //           Delete
// // //         </button>
// // //       </td>
// // //     `;
// // //     tbody.appendChild(tr);
// // //   });
// // // }

// // // // =====================================================
// // // // Mark Repair Status from inline buttons
// // // // =====================================================
// // // async function markRepairStatus(repairId, newStatus) {
// // //   const note = newStatus === "Repaired"
// // //     ? `Marked Repaired on ${new Date().toLocaleDateString()}`
// // //     : `Marked Irreparable on ${new Date().toLocaleDateString()}`;

// // //   try {
// // //     await apiFetch(`/repair-entries/${repairId}/status`, {
// // //       method: "PATCH",
// // //       body: JSON.stringify({ status: newStatus, notes: note })
// // //     });

// // //     if (newStatus === "Repaired") {
// // //       toast(`Marked as Repaired. Employee entry set back to IN.`, "success");
// // //     } else {
// // //       toast(`Marked as Irreparable.`, "warn");
// // //     }
// // //     loadRepairEntries();
// // //     loadAnalysis();
// // //   } catch (e) {
// // //     toast(`Failed: ${e.message}`, "error");
// // //   }
// // // }

// // // // =====================================================
// // // // Delete Repair Entry
// // // // =====================================================
// // // async function deleteRepairEntry(repairId) {
// // //   showConfirmDialog(
// // //     "Delete Repair Entry",
// // //     "Are you sure you want to delete this repair entry?",
// // //     "fa-trash",
// // //     async function () {
// // //       try {
// // //         await apiFetch(`/repair-entries/${repairId}`, { method: "DELETE" });
// // //         toast("Repair entry deleted.", "success");
// // //         loadRepairEntries();
// // //       } catch (e) {
// // //         toast(`Delete failed: ${e.message}`, "error");
// // //       }
// // //     }
// // //   );
// // // }



// // /* =====================================================
// //    JHS IT Admin - script.js  v3.0
// //    Full API integration — all data stored in MongoDB via FastAPI
// //    ===================================================== */

// // const API = "http://localhost:8000";

// // // =====================================================
// // // Utility: API fetch wrapper
// // // =====================================================
// // async function apiFetch(path, options = {}) {
// //   try {
// //     const res = await fetch(API + path, {
// //       headers: { "Content-Type": "application/json", ...(options.headers || {}) },
// //       ...options
// //     });
// //     if (!res.ok) {
// //       const err = await res.json().catch(() => ({ detail: "Unknown error" }));
// //       throw new Error(err.detail || "Request failed");
// //     }
// //     return await res.json();
// //   } catch (e) {
// //     console.error("API Error:", path, e);
// //     throw e;
// //   }
// // }

// // // =====================================================
// // // Toast — centered on screen
// // // =====================================================
// // function toast(msg, type = "success") {
// //   // Remove any existing toast
// //   const existing = document.getElementById("__toast__");
// //   if (existing) existing.remove();

// //   const el = document.createElement("div");
// //   el.id = "__toast__";
// //   const colors = {
// //     success: "bg-green-600",
// //     error:   "bg-red-600",
// //     info:    "bg-blue-600",
// //     warn:    "bg-yellow-500"
// //   };
// //   const icons = {
// //     success: "fa-circle-check",
// //     error:   "fa-circle-xmark",
// //     info:    "fa-circle-info",
// //     warn:    "fa-triangle-exclamation"
// //   };
// //   el.className = `fixed z-[99999] px-8 py-4 rounded-2xl text-white text-base font-semibold shadow-2xl
// //                   ${colors[type] || colors.success}
// //                   flex items-center gap-3
// //                   transition-all duration-300 ease-out
// //                   left-1/2 -translate-x-1/2`;
// //   el.style.cssText += `
// //     top: 50%;
// //     transform: translate(-50%, -50%) scale(0.8);
// //     opacity: 0;
// //     min-width: 280px;
// //     max-width: 480px;
// //     text-align: center;
// //     justify-content: center;
// //   `;
// //   el.innerHTML = `<i class="fa-solid ${icons[type] || icons.success} text-xl"></i><span>${msg}</span>`;
// //   document.body.appendChild(el);

// //   // Animate in
// //   requestAnimationFrame(() => {
// //     el.style.transform = "translate(-50%, -50%) scale(1)";
// //     el.style.opacity = "1";
// //   });

// //   // Animate out
// //   setTimeout(() => {
// //     el.style.transform = "translate(-50%, -50%) scale(0.8)";
// //     el.style.opacity = "0";
// //     setTimeout(() => el.remove(), 350);
// //   }, 2800);
// // }

// // // =====================================================
// // // User Initialization
// // // =====================================================
// // (function () {
// //   const userEmail = localStorage.getItem("userEmail") || "";
// //   const userRole  = localStorage.getItem("userRole")  || "";

// //   function getFirstName(email) {
// //     if (!email) return "User";
// //     const namePart  = email.split("@")[0];
// //     const firstName = namePart.split(".")[0];
// //     return firstName.charAt(0).toUpperCase() + firstName.slice(1);
// //   }

// //   const firstName = getFirstName(userEmail);
// //   const initial   = firstName.charAt(0).toUpperCase();

// //   document.addEventListener("DOMContentLoaded", function () {
// //     document.getElementById("welcomeUserName").textContent = firstName;
// //     document.getElementById("displayUserName").textContent = firstName;
// //     document.getElementById("displayUserRole").textContent =
// //       userRole.charAt(0).toUpperCase() + userRole.slice(1);
// //     document.getElementById("userInitial").textContent = initial;
// //   });
// // })();

// // // =====================================================
// // // Theme Toggle
// // // =====================================================
// // document.addEventListener("DOMContentLoaded", function () {
// //   const themeToggle = document.getElementById("theme-toggle");
// //   const icon = themeToggle.querySelector("i");

// //   if (localStorage.getItem("theme") === "dark") {
// //     document.documentElement.classList.add("dark");
// //     icon.classList.replace("fa-moon", "fa-sun");
// //   }

// //   themeToggle.addEventListener("click", function () {
// //     document.documentElement.classList.toggle("dark");
// //     const isDark = document.documentElement.classList.contains("dark");
// //     icon.classList.toggle("fa-moon", !isDark);
// //     icon.classList.toggle("fa-sun",  isDark);
// //     localStorage.setItem("theme", isDark ? "dark" : "light");
// //   });
// // });

// // // =====================================================
// // // Sidebar Navigation
// // // =====================================================
// // document.addEventListener("DOMContentLoaded", function () {
// //   document.querySelectorAll(".sidebar-btn").forEach(function (btn) {
// //     btn.addEventListener("click", function () {
// //       document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));
// //       btn.classList.add("active");
// //       document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
// //       const target = document.getElementById(btn.getAttribute("data-section"));
// //       if (target) target.classList.remove("hidden");
// //     });
// //   });
// // });

// // // =====================================================
// // // Logout — centered confirm + toast
// // // =====================================================
// // document.addEventListener("DOMContentLoaded", function () {
// //   document.getElementById("logout").addEventListener("click", function () {
// //     showConfirmDialog(
// //       "Logout",
// //       "Are you sure you want to logout?",
// //       "fa-arrow-right-from-bracket",
// //       function () {
// //         toast("Logging out…", "info");
// //         setTimeout(() => {
// //           localStorage.removeItem("userEmail");
// //           localStorage.removeItem("userRole");
// //           localStorage.removeItem("isLoggedIn");
// //           localStorage.removeItem("loginTime");
// //           window.location.href = "login.html";
// //         }, 1200);
// //       }
// //     );
// //   });
// // });

// // // =====================================================
// // // Centered Confirm Dialog (replaces browser confirm())
// // // =====================================================
// // function showConfirmDialog(title, message, iconClass, onConfirm) {
// //   const overlay = document.createElement("div");
// //   overlay.id = "__confirm_overlay__";
// //   overlay.className = "fixed inset-0 bg-black/60 z-[99998] flex items-center justify-center";
// //   overlay.style.backdropFilter = "blur(4px)";

// //   overlay.innerHTML = `
// //     <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center transform transition-all duration-200 scale-95 opacity-0" id="__confirm_box__">
// //       <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
// //         <i class="fa-solid ${iconClass || 'fa-question'} text-red-600 dark:text-red-400 text-2xl"></i>
// //       </div>
// //       <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${title}</h3>
// //       <p class="text-gray-600 dark:text-gray-400 mb-6">${message}</p>
// //       <div class="flex gap-3 justify-center">
// //         <button id="__confirm_cancel__" class="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">Cancel</button>
// //         <button id="__confirm_ok__" class="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">Confirm</button>
// //       </div>
// //     </div>
// //   `;
// //   document.body.appendChild(overlay);

// //   requestAnimationFrame(() => {
// //     const box = document.getElementById("__confirm_box__");
// //     box.style.transform = "scale(1)";
// //     box.style.opacity = "1";
// //   });

// //   function close() {
// //     overlay.remove();
// //   }

// //   document.getElementById("__confirm_cancel__").addEventListener("click", close);
// //   document.getElementById("__confirm_ok__").addEventListener("click", function () {
// //     close();
// //     onConfirm();
// //   });
// //   overlay.addEventListener("click", function (e) {
// //     if (e.target === overlay) close();
// //   });
// // }

// // // =====================================================
// // // Laptop Section - Card Navigation
// // // =====================================================
// // function showEmployeeEntry() {
// //   document.getElementById("laptopCardsSection").classList.add("hidden");
// //   document.getElementById("employeeEntrySection").classList.remove("hidden");
// //   document.getElementById("laptopInventorySection").classList.add("hidden");
// //   activateEmployeeTab("addNew");
// // }

// // function showLaptopInventory() {
// //   document.getElementById("laptopCardsSection").classList.add("hidden");
// //   document.getElementById("employeeEntrySection").classList.add("hidden");
// //   document.getElementById("laptopInventorySection").classList.remove("hidden");
// //   activateInventoryTab("addInventory");
// // }

// // function backToLaptopCards() {
// //   document.getElementById("laptopCardsSection").classList.remove("hidden");
// //   document.getElementById("employeeEntrySection").classList.add("hidden");
// //   document.getElementById("laptopInventorySection").classList.add("hidden");
// // }

// // // =====================================================
// // // Employee Entry Tabs
// // // =====================================================
// // document.addEventListener("DOMContentLoaded", function () {
// //   document.querySelectorAll(".employee-tab-btn").forEach(function (btn) {
// //     btn.addEventListener("click", function () {
// //       activateEmployeeTab(btn.getAttribute("data-employee-tab"));
// //     });
// //   });
// // });

// // function activateEmployeeTab(tabName) {
// //   document.querySelectorAll(".employee-tab-btn").forEach(b => b.classList.remove("active"));
// //   document.querySelectorAll(".employee-content").forEach(c => c.classList.add("hidden"));

// //   const activeBtn = document.querySelector(`[data-employee-tab="${tabName}"]`);
// //   if (activeBtn) activeBtn.classList.add("active");

// //   const tabMap = {
// //     addNew:   "addNewEntrySection",
// //     update:   "updateEntrySection",
// //     history:  "historySection",
// //     analysis: "analysisSection"
// //   };

// //   const targetId = tabMap[tabName];
// //   if (targetId) {
// //     document.getElementById(targetId).classList.remove("hidden");
// //     if (tabName === "update")   loadUpdateEntries();
// //     if (tabName === "history")  loadLaptopEntries();
// //     if (tabName === "analysis") loadAnalysis();
// //   }
// // }

// // // =====================================================
// // // Inventory Tabs
// // // =====================================================
// // document.addEventListener("DOMContentLoaded", function () {
// //   document.querySelectorAll(".inventory-tab-btn").forEach(function (btn) {
// //     btn.addEventListener("click", function () {
// //       activateInventoryTab(btn.getAttribute("data-inventory-tab"));
// //     });
// //   });
// // });

// // function activateInventoryTab(tabName) {
// //   document.querySelectorAll(".inventory-tab-btn").forEach(b => b.classList.remove("active"));
// //   document.querySelectorAll(".inventory-content").forEach(c => c.classList.add("hidden"));

// //   const activeBtn = document.querySelector(`[data-inventory-tab="${tabName}"]`);
// //   if (activeBtn) activeBtn.classList.add("active");

// //   const tabMap = {
// //     addInventory:     "addInventorySection",
// //     inventoryHistory: "inventoryHistorySection",
// //     repairing:        "repairingSection"
// //   };

// //   const targetId = tabMap[tabName];
// //   if (targetId) {
// //     document.getElementById(targetId).classList.remove("hidden");
// //     if (tabName === "inventoryHistory") loadInventoryEntries();
// //     if (tabName === "repairing")        loadRepairEntries();
// //   }
// // }

// // // =====================================================
// // // Add New Entry Table Rows
// // // =====================================================
// // var rowCount = 1;

// // function addNewRow() {
// //   rowCount++;
// //   const tbody = document.querySelector("#addTable tbody");
// //   const tr = document.createElement("tr");
// //   tr.className = "bg-red-50/50 dark:bg-gray-800/50";
// //   tr.innerHTML = `
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">${rowCount}</td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <button onclick="openModalForRow(${rowCount - 1})" class="text-blue-600 hover:text-blue-800">
// //         <i class="fa-solid fa-eye"></i>
// //       </button>
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Enter JHS Code" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="date" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Enter Name" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="tel" placeholder="Enter Contact No" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Mouse" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Other" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <button onclick="removeRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
// //     </td>
// //   `;
// //   tbody.appendChild(tr);
// // }

// // function removeRow(btn) {
// //   const row = btn.closest("tr");
// //   const tbody = row.parentElement;
// //   if (tbody.rows.length > 1) {
// //     row.remove();
// //     Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
// //     toast("Row removed.", "warn");
// //   } else {
// //     toast("At least one row is required.", "warn");
// //   }
// // }

// // // =====================================================
// // // Save All Employee Entries → API
// // // NOTE: No status field — entries are saved without status
// // //       Status is only set via Update Entry tab
// // // =====================================================
// // async function saveAllEntries() {
// //   const rows = document.querySelectorAll("#addTable tbody tr");
// //   let saved = 0, errors = 0;

// //   const btn = document.getElementById("saveAllBtn");
// //   btn.disabled = true;
// //   btn.textContent = "Saving...";

// //   for (const row of rows) {
// //     const inputs  = row.querySelectorAll("input");
// //     // columns: [JHS Code, Date, Name, Contact, Processor, RAM, SSD, Mouse, Other]
// //     const jhsCode = inputs[0] ? inputs[0].value.trim() : "";
// //     if (!jhsCode) continue;

// //     const payload = {
// //       jhs_code:   jhsCode,
// //       date:       inputs[1] ? inputs[1].value : "",
// //       name:       inputs[2] ? inputs[2].value : "",
// //       contact_no: inputs[3] ? inputs[3].value : "",
// //       status:     "",          // No status on initial add
// //       processor:  inputs[4] ? inputs[4].value : "",
// //       ram:        inputs[5] ? inputs[5].value : "",
// //       ssd:        inputs[6] ? inputs[6].value : "",
// //       mouse:      inputs[7] ? inputs[7].value : "",
// //       other:      inputs[8] ? inputs[8].value : ""
// //     };

// //     try {
// //       try {
// //         await apiFetch("/laptop-entries", { method: "POST", body: JSON.stringify(payload) });
// //       } catch (e) {
// //         if (e.message.includes("already exists")) {
// //           const { jhs_code, ...updatePayload } = payload;
// //           await apiFetch(`/laptop-entries/${jhsCode}`, { method: "PUT", body: JSON.stringify(updatePayload) });
// //         } else throw e;
// //       }
// //       saved++;
// //     } catch (e) {
// //       errors++;
// //       console.error("Failed to save row:", jhsCode, e);
// //     }
// //   }

// //   btn.disabled = false;
// //   btn.textContent = "Save All Entries";

// //   if (errors === 0) {
// //     toast(`✓ ${saved} ${saved === 1 ? "entry" : "entries"} saved successfully!`, "success");
// //   } else {
// //     toast(`Saved ${saved}, failed ${errors}. Check console.`, "warn");
// //   }
// // }

// // // =====================================================
// // // Load Laptop Entries → History Table
// // // Status shown as plain badge (read-only) — no dropdown
// // // Searchable by JHS Code, Name, Contact
// // // =====================================================
// // var _allLaptopEntries = [];

// // async function loadLaptopEntries() {
// //   const tbody = document.getElementById("laptopEntriesTableBody");
// //   tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-gray-400">
// //     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

// //   try {
// //     _allLaptopEntries = await apiFetch("/laptop-entries");
// //   } catch (e) {
// //     tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-red-500">
// //       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend. Make sure server is running.</td></tr>`;
// //     return;
// //   }

// //   renderHistoryTable(_allLaptopEntries);
// // }

// // function renderHistoryTable(entries) {
// //   const tbody = document.getElementById("laptopEntriesTableBody");

// //   if (entries.length === 0) {
// //     tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-gray-500">No entries found.</td></tr>`;
// //     return;
// //   }

// //   tbody.innerHTML = "";
// //   entries.forEach(function (entry, index) {
// //     const tr = document.createElement("tr");
// //     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

// //     // Status badge — read only, no dropdown
// //     let statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">—</span>`;
// //     if (entry.status === "IN") {
// //       statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">IN</span>`;
// //     } else if (entry.status === "Out") {
// //       statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Out</span>`;
// //     }

// //     tr.innerHTML = `
// //       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_code}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.name || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.contact_no || "—"}</td>
// //       <td class="p-4">${statusBadge}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.mouse || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.other || "—"}</td>
// //       <td class="p-4">
// //         <button onclick="deleteEntry('${entry.jhs_code}')"
// //           class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">
// //           Delete
// //         </button>
// //       </td>
// //     `;
// //     tbody.appendChild(tr);
// //   });
// // }

// // // =====================================================
// // // History Search
// // // =====================================================
// // function filterHistory() {
// //   const q = (document.getElementById("historySearch")?.value || "").toLowerCase().trim();
// //   if (!q) {
// //     renderHistoryTable(_allLaptopEntries);
// //     return;
// //   }
// //   const filtered = _allLaptopEntries.filter(e =>
// //     (e.jhs_code   || "").toLowerCase().includes(q) ||
// //     (e.name       || "").toLowerCase().includes(q) ||
// //     (e.contact_no || "").toLowerCase().includes(q) ||
// //     (e.status     || "").toLowerCase().includes(q) ||
// //     (e.date       || "").toLowerCase().includes(q) ||
// //     (e.processor  || "").toLowerCase().includes(q)
// //   );
// //   renderHistoryTable(filtered);
// // }

// // // =====================================================
// // // Delete Entry
// // // =====================================================
// // async function deleteEntry(jhsCode) {
// //   showConfirmDialog(
// //     "Delete Entry",
// //     `Delete entry for <strong>${jhsCode}</strong>? This cannot be undone.`,
// //     "fa-trash",
// //     async function () {
// //       try {
// //         await apiFetch(`/laptop-entries/${jhsCode}`, { method: "DELETE" });
// //         toast(`Entry ${jhsCode} deleted.`, "success");
// //         loadLaptopEntries();
// //         loadAnalysis();
// //       } catch (e) {
// //         toast(`Delete failed: ${e.message}`, "error");
// //       }
// //     }
// //   );
// // }

// // // =====================================================
// // // Analysis
// // // =====================================================
// // async function loadAnalysis() {
// //   try {
// //     const entries  = await apiFetch("/laptop-entries");
// //     const inCount  = entries.filter(e => e.status === "IN").length;
// //     const outCount = entries.filter(e => e.status === "Out").length;
// //     document.getElementById("totalEntries").textContent = entries.length;
// //     document.getElementById("inCount").textContent      = inCount;
// //     document.getElementById("outCount").textContent     = outCount;
// //   } catch (e) {
// //     document.getElementById("totalEntries").textContent = "—";
// //     document.getElementById("inCount").textContent      = "—";
// //     document.getElementById("outCount").textContent     = "—";
// //   }
// // }

// // // =====================================================
// // // Update Entry Tab
// // // Shows all entries in a live-searchable table.
// // // Clicking a row instantly loads it into the edit form.
// // // Status dropdown lives ONLY here.
// // // =====================================================

// // var _allUpdateEntries = [];   // cache for instant filtering

// // // Called when the "Update Entry" tab becomes active
// // async function loadUpdateEntries() {
// //   const tbody = document.getElementById("updateEntriesTableBody");
// //   tbody.innerHTML = `<tr><td colspan="10" class="p-5 text-center text-gray-400 text-sm">
// //     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading…</td></tr>`;

// //   try {
// //     _allUpdateEntries = await apiFetch("/laptop-entries");
// //   } catch (e) {
// //     tbody.innerHTML = `<tr><td colspan="10" class="p-5 text-center text-red-500 text-sm">
// //       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
// //     return;
// //   }

// //   renderUpdateTable(_allUpdateEntries);
// // }

// // // Renders rows — each row is clickable to load into the edit form
// // function renderUpdateTable(entries) {
// //   const tbody = document.getElementById("updateEntriesTableBody");
// //   const countEl = document.getElementById("updateTableCount");
// //   if (countEl) countEl.textContent = `${entries.length} record${entries.length !== 1 ? "s" : ""}`;

// //   if (entries.length === 0) {
// //     tbody.innerHTML = `<tr><td colspan="10" class="p-5 text-center text-gray-500 text-sm">No entries found.</td></tr>`;
// //     return;
// //   }

// //   tbody.innerHTML = "";
// //   entries.forEach(function (entry, index) {
// //     const tr = document.createElement("tr");
// //     tr.className = [
// //       "cursor-pointer transition-colors duration-100 group",
// //       index % 2 === 0
// //         ? "bg-white dark:bg-gray-800"
// //         : "bg-red-50/40 dark:bg-gray-700/40",
// //       "hover:bg-red-100 dark:hover:bg-red-900/30"
// //     ].join(" ");

// //     let statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">—</span>`;
// //     if (entry.status === "IN") {
// //       statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">IN</span>`;
// //     } else if (entry.status === "Out") {
// //       statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Out</span>`;
// //     }

// //     tr.innerHTML = `
// //       <td class="p-3 text-sm font-semibold text-red-700 dark:text-red-300 group-hover:text-red-800 dark:group-hover:text-red-200 whitespace-nowrap">
// //         <i class="fa-solid fa-pen-to-square text-xs mr-1 opacity-0 group-hover:opacity-100 transition-opacity"></i>${entry.jhs_code}
// //       </td>
// //       <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.date || "—"}</td>
// //       <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.name || "—"}</td>
// //       <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.contact_no || "—"}</td>
// //       <td class="p-3">${statusBadge}</td>
// //       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.processor || "—"}</td>
// //       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.ram || "—"}</td>
// //       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.ssd || "—"}</td>
// //       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.mouse || "—"}</td>
// //       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.other || "—"}</td>
// //     `;

// //     // Click → load into form
// //     tr.addEventListener("click", function () {
// //       loadEntryIntoForm(entry);
// //       // Highlight selected row
// //       document.querySelectorAll("#updateEntriesTableBody tr").forEach(r => r.classList.remove("ring-2", "ring-red-500", "ring-inset"));
// //       tr.classList.add("ring-2", "ring-red-500", "ring-inset");
// //     });

// //     tbody.appendChild(tr);
// //   });
// // }

// // // Live filter — instant, no API call
// // function filterUpdateTable() {
// //   const q = (document.getElementById("updateSearchInput")?.value || "").toLowerCase().trim();
// //   if (!q) {
// //     renderUpdateTable(_allUpdateEntries);
// //     return;
// //   }
// //   const filtered = _allUpdateEntries.filter(e =>
// //     (e.jhs_code   || "").toLowerCase().includes(q) ||
// //     (e.name       || "").toLowerCase().includes(q) ||
// //     (e.contact_no || "").toLowerCase().includes(q) ||
// //     (e.status     || "").toLowerCase().includes(q) ||
// //     (e.date       || "").toLowerCase().includes(q) ||
// //     (e.processor  || "").toLowerCase().includes(q) ||
// //     (e.ram        || "").toLowerCase().includes(q) ||
// //     (e.ssd        || "").toLowerCase().includes(q)
// //   );
// //   renderUpdateTable(filtered);
// // }

// // // Load a selected entry object into the edit form
// // function loadEntryIntoForm(entry) {
// //   document.getElementById("updateJhsCode").value   = entry.jhs_code;
// //   document.getElementById("updateDate").value       = entry.date || "";
// //   document.getElementById("updateName").value       = entry.name || "";
// //   document.getElementById("updateContactNo").value  = entry.contact_no || "";
// //   document.getElementById("updateStatus").value     = entry.status || "";
// //   document.getElementById("updateProcessor").value  = entry.processor || "";
// //   document.getElementById("updateRam").value        = entry.ram || "";
// //   document.getElementById("updateSsd").value        = entry.ssd || "";
// //   document.getElementById("updateMouse").value      = entry.mouse || "";
// //   document.getElementById("updateOther").value      = entry.other || "";

// //   const label = document.getElementById("editingLabel");
// //   if (label) label.textContent = entry.jhs_code + (entry.name ? ` — ${entry.name}` : "");

// //   const container = document.getElementById("updateFormContainer");
// //   container.classList.remove("hidden");
// //   // Smooth scroll to form
// //   container.scrollIntoView({ behavior: "smooth", block: "nearest" });
// // }

// // // Cancel — hides form and clears highlight
// // function cancelUpdate() {
// //   document.getElementById("updateFormContainer").classList.add("hidden");
// //   document.querySelectorAll("#updateEntriesTableBody tr").forEach(r => r.classList.remove("ring-2", "ring-red-500", "ring-inset"));
// // }

// // async function saveUpdate() {
// //   const jhsCode = document.getElementById("updateJhsCode").value.trim();
// //   const payload = {
// //     date:       document.getElementById("updateDate").value,
// //     name:       document.getElementById("updateName").value,
// //     contact_no: document.getElementById("updateContactNo").value,
// //     status:     document.getElementById("updateStatus").value,
// //     processor:  document.getElementById("updateProcessor").value,
// //     ram:        document.getElementById("updateRam").value,
// //     ssd:        document.getElementById("updateSsd").value,
// //     mouse:      document.getElementById("updateMouse").value,
// //     other:      document.getElementById("updateOther").value
// //   };

// //   try {
// //     await apiFetch(`/laptop-entries/${jhsCode}`, {
// //       method: "PUT",
// //       body: JSON.stringify(payload)
// //     });

// //     if (payload.status === "Out") {
// //       toast("Entry updated. Status OUT — repair entry auto-created.", "info");
// //     } else if (payload.status === "IN") {
// //       toast("Entry updated. Status IN — pending repairs auto-closed.", "success");
// //     } else {
// //       toast(`Entry ${jhsCode} updated successfully!`, "success");
// //     }

// //     // Hide form, clear highlight
// //     cancelUpdate();

// //     // Refresh all related data
// //     await loadUpdateEntries();    // re-fetch so table reflects new status
// //     loadLaptopEntries();          // refresh History tab cache
// //     loadAnalysis();               // refresh Analysis counts

// //   } catch (e) {
// //     toast("Update failed: " + e.message, "error");
// //   }
// // }

// // // =====================================================
// // // Modal (Preview / Edit for addTable row)
// // // =====================================================
// // var currentModalRowIndex = -1;

// // function openModalForRow(rowIndex) {
// //   currentModalRowIndex = rowIndex;
// //   const rows = document.querySelectorAll("#addTable tbody tr");
// //   const row  = rows[rowIndex];
// //   if (!row) { document.getElementById("previewModal").classList.remove("hidden"); return; }

// //   // inputs: [JHS Code, Date, Name, Contact, Processor, RAM, SSD, Mouse, Other]
// //   const inputs = row.querySelectorAll("input");
// //   document.getElementById("modalSNo").textContent     = rowIndex + 1;
// //   document.getElementById("modalJhsCode").value       = inputs[0] ? inputs[0].value : "";
// //   document.getElementById("modalDate").value          = inputs[1] ? inputs[1].value : "";
// //   document.getElementById("modalName").value          = inputs[2] ? inputs[2].value : "";
// //   document.getElementById("modalContactNo").value     = inputs[3] ? inputs[3].value : "";
// //   document.getElementById("modalProcessor").value     = inputs[4] ? inputs[4].value : "";
// //   document.getElementById("modalRam").value           = inputs[5] ? inputs[5].value : "";
// //   document.getElementById("modalSsd").value           = inputs[6] ? inputs[6].value : "";
// //   document.getElementById("modalMouse").value         = inputs[7] ? inputs[7].value : "";
// //   document.getElementById("modalOther").value         = inputs[8] ? inputs[8].value : "";

// //   document.getElementById("previewModal").classList.remove("hidden");
// // }

// // function saveModalEntry() {
// //   const rows = document.querySelectorAll("#addTable tbody tr");
// //   const row  = rows[currentModalRowIndex];
// //   if (!row) { closeModal(); return; }

// //   const inputs = row.querySelectorAll("input");
// //   if (inputs[0]) inputs[0].value = document.getElementById("modalJhsCode").value;
// //   if (inputs[1]) inputs[1].value = document.getElementById("modalDate").value;
// //   if (inputs[2]) inputs[2].value = document.getElementById("modalName").value;
// //   if (inputs[3]) inputs[3].value = document.getElementById("modalContactNo").value;
// //   if (inputs[4]) inputs[4].value = document.getElementById("modalProcessor").value;
// //   if (inputs[5]) inputs[5].value = document.getElementById("modalRam").value;
// //   if (inputs[6]) inputs[6].value = document.getElementById("modalSsd").value;
// //   if (inputs[7]) inputs[7].value = document.getElementById("modalMouse").value;
// //   if (inputs[8]) inputs[8].value = document.getElementById("modalOther").value;

// //   toast("Row updated from modal.", "success");
// //   closeModal();
// // }

// // function closeModal() {
// //   document.getElementById("previewModal").classList.add("hidden");
// // }

// // // =====================================================
// // // Inventory Table Rows
// // // =====================================================
// // var inventoryRowCount = 1;

// // function addInventoryRow() {
// //   inventoryRowCount++;
// //   const tbody = document.querySelector("#inventoryAddTable tbody");
// //   const tr = document.createElement("tr");
// //   tr.className = "bg-red-50/50 dark:bg-gray-800/50";
// //   tr.innerHTML = `
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">${inventoryRowCount}</td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <button onclick="openInventoryModalForRow(${inventoryRowCount - 1})" class="text-blue-600 hover:text-blue-800">
// //         <i class="fa-solid fa-eye"></i>
// //       </button>
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Enter JHS Tag" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Enter Brand" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
// //     </td>
// //     <td class="p-4 border-t border-red-200 dark:border-gray-600">
// //       <button onclick="removeInventoryRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
// //     </td>
// //   `;
// //   tbody.appendChild(tr);
// // }

// // function removeInventoryRow(btn) {
// //   const row = btn.closest("tr");
// //   const tbody = row.parentElement;
// //   if (tbody.rows.length > 1) {
// //     row.remove();
// //     Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
// //     toast("Row removed.", "warn");
// //   } else {
// //     toast("At least one row is required.", "warn");
// //   }
// // }

// // // =====================================================
// // // Save All Inventory Entries → API
// // // =====================================================
// // async function saveAllInventoryEntries() {
// //   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
// //   let saved = 0, errors = 0;

// //   const btn = document.getElementById("saveAllInventoryBtn");
// //   btn.disabled = true;
// //   btn.textContent = "Saving...";

// //   for (const row of rows) {
// //     const inputs = row.querySelectorAll("input");
// //     const jhsTag = inputs[0] ? inputs[0].value.trim() : "";
// //     if (!jhsTag) continue;

// //     const payload = {
// //       jhs_tag:   jhsTag,
// //       brand:     inputs[1] ? inputs[1].value : "",
// //       processor: inputs[2] ? inputs[2].value : "",
// //       ram:       inputs[3] ? inputs[3].value : "",
// //       ssd:       inputs[4] ? inputs[4].value : ""
// //     };

// //     try {
// //       try {
// //         await apiFetch("/laptop-inventory", { method: "POST", body: JSON.stringify(payload) });
// //       } catch (e) {
// //         if (e.message.includes("already exists")) {
// //           toast(`JHS Tag '${jhsTag}' already exists in inventory, skipped.`, "warn");
// //         } else throw e;
// //       }
// //       saved++;
// //     } catch (e) {
// //       errors++;
// //       console.error("Failed inventory row:", jhsTag, e);
// //     }
// //   }

// //   btn.disabled = false;
// //   btn.textContent = "Save All Entries";

// //   if (errors === 0) {
// //     toast(`✓ ${saved} inventory ${saved === 1 ? "entry" : "entries"} saved!`, "success");
// //   } else {
// //     toast(`Saved ${saved}, failed ${errors}.`, "warn");
// //   }
// // }

// // // =====================================================
// // // Load Inventory Entries History
// // // =====================================================
// // async function loadInventoryEntries() {
// //   const tbody = document.getElementById("inventoryEntriesTableBody");
// //   tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400">
// //     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

// //   let entries;
// //   try {
// //     entries = await apiFetch("/laptop-inventory");
// //   } catch (e) {
// //     tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-red-500">
// //       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
// //     return;
// //   }

// //   if (entries.length === 0) {
// //     tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-500">No inventory entries found.</td></tr>`;
// //     return;
// //   }

// //   tbody.innerHTML = "";
// //   entries.forEach(function (entry, index) {
// //     const tr = document.createElement("tr");
// //     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";
// //     tr.innerHTML = `
// //       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.brand || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
// //       <td class="p-4">
// //         <button onclick="deleteInventoryEntry('${entry.jhs_tag}')"
// //           class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">Delete</button>
// //       </td>
// //     `;
// //     tbody.appendChild(tr);
// //   });
// // }

// // async function deleteInventoryEntry(jhsTag) {
// //   showConfirmDialog(
// //     "Delete Inventory",
// //     `Delete inventory entry for <strong>${jhsTag}</strong>?`,
// //     "fa-trash",
// //     async function () {
// //       try {
// //         await apiFetch(`/laptop-inventory/${jhsTag}`, { method: "DELETE" });
// //         toast(`Inventory ${jhsTag} deleted.`, "success");
// //         loadInventoryEntries();
// //       } catch (e) {
// //         toast(`Delete failed: ${e.message}`, "error");
// //       }
// //     }
// //   );
// // }

// // // =====================================================
// // // Inventory Modal
// // // =====================================================
// // var currentInventoryModalRowIndex = -1;

// // function openInventoryModalForRow(rowIndex) {
// //   currentInventoryModalRowIndex = rowIndex;
// //   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
// //   const row  = rows[rowIndex];
// //   if (!row) { document.getElementById("inventoryPreviewModal").classList.remove("hidden"); return; }

// //   const inputs = row.querySelectorAll("input");
// //   document.getElementById("inventoryModalSNo").textContent  = rowIndex + 1;
// //   document.getElementById("inventoryModalJhsTag").value     = inputs[0] ? inputs[0].value : "";
// //   document.getElementById("inventoryModalBrand").value      = inputs[1] ? inputs[1].value : "";
// //   document.getElementById("inventoryModalProcessor").value  = inputs[2] ? inputs[2].value : "";
// //   document.getElementById("inventoryModalRam").value        = inputs[3] ? inputs[3].value : "";
// //   document.getElementById("inventoryModalSsd").value        = inputs[4] ? inputs[4].value : "";

// //   document.getElementById("inventoryPreviewModal").classList.remove("hidden");
// // }

// // function saveInventoryModalEntry() {
// //   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
// //   const row  = rows[currentInventoryModalRowIndex];
// //   if (!row) { closeInventoryModal(); return; }

// //   const inputs = row.querySelectorAll("input");
// //   if (inputs[0]) inputs[0].value = document.getElementById("inventoryModalJhsTag").value;
// //   if (inputs[1]) inputs[1].value = document.getElementById("inventoryModalBrand").value;
// //   if (inputs[2]) inputs[2].value = document.getElementById("inventoryModalProcessor").value;
// //   if (inputs[3]) inputs[3].value = document.getElementById("inventoryModalRam").value;
// //   if (inputs[4]) inputs[4].value = document.getElementById("inventoryModalSsd").value;

// //   toast("Row updated from modal.", "success");
// //   closeInventoryModal();
// // }

// // function closeInventoryModal() {
// //   document.getElementById("inventoryPreviewModal").classList.add("hidden");
// // }

// // // =====================================================
// // // Repair — Search
// // // =====================================================
// // async function searchForRepair() {
// //   const jhsTag = document.getElementById("repairJhsTag").value.trim();
// //   if (!jhsTag) { toast("Please enter a JHS Tag to search.", "warn"); return; }

// //   try {
// //     const inventory = await apiFetch("/laptop-inventory");
// //     const invEntry  = inventory.find(e => e.jhs_tag === jhsTag);

// //     if (!invEntry) {
// //       const empEntries = await apiFetch("/laptop-entries");
// //       const empEntry   = empEntries.find(e => e.jhs_code === jhsTag);
// //       if (!empEntry) {
// //         toast("No inventory or employee entry found for JHS Tag: " + jhsTag, "warn");
// //         return;
// //       }
// //     }

// //     document.getElementById("repairJhsCode").value = jhsTag;
// //     document.getElementById("repairFormContainer").classList.remove("hidden");
// //   } catch (e) {
// //     toast("Search failed: " + e.message, "error");
// //   }
// // }

// // // =====================================================
// // // Save Repair Entry → API
// // // =====================================================
// // async function saveRepair() {
// //   const jhsTag = document.getElementById("repairJhsCode").value.trim();
// //   const issue  = document.getElementById("repairIssue").value.trim();
// //   const date   = document.getElementById("repairDate").value;
// //   const status = document.getElementById("repairStatus").value;
// //   const notes  = document.getElementById("repairNotes").value.trim();

// //   if (!jhsTag || !issue || !date || !status) {
// //     toast("Please fill in all required fields.", "warn");
// //     return;
// //   }

// //   let empName = "", empContact = "";
// //   try {
// //     const entries = await apiFetch("/laptop-entries");
// //     const emp = entries.find(e => e.jhs_code === jhsTag);
// //     if (emp) { empName = emp.name || ""; empContact = emp.contact_no || ""; }
// //   } catch (_) {}

// //   const payload = {
// //     jhs_tag: jhsTag,
// //     employee_name: empName,
// //     employee_contact: empContact,
// //     issue, date, status, notes
// //   };

// //   try {
// //     await apiFetch("/repair-entries", { method: "POST", body: JSON.stringify(payload) });

// //     if (status === "Repaired") {
// //       toast(`Repair entry saved. Employee entry for ${jhsTag} set back to IN.`, "success");
// //     } else {
// //       toast("Repair entry saved!", "success");
// //     }

// //     document.getElementById("repairFormContainer").classList.add("hidden");
// //     document.getElementById("repairJhsTag").value  = "";
// //     document.getElementById("repairIssue").value   = "";
// //     document.getElementById("repairDate").value    = "";
// //     document.getElementById("repairStatus").value  = "";
// //     document.getElementById("repairNotes").value   = "";
// //     loadRepairEntries();
// //   } catch (e) {
// //     toast("Failed to save repair: " + e.message, "error");
// //   }
// // }

// // // =====================================================
// // // Load Repair Entries → Repair History Table
// // // =====================================================
// // async function loadRepairEntries() {
// //   const tbody = document.getElementById("repairEntriesTableBody");
// //   tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">
// //     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

// //   let entries;
// //   try {
// //     entries = await apiFetch("/repair-entries");
// //   } catch (e) {
// //     tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-red-500">
// //       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
// //     return;
// //   }

// //   if (entries.length === 0) {
// //     tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-500">No repair entries found.</td></tr>`;
// //     return;
// //   }

// //   tbody.innerHTML = "";
// //   entries.forEach(function (entry, index) {
// //     const tr = document.createElement("tr");
// //     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

// //     const statusColors = {
// //       "In Repair":   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
// //       "Repaired":    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
// //       "Irreparable": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
// //     };
// //     const colorClass = statusColors[entry.status] || "bg-gray-100 text-gray-800";

// //     const actionBtns = entry.status === "In Repair"
// //       ? `<button onclick="markRepairStatus('${entry.id}', 'Repaired')"
// //            class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700 transition mb-1 block w-full">
// //            ✓ Repaired
// //          </button>
// //          <button onclick="markRepairStatus('${entry.id}', 'Irreparable')"
// //            class="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-700 transition mb-1 block w-full">
// //            ✗ Irreparable
// //          </button>`
// //       : "";

// //     tr.innerHTML = `
// //       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">
// //         <div class="font-medium">${entry.employee_name || "—"}</div>
// //         <div class="text-xs text-gray-500">${entry.employee_contact || ""}</div>
// //       </td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.issue || "—"}</td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
// //       <td class="p-4">
// //         <span class="px-2 py-1 rounded-full text-xs font-semibold ${colorClass}">${entry.status}</span>
// //       </td>
// //       <td class="p-4 text-gray-700 dark:text-gray-300 text-xs">${entry.notes || "—"}</td>
// //       <td class="p-4 min-w-[150px]">
// //         ${actionBtns}
// //         <button onclick="deleteRepairEntry('${entry.id}')"
// //           class="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700 transition block w-full mt-1">
// //           Delete
// //         </button>
// //       </td>
// //     `;
// //     tbody.appendChild(tr);
// //   });
// // }

// // // =====================================================
// // // Mark Repair Status from inline buttons
// // // =====================================================
// // async function markRepairStatus(repairId, newStatus) {
// //   const note = newStatus === "Repaired"
// //     ? `Marked Repaired on ${new Date().toLocaleDateString()}`
// //     : `Marked Irreparable on ${new Date().toLocaleDateString()}`;

// //   try {
// //     await apiFetch(`/repair-entries/${repairId}/status`, {
// //       method: "PATCH",
// //       body: JSON.stringify({ status: newStatus, notes: note })
// //     });

// //     if (newStatus === "Repaired") {
// //       toast(`Marked as Repaired. Employee entry set back to IN.`, "success");
// //     } else {
// //       toast(`Marked as Irreparable.`, "warn");
// //     }
// //     loadRepairEntries();
// //     loadAnalysis();
// //   } catch (e) {
// //     toast(`Failed: ${e.message}`, "error");
// //   }
// // }

// // // =====================================================
// // // Delete Repair Entry
// // // =====================================================
// // async function deleteRepairEntry(repairId) {
// //   showConfirmDialog(
// //     "Delete Repair Entry",
// //     "Are you sure you want to delete this repair entry?",
// //     "fa-trash",
// //     async function () {
// //       try {
// //         await apiFetch(`/repair-entries/${repairId}`, { method: "DELETE" });
// //         toast("Repair entry deleted.", "success");
// //         loadRepairEntries();
// //       } catch (e) {
// //         toast(`Delete failed: ${e.message}`, "error");
// //       }
// //     }
// //   );
// // }













// /* =====================================================
//    JHS IT Admin - script.js  v3.0
//    Full API integration — all data stored in MongoDB via FastAPI
//    ===================================================== */

// const API = "http://localhost:8000";

// // =====================================================
// // Utility: API fetch wrapper
// // =====================================================
// async function apiFetch(path, options = {}) {
//   try {
//     const res = await fetch(API + path, {
//       headers: { "Content-Type": "application/json", ...(options.headers || {}) },
//       ...options
//     });
//     if (!res.ok) {
//       const err = await res.json().catch(() => ({ detail: "Unknown error" }));
//       throw new Error(err.detail || "Request failed");
//     }
//     return await res.json();
//   } catch (e) {
//     console.error("API Error:", path, e);
//     throw e;
//   }
// }

// // =====================================================
// // Toast — centered on screen
// // =====================================================
// function toast(msg, type = "success") {
//   // Remove any existing toast
//   const existing = document.getElementById("__toast__");
//   if (existing) existing.remove();

//   const el = document.createElement("div");
//   el.id = "__toast__";
//   const colors = {
//     success: "bg-green-600",
//     error:   "bg-red-600",
//     info:    "bg-blue-600",
//     warn:    "bg-yellow-500"
//   };
//   const icons = {
//     success: "fa-circle-check",
//     error:   "fa-circle-xmark",
//     info:    "fa-circle-info",
//     warn:    "fa-triangle-exclamation"
//   };
//   el.className = `fixed z-[99999] px-8 py-4 rounded-2xl text-white text-base font-semibold shadow-2xl
//                   ${colors[type] || colors.success}
//                   flex items-center gap-3
//                   transition-all duration-300 ease-out
//                   left-1/2 -translate-x-1/2`;
//   el.style.cssText += `
//     top: 50%;
//     transform: translate(-50%, -50%) scale(0.8);
//     opacity: 0;
//     min-width: 280px;
//     max-width: 480px;
//     text-align: center;
//     justify-content: center;
//   `;
//   el.innerHTML = `<i class="fa-solid ${icons[type] || icons.success} text-xl"></i><span>${msg}</span>`;
//   document.body.appendChild(el);

//   // Animate in
//   requestAnimationFrame(() => {
//     el.style.transform = "translate(-50%, -50%) scale(1)";
//     el.style.opacity = "1";
//   });

//   // Animate out
//   setTimeout(() => {
//     el.style.transform = "translate(-50%, -50%) scale(0.8)";
//     el.style.opacity = "0";
//     setTimeout(() => el.remove(), 350);
//   }, 2800);
// }

// // =====================================================
// // User Initialization
// // =====================================================
// (function () {
//   const userEmail = localStorage.getItem("userEmail") || "";
//   const userRole  = localStorage.getItem("userRole")  || "";

//   function getFirstName(email) {
//     if (!email) return "User";
//     const namePart  = email.split("@")[0];
//     const firstName = namePart.split(".")[0];
//     return firstName.charAt(0).toUpperCase() + firstName.slice(1);
//   }

//   const firstName = getFirstName(userEmail);
//   const initial   = firstName.charAt(0).toUpperCase();

//   document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("welcomeUserName").textContent = firstName;
//     document.getElementById("displayUserName").textContent = firstName;
//     document.getElementById("displayUserRole").textContent =
//       userRole.charAt(0).toUpperCase() + userRole.slice(1);
//     document.getElementById("userInitial").textContent = initial;
//   });
// })();

// // =====================================================
// // Theme Toggle
// // =====================================================
// document.addEventListener("DOMContentLoaded", function () {
//   const themeToggle = document.getElementById("theme-toggle");
//   const icon = themeToggle.querySelector("i");

//   if (localStorage.getItem("theme") === "dark") {
//     document.documentElement.classList.add("dark");
//     icon.classList.replace("fa-moon", "fa-sun");
//   }

//   themeToggle.addEventListener("click", function () {
//     document.documentElement.classList.toggle("dark");
//     const isDark = document.documentElement.classList.contains("dark");
//     icon.classList.toggle("fa-moon", !isDark);
//     icon.classList.toggle("fa-sun",  isDark);
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//   });
// });

// // =====================================================
// // Sidebar Navigation
// // =====================================================
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".sidebar-btn").forEach(function (btn) {
//     btn.addEventListener("click", function () {
//       document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));
//       btn.classList.add("active");
//       document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
//       const target = document.getElementById(btn.getAttribute("data-section"));
//       if (target) target.classList.remove("hidden");
//     });
//   });
// });

// // =====================================================
// // Logout — centered confirm + toast
// // =====================================================
// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("logout").addEventListener("click", function () {
//     showConfirmDialog(
//       "Logout",
//       "Are you sure you want to logout?",
//       "fa-arrow-right-from-bracket",
//       function () {
//         toast("Logging out…", "info");
//         setTimeout(() => {
//           localStorage.removeItem("userEmail");
//           localStorage.removeItem("userRole");
//           localStorage.removeItem("isLoggedIn");
//           localStorage.removeItem("loginTime");
//           window.location.href = "login.html";
//         }, 1200);
//       }
//     );
//   });
// });

// // =====================================================
// // Centered Confirm Dialog (replaces browser confirm())
// // =====================================================
// function showConfirmDialog(title, message, iconClass, onConfirm) {
//   const overlay = document.createElement("div");
//   overlay.id = "__confirm_overlay__";
//   overlay.className = "fixed inset-0 bg-black/60 z-[99998] flex items-center justify-center";
//   overlay.style.backdropFilter = "blur(4px)";

//   overlay.innerHTML = `
//     <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center transform transition-all duration-200 scale-95 opacity-0" id="__confirm_box__">
//       <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
//         <i class="fa-solid ${iconClass || 'fa-question'} text-red-600 dark:text-red-400 text-2xl"></i>
//       </div>
//       <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${title}</h3>
//       <p class="text-gray-600 dark:text-gray-400 mb-6">${message}</p>
//       <div class="flex gap-3 justify-center">
//         <button id="__confirm_cancel__" class="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">Cancel</button>
//         <button id="__confirm_ok__" class="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">Confirm</button>
//       </div>
//     </div>
//   `;
//   document.body.appendChild(overlay);

//   requestAnimationFrame(() => {
//     const box = document.getElementById("__confirm_box__");
//     box.style.transform = "scale(1)";
//     box.style.opacity = "1";
//   });

//   function close() {
//     overlay.remove();
//   }

//   document.getElementById("__confirm_cancel__").addEventListener("click", close);
//   document.getElementById("__confirm_ok__").addEventListener("click", function () {
//     close();
//     onConfirm();
//   });
//   overlay.addEventListener("click", function (e) {
//     if (e.target === overlay) close();
//   });
// }

// // =====================================================
// // Laptop Section - Card Navigation
// // =====================================================
// function showEmployeeEntry() {
//   document.getElementById("laptopCardsSection").classList.add("hidden");
//   document.getElementById("employeeEntrySection").classList.remove("hidden");
//   document.getElementById("laptopInventorySection").classList.add("hidden");
//   activateEmployeeTab("addNew");
// }

// function showLaptopInventory() {
//   document.getElementById("laptopCardsSection").classList.add("hidden");
//   document.getElementById("employeeEntrySection").classList.add("hidden");
//   document.getElementById("laptopInventorySection").classList.remove("hidden");
//   activateInventoryTab("addInventory");
// }

// function backToLaptopCards() {
//   document.getElementById("laptopCardsSection").classList.remove("hidden");
//   document.getElementById("employeeEntrySection").classList.add("hidden");
//   document.getElementById("laptopInventorySection").classList.add("hidden");
// }

// // =====================================================
// // Employee Entry Tabs
// // =====================================================
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".employee-tab-btn").forEach(function (btn) {
//     btn.addEventListener("click", function () {
//       activateEmployeeTab(btn.getAttribute("data-employee-tab"));
//     });
//   });
// });

// function activateEmployeeTab(tabName) {
//   document.querySelectorAll(".employee-tab-btn").forEach(b => b.classList.remove("active"));
//   document.querySelectorAll(".employee-content").forEach(c => c.classList.add("hidden"));

//   const activeBtn = document.querySelector(`[data-employee-tab="${tabName}"]`);
//   if (activeBtn) activeBtn.classList.add("active");

//   const tabMap = {
//     addNew:   "addNewEntrySection",
//     update:   "updateEntrySection",
//     history:  "historySection",
//     analysis: "analysisSection"
//   };

//   const targetId = tabMap[tabName];
//   if (targetId) {
//     document.getElementById(targetId).classList.remove("hidden");
//     if (tabName === "update")   loadUpdateEntries();
//     if (tabName === "history")  loadLaptopEntries();
//     if (tabName === "analysis") loadAnalysis();
//   }
// }

// // =====================================================
// // Inventory Tabs
// // =====================================================
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".inventory-tab-btn").forEach(function (btn) {
//     btn.addEventListener("click", function () {
//       activateInventoryTab(btn.getAttribute("data-inventory-tab"));
//     });
//   });
// });

// function activateInventoryTab(tabName) {
//   document.querySelectorAll(".inventory-tab-btn").forEach(b => b.classList.remove("active"));
//   document.querySelectorAll(".inventory-content").forEach(c => c.classList.add("hidden"));

//   const activeBtn = document.querySelector(`[data-inventory-tab="${tabName}"]`);
//   if (activeBtn) activeBtn.classList.add("active");

//   const tabMap = {
//     addInventory:     "addInventorySection",
//     inventoryHistory: "inventoryHistorySection",
//     repairing:        "repairingSection"
//   };

//   const targetId = tabMap[tabName];
//   if (targetId) {
//     document.getElementById(targetId).classList.remove("hidden");
//     if (tabName === "inventoryHistory") loadInventoryEntries();
//     if (tabName === "repairing")        loadRepairEntries();
//   }
// }

// // =====================================================
// // Add New Entry Table Rows
// // =====================================================
// var rowCount = 1;

// function addNewRow() {
//   rowCount++;
//   const tbody = document.querySelector("#addTable tbody");
//   const tr = document.createElement("tr");
//   tr.className = "bg-red-50/50 dark:bg-gray-800/50";
//   tr.innerHTML = `
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">${rowCount}</td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <button onclick="openModalForRow(${rowCount - 1})" class="text-blue-600 hover:text-blue-800">
//         <i class="fa-solid fa-eye"></i>
//       </button>
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Enter JHS Code" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="date" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Enter Name" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="tel" placeholder="Enter Contact No" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Mouse" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Other" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <button onclick="removeRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
//     </td>
//   `;
//   tbody.appendChild(tr);
// }

// function removeRow(btn) {
//   const row = btn.closest("tr");
//   const tbody = row.parentElement;
//   if (tbody.rows.length > 1) {
//     row.remove();
//     Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
//     toast("Row removed.", "warn");
//   } else {
//     toast("At least one row is required.", "warn");
//   }
// }

// // =====================================================
// // Save All Employee Entries → API
// // NOTE: No status field — entries are saved without status
// //       Status is only set via Update Entry tab
// // =====================================================
// async function saveAllEntries() {
//   const rows = document.querySelectorAll("#addTable tbody tr");
//   let saved = 0, errors = 0;

//   const btn = document.getElementById("saveAllBtn");
//   btn.disabled = true;
//   btn.textContent = "Saving...";

//   for (const row of rows) {
//     const inputs  = row.querySelectorAll("input");
//     // columns: [JHS Code, Date, Name, Contact, Processor, RAM, SSD, Mouse, Other]
//     const jhsCode = inputs[0] ? inputs[0].value.trim() : "";
//     if (!jhsCode) continue;

//     const payload = {
//       jhs_code:   jhsCode,
//       date:       inputs[1] ? inputs[1].value : "",
//       name:       inputs[2] ? inputs[2].value : "",
//       contact_no: inputs[3] ? inputs[3].value : "",
//       status:     "",          // No status on initial add
//       processor:  inputs[4] ? inputs[4].value : "",
//       ram:        inputs[5] ? inputs[5].value : "",
//       ssd:        inputs[6] ? inputs[6].value : "",
//       mouse:      inputs[7] ? inputs[7].value : "",
//       other:      inputs[8] ? inputs[8].value : ""
//     };

//     try {
//       try {
//         await apiFetch("/laptop-entries", { method: "POST", body: JSON.stringify(payload) });
//       } catch (e) {
//         if (e.message.includes("already exists")) {
//           const { jhs_code, ...updatePayload } = payload;
//           await apiFetch(`/laptop-entries/${jhsCode}`, { method: "PUT", body: JSON.stringify(updatePayload) });
//         } else throw e;
//       }
//       saved++;
//     } catch (e) {
//       errors++;
//       console.error("Failed to save row:", jhsCode, e);
//     }
//   }

//   btn.disabled = false;
//   btn.textContent = "Save All Entries";

//   if (errors === 0) {
//     toast(`✓ ${saved} ${saved === 1 ? "entry" : "entries"} saved successfully!`, "success");
//   } else {
//     toast(`Saved ${saved}, failed ${errors}. Check console.`, "warn");
//   }
// }

// // =====================================================
// // Load Laptop Entries → History Table
// // Status shown as plain badge (read-only) — no dropdown
// // Searchable by JHS Code, Name, Contact
// // =====================================================
// var _allLaptopEntries = [];

// async function loadLaptopEntries() {
//   const tbody = document.getElementById("laptopEntriesTableBody");
//   tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-gray-400">
//     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

//   try {
//     _allLaptopEntries = await apiFetch("/laptop-entries");
//   } catch (e) {
//     tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-red-500">
//       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend. Make sure server is running.</td></tr>`;
//     return;
//   }

//   renderHistoryTable(_allLaptopEntries);
// }

// function renderHistoryTable(entries) {
//   const tbody = document.getElementById("laptopEntriesTableBody");

//   if (entries.length === 0) {
//     tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-gray-500">No entries found.</td></tr>`;
//     return;
//   }

//   tbody.innerHTML = "";
//   entries.forEach(function (entry, index) {
//     const tr = document.createElement("tr");
//     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

//     // Status badge — read only, no dropdown
//     let statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">—</span>`;
//     if (entry.status === "IN") {
//       statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">IN</span>`;
//     } else if (entry.status === "Out") {
//       statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Out</span>`;
//     }

//     tr.innerHTML = `
//       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_code}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.name || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.contact_no || "—"}</td>
//       <td class="p-4">${statusBadge}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.mouse || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.other || "—"}</td>
//       <td class="p-4">
//         <button onclick="deleteEntry('${entry.jhs_code}')"
//           class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">
//           Delete
//         </button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// // =====================================================
// // History Search
// // =====================================================
// function filterHistory() {
//   const q = (document.getElementById("historySearch")?.value || "").toLowerCase().trim();
//   if (!q) {
//     renderHistoryTable(_allLaptopEntries);
//     return;
//   }
//   const filtered = _allLaptopEntries.filter(e =>
//     (e.jhs_code   || "").toLowerCase().includes(q) ||
//     (e.name       || "").toLowerCase().includes(q) ||
//     (e.contact_no || "").toLowerCase().includes(q) ||
//     (e.status     || "").toLowerCase().includes(q) ||
//     (e.date       || "").toLowerCase().includes(q) ||
//     (e.processor  || "").toLowerCase().includes(q)
//   );
//   renderHistoryTable(filtered);
// }

// // =====================================================
// // Delete Entry
// // =====================================================
// async function deleteEntry(jhsCode) {
//   showConfirmDialog(
//     "Delete Entry",
//     `Delete entry for <strong>${jhsCode}</strong>? This cannot be undone.`,
//     "fa-trash",
//     async function () {
//       try {
//         await apiFetch(`/laptop-entries/${jhsCode}`, { method: "DELETE" });
//         toast(`Entry ${jhsCode} deleted.`, "success");
//         loadLaptopEntries();
//         loadAnalysis();
//       } catch (e) {
//         toast(`Delete failed: ${e.message}`, "error");
//       }
//     }
//   );
// }

// // =====================================================
// // Analysis
// // =====================================================
// async function loadAnalysis() {
//   try {
//     const entries  = await apiFetch("/laptop-entries");
//     const inCount  = entries.filter(e => e.status === "IN").length;
//     const outCount = entries.filter(e => e.status === "Out").length;
//     document.getElementById("totalEntries").textContent = entries.length;
//     document.getElementById("inCount").textContent      = inCount;
//     document.getElementById("outCount").textContent     = outCount;
//   } catch (e) {
//     document.getElementById("totalEntries").textContent = "—";
//     document.getElementById("inCount").textContent      = "—";
//     document.getElementById("outCount").textContent     = "—";
//   }
// }

// // =====================================================
// // Update Entry Tab
// // Shows all entries in a live-searchable table.
// // Clicking a row instantly loads it into the edit form.
// // Status dropdown lives ONLY here.
// // =====================================================

// var _allUpdateEntries = [];   // cache for instant filtering

// // Called when the "Update Entry" tab becomes active
// async function loadUpdateEntries() {
//   const tbody = document.getElementById("updateEntriesTableBody");
//   tbody.innerHTML = `<tr><td colspan="10" class="p-5 text-center text-gray-400 text-sm">
//     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading…</td></tr>`;

//   try {
//     _allUpdateEntries = await apiFetch("/laptop-entries");
//   } catch (e) {
//     tbody.innerHTML = `<tr><td colspan="10" class="p-5 text-center text-red-500 text-sm">
//       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
//     return;
//   }

//   renderUpdateTable(_allUpdateEntries);
// }

// // Renders rows — each row is clickable to load into the edit form
// function renderUpdateTable(entries) {
//   const tbody = document.getElementById("updateEntriesTableBody");
//   const countEl = document.getElementById("updateTableCount");
//   if (countEl) countEl.textContent = `${entries.length} record${entries.length !== 1 ? "s" : ""}`;

//   if (entries.length === 0) {
//     tbody.innerHTML = `<tr><td colspan="10" class="p-5 text-center text-gray-500 text-sm">No entries found.</td></tr>`;
//     return;
//   }

//   tbody.innerHTML = "";
//   entries.forEach(function (entry, index) {
//     const tr = document.createElement("tr");
//     tr.className = [
//       "cursor-pointer transition-colors duration-100 group",
//       index % 2 === 0
//         ? "bg-white dark:bg-gray-800"
//         : "bg-red-50/40 dark:bg-gray-700/40",
//       "hover:bg-red-100 dark:hover:bg-red-900/30"
//     ].join(" ");

//     let statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">—</span>`;
//     if (entry.status === "IN") {
//       statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">IN</span>`;
//     } else if (entry.status === "Out") {
//       statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Out</span>`;
//     }

//     tr.innerHTML = `
//       <td class="p-3 text-sm font-semibold text-red-700 dark:text-red-300 group-hover:text-red-800 dark:group-hover:text-red-200 whitespace-nowrap">
//         <i class="fa-solid fa-pen-to-square text-xs mr-1 opacity-0 group-hover:opacity-100 transition-opacity"></i>${entry.jhs_code}
//       </td>
//       <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.date || "—"}</td>
//       <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.name || "—"}</td>
//       <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.contact_no || "—"}</td>
//       <td class="p-3">${statusBadge}</td>
//       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.processor || "—"}</td>
//       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.ram || "—"}</td>
//       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.ssd || "—"}</td>
//       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.mouse || "—"}</td>
//       <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.other || "—"}</td>
//     `;

//     // Click → load into form
//     tr.addEventListener("click", function () {
//       loadEntryIntoForm(entry);
//       // Highlight selected row
//       document.querySelectorAll("#updateEntriesTableBody tr").forEach(r => r.classList.remove("ring-2", "ring-red-500", "ring-inset"));
//       tr.classList.add("ring-2", "ring-red-500", "ring-inset");
//     });

//     tbody.appendChild(tr);
//   });
// }

// // Live filter — instant, no API call
// function filterUpdateTable() {
//   const q = (document.getElementById("updateSearchInput")?.value || "").toLowerCase().trim();
//   if (!q) {
//     renderUpdateTable(_allUpdateEntries);
//     return;
//   }
//   const filtered = _allUpdateEntries.filter(e =>
//     (e.jhs_code   || "").toLowerCase().includes(q) ||
//     (e.name       || "").toLowerCase().includes(q) ||
//     (e.contact_no || "").toLowerCase().includes(q) ||
//     (e.status     || "").toLowerCase().includes(q) ||
//     (e.date       || "").toLowerCase().includes(q) ||
//     (e.processor  || "").toLowerCase().includes(q) ||
//     (e.ram        || "").toLowerCase().includes(q) ||
//     (e.ssd        || "").toLowerCase().includes(q)
//   );
//   renderUpdateTable(filtered);
// }

// // Load a selected entry object into the edit form
// function loadEntryIntoForm(entry) {
//   document.getElementById("updateJhsCode").value   = entry.jhs_code;
//   document.getElementById("updateDate").value       = entry.date || "";
//   document.getElementById("updateName").value       = entry.name || "";
//   document.getElementById("updateContactNo").value  = entry.contact_no || "";
//   document.getElementById("updateStatus").value     = entry.status || "";
//   document.getElementById("updateProcessor").value  = entry.processor || "";
//   document.getElementById("updateRam").value        = entry.ram || "";
//   document.getElementById("updateSsd").value        = entry.ssd || "";
//   document.getElementById("updateMouse").value      = entry.mouse || "";
//   document.getElementById("updateOther").value      = entry.other || "";

//   const label = document.getElementById("editingLabel");
//   if (label) label.textContent = entry.jhs_code + (entry.name ? ` — ${entry.name}` : "");

//   const container = document.getElementById("updateFormContainer");
//   container.classList.remove("hidden");
//   // Smooth scroll to form
//   container.scrollIntoView({ behavior: "smooth", block: "nearest" });
// }

// // Cancel — hides form and clears highlight
// function cancelUpdate() {
//   document.getElementById("updateFormContainer").classList.add("hidden");
//   document.querySelectorAll("#updateEntriesTableBody tr").forEach(r => r.classList.remove("ring-2", "ring-red-500", "ring-inset"));
// }

// async function saveUpdate() {
//   const jhsCode = document.getElementById("updateJhsCode").value.trim();
//   const payload = {
//     date:       document.getElementById("updateDate").value,
//     name:       document.getElementById("updateName").value,
//     contact_no: document.getElementById("updateContactNo").value,
//     status:     document.getElementById("updateStatus").value,
//     processor:  document.getElementById("updateProcessor").value,
//     ram:        document.getElementById("updateRam").value,
//     ssd:        document.getElementById("updateSsd").value,
//     mouse:      document.getElementById("updateMouse").value,
//     other:      document.getElementById("updateOther").value
//   };

//   try {
//     await apiFetch(`/laptop-entries/${jhsCode}`, {
//       method: "PUT",
//       body: JSON.stringify(payload)
//     });

//     if (payload.status === "Out") {
//       toast("Entry updated. Status OUT — repair entry auto-created.", "info");
//     } else if (payload.status === "IN") {
//       toast("Entry updated. Status IN — pending repairs auto-closed.", "success");
//     } else {
//       toast(`Entry ${jhsCode} updated successfully!`, "success");
//     }

//     // Hide form, clear highlight
//     cancelUpdate();

//     // Refresh all related data
//     await loadUpdateEntries();    // re-fetch so table reflects new status
//     loadLaptopEntries();          // refresh History tab cache
//     loadAnalysis();               // refresh Analysis counts

//   } catch (e) {
//     toast("Update failed: " + e.message, "error");
//   }
// }

// // =====================================================
// // Modal (Preview / Edit for addTable row)
// // Vertical form — no Status field
// // inputs order: [JHS Code, Date, Name, Contact, Processor, RAM, SSD, Mouse, Other]
// // =====================================================
// var currentModalRowIndex = -1;

// function openModalForRow(rowIndex) {
//   currentModalRowIndex = rowIndex;
//   const rows = document.querySelectorAll("#addTable tbody tr");
//   const row  = rows[rowIndex];

//   document.getElementById("modalSNo").textContent = rowIndex + 1;

//   if (row) {
//     const inputs = row.querySelectorAll("input");
//     document.getElementById("modalJhsCode").value   = inputs[0] ? inputs[0].value : "";
//     document.getElementById("modalDate").value       = inputs[1] ? inputs[1].value : "";
//     document.getElementById("modalName").value       = inputs[2] ? inputs[2].value : "";
//     document.getElementById("modalContactNo").value  = inputs[3] ? inputs[3].value : "";
//     document.getElementById("modalProcessor").value  = inputs[4] ? inputs[4].value : "";
//     document.getElementById("modalRam").value        = inputs[5] ? inputs[5].value : "";
//     document.getElementById("modalSsd").value        = inputs[6] ? inputs[6].value : "";
//     document.getElementById("modalMouse").value      = inputs[7] ? inputs[7].value : "";
//     document.getElementById("modalOther").value      = inputs[8] ? inputs[8].value : "";
//   }

//   document.getElementById("previewModal").classList.remove("hidden");
// }

// function saveModalEntry() {
//   const rows = document.querySelectorAll("#addTable tbody tr");
//   const row  = rows[currentModalRowIndex];
//   if (!row) { closeModal(); return; }

//   const inputs = row.querySelectorAll("input");
//   if (inputs[0]) inputs[0].value = document.getElementById("modalJhsCode").value;
//   if (inputs[1]) inputs[1].value = document.getElementById("modalDate").value;
//   if (inputs[2]) inputs[2].value = document.getElementById("modalName").value;
//   if (inputs[3]) inputs[3].value = document.getElementById("modalContactNo").value;
//   if (inputs[4]) inputs[4].value = document.getElementById("modalProcessor").value;
//   if (inputs[5]) inputs[5].value = document.getElementById("modalRam").value;
//   if (inputs[6]) inputs[6].value = document.getElementById("modalSsd").value;
//   if (inputs[7]) inputs[7].value = document.getElementById("modalMouse").value;
//   if (inputs[8]) inputs[8].value = document.getElementById("modalOther").value;

//   toast("Row updated.", "success");
//   closeModal();
// }

// function closeModal() {
//   document.getElementById("previewModal").classList.add("hidden");
// }

// // =====================================================
// // Inventory Table Rows
// // =====================================================
// var inventoryRowCount = 1;

// function addInventoryRow() {
//   inventoryRowCount++;
//   const tbody = document.querySelector("#inventoryAddTable tbody");
//   const tr = document.createElement("tr");
//   tr.className = "bg-red-50/50 dark:bg-gray-800/50";
//   tr.innerHTML = `
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">${inventoryRowCount}</td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <button onclick="openInventoryModalForRow(${inventoryRowCount - 1})" class="text-blue-600 hover:text-blue-800">
//         <i class="fa-solid fa-eye"></i>
//       </button>
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Enter JHS Tag" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Enter Brand" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
//     </td>
//     <td class="p-4 border-t border-red-200 dark:border-gray-600">
//       <button onclick="removeInventoryRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
//     </td>
//   `;
//   tbody.appendChild(tr);
// }

// function removeInventoryRow(btn) {
//   const row = btn.closest("tr");
//   const tbody = row.parentElement;
//   if (tbody.rows.length > 1) {
//     row.remove();
//     Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
//     toast("Row removed.", "warn");
//   } else {
//     toast("At least one row is required.", "warn");
//   }
// }

// // =====================================================
// // Save All Inventory Entries → API
// // =====================================================
// async function saveAllInventoryEntries() {
//   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
//   let saved = 0, errors = 0;

//   const btn = document.getElementById("saveAllInventoryBtn");
//   btn.disabled = true;
//   btn.textContent = "Saving...";

//   for (const row of rows) {
//     const inputs = row.querySelectorAll("input");
//     const jhsTag = inputs[0] ? inputs[0].value.trim() : "";
//     if (!jhsTag) continue;

//     const payload = {
//       jhs_tag:   jhsTag,
//       brand:     inputs[1] ? inputs[1].value : "",
//       processor: inputs[2] ? inputs[2].value : "",
//       ram:       inputs[3] ? inputs[3].value : "",
//       ssd:       inputs[4] ? inputs[4].value : ""
//     };

//     try {
//       try {
//         await apiFetch("/laptop-inventory", { method: "POST", body: JSON.stringify(payload) });
//       } catch (e) {
//         if (e.message.includes("already exists")) {
//           toast(`JHS Tag '${jhsTag}' already exists in inventory, skipped.`, "warn");
//         } else throw e;
//       }
//       saved++;
//     } catch (e) {
//       errors++;
//       console.error("Failed inventory row:", jhsTag, e);
//     }
//   }

//   btn.disabled = false;
//   btn.textContent = "Save All Entries";

//   if (errors === 0) {
//     toast(`✓ ${saved} inventory ${saved === 1 ? "entry" : "entries"} saved!`, "success");
//   } else {
//     toast(`Saved ${saved}, failed ${errors}.`, "warn");
//   }
// }

// // =====================================================
// // Load Inventory Entries History
// // =====================================================
// async function loadInventoryEntries() {
//   const tbody = document.getElementById("inventoryEntriesTableBody");
//   tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400">
//     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

//   let entries;
//   try {
//     entries = await apiFetch("/laptop-inventory");
//   } catch (e) {
//     tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-red-500">
//       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
//     return;
//   }

//   if (entries.length === 0) {
//     tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-500">No inventory entries found.</td></tr>`;
//     return;
//   }

//   tbody.innerHTML = "";
//   entries.forEach(function (entry, index) {
//     const tr = document.createElement("tr");
//     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";
//     tr.innerHTML = `
//       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.brand || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
//       <td class="p-4">
//         <button onclick="deleteInventoryEntry('${entry.jhs_tag}')"
//           class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">Delete</button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// async function deleteInventoryEntry(jhsTag) {
//   showConfirmDialog(
//     "Delete Inventory",
//     `Delete inventory entry for <strong>${jhsTag}</strong>?`,
//     "fa-trash",
//     async function () {
//       try {
//         await apiFetch(`/laptop-inventory/${jhsTag}`, { method: "DELETE" });
//         toast(`Inventory ${jhsTag} deleted.`, "success");
//         loadInventoryEntries();
//       } catch (e) {
//         toast(`Delete failed: ${e.message}`, "error");
//       }
//     }
//   );
// }

// // =====================================================
// // Inventory Modal
// // =====================================================
// var currentInventoryModalRowIndex = -1;

// function openInventoryModalForRow(rowIndex) {
//   currentInventoryModalRowIndex = rowIndex;
//   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
//   const row  = rows[rowIndex];
//   if (!row) { document.getElementById("inventoryPreviewModal").classList.remove("hidden"); return; }

//   const inputs = row.querySelectorAll("input");
//   document.getElementById("inventoryModalSNo").textContent  = rowIndex + 1;
//   document.getElementById("inventoryModalJhsTag").value     = inputs[0] ? inputs[0].value : "";
//   document.getElementById("inventoryModalBrand").value      = inputs[1] ? inputs[1].value : "";
//   document.getElementById("inventoryModalProcessor").value  = inputs[2] ? inputs[2].value : "";
//   document.getElementById("inventoryModalRam").value        = inputs[3] ? inputs[3].value : "";
//   document.getElementById("inventoryModalSsd").value        = inputs[4] ? inputs[4].value : "";

//   document.getElementById("inventoryPreviewModal").classList.remove("hidden");
// }

// function saveInventoryModalEntry() {
//   const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
//   const row  = rows[currentInventoryModalRowIndex];
//   if (!row) { closeInventoryModal(); return; }

//   const inputs = row.querySelectorAll("input");
//   if (inputs[0]) inputs[0].value = document.getElementById("inventoryModalJhsTag").value;
//   if (inputs[1]) inputs[1].value = document.getElementById("inventoryModalBrand").value;
//   if (inputs[2]) inputs[2].value = document.getElementById("inventoryModalProcessor").value;
//   if (inputs[3]) inputs[3].value = document.getElementById("inventoryModalRam").value;
//   if (inputs[4]) inputs[4].value = document.getElementById("inventoryModalSsd").value;

//   toast("Row updated from modal.", "success");
//   closeInventoryModal();
// }

// function closeInventoryModal() {
//   document.getElementById("inventoryPreviewModal").classList.add("hidden");
// }

// // =====================================================
// // Repair — Search
// // =====================================================
// async function searchForRepair() {
//   const jhsTag = document.getElementById("repairJhsTag").value.trim();
//   if (!jhsTag) { toast("Please enter a JHS Tag to search.", "warn"); return; }

//   try {
//     const inventory = await apiFetch("/laptop-inventory");
//     const invEntry  = inventory.find(e => e.jhs_tag === jhsTag);

//     if (!invEntry) {
//       const empEntries = await apiFetch("/laptop-entries");
//       const empEntry   = empEntries.find(e => e.jhs_code === jhsTag);
//       if (!empEntry) {
//         toast("No inventory or employee entry found for JHS Tag: " + jhsTag, "warn");
//         return;
//       }
//     }

//     document.getElementById("repairJhsCode").value = jhsTag;
//     document.getElementById("repairFormContainer").classList.remove("hidden");
//   } catch (e) {
//     toast("Search failed: " + e.message, "error");
//   }
// }

// // =====================================================
// // Save Repair Entry → API
// // =====================================================
// async function saveRepair() {
//   const jhsTag = document.getElementById("repairJhsCode").value.trim();
//   const issue  = document.getElementById("repairIssue").value.trim();
//   const date   = document.getElementById("repairDate").value;
//   const status = document.getElementById("repairStatus").value;
//   const notes  = document.getElementById("repairNotes").value.trim();

//   if (!jhsTag || !issue || !date || !status) {
//     toast("Please fill in all required fields.", "warn");
//     return;
//   }

//   let empName = "", empContact = "";
//   try {
//     const entries = await apiFetch("/laptop-entries");
//     const emp = entries.find(e => e.jhs_code === jhsTag);
//     if (emp) { empName = emp.name || ""; empContact = emp.contact_no || ""; }
//   } catch (_) {}

//   const payload = {
//     jhs_tag: jhsTag,
//     employee_name: empName,
//     employee_contact: empContact,
//     issue, date, status, notes
//   };

//   try {
//     await apiFetch("/repair-entries", { method: "POST", body: JSON.stringify(payload) });

//     if (status === "Repaired") {
//       toast(`Repair entry saved. Employee entry for ${jhsTag} set back to IN.`, "success");
//     } else {
//       toast("Repair entry saved!", "success");
//     }

//     document.getElementById("repairFormContainer").classList.add("hidden");
//     document.getElementById("repairJhsTag").value  = "";
//     document.getElementById("repairIssue").value   = "";
//     document.getElementById("repairDate").value    = "";
//     document.getElementById("repairStatus").value  = "";
//     document.getElementById("repairNotes").value   = "";
//     loadRepairEntries();
//   } catch (e) {
//     toast("Failed to save repair: " + e.message, "error");
//   }
// }

// // =====================================================
// // Load Repair Entries → Repair History Table
// // =====================================================
// async function loadRepairEntries() {
//   const tbody = document.getElementById("repairEntriesTableBody");
//   tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">
//     <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

//   let entries;
//   try {
//     entries = await apiFetch("/repair-entries");
//   } catch (e) {
//     tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-red-500">
//       <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
//     return;
//   }

//   if (entries.length === 0) {
//     tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-500">No repair entries found.</td></tr>`;
//     return;
//   }

//   tbody.innerHTML = "";
//   entries.forEach(function (entry, index) {
//     const tr = document.createElement("tr");
//     tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

//     const statusColors = {
//       "In Repair":   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
//       "Repaired":    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
//       "Irreparable": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
//     };
//     const colorClass = statusColors[entry.status] || "bg-gray-100 text-gray-800";

//     const actionBtns = entry.status === "In Repair"
//       ? `<button onclick="markRepairStatus('${entry.id}', 'Repaired')"
//            class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700 transition mb-1 block w-full">
//            ✓ Repaired
//          </button>
//          <button onclick="markRepairStatus('${entry.id}', 'Irreparable')"
//            class="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-700 transition mb-1 block w-full">
//            ✗ Irreparable
//          </button>`
//       : "";

//     tr.innerHTML = `
//       <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">
//         <div class="font-medium">${entry.employee_name || "—"}</div>
//         <div class="text-xs text-gray-500">${entry.employee_contact || ""}</div>
//       </td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.issue || "—"}</td>
//       <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
//       <td class="p-4">
//         <span class="px-2 py-1 rounded-full text-xs font-semibold ${colorClass}">${entry.status}</span>
//       </td>
//       <td class="p-4 text-gray-700 dark:text-gray-300 text-xs">${entry.notes || "—"}</td>
//       <td class="p-4 min-w-[150px]">
//         ${actionBtns}
//         <button onclick="deleteRepairEntry('${entry.id}')"
//           class="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700 transition block w-full mt-1">
//           Delete
//         </button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// // =====================================================
// // Mark Repair Status from inline buttons
// // =====================================================
// async function markRepairStatus(repairId, newStatus) {
//   const note = newStatus === "Repaired"
//     ? `Marked Repaired on ${new Date().toLocaleDateString()}`
//     : `Marked Irreparable on ${new Date().toLocaleDateString()}`;

//   try {
//     await apiFetch(`/repair-entries/${repairId}/status`, {
//       method: "PATCH",
//       body: JSON.stringify({ status: newStatus, notes: note })
//     });

//     if (newStatus === "Repaired") {
//       toast(`Marked as Repaired. Employee entry set back to IN.`, "success");
//     } else {
//       toast(`Marked as Irreparable.`, "warn");
//     }
//     loadRepairEntries();
//     loadAnalysis();
//   } catch (e) {
//     toast(`Failed: ${e.message}`, "error");
//   }
// }

// // =====================================================
// // Delete Repair Entry
// // =====================================================
// async function deleteRepairEntry(repairId) {
//   showConfirmDialog(
//     "Delete Repair Entry",
//     "Are you sure you want to delete this repair entry?",
//     "fa-trash",
//     async function () {
//       try {
//         await apiFetch(`/repair-entries/${repairId}`, { method: "DELETE" });
//         toast("Repair entry deleted.", "success");
//         loadRepairEntries();
//       } catch (e) {
//         toast(`Delete failed: ${e.message}`, "error");
//       }
//     }
//   );
// }



/* =====================================================
   JHS IT Admin - script.js  v3.1
   Full API integration — all data stored in MongoDB via FastAPI
   Added: "model" field to Employee Entry (Add, Update, History, Modal)
   ===================================================== */

const API = "http://localhost:8000";

// =====================================================
// Utility: API fetch wrapper
// =====================================================
async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(API + path, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Unknown error" }));
      throw new Error(err.detail || "Request failed");
    }
    return await res.json();
  } catch (e) {
    console.error("API Error:", path, e);
    throw e;
  }
}

// =====================================================
// Toast — centered on screen
// =====================================================
function toast(msg, type = "success") {
  const existing = document.getElementById("__toast__");
  if (existing) existing.remove();

  const el = document.createElement("div");
  el.id = "__toast__";
  const colors = {
    success: "bg-green-600",
    error:   "bg-red-600",
    info:    "bg-blue-600",
    warn:    "bg-yellow-500"
  };
  const icons = {
    success: "fa-circle-check",
    error:   "fa-circle-xmark",
    info:    "fa-circle-info",
    warn:    "fa-triangle-exclamation"
  };
  el.className = `fixed z-[99999] px-8 py-4 rounded-2xl text-white text-base font-semibold shadow-2xl
                  ${colors[type] || colors.success}
                  flex items-center gap-3
                  transition-all duration-300 ease-out
                  left-1/2 -translate-x-1/2`;
  el.style.cssText += `
    top: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
    min-width: 280px;
    max-width: 480px;
    text-align: center;
    justify-content: center;
  `;
  el.innerHTML = `<i class="fa-solid ${icons[type] || icons.success} text-xl"></i><span>${msg}</span>`;
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = "translate(-50%, -50%) scale(1)";
    el.style.opacity = "1";
  });

  setTimeout(() => {
    el.style.transform = "translate(-50%, -50%) scale(0.8)";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 350);
  }, 2800);
}

// =====================================================
// User Initialization
// =====================================================
(function () {
  const userEmail = localStorage.getItem("userEmail") || "";
  const userRole  = localStorage.getItem("userRole")  || "";

  function getFirstName(email) {
    if (!email) return "User";
    const namePart  = email.split("@")[0];
    const firstName = namePart.split(".")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  const firstName = getFirstName(userEmail);
  const initial   = firstName.charAt(0).toUpperCase();

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("welcomeUserName").textContent = firstName;
    document.getElementById("displayUserName").textContent = firstName;
    document.getElementById("displayUserRole").textContent =
      userRole.charAt(0).toUpperCase() + userRole.slice(1);
    document.getElementById("userInitial").textContent = initial;
  });
})();

// =====================================================
// Theme Toggle
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const icon = themeToggle.querySelector("i");

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun",  isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

// =====================================================
// Sidebar Navigation
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".sidebar-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
      const target = document.getElementById(btn.getAttribute("data-section"));
      if (target) target.classList.remove("hidden");
    });
  });
});

// =====================================================
// Logout
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logout").addEventListener("click", function () {
    showConfirmDialog(
      "Logout",
      "Are you sure you want to logout?",
      "fa-arrow-right-from-bracket",
      function () {
        toast("Logging out…", "info");
        setTimeout(() => {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userRole");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("loginTime");
          window.location.href = "/static/login.html";
        }, 1200);
      }
    );
  });
});

// =====================================================
// Centered Confirm Dialog
// =====================================================
function showConfirmDialog(title, message, iconClass, onConfirm) {
  const overlay = document.createElement("div");
  overlay.id = "__confirm_overlay__";
  overlay.className = "fixed inset-0 bg-black/60 z-[99998] flex items-center justify-center";
  overlay.style.backdropFilter = "blur(4px)";

  overlay.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center transform transition-all duration-200 scale-95 opacity-0" id="__confirm_box__">
      <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
        <i class="fa-solid ${iconClass || 'fa-question'} text-red-600 dark:text-red-400 text-2xl"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${title}</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">${message}</p>
      <div class="flex gap-3 justify-center">
        <button id="__confirm_cancel__" class="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">Cancel</button>
        <button id="__confirm_ok__" class="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">Confirm</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    const box = document.getElementById("__confirm_box__");
    box.style.transform = "scale(1)";
    box.style.opacity = "1";
  });

  function close() { overlay.remove(); }

  document.getElementById("__confirm_cancel__").addEventListener("click", close);
  document.getElementById("__confirm_ok__").addEventListener("click", function () {
    close();
    onConfirm();
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
}

// =====================================================
// Laptop Section - Card Navigation
// =====================================================
function showEmployeeEntry() {
  document.getElementById("laptopCardsSection").classList.add("hidden");
  document.getElementById("employeeEntrySection").classList.remove("hidden");
  document.getElementById("laptopInventorySection").classList.add("hidden");
  activateEmployeeTab("addNew");
}

function showLaptopInventory() {
  document.getElementById("laptopCardsSection").classList.add("hidden");
  document.getElementById("employeeEntrySection").classList.add("hidden");
  document.getElementById("laptopInventorySection").classList.remove("hidden");
  activateInventoryTab("addInventory");
}

function backToLaptopCards() {
  document.getElementById("laptopCardsSection").classList.remove("hidden");
  document.getElementById("employeeEntrySection").classList.add("hidden");
  document.getElementById("laptopInventorySection").classList.add("hidden");
}

// =====================================================
// Employee Entry Tabs
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".employee-tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activateEmployeeTab(btn.getAttribute("data-employee-tab"));
    });
  });
});

function activateEmployeeTab(tabName) {
  document.querySelectorAll(".employee-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".employee-content").forEach(c => c.classList.add("hidden"));

  const activeBtn = document.querySelector(`[data-employee-tab="${tabName}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  const tabMap = {
    addNew:   "addNewEntrySection",
    update:   "updateEntrySection",
    history:  "historySection",
    analysis: "analysisSection"
  };

  const targetId = tabMap[tabName];
  if (targetId) {
    document.getElementById(targetId).classList.remove("hidden");
    if (tabName === "update")   loadUpdateEntries();
    if (tabName === "history")  loadLaptopEntries();
    if (tabName === "analysis") loadAnalysis();
  }
}

// =====================================================
// Inventory Tabs
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".inventory-tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activateInventoryTab(btn.getAttribute("data-inventory-tab"));
    });
  });
});

function activateInventoryTab(tabName) {
  document.querySelectorAll(".inventory-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".inventory-content").forEach(c => c.classList.add("hidden"));

  const activeBtn = document.querySelector(`[data-inventory-tab="${tabName}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  const tabMap = {
    addInventory:     "addInventorySection",
    inventoryHistory: "inventoryHistorySection",
    repairing:        "repairingSection"
  };

  const targetId = tabMap[tabName];
  if (targetId) {
    document.getElementById(targetId).classList.remove("hidden");
    if (tabName === "inventoryHistory") loadInventoryEntries();
    if (tabName === "repairing")        loadRepairEntries();
  }
}

// =====================================================
// Add New Entry Table Rows
// Column order in addTable tbody inputs:
// [0]=JHSCode [1]=Date [2]=Name [3]=Contact
// [4]=Model   [5]=Processor [6]=RAM [7]=SSD [8]=Mouse [9]=Other
// =====================================================
var rowCount = 1;

function addNewRow() {
  rowCount++;
  const tbody = document.querySelector("#addTable tbody");
  const tr = document.createElement("tr");
  tr.className = "bg-red-50/50 dark:bg-gray-800/50";
  tr.innerHTML = `
    <td class="p-4 border-t border-red-200 dark:border-gray-600">${rowCount}</td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <button onclick="openModalForRow(${rowCount - 1})" class="text-blue-600 hover:text-blue-800">
        <i class="fa-solid fa-eye"></i>
      </button>
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Enter JHS Code" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="date" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Enter Name" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="tel" placeholder="Enter Contact No" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="e.g. Dell Latitude 5520" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Mouse" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Other" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <button onclick="removeRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
    </td>
  `;
  tbody.appendChild(tr);
}

function removeRow(btn) {
  const row = btn.closest("tr");
  const tbody = row.parentElement;
  if (tbody.rows.length > 1) {
    row.remove();
    Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
    toast("Row removed.", "warn");
  } else {
    toast("At least one row is required.", "warn");
  }
}

// =====================================================
// Save All Employee Entries → API
// Input index map (after S.No and View columns are skipped):
// inputs[0]=JHSCode  inputs[1]=Date    inputs[2]=Name
// inputs[3]=Contact  inputs[4]=Model   inputs[5]=Processor
// inputs[6]=RAM      inputs[7]=SSD     inputs[8]=Mouse  inputs[9]=Other
// =====================================================
async function saveAllEntries() {
  const rows = document.querySelectorAll("#addTable tbody tr");
  let saved = 0, errors = 0;

  const btn = document.getElementById("saveAllBtn");
  btn.disabled = true;
  btn.textContent = "Saving...";

  for (const row of rows) {
    const inputs  = row.querySelectorAll("input");
    const jhsCode = inputs[0] ? inputs[0].value.trim() : "";
    if (!jhsCode) continue;

    const payload = {
      jhs_code:   jhsCode,
      date:       inputs[1] ? inputs[1].value : "",
      name:       inputs[2] ? inputs[2].value : "",
      contact_no: inputs[3] ? inputs[3].value : "",
      status:     "",
      model:      inputs[4] ? inputs[4].value : "",
      processor:  inputs[5] ? inputs[5].value : "",
      ram:        inputs[6] ? inputs[6].value : "",
      ssd:        inputs[7] ? inputs[7].value : "",
      mouse:      inputs[8] ? inputs[8].value : "",
      other:      inputs[9] ? inputs[9].value : ""
    };

    try {
      try {
        await apiFetch("/laptop-entries", { method: "POST", body: JSON.stringify(payload) });
      } catch (e) {
        if (e.message.includes("already exists")) {
          const { jhs_code, ...updatePayload } = payload;
          await apiFetch(`/laptop-entries/${jhsCode}`, { method: "PUT", body: JSON.stringify(updatePayload) });
        } else throw e;
      }
      saved++;
    } catch (e) {
      errors++;
      console.error("Failed to save row:", jhsCode, e);
    }
  }

  btn.disabled = false;
  btn.textContent = "Save All Entries";

  if (errors === 0) {
    toast(`✓ ${saved} ${saved === 1 ? "entry" : "entries"} saved successfully!`, "success");
  } else {
    toast(`Saved ${saved}, failed ${errors}. Check console.`, "warn");
  }
}

// =====================================================
// Load Laptop Entries → History Table
// =====================================================
var _allLaptopEntries = [];

async function loadLaptopEntries() {
  const tbody = document.getElementById("laptopEntriesTableBody");
  tbody.innerHTML = `<tr><td colspan="12" class="p-6 text-center text-gray-400">
    <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

  try {
    _allLaptopEntries = await apiFetch("/laptop-entries");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="12" class="p-6 text-center text-red-500">
      <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend. Make sure server is running.</td></tr>`;
    return;
  }

  renderHistoryTable(_allLaptopEntries);
}

function renderHistoryTable(entries) {
  const tbody = document.getElementById("laptopEntriesTableBody");

  if (entries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="12" class="p-6 text-center text-gray-500">No entries found.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  entries.forEach(function (entry, index) {
    const tr = document.createElement("tr");
    tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

    let statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">—</span>`;
    if (entry.status === "IN") {
      statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">IN</span>`;
    } else if (entry.status === "Out") {
      statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Out</span>`;
    }

    tr.innerHTML = `
      <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_code}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.name || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.contact_no || "—"}</td>
      <td class="p-4">${statusBadge}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.model || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.mouse || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.other || "—"}</td>
      <td class="p-4">
        <button onclick="deleteEntry('${entry.jhs_code}')"
          class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">
          Delete
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// =====================================================
// History Search
// =====================================================
function filterHistory() {
  const q = (document.getElementById("historySearch")?.value || "").toLowerCase().trim();
  if (!q) { renderHistoryTable(_allLaptopEntries); return; }
  const filtered = _allLaptopEntries.filter(e =>
    (e.jhs_code   || "").toLowerCase().includes(q) ||
    (e.name       || "").toLowerCase().includes(q) ||
    (e.contact_no || "").toLowerCase().includes(q) ||
    (e.status     || "").toLowerCase().includes(q) ||
    (e.date       || "").toLowerCase().includes(q) ||
    (e.model      || "").toLowerCase().includes(q) ||
    (e.processor  || "").toLowerCase().includes(q)
  );
  renderHistoryTable(filtered);
}

// =====================================================
// Delete Entry
// =====================================================
async function deleteEntry(jhsCode) {
  showConfirmDialog(
    "Delete Entry",
    `Delete entry for <strong>${jhsCode}</strong>? This cannot be undone.`,
    "fa-trash",
    async function () {
      try {
        await apiFetch(`/laptop-entries/${jhsCode}`, { method: "DELETE" });
        toast(`Entry ${jhsCode} deleted.`, "success");
        loadLaptopEntries();
        loadAnalysis();
      } catch (e) {
        toast(`Delete failed: ${e.message}`, "error");
      }
    }
  );
}

// =====================================================
// Analysis
// =====================================================
async function loadAnalysis() {
  try {
    const entries  = await apiFetch("/laptop-entries");
    const inCount  = entries.filter(e => e.status === "IN").length;
    const outCount = entries.filter(e => e.status === "Out").length;
    document.getElementById("totalEntries").textContent = entries.length;
    document.getElementById("inCount").textContent      = inCount;
    document.getElementById("outCount").textContent     = outCount;
  } catch (e) {
    document.getElementById("totalEntries").textContent = "—";
    document.getElementById("inCount").textContent      = "—";
    document.getElementById("outCount").textContent     = "—";
  }
}

// =====================================================
// Update Entry Tab
// Live-searchable table; click row → loads edit form.
// Status + Model both editable here.
// =====================================================
var _allUpdateEntries = [];

async function loadUpdateEntries() {
  const tbody = document.getElementById("updateEntriesTableBody");
  tbody.innerHTML = `<tr><td colspan="11" class="p-5 text-center text-gray-400 text-sm">
    <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading…</td></tr>`;

  try {
    _allUpdateEntries = await apiFetch("/laptop-entries");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="11" class="p-5 text-center text-red-500 text-sm">
      <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
    return;
  }

  renderUpdateTable(_allUpdateEntries);
}

function renderUpdateTable(entries) {
  const tbody = document.getElementById("updateEntriesTableBody");
  const countEl = document.getElementById("updateTableCount");
  if (countEl) countEl.textContent = `${entries.length} record${entries.length !== 1 ? "s" : ""}`;

  if (entries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" class="p-5 text-center text-gray-500 text-sm">No entries found.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  entries.forEach(function (entry, index) {
    const tr = document.createElement("tr");
    tr.className = [
      "cursor-pointer transition-colors duration-100 group",
      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/40 dark:bg-gray-700/40",
      "hover:bg-red-100 dark:hover:bg-red-900/30"
    ].join(" ");

    let statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">—</span>`;
    if (entry.status === "IN") {
      statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">IN</span>`;
    } else if (entry.status === "Out") {
      statusBadge = `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Out</span>`;
    }

    tr.innerHTML = `
      <td class="p-3 text-sm font-semibold text-red-700 dark:text-red-300 group-hover:text-red-800 whitespace-nowrap">
        <i class="fa-solid fa-pen-to-square text-xs mr-1 opacity-0 group-hover:opacity-100 transition-opacity"></i>${entry.jhs_code}
      </td>
      <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.date || "—"}</td>
      <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.name || "—"}</td>
      <td class="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">${entry.contact_no || "—"}</td>
      <td class="p-3">${statusBadge}</td>
      <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.model || "—"}</td>
      <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.processor || "—"}</td>
      <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.ram || "—"}</td>
      <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.ssd || "—"}</td>
      <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.mouse || "—"}</td>
      <td class="p-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">${entry.other || "—"}</td>
    `;

    tr.addEventListener("click", function () {
      loadEntryIntoForm(entry);
      document.querySelectorAll("#updateEntriesTableBody tr").forEach(r => r.classList.remove("ring-2", "ring-red-500", "ring-inset"));
      tr.classList.add("ring-2", "ring-red-500", "ring-inset");
    });

    tbody.appendChild(tr);
  });
}

function filterUpdateTable() {
  const q = (document.getElementById("updateSearchInput")?.value || "").toLowerCase().trim();
  if (!q) { renderUpdateTable(_allUpdateEntries); return; }
  const filtered = _allUpdateEntries.filter(e =>
    (e.jhs_code   || "").toLowerCase().includes(q) ||
    (e.name       || "").toLowerCase().includes(q) ||
    (e.contact_no || "").toLowerCase().includes(q) ||
    (e.status     || "").toLowerCase().includes(q) ||
    (e.date       || "").toLowerCase().includes(q) ||
    (e.model      || "").toLowerCase().includes(q) ||
    (e.processor  || "").toLowerCase().includes(q) ||
    (e.ram        || "").toLowerCase().includes(q) ||
    (e.ssd        || "").toLowerCase().includes(q)
  );
  renderUpdateTable(filtered);
}

function loadEntryIntoForm(entry) {
  document.getElementById("updateJhsCode").value   = entry.jhs_code;
  document.getElementById("updateDate").value       = entry.date || "";
  document.getElementById("updateName").value       = entry.name || "";
  document.getElementById("updateContactNo").value  = entry.contact_no || "";
  document.getElementById("updateStatus").value     = entry.status || "";
  document.getElementById("updateModel").value      = entry.model || "";
  document.getElementById("updateProcessor").value  = entry.processor || "";
  document.getElementById("updateRam").value        = entry.ram || "";
  document.getElementById("updateSsd").value        = entry.ssd || "";
  document.getElementById("updateMouse").value      = entry.mouse || "";
  document.getElementById("updateOther").value      = entry.other || "";

  const label = document.getElementById("editingLabel");
  if (label) label.textContent = entry.jhs_code + (entry.name ? ` — ${entry.name}` : "");

  const container = document.getElementById("updateFormContainer");
  container.classList.remove("hidden");
  container.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function cancelUpdate() {
  document.getElementById("updateFormContainer").classList.add("hidden");
  document.querySelectorAll("#updateEntriesTableBody tr").forEach(r => r.classList.remove("ring-2", "ring-red-500", "ring-inset"));
}

async function saveUpdate() {
  const jhsCode = document.getElementById("updateJhsCode").value.trim();
  const payload = {
    date:       document.getElementById("updateDate").value,
    name:       document.getElementById("updateName").value,
    contact_no: document.getElementById("updateContactNo").value,
    status:     document.getElementById("updateStatus").value,
    model:      document.getElementById("updateModel").value,
    processor:  document.getElementById("updateProcessor").value,
    ram:        document.getElementById("updateRam").value,
    ssd:        document.getElementById("updateSsd").value,
    mouse:      document.getElementById("updateMouse").value,
    other:      document.getElementById("updateOther").value
  };

  try {
    await apiFetch(`/laptop-entries/${jhsCode}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });

    if (payload.status === "Out") {
      toast("Entry updated. Status OUT — repair entry auto-created.", "info");
    } else if (payload.status === "IN") {
      toast("Entry updated. Status IN — pending repairs auto-closed.", "success");
    } else {
      toast(`Entry ${jhsCode} updated successfully!`, "success");
    }

    cancelUpdate();
    await loadUpdateEntries();
    loadLaptopEntries();
    loadAnalysis();

  } catch (e) {
    toast("Update failed: " + e.message, "error");
  }
}

// =====================================================
// Modal — Employee Entry (Add New)
// Input index map inside each addTable row:
// [0]=JHSCode [1]=Date [2]=Name [3]=Contact
// [4]=Model   [5]=Processor [6]=RAM [7]=SSD [8]=Mouse [9]=Other
// =====================================================
var currentModalRowIndex = -1;

function openModalForRow(rowIndex) {
  currentModalRowIndex = rowIndex;
  const rows = document.querySelectorAll("#addTable tbody tr");
  const row  = rows[rowIndex];

  document.getElementById("modalSNo").textContent = rowIndex + 1;

  if (row) {
    const inputs = row.querySelectorAll("input");
    document.getElementById("modalJhsCode").value   = inputs[0] ? inputs[0].value : "";
    document.getElementById("modalDate").value       = inputs[1] ? inputs[1].value : "";
    document.getElementById("modalName").value       = inputs[2] ? inputs[2].value : "";
    document.getElementById("modalContactNo").value  = inputs[3] ? inputs[3].value : "";
    document.getElementById("modalModel").value      = inputs[4] ? inputs[4].value : "";
    document.getElementById("modalProcessor").value  = inputs[5] ? inputs[5].value : "";
    document.getElementById("modalRam").value        = inputs[6] ? inputs[6].value : "";
    document.getElementById("modalSsd").value        = inputs[7] ? inputs[7].value : "";
    document.getElementById("modalMouse").value      = inputs[8] ? inputs[8].value : "";
    document.getElementById("modalOther").value      = inputs[9] ? inputs[9].value : "";
  }

  document.getElementById("previewModal").classList.remove("hidden");
}

function saveModalEntry() {
  const rows = document.querySelectorAll("#addTable tbody tr");
  const row  = rows[currentModalRowIndex];
  if (!row) { closeModal(); return; }

  const inputs = row.querySelectorAll("input");
  if (inputs[0]) inputs[0].value = document.getElementById("modalJhsCode").value;
  if (inputs[1]) inputs[1].value = document.getElementById("modalDate").value;
  if (inputs[2]) inputs[2].value = document.getElementById("modalName").value;
  if (inputs[3]) inputs[3].value = document.getElementById("modalContactNo").value;
  if (inputs[4]) inputs[4].value = document.getElementById("modalModel").value;
  if (inputs[5]) inputs[5].value = document.getElementById("modalProcessor").value;
  if (inputs[6]) inputs[6].value = document.getElementById("modalRam").value;
  if (inputs[7]) inputs[7].value = document.getElementById("modalSsd").value;
  if (inputs[8]) inputs[8].value = document.getElementById("modalMouse").value;
  if (inputs[9]) inputs[9].value = document.getElementById("modalOther").value;

  toast("Row updated.", "success");
  closeModal();
}

function closeModal() {
  document.getElementById("previewModal").classList.add("hidden");
}

// =====================================================
// Inventory Table Rows
// =====================================================
var inventoryRowCount = 1;

function addInventoryRow() {
  inventoryRowCount++;
  const tbody = document.querySelector("#inventoryAddTable tbody");
  const tr = document.createElement("tr");
  tr.className = "bg-red-50/50 dark:bg-gray-800/50";
  tr.innerHTML = `
    <td class="p-4 border-t border-red-200 dark:border-gray-600">${inventoryRowCount}</td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <button onclick="openInventoryModalForRow(${inventoryRowCount - 1})" class="text-blue-600 hover:text-blue-800">
        <i class="fa-solid fa-eye"></i>
      </button>
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Enter JHS Tag" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Enter Brand" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="Processor" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="RAM" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <input type="text" placeholder="SSD" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-gray-200">
    </td>
    <td class="p-4 border-t border-red-200 dark:border-gray-600">
      <button onclick="removeInventoryRow(this)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">Remove</button>
    </td>
  `;
  tbody.appendChild(tr);
}

function removeInventoryRow(btn) {
  const row = btn.closest("tr");
  const tbody = row.parentElement;
  if (tbody.rows.length > 1) {
    row.remove();
    Array.from(tbody.rows).forEach((r, i) => { r.cells[0].textContent = i + 1; });
    toast("Row removed.", "warn");
  } else {
    toast("At least one row is required.", "warn");
  }
}

// =====================================================
// Save All Inventory Entries → API
// =====================================================
async function saveAllInventoryEntries() {
  const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
  let saved = 0, errors = 0;

  const btn = document.getElementById("saveAllInventoryBtn");
  btn.disabled = true;
  btn.textContent = "Saving...";

  for (const row of rows) {
    const inputs = row.querySelectorAll("input");
    const jhsTag = inputs[0] ? inputs[0].value.trim() : "";
    if (!jhsTag) continue;

    const payload = {
      jhs_tag:   jhsTag,
      brand:     inputs[1] ? inputs[1].value : "",
      processor: inputs[2] ? inputs[2].value : "",
      ram:       inputs[3] ? inputs[3].value : "",
      ssd:       inputs[4] ? inputs[4].value : ""
    };

    try {
      try {
        await apiFetch("/laptop-inventory", { method: "POST", body: JSON.stringify(payload) });
      } catch (e) {
        if (e.message.includes("already exists")) {
          toast(`JHS Tag '${jhsTag}' already exists in inventory, skipped.`, "warn");
        } else throw e;
      }
      saved++;
    } catch (e) {
      errors++;
      console.error("Failed inventory row:", jhsTag, e);
    }
  }

  btn.disabled = false;
  btn.textContent = "Save All Entries";

  if (errors === 0) {
    toast(`✓ ${saved} inventory ${saved === 1 ? "entry" : "entries"} saved!`, "success");
  } else {
    toast(`Saved ${saved}, failed ${errors}.`, "warn");
  }
}

// =====================================================
// Load Inventory Entries History
// =====================================================
async function loadInventoryEntries() {
  const tbody = document.getElementById("inventoryEntriesTableBody");
  tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400">
    <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

  let entries;
  try {
    entries = await apiFetch("/laptop-inventory");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-red-500">
      <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
    return;
  }

  if (entries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-500">No inventory entries found.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  entries.forEach(function (entry, index) {
    const tr = document.createElement("tr");
    tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";
    tr.innerHTML = `
      <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.brand || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.processor || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ram || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.ssd || "—"}</td>
      <td class="p-4">
        <button onclick="deleteInventoryEntry('${entry.jhs_tag}')"
          class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteInventoryEntry(jhsTag) {
  showConfirmDialog(
    "Delete Inventory",
    `Delete inventory entry for <strong>${jhsTag}</strong>?`,
    "fa-trash",
    async function () {
      try {
        await apiFetch(`/laptop-inventory/${jhsTag}`, { method: "DELETE" });
        toast(`Inventory ${jhsTag} deleted.`, "success");
        loadInventoryEntries();
      } catch (e) {
        toast(`Delete failed: ${e.message}`, "error");
      }
    }
  );
}

// =====================================================
// Inventory Modal
// =====================================================
var currentInventoryModalRowIndex = -1;

function openInventoryModalForRow(rowIndex) {
  currentInventoryModalRowIndex = rowIndex;
  const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
  const row  = rows[rowIndex];
  if (!row) { document.getElementById("inventoryPreviewModal").classList.remove("hidden"); return; }

  const inputs = row.querySelectorAll("input");
  document.getElementById("inventoryModalSNo").textContent  = rowIndex + 1;
  document.getElementById("inventoryModalJhsTag").value     = inputs[0] ? inputs[0].value : "";
  document.getElementById("inventoryModalBrand").value      = inputs[1] ? inputs[1].value : "";
  document.getElementById("inventoryModalProcessor").value  = inputs[2] ? inputs[2].value : "";
  document.getElementById("inventoryModalRam").value        = inputs[3] ? inputs[3].value : "";
  document.getElementById("inventoryModalSsd").value        = inputs[4] ? inputs[4].value : "";

  document.getElementById("inventoryPreviewModal").classList.remove("hidden");
}

function saveInventoryModalEntry() {
  const rows = document.querySelectorAll("#inventoryAddTable tbody tr");
  const row  = rows[currentInventoryModalRowIndex];
  if (!row) { closeInventoryModal(); return; }

  const inputs = row.querySelectorAll("input");
  if (inputs[0]) inputs[0].value = document.getElementById("inventoryModalJhsTag").value;
  if (inputs[1]) inputs[1].value = document.getElementById("inventoryModalBrand").value;
  if (inputs[2]) inputs[2].value = document.getElementById("inventoryModalProcessor").value;
  if (inputs[3]) inputs[3].value = document.getElementById("inventoryModalRam").value;
  if (inputs[4]) inputs[4].value = document.getElementById("inventoryModalSsd").value;

  toast("Row updated from modal.", "success");
  closeInventoryModal();
}

function closeInventoryModal() {
  document.getElementById("inventoryPreviewModal").classList.add("hidden");
}

// =====================================================
// Repair — Search
// =====================================================
async function searchForRepair() {
  const jhsTag = document.getElementById("repairJhsTag").value.trim();
  if (!jhsTag) { toast("Please enter a JHS Tag to search.", "warn"); return; }

  try {
    const inventory = await apiFetch("/laptop-inventory");
    const invEntry  = inventory.find(e => e.jhs_tag === jhsTag);

    if (!invEntry) {
      const empEntries = await apiFetch("/laptop-entries");
      const empEntry   = empEntries.find(e => e.jhs_code === jhsTag);
      if (!empEntry) {
        toast("No inventory or employee entry found for JHS Tag: " + jhsTag, "warn");
        return;
      }
    }

    document.getElementById("repairJhsCode").value = jhsTag;
    document.getElementById("repairFormContainer").classList.remove("hidden");
  } catch (e) {
    toast("Search failed: " + e.message, "error");
  }
}

// =====================================================
// Save Repair Entry → API
// =====================================================
async function saveRepair() {
  const jhsTag = document.getElementById("repairJhsCode").value.trim();
  const issue  = document.getElementById("repairIssue").value.trim();
  const date   = document.getElementById("repairDate").value;
  const status = document.getElementById("repairStatus").value;
  const notes  = document.getElementById("repairNotes").value.trim();

  if (!jhsTag || !issue || !date || !status) {
    toast("Please fill in all required fields.", "warn");
    return;
  }

  let empName = "", empContact = "";
  try {
    const entries = await apiFetch("/laptop-entries");
    const emp = entries.find(e => e.jhs_code === jhsTag);
    if (emp) { empName = emp.name || ""; empContact = emp.contact_no || ""; }
  } catch (_) {}

  const payload = {
    jhs_tag: jhsTag,
    employee_name: empName,
    employee_contact: empContact,
    issue, date, status, notes
  };

  try {
    await apiFetch("/repair-entries", { method: "POST", body: JSON.stringify(payload) });

    if (status === "Repaired") {
      toast(`Repair entry saved. Employee entry for ${jhsTag} set back to IN.`, "success");
    } else {
      toast("Repair entry saved!", "success");
    }

    document.getElementById("repairFormContainer").classList.add("hidden");
    document.getElementById("repairJhsTag").value  = "";
    document.getElementById("repairIssue").value   = "";
    document.getElementById("repairDate").value    = "";
    document.getElementById("repairStatus").value  = "";
    document.getElementById("repairNotes").value   = "";
    loadRepairEntries();
  } catch (e) {
    toast("Failed to save repair: " + e.message, "error");
  }
}

// =====================================================
// Load Repair Entries → Repair History Table
// =====================================================
async function loadRepairEntries() {
  const tbody = document.getElementById("repairEntriesTableBody");
  tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">
    <i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading...</td></tr>`;

  let entries;
  try {
    entries = await apiFetch("/repair-entries");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-red-500">
      <i class="fa-solid fa-triangle-exclamation mr-2"></i>Cannot connect to backend.</td></tr>`;
    return;
  }

  if (entries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-500">No repair entries found.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  entries.forEach(function (entry, index) {
    const tr = document.createElement("tr");
    tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-red-50/30 dark:bg-gray-700/30";

    const statusColors = {
      "In Repair":   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      "Repaired":    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      "Irreparable": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
    };
    const colorClass = statusColors[entry.status] || "bg-gray-100 text-gray-800";

    const actionBtns = entry.status === "In Repair"
      ? `<button onclick="markRepairStatus('${entry.id}', 'Repaired')"
           class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700 transition mb-1 block w-full">
           ✓ Repaired
         </button>
         <button onclick="markRepairStatus('${entry.id}', 'Irreparable')"
           class="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-700 transition mb-1 block w-full">
           ✗ Irreparable
         </button>`
      : "";

    tr.innerHTML = `
      <td class="p-4 text-gray-700 dark:text-gray-300 font-medium">${entry.jhs_tag}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">
        <div class="font-medium">${entry.employee_name || "—"}</div>
        <div class="text-xs text-gray-500">${entry.employee_contact || ""}</div>
      </td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.issue || "—"}</td>
      <td class="p-4 text-gray-700 dark:text-gray-300">${entry.date || "—"}</td>
      <td class="p-4">
        <span class="px-2 py-1 rounded-full text-xs font-semibold ${colorClass}">${entry.status}</span>
      </td>
      <td class="p-4 text-gray-700 dark:text-gray-300 text-xs">${entry.notes || "—"}</td>
      <td class="p-4 min-w-[150px]">
        ${actionBtns}
        <button onclick="deleteRepairEntry('${entry.id}')"
          class="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700 transition block w-full mt-1">
          Delete
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// =====================================================
// Mark Repair Status
// =====================================================
async function markRepairStatus(repairId, newStatus) {
  const note = newStatus === "Repaired"
    ? `Marked Repaired on ${new Date().toLocaleDateString()}`
    : `Marked Irreparable on ${new Date().toLocaleDateString()}`;

  try {
    await apiFetch(`/repair-entries/${repairId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus, notes: note })
    });

    if (newStatus === "Repaired") {
      toast(`Marked as Repaired. Employee entry set back to IN.`, "success");
    } else {
      toast(`Marked as Irreparable.`, "warn");
    }
    loadRepairEntries();
    loadAnalysis();
  } catch (e) {
    toast(`Failed: ${e.message}`, "error");
  }
}

// =====================================================
// Delete Repair Entry
// =====================================================
async function deleteRepairEntry(repairId) {
  showConfirmDialog(
    "Delete Repair Entry",
    "Are you sure you want to delete this repair entry?",
    "fa-trash",
    async function () {
      try {
        await apiFetch(`/repair-entries/${repairId}`, { method: "DELETE" });
        toast("Repair entry deleted.", "success");
        loadRepairEntries();
      } catch (e) {
        toast(`Delete failed: ${e.message}`, "error");
      }
    }
  );
}