// class addProduct extends HTMLElement {
//     constructor() {
//         super();
//         const shadow = this.attachShadow({ mode: 'open' });
  
//         // Bootstrap CSS
//         const link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
//         shadow.appendChild(link);
        
//         // QR Code Library
//         const qrScript = document.createElement("script");
//         qrScript.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
//         shadow.appendChild(qrScript);
  
//         // HTML Template
//         const template = document.createElement('template');
//         template.innerHTML = `
//         <div class="container bg-white p-4 rounded shadow-lg py-4 d-flex flex-wrap align-items-center">
//             <div>
//                 <h1 class="h5 fw-bold text-primary mb-3">Add New Purchase </h1>
//                 <div class="row">
//                     <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
//                         <label for="productName" class="form-label">Product Name</label>
//                         <input type="text" id="productName" class="form-control " placeholder="Enter product name">
//                     </div>
//                     <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
//                         <label for="supplier" class="form-label">Select Supplier</label>
//                         <div class="d-flex">
//                             <select id="supplier" class="form-control me-2">
//                                 <option value="">Select</option>
//                             </select>
//                             <button id="addSupplierBtn" class="btn btn-success">+</button>
//                         </div>
//                     </div>
                
//                     <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
//                         <label for="brand" class="form-label">Brand</label>
//                         <input type="text" id="brand" class="form-control" placeholder="Select">
//                     </div>
//                     <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
//                         <label for="category" class="form-label">Category</label>
//                         <input type="text" id="category" class="form-control" placeholder="Select">
//                     </div>
//                 </div>
//             </div>
  
//             <!-- IMEI Section -->
//             <div class="w-100">
//                 <h1 class="h5 fw-bold text-primary mb-3">IMEI Details</h1>
//                 <table id="imeiTable" class="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>IMEI</th>
//                             <th>Product Price</th>
//                             <th>Product Storage</th>
//                             <th>PTA Status</th>
//                             <th>QR Code</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody id="imeiTableBody">
//                         <tr>
//                             <td><input type="text" class="form-control imei-input" placeholder="Enter mobile IMEI"></td>
//                             <td><input type="number" class="form-control price-input" placeholder="Product price" data-base-price="0" ></td>
//                             <td><input type="text" class="form-control storage-input" placeholder="storage"></td>
//                             <td>
//                                 <select class="form-control pta-status">
//                                     <option value="PTA">PTA</option>
//                                     <option value="Non-PTA">Non-PTA</option>
//                                 </select>
//                             </td>
//                             <td><div class="qr-code" style="width: 50px; height: 50px;"></div></td>
//                             <td>
//                                 <button class="btn btn-danger remove-row">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
//                                         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
//                                         <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>   
//                                     </svg>
//                                 </button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <button id="newImeiDetails" class="btn btn-success mb-3">+ Add New IMEI Row</button>

//                 <div class="row">
//                     <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
//                         <label for="quantity" class="form-label fw-bold">Quantity</label>
//                         <input type="text" id="quantity" class="form-control " placeholder="Enter quantity" readonly>
//                     </div>
                    
//                     <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
//                         <label for="totalPrice" class="form-label fw-bold">Total Price</label>
//                         <input type="number" id="totalPrice" class="form-control" placeholder="0.00">
//                     </div>
//                 </div>    
//                 <button id="addProduct" class="btn btn-primary">Add Purchase</button>
//             </div>

//             <!-- Bootstrap Modal for confirmation -->
//             <div class="modal" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
//                 <div class="modal-dialog">
//                     <div class="modal-content">
//                         <div class="modal-header">
//                             <h5 class="modal-title" id="confirmationModalLabel">Product Added</h5>
//                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div class="modal-body">
//                             Product has been successfully added to the product list.
//                         </div>
//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>`;
  
//         shadow.appendChild(template.content.cloneNode(true));
  
//         const script = document.createElement("script");
//         script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
//         script.defer = true;
//         shadow.appendChild(script);
        
//         this.createSupplierModal();
//     }

//     createSupplierModal() {
//         let supplierModal = document.getElementById("supplierModal");
//         if (!supplierModal) {
//             supplierModal = document.createElement("div");
//             supplierModal.id = "supplierModal";
//             supplierModal.className = "modal fade";
//             supplierModal.setAttribute("tabindex", "-1");
//             supplierModal.setAttribute("aria-hidden", "true");
            
//             supplierModal.innerHTML = `
//                 <div class="modal-dialog">
//                     <div class="modal-content">
//                         <div class="modal-header">
//                             <h5 class="modal-title">Add New Supplier</h5>
//                             <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
//                         </div>
//                         <div class="modal-body">
//                             <div class="mb-3">
//                                 <label for="newSupplier" class="form-label">Supplier Name</label>
//                                 <input type="text" id="newSupplier" class="form-control" placeholder="Enter supplier name">
//                             </div>
//                             <div class="mb-3">
//                                 <label for="supplierCNIC" class="form-label">CNIC</label>
//                                 <input type="text" id="supplierCNIC" class="form-control" placeholder="Format XXXXX-XXXXXXX-X or without dashes">
//                                 <small id="cnicError" class="text-danger d-none">Invalid CNIC format! Use XXXXX-XXXXXXX-X</small>
//                             </div>
//                             <div class="mb-3">
//                                 <label for="supplierProduct" class="form-label">Product Name</label>
//                                 <input type="text" id="supplierProduct" class="form-control" placeholder="Enter product name">
//                             </div>
//                             <div class="mb-3">
//                                 <label for="supplierContact" class="form-label">Contact Number</label>
//                                 <input type="text" id="supplierContact" class="form-control" placeholder="Enter contact number">
//                             </div>
//                         </div>
//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//                             <button id="saveSupplier" class="btn btn-primary">Save</button>
//                         </div>
//                     </div>
//                 </div>
//             `;
            
//             document.body.appendChild(supplierModal);
//         }
        
//         supplierModal.addProductComponent = this;
//     }

//     connectedCallback() {
//         setTimeout(() => {
//             this.initializeComponent();
//         }, 500);
//     }
    
//     initializeComponent() {
//         this.populateSupplierDropdown();
//         this.setupTotalPriceUpdate();
//         this.setupQRCode();
//         this.setupClearFieldsEvent();
//         this.setupAddSupplierEvent();
//         this.setupNewImeiRowEvent();
//         this.addProductEvent();
//     }

//     isValidCNIC(cnic) {
//         const cnicPattern = /^([0-9]{5}-[0-9]{7}-[0-9]|[0-9]{13})$/;
//         return cnicPattern.test(cnic);
//     }

//     setupNewImeiRowEvent() {
//         const shadow = this.shadowRoot;
//         const newImeiBtn = shadow.getElementById("newImeiDetails");
//         const imeiTableBody = shadow.getElementById("imeiTableBody");
        
//         if (!newImeiBtn || !imeiTableBody) return;

//         // Update initial row’s storage to dropdown
//         const initialStorageInput = imeiTableBody.querySelector('.storage-input');
//         if (initialStorageInput) {
//             const storageSelect = document.createElement('select');
//             storageSelect.className = 'form-control storage-select';
//             storageSelect.innerHTML = `
//                 <option value="32">32GB</option>
//                 <option value="64">64GB</option>
//                 <option value="128">128GB</option>
//                 <option value="256">256GB</option>
//                 <option value="512">512GB</option>
//             `;
//             initialStorageInput.replaceWith(storageSelect);
//         }

//         newImeiBtn.addEventListener("click", () => {
//             const lastRow = imeiTableBody.querySelector("tr:last-child");
//             let lastPrice = "0";
//             let lastStorage = "32";
//             let lastPtaStatus = "PTA";

//             if (lastRow) {
//                 const priceInput = lastRow.querySelector('.price-input');
//                 const storageSelect = lastRow.querySelector('.storage-select');
//                 const ptaStatusSelect = lastRow.querySelector('.pta-status');
                
//                 lastPrice = priceInput ? priceInput.value || "0" : "0";
//                 lastStorage = storageSelect ? storageSelect.value : "32";
//                 lastPtaStatus = ptaStatusSelect ? ptaStatusSelect.value : "PTA";
//             }

//             const newRow = document.createElement("tr");
//             newRow.innerHTML = `
//                 <td><input type="text" class="form-control imei-input" placeholder="Enter mobile IMEI"></td>
//                 <td><input type="number" class="form-control price-input" value="${lastPrice}" data-base-price="${lastPrice}"></td>
//                 <td>
//                     <select class="form-control storage-select">
//                         <option value="32" ${lastStorage === "32" ? "selected" : ""}>32GB</option>
//                         <option value="64" ${lastStorage === "64" ? "selected" : ""}>64GB</option>
//                         <option value="128" ${lastStorage === "128" ? "selected" : ""}>128GB</option>
//                         <option value="256" ${lastStorage === "256" ? "selected" : ""}>256GB</option>
//                         <option value="512" ${lastStorage === "512" ? "selected" : ""}>512GB</option>
//                     </select>
//                 </td>
//                 <td>
//                     <select class="form-control pta-status">
//                         <option value="PTA" ${lastPtaStatus === "PTA" ? "selected" : ""}>PTA</option>
//                         <option value="Non-PTA" ${lastPtaStatus === "Non-PTA" ? "selected" : ""}>Non-PTA</option>
//                     </select>
//                 </td>
//                 <td><div class="qr-code" style="width: 50px; height: 50px;"></div></td>
//                 <td>
//                     <button class="btn btn-danger remove-row">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
//                             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
//                             <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>   
//                         </svg>
//                     </button>
//                 </td>
//             `;
            
//             imeiTableBody.appendChild(newRow);
            
//             const imeiInput = newRow.querySelector('.imei-input');
//             const qrCodeDiv = newRow.querySelector('.qr-code');
//             imeiInput.addEventListener("input", (event) => {
//                 this.generateQRCode(event.target.value, qrCodeDiv);
//             });
            
//             const removeBtn = newRow.querySelector('.remove-row');
//             removeBtn.addEventListener("click", () => {
//                 newRow.remove();
//                 this.updateQuantityAndTotal();
//             });
            
//             const priceInput = newRow.querySelector('.price-input');
//             priceInput.addEventListener("input", () => {
//                 this.updateQuantityAndTotal();
//             });

//             const storageSelect = newRow.querySelector('.storage-select');
//             storageSelect.addEventListener("change", () => {
//                 this.updateQuantityAndTotal();
//             });

//             this.updateQuantityAndTotal();
//         });

//         const initialRemoveBtn = shadow.querySelector('.remove-row');
//         if (initialRemoveBtn) {
//             initialRemoveBtn.addEventListener("click", (e) => {
//                 const row = e.target.closest('tr');
//                 if (imeiTableBody.querySelectorAll('tr').length > 1) {
//                     row.remove();
//                     this.updateQuantityAndTotal();
//                 } else {
//                     const inputs = row.querySelectorAll('input');
//                     inputs.forEach(input => input.value = "");
//                     row.querySelector('.storage-select').value = "32";
//                     row.querySelector('.pta-status').value = "PTA";
//                     row.querySelector('.qr-code').innerHTML = "";
//                     this.updateQuantityAndTotal();
//                 }
//             });
//         }

//         const initialPriceInput = shadow.querySelector('.price-input');
//         if (initialPriceInput) {
//             initialPriceInput.addEventListener("input", () => {
//                 this.updateQuantityAndTotal();
//             });
//         }

//         const initialImeiInput = shadow.querySelector('.imei-input');
//         if (initialImeiInput) {
//             const qrCodeDiv = initialImeiInput.closest('tr').querySelector('.qr-code');
//             initialImeiInput.addEventListener("input", (event) => {
//                 this.generateQRCode(event.target.value, qrCodeDiv);
//             });
//         }
//     }
  
//     addProductEvent() {
//         const shadow = this.shadowRoot;
//         const addProductBtn = shadow.getElementById("addProduct");
//         if (!addProductBtn) return;
        
//         addProductBtn.addEventListener("click", () => {
//             let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
//             let name = shadow.getElementById("productName").value.trim();
//             let brand = shadow.getElementById("brand").value.trim();
//             let category = shadow.getElementById("category").value.trim();
//             let supplierSelect = shadow.getElementById("supplier");
//             let supplier = supplierSelect.options[supplierSelect.selectedIndex]?.textContent || "";
//             let quantity = shadow.getElementById("quantity").value;
//             let overPrice = parseFloat(shadow.getElementById("totalPrice").value);
            
//             const imeiRows = shadow.querySelectorAll("#imeiTableBody tr");
//             let imeiDetails = [];
            
//             imeiRows.forEach(row => {
//                 const imeiInput = row.querySelector('.imei-input');
//                 const priceInput = row.querySelector('.price-input');
//                 const storageSelect = row.querySelector('.storage-select');
//                 const ptaStatusSelect = row.querySelector('.pta-status');
                
//                 if (imeiInput && priceInput && storageSelect && ptaStatusSelect) {
//                     const imei = imeiInput.value.trim();
//                     const price = parseFloat(priceInput.value) || 0;
//                     const storage = storageSelect.value;
//                     const ptaNon = ptaStatusSelect.value;
                    
//                     if (imei && price && storage) {
//                         imeiDetails.push({
//                             imei,
//                             price,
//                             storage,
//                             ptaNon
//                         });
//                     }
//                 }
//             });
    
//             if (name && supplier && brand && category && imeiDetails.length > 0 && quantity && overPrice) {
//                 let item = { 
//                     id: Date.now(),
//                     name, 
//                     supplier, 
//                     brand, 
//                     category, 
//                     imeiDetails, 
//                     quantity, 
//                     overPrice,
//                     addedDate: new Date().toISOString() 
//                 };
                
//                 cart.push(item);
//                 localStorage.setItem("cart", JSON.stringify(cart));
                
//                 console.log("Added product to cart:", item);
//                 console.log("Current cart:", cart);
    
//                 const confirmationModalEl = shadow.getElementById('confirmationModal');
//                 if (confirmationModalEl && typeof bootstrap !== 'undefined') {
//                     const confirmationModal = new bootstrap.Modal(confirmationModalEl);
//                     confirmationModal.show();
//                 } else {
//                     alert("Product added successfully!");
//                 }
                
//                 this.clearFields();
//             } else {
//                 alert("Please fill all required fields");
//             }
//         });
//     }

//     populateSupplierDropdown() {
//         const shadow = this.shadowRoot;
//         const supplierSelect = shadow.getElementById("supplier");
//         if (!supplierSelect) return;
    
//         supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
    
//         let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
        
//         suppliers.forEach(supplier => {
//             let option = document.createElement("option");
//             option.value = supplier.id;
//             option.textContent = supplier.name;
//             supplierSelect.appendChild(option);
//         });
//     }

//     setupAddSupplierEvent() {
//         const shadow = this.shadowRoot;
//         const addSupplierBtn = shadow.getElementById("addSupplierBtn");
//         if (!addSupplierBtn) return;
        
//         addSupplierBtn.addEventListener("click", () => {
//             const supplierModal = document.getElementById("supplierModal");
//             if (supplierModal && typeof bootstrap !== 'undefined') {
//                 const modal = new bootstrap.Modal(supplierModal);
//                 modal.show();
//             }
//         });
        
//         const saveSupplierBtn = document.getElementById("saveSupplier");
//         if (saveSupplierBtn) {
//             saveSupplierBtn.addEventListener("click", () => {
//                 const newSupplierInput = document.getElementById("newSupplier");
//                 const supplierCNICInput = document.getElementById("supplierCNIC");
//                 const supplierProductInput = document.getElementById("supplierProduct");
//                 const supplierContactInput = document.getElementById("supplierContact");
                
//                 if (!newSupplierInput) return;
                
//                 let newSupplier = newSupplierInput.value.trim();
//                 let cnic = supplierCNICInput ? supplierCNICInput.value.trim() : "";
//                 let product = supplierProductInput ? supplierProductInput.value.trim() : "";
//                 let contact = supplierContactInput ? supplierContactInput.value.trim() : "";

//                 if (!newSupplier) {
//                     alert("Please enter a supplier name");
//                     return;
//                 }

//                 if (!this.isValidCNIC(cnic)) {
//                     alert("Invalid CNIC! Please enter a valid CNIC in the format: 12345-1234567-1 or without dashes");
//                     return;
//                 }
                
//                 let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
//                 suppliers.push({ 
//                     id: Date.now(),
//                     name: newSupplier,
//                     cnic: cnic,
//                     product: product,
//                     contact: contact
//                 });
//                 localStorage.setItem("suppliers", JSON.stringify(suppliers));
                
//                 console.log("Saved suppliers:", suppliers);
                
//                 const supplierModal = document.getElementById("supplierModal");
//                 if (supplierModal && supplierModal.addProductComponent) {
//                     supplierModal.addProductComponent.populateSupplierDropdown();
//                 }
                
//                 newSupplierInput.value = "";
//                 if (supplierCNICInput) supplierCNICInput.value = "";
//                 if (supplierProductInput) supplierProductInput.value = "";
//                 if (supplierContactInput) supplierContactInput.value = "";
                
//                 if (typeof bootstrap !== 'undefined') {
//                     const modal = bootstrap.Modal.getInstance(supplierModal);
//                     if (modal) modal.hide();
//                 }
//             });
//         }
//     }

//     generateQRCode(value, qrCodeDiv) {
//         if (!qrCodeDiv) return;
        
//         qrCodeDiv.innerHTML = "";
        
//         if (value && typeof QRCode !== 'undefined') {
//             try {
//                 new QRCode(qrCodeDiv, {
//                     text: value,
//                     width: 50,
//                     height: 50
//                 });
//             } catch (error) {
//                 console.error("QR Code generation error:", error);
//             }
//         }
//     }
    
//     setupQRCode() {
//         const shadow = this.shadowRoot;
//         const imeiInputs = shadow.querySelectorAll(".imei-input");
        
//         imeiInputs.forEach(input => {
//             const qrCodeDiv = input.closest('tr').querySelector('.qr-code');
            
//             input.addEventListener("input", (event) => {
//                 this.generateQRCode(event.target.value, qrCodeDiv);
//             });
//         });
//     }

//     updateQuantityAndTotal() {
//         const shadow = this.shadowRoot;
//         const imeiRows = shadow.querySelectorAll("#imeiTableBody tr");
//         const quantityInput = shadow.getElementById("quantity");
//         const totalPriceInput = shadow.getElementById("totalPrice");
        
//         if (!quantityInput || !totalPriceInput) return;
        
//         quantityInput.value = imeiRows.length;
        
//         let total = 0;
//         imeiRows.forEach(row => {
//             const priceInput = row.querySelector('.price-input');
//             if (priceInput && priceInput.value) {
//                 total += parseFloat(priceInput.value) || 0;
//             }
//         });
        
//         totalPriceInput.value = total.toFixed(2);
//     }

//     setupTotalPriceUpdate() {
//         const shadow = this.shadowRoot;
//         const priceInputs = shadow.querySelectorAll(".price-input");
        
//         priceInputs.forEach(input => {
//             input.addEventListener("input", () => {
//                 this.updateQuantityAndTotal();
//             });
//         });
        
//         this.updateQuantityAndTotal();
//     }
    
//     clearFields() {
//         const shadow = this.shadowRoot;
//         shadow.getElementById("productName").value = "";
//         shadow.getElementById("supplier").value = "";
//         shadow.getElementById("brand").value = "";
//         shadow.getElementById("category").value = "";
        
//         const imeiTableBody = shadow.getElementById("imeiTableBody");
//         while (imeiTableBody.children.length > 1) {
//             imeiTableBody.removeChild(imeiTableBody.lastChild);
//         }
        
//         const firstRow = imeiTableBody.querySelector("tr");
//         if (firstRow) {
//             firstRow.querySelector('.imei-input').value = "";
//             firstRow.querySelector('.price-input').value = "";
//             firstRow.querySelector('.storage-select').value = "32";
//             firstRow.querySelector('.pta-status').value = "PTA";
//             firstRow.querySelector('.qr-code').innerHTML = "";
//         }
        
//         shadow.getElementById("quantity").value = "";
//         shadow.getElementById("totalPrice").value = "";
//     }
    
//     setupClearFieldsEvent() {
//         const shadow = this.shadowRoot;
//         const clearBtns = shadow.querySelectorAll(".remove-row");
        
//         clearBtns.forEach(btn => {
//             btn.addEventListener("click", (e) => {
//                 const row = e.target.closest('tr');
//                 const imeiTableBody = shadow.getElementById("imeiTableBody");
                
//                 if (imeiTableBody.querySelectorAll('tr').length > 1) {
//                     row.remove();
//                 } else {
//                     const inputs = row.querySelectorAll('input');
//                     inputs.forEach(input => input.value = "");
//                     row.querySelector('.storage-select').value = "32";
//                     row.querySelector('.pta-status').value = "PTA";
//                     row.querySelector('.qr-code').innerHTML = "";
//                 }
                
//                 this.updateQuantityAndTotal();
//             });
//         });
//     }
// }
  
// customElements.define('add-product', addProduct);













/////////////////////////////////////////
class addProduct extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
  
        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);
        
        // QR Code Library
        const qrScript = document.createElement("script");
        qrScript.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
        shadow.appendChild(qrScript);
  
        // HTML Template
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container bg-white p-4 rounded shadow-lg py-4 d-flex flex-wrap align-items-center">
            <div>
                <h1 class="h5 fw-bold text-primary mb-3">Add New Purchase </h1>
                <div class="row">
                    <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
                        <label for="productName" class="form-label">Product Name</label>
                        <input type="text" id="productName" class="form-control " placeholder="Enter product name">
                    </div>
                    <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
                        <label for="supplier" class="form-label">Select Supplier</label>
                        <div class="d-flex">
                            <select id="supplier" class="form-control me-2">
                                <option value="">Select</option>
                            </select>
                            <button id="addSupplierBtn" class="btn btn-success">+</button>
                        </div>
                    </div>
                
                    <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
                        <label for="brand" class="form-label">Brand</label>
                        <input type="text" id="brand" class="form-control" placeholder="Select">
                    </div>
                    <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
                        <label for="category" class="form-label">Category</label>
                        <input type="text" id="category" class="form-control" placeholder="Select">
                    </div>
                </div>
            </div>
  
            <!-- IMEI Section -->
            <div class="w-100">
                <h1 class="h5 fw-bold text-primary mb-3">IMEI Details</h1>
                <table id="imeiTable" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>IMEI</th>
                            <th>Product Price</th>
                            <th>Product Storage</th>
                            <th>PTA Status</th>
                            <th>QR Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="imeiTableBody">
                        <tr>
                            <td><input type="text" class="form-control imei-input" placeholder="Enter mobile IMEI"></td>
                            <td><input type="number" class="form-control price-input" placeholder="Product price" data-base-price="0" ></td>
                            <td><input type="text" class="form-control storage-input" placeholder="storage"></td>
                            <td>
                                <select class="form-control pta-status">
                                    <option value="PTA">PTA</option>
                                    <option value="Non-PTA">Non-PTA</option>
                                </select>
                            </td>
                            <td><div class="qr-code" style="width: 50px; height: 50px;"></div></td>
                            <td>
                                <button class="btn btn-danger remove-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>   
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="newImeiDetails" class="btn btn-success mb-3">+ Add New IMEI Row</button>

                <div class="row">
                    <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
                        <label for="quantity" class="form-label fw-bold">Quantity</label>
                        <input type="text" id="quantity" class="form-control " placeholder="Enter quantity" readonly>
                    </div>
                    
                    <div class="mb-2 col-lg-6 col-md-4 col-sm-6">
                        <label for="totalPrice" class="form-label fw-bold">Total Price</label>
                        <input type="number" id="totalPrice" class="form-control" placeholder="0.00">
                    </div>
                </div>    
                <button id="addProduct" class="btn btn-primary">Add Purchase</button>
            </div>

            <!-- Bootstrap Modal for confirmation -->
            <div class="modal" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="confirmationModalLabel">Product Added</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Product has been successfully added to the product list.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  
        shadow.appendChild(template.content.cloneNode(true));
  
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        script.defer = true;
        shadow.appendChild(script);
        
        this.createSupplierModal();
    }

    createSupplierModal() {
        let supplierModal = document.getElementById("supplierModal");
        if (!supplierModal) {
            supplierModal = document.createElement("div");
            supplierModal.id = "supplierModal";
            supplierModal.className = "modal fade";
            supplierModal.setAttribute("tabindex", "-1");
            supplierModal.setAttribute("aria-hidden", "true");
            
            supplierModal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Supplier</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="newSupplier" class="form-label">Supplier Name</label>
                                <input type="text" id="newSupplier" class="form-control" placeholder="Enter supplier name">
                            </div>
                            <div class="mb-3">
                                <label for="supplierCNIC" class="form-label">CNIC</label>
                                <input type="text" id="supplierCNIC" class="form-control" placeholder="Format XXXXX-XXXXXXX-X or without dashes">
                                <small id="cnicError" class="text-danger d-none">Invalid CNIC format! Use XXXXX-XXXXXXX-X</small>
                            </div>
                            <div class="mb-3">
                                <label for="supplierProduct" class="form-label">Product Name</label>
                                <input type="text" id="supplierProduct" class="form-control" placeholder="Enter product name">
                            </div>
                            <div class="mb-3">
                                <label for="supplierContact" class="form-label">Contact Number</label>
                                <input type="text" id="supplierContact" class="form-control" placeholder="Enter contact number">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button id="saveSupplier" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(supplierModal);
        }
        
        supplierModal.addProductComponent = this;
    }

    connectedCallback() {
        setTimeout(() => {
            this.initializeComponent();
        }, 500);
    }
    
    initializeComponent() {
        this.populateSupplierDropdown();
        this.setupTotalPriceUpdate();
        this.setupQRCode();
        this.setupClearFieldsEvent();
        this.setupAddSupplierEvent();
        this.setupNewImeiRowEvent();
        this.addProductEvent();
    }

    isValidCNIC(cnic) {
        const cnicPattern = /^([0-9]{5}-[0-9]{7}-[0-9]|[0-9]{13})$/;
        return cnicPattern.test(cnic);
    }

    addNewImeiRow(imeiValue = "") {
        const shadow = this.shadowRoot;
        const imeiTableBody = shadow.getElementById("imeiTableBody");
        
        const lastRow = imeiTableBody.querySelector("tr:last-child");
        let lastPrice = "0";
        let lastStorage = "32";
        let lastPtaStatus = "PTA";

        if (lastRow) {
            const priceInput = lastRow.querySelector('.price-input');
            const storageSelect = lastRow.querySelector('.storage-select');
            const ptaStatusSelect = lastRow.querySelector('.pta-status');
            
            lastPrice = priceInput ? priceInput.value || "0" : "0";
            lastStorage = storageSelect ? storageSelect.value : "32";
            lastPtaStatus = ptaStatusSelect ? ptaStatusSelect.value : "PTA";
        }

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="text" class="form-control imei-input" placeholder="Enter mobile IMEI" value="${imeiValue}"></td>
            <td><input type="number" class="form-control price-input" value="${lastPrice}" data-base-price="${lastPrice}"></td>
            <td>
                <select class="form-control storage-select">
                    <option value="32" ${lastStorage === "32" ? "selected" : ""}>32GB</option>
                    <option value="64" ${lastStorage === "64" ? "selected" : ""}>64GB</option>
                    <option value="128" ${lastStorage === "128" ? "selected" : ""}>128GB</option>
                    <option value="256" ${lastStorage === "256" ? "selected" : ""}>256GB</option>
                    <option value="512" ${lastStorage === "512" ? "selected" : ""}>512GB</option>
                </select>
            </td>
            <td>
                <select class="form-control pta-status">
                    <option value="PTA" ${lastPtaStatus === "PTA" ? "selected" : ""}>PTA</option>
                    <option value="Non-PTA" ${lastPtaStatus === "Non-PTA" ? "selected" : ""}>Non-PTA</option>
                </select>
            </td>
            <td><div class="qr-code" style="width: 50px; height: 50px;"></div></td>
            <td>
                <button class="btn btn-danger remove-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>   
                    </svg>
                </button>
            </td>
        `;
        
        imeiTableBody.appendChild(newRow);
        
        const imeiInput = newRow.querySelector('.imei-input');
        const qrCodeDiv = newRow.querySelector('.qr-code');
        imeiInput.addEventListener("input", (event) => {
            this.generateQRCode(event.target.value, qrCodeDiv);
        });
        imeiInput.addEventListener("keydown", (event) => this.handleBarcodeScan(event, imeiInput));
        
        const removeBtn = newRow.querySelector('.remove-row');
        removeBtn.addEventListener("click", () => {
            newRow.remove();
            this.updateQuantityAndTotal();
        });
        
        const priceInput = newRow.querySelector('.price-input');
        priceInput.addEventListener("input", () => {
            this.updateQuantityAndTotal();
        });

        const storageSelect = newRow.querySelector('.storage-select');
        storageSelect.addEventListener("change", () => {
            this.updateQuantityAndTotal();
        });

        if (imeiValue) {
            this.generateQRCode(imeiValue, qrCodeDiv);
        }

        this.updateQuantityAndTotal();
    }

    setupNewImeiRowEvent() {
        const shadow = this.shadowRoot;
        const newImeiBtn = shadow.getElementById("newImeiDetails");
        const imeiTableBody = shadow.getElementById("imeiTableBody");
        
        if (!newImeiBtn || !imeiTableBody) return;

        const initialStorageInput = imeiTableBody.querySelector('.storage-input');
        if (initialStorageInput) {
            const storageSelect = document.createElement('select');
            storageSelect.className = 'form-control storage-select';
            storageSelect.innerHTML = `
                <option value="32">32GB</option>
                <option value="64">64GB</option>
                <option value="128">128GB</option>
                <option value="256">256GB</option>
                <option value="512">512GB</option>
            `;
            initialStorageInput.replaceWith(storageSelect);
        }

        newImeiBtn.addEventListener("click", () => {
            this.addNewImeiRow();
        });

        const initialImeiInput = shadow.querySelector('.imei-input');
        if (initialImeiInput) {
            const qrCodeDiv = initialImeiInput.closest('tr').querySelector('.qr-code');
            initialImeiInput.addEventListener("input", (event) => {
                this.generateQRCode(event.target.value, qrCodeDiv);
            });
            initialImeiInput.addEventListener("keydown", (event) => this.handleBarcodeScan(event, initialImeiInput));
        }

        const initialRemoveBtn = shadow.querySelector('.remove-row');
        if (initialRemoveBtn) {
            initialRemoveBtn.addEventListener("click", (e) => {
                const row = e.target.closest('tr');
                if (imeiTableBody.querySelectorAll('tr').length > 1) {
                    row.remove();
                    this.updateQuantityAndTotal();
                } else {
                    const inputs = row.querySelectorAll('input');
                    inputs.forEach(input => input.value = "");
                    row.querySelector('.storage-select').value = "32";
                    row.querySelector('.pta-status').value = "PTA";
                    row.querySelector('.qr-code').innerHTML = "";
                    this.updateQuantityAndTotal();
                }
            });
        }

        const initialPriceInput = shadow.querySelector('.price-input');
        if (initialPriceInput) {
            initialPriceInput.addEventListener("input", () => {
                this.updateQuantityAndTotal();
            });
        }
    }

    handleBarcodeScan(event, imeiInput) {
        if (event.key === "Enter") {
            event.preventDefault();
            const scannedImei = imeiInput.value.trim();
            
            if (scannedImei) {
                this.addNewImeiRow();
                const newRow = this.shadowRoot.querySelector("#imeiTableBody tr:last-child");
                const newImeiInput = newRow.querySelector('.imei-input');
                newImeiInput.focus();
            }
        }
    }
  
    addProductEvent() {
        const shadow = this.shadowRoot;
        const addProductBtn = shadow.getElementById("addProduct");
        if (!addProductBtn) return;
        
        addProductBtn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
            let name = shadow.getElementById("productName").value.trim();
            let brand = shadow.getElementById("brand").value.trim();
            let category = shadow.getElementById("category").value.trim();
            let supplierSelect = shadow.getElementById("supplier");
            let supplier = supplierSelect.options[supplierSelect.selectedIndex]?.textContent || "";
            let quantity = shadow.getElementById("quantity").value;
            let overPrice = parseFloat(shadow.getElementById("totalPrice").value);
            
            const imeiRows = shadow.querySelectorAll("#imeiTableBody tr");
            let imeiDetails = [];
            
            imeiRows.forEach(row => {
                const imeiInput = row.querySelector('.imei-input');
                const priceInput = row.querySelector('.price-input');
                const storageSelect = row.querySelector('.storage-select');
                const ptaStatusSelect = row.querySelector('.pta-status');
                
                if (imeiInput && priceInput && storageSelect && ptaStatusSelect) {
                    const imei = imeiInput.value.trim();
                    const price = parseFloat(priceInput.value) || 0;
                    const storage = storageSelect.value;
                    const ptaNon = ptaStatusSelect.value;
                    
                    if (imei && price && storage) {
                        imeiDetails.push({
                            imei,
                            price,
                            storage,
                            ptaNon
                        });
                    }
                }
            });
    
            if (name && supplier && brand && category && imeiDetails.length > 0 && quantity && overPrice) {
                let item = { 
                    id: Date.now(),
                    name, 
                    supplier, 
                    brand, 
                    category, 
                    imeiDetails, 
                    quantity, 
                    overPrice,
                    addedDate: new Date().toISOString() 
                };
                
                cart.push(item);
                localStorage.setItem("cart", JSON.stringify(cart));
                
                console.log("Added product to cart:", item);
                console.log("Current cart:", cart);
    
                const confirmationModalEl = shadow.getElementById('confirmationModal');
                if (confirmationModalEl && typeof bootstrap !== 'undefined') {
                    const confirmationModal = new bootstrap.Modal(confirmationModalEl);
                    confirmationModal.show();
                } else {
                    alert("Product added successfully!");
                }
                
                this.clearFields();
            } else {
                alert("Please fill all required fields");
            }
        });
    }

    populateSupplierDropdown() {
        const shadow = this.shadowRoot;
        const supplierSelect = shadow.getElementById("supplier");
        if (!supplierSelect) return;
    
        supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
    
        let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
        
        suppliers.forEach(supplier => {
            let option = document.createElement("option");
            option.value = supplier.id;
            option.textContent = supplier.name;
            supplierSelect.appendChild(option);
        });
    }

    setupAddSupplierEvent() {
        const shadow = this.shadowRoot;
        const addSupplierBtn = shadow.getElementById("addSupplierBtn");
        if (!addSupplierBtn) return;
        
        addSupplierBtn.addEventListener("click", () => {
            const supplierModal = document.getElementById("supplierModal");
            if (supplierModal && typeof bootstrap !== 'undefined') {
                const modal = new bootstrap.Modal(supplierModal);
                modal.show();
            }
        });
        
        const saveSupplierBtn = document.getElementById("saveSupplier");
        if (saveSupplierBtn) {
            saveSupplierBtn.addEventListener("click", () => {
                const newSupplierInput = document.getElementById("newSupplier");
                const supplierCNICInput = document.getElementById("supplierCNIC");
                const supplierProductInput = document.getElementById("supplierProduct");
                const supplierContactInput = document.getElementById("supplierContact");
                
                if (!newSupplierInput) return;
                
                let newSupplier = newSupplierInput.value.trim();
                let cnic = supplierCNICInput ? supplierCNICInput.value.trim() : "";
                let product = supplierProductInput ? supplierProductInput.value.trim() : "";
                let contact = supplierContactInput ? supplierContactInput.value.trim() : "";

                if (!newSupplier) {
                    alert("Please enter a supplier name");
                    return;
                }

                if (!this.isValidCNIC(cnic)) {
                    alert("Invalid CNIC! Please enter a valid CNIC in the format: 12345-1234567-1 or without dashes");
                    return;
                }
                
                let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
                suppliers.push({ 
                    id: Date.now(),
                    name: newSupplier,
                    cnic: cnic,
                    product: product,
                    contact: contact
                });
                localStorage.setItem("suppliers", JSON.stringify(suppliers));
                
                console.log("Saved suppliers:", suppliers);
                
                const supplierModal = document.getElementById("supplierModal");
                if (supplierModal && supplierModal.addProductComponent) {
                    supplierModal.addProductComponent.populateSupplierDropdown();
                }
                
                newSupplierInput.value = "";
                if (supplierCNICInput) supplierCNICInput.value = "";
                if (supplierProductInput) supplierProductInput.value = "";
                if (supplierContactInput) supplierContactInput.value = "";
                
                if (typeof bootstrap !== 'undefined') {
                    const modal = bootstrap.Modal.getInstance(supplierModal);
                    if (modal) modal.hide();
                }
            });
        }
    }

    generateQRCode(value, qrCodeDiv) {
        if (!qrCodeDiv) return;
        
        qrCodeDiv.innerHTML = "";
        
        if (value && typeof QRCode !== 'undefined') {
            try {
                new QRCode(qrCodeDiv, {
                    text: value,
                    width: 50,
                    height: 50
                });
            } catch (error) {
                console.error("QR Code generation error:", error);
            }
        }
    }
    
    setupQRCode() {
        const shadow = this.shadowRoot;
        const imeiInputs = shadow.querySelectorAll(".imei-input");
        
        imeiInputs.forEach(input => {
            const qrCodeDiv = input.closest('tr').querySelector('.qr-code');
            
            input.addEventListener("input", (event) => {
                this.generateQRCode(event.target.value, qrCodeDiv);
            });
        });
    }

    updateQuantityAndTotal() {
        const shadow = this.shadowRoot;
        const imeiRows = shadow.querySelectorAll("#imeiTableBody tr");
        const quantityInput = shadow.getElementById("quantity");
        const totalPriceInput = shadow.getElementById("totalPrice");
        
        if (!quantityInput || !totalPriceInput) return;
        
        quantityInput.value = imeiRows.length;
        
        let total = 0;
        imeiRows.forEach(row => {
            const priceInput = row.querySelector('.price-input');
            if (priceInput && priceInput.value) {
                total += parseFloat(priceInput.value) || 0;
            }
        });
        
        totalPriceInput.value = total.toFixed(2);
    }

    setupTotalPriceUpdate() {
        const shadow = this.shadowRoot;
        const priceInputs = shadow.querySelectorAll(".price-input");
        
        priceInputs.forEach(input => {
            input.addEventListener("input", () => {
                this.updateQuantityAndTotal();
            });
        });
        
        this.updateQuantityAndTotal();
    }
    
    clearFields() {
        const shadow = this.shadowRoot;
        shadow.getElementById("productName").value = "";
        shadow.getElementById("supplier").value = "";
        shadow.getElementById("brand").value = "";
        shadow.getElementById("category").value = "";
        
        const imeiTableBody = shadow.getElementById("imeiTableBody");
        while (imeiTableBody.children.length > 1) {
            imeiTableBody.removeChild(imeiTableBody.lastChild);
        }
        
        const firstRow = imeiTableBody.querySelector("tr");
        if (firstRow) {
            firstRow.querySelector('.imei-input').value = "";
            firstRow.querySelector('.price-input').value = "";
            firstRow.querySelector('.storage-select').value = "32";
            firstRow.querySelector('.pta-status').value = "PTA";
            firstRow.querySelector('.qr-code').innerHTML = "";
        }
        
        shadow.getElementById("quantity").value = "";
        shadow.getElementById("totalPrice").value = "";
    }
    
    setupClearFieldsEvent() {
        const shadow = this.shadowRoot;
        const clearBtns = shadow.querySelectorAll(".remove-row");
        
        clearBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const row = e.target.closest('tr');
                const imeiTableBody = shadow.getElementById("imeiTableBody");
                
                if (imeiTableBody.querySelectorAll('tr').length > 1) {
                    row.remove();
                } else {
                    const inputs = row.querySelectorAll('input');
                    inputs.forEach(input => input.value = "");
                    row.querySelector('.storage-select').value = "32";
                    row.querySelector('.pta-status').value = "PTA";
                    row.querySelector('.qr-code').innerHTML = "";
                }
                
                this.updateQuantityAndTotal();
            });
        });
    }
}

customElements.define('add-product', addProduct);