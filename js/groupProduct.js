class GroupedProductList extends HTMLElement {
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
        <div class="bg-light py-4 d-flex flex-wrap align-items-center">
            <div class="container bg-white p-4 rounded shadow-lg">
                <h1 class="h3 fw-bold mb-3 text-primary">Grouped Product List</h1>
                
                <div class="d-flex flex-wrap gap-3">
                    <!-- Storage Filter Dropdown -->
                    <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                        <label for="filterStorage" class="form-label">Filter by Storage</label>
                        <select id="filterStorage" class="form-select">
                            <option value="">All</option>
                            <option value="32">32GB</option>
                            <option value="64">64GB</option>
                            <option value="128">128GB</option>
                            <option value="256">256GB</option>
                            <option value="512">512GB</option>
                        </select>
                    </div>

                    <!-- PTA/NON-PTA Filter Dropdown -->
                    <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                        <label for="filterPtaNon" class="form-label">Filter by PTA/NON-PTA</label>
                        <select id="filterPtaNon" class="form-select">
                            <option value="">All</option>
                            <option value="PTA">PTA</option>
                            <option value="Non-PTA">Non-PTA</option>
                        </select>
                    </div>
                    
                 
                </div>
                
                <!-- Grouped Product Table -->
                <div class="table-responsive">
                    <table class="table table-bordered text-center">
                        <thead class="table-primary">
                            <tr>
                                <th>Name</th>
                                <th>Supplier</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Storage</th>
                                <th>PTA Status</th>
                                <th>Quantity</th>
                                <th>QR Code</th>
                            </tr>
                        </thead>
                        <tbody id="groupedItems">
                            <!-- Grouped items will be added here dynamically -->
                        </tbody>
                    </table>
                </div>

                <div class="mt-3 d-flex justify-content-between">
                    <button id="addProductBtn" class="btn btn-primary">Add Product</button>
                    <div>
                        <span class="me-3"><strong>Total Items:</strong> <span id="totalItems">0</span></span>
                        <span><strong>Total Value:</strong> $<span id="totalValue">0.00</span></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Product Modal -->
        <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addProductModalLabel">Add New Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="addProductContainer"></div>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Attach template to Shadow DOM
        shadow.appendChild(template.content.cloneNode(true));

        // Store references
        this.shadow = shadow;

        // Load initial cart data
        try {
            const cartData = localStorage.getItem("cart");
            this.cart = cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
            this.cart = [];
        }

        // Load Bootstrap JS
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        script.defer = true;
        shadow.appendChild(script);
    }

    connectedCallback() {
        // Wait for scripts to load
        setTimeout(() => {
            this.initializeUI();
            this.setupEventListeners();
            this.setupAddProductModal();
        }, 500);

        // Listen for inventory changes
        window.addEventListener("inventoryChanged", () => {
            this.loadCartFromLocalStorage();
            this.displayGroupedItems(this.groupItems(this.cart));
        });

        // Listen for storage events
        window.addEventListener("storage", () => {
            this.loadCartFromLocalStorage();
            this.displayGroupedItems(this.groupItems(this.cart));
        });
    }

    initializeUI() {
        this.groupedTable = this.shadow.querySelector("#groupedItems");
        this.totalItemsElement = this.shadow.querySelector("#totalItems");
        this.totalValueElement = this.shadow.querySelector("#totalValue");

        // Display initial grouped items
        this.displayGroupedItems(this.groupItems(this.cart));
    }

    loadCartFromLocalStorage() {
        try {
            const cartData = localStorage.getItem("cart");
            this.cart = cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
        }
    }

    setupEventListeners() {
        this.shadow.querySelector("#filterStorage").addEventListener("change", () => this.applyFilters());
        this.shadow.querySelector("#filterPtaNon").addEventListener("change", () => this.filterItems());
        this.shadow.querySelector("#searchIMEI").addEventListener("input", () => this.applyFilters());
        
    }

    setupAddProductModal() {
        const addProductBtn = this.shadow.getElementById("addProductBtn");
        const addProductModal = this.shadow.getElementById("addProductModal");
        const addProductContainer = this.shadow.getElementById("addProductContainer");

        if (!addProductBtn || !addProductModal || !addProductContainer) return;

        addProductBtn.addEventListener("click", () => {
            if (!addProductContainer.querySelector("add-product")) {
                const addProductElement = document.createElement("add-product");
                addProductContainer.appendChild(addProductElement);
            }

            if (typeof bootstrap !== 'undefined') {
                const modal = new bootstrap.Modal(addProductModal);
                modal.show();
            }
        });

        addProductModal.addEventListener('hidden.bs.modal', () => {
            this.loadCartFromLocalStorage();
            this.displayGroupedItems(this.groupItems(this.cart));
        });
    }

    // Group items by Name, Supplier, Brand, Category, Price, Storage, and PTA Status
    groupItems(cart) {
        const grouped = {};

        cart.forEach(product => {
            if (product.imeiDetails && product.imeiDetails.length > 0) {
                product.imeiDetails.forEach(imei => {
                    if (!imei.isSold) { // Only count unsold items
                        const key = `${product.name}|${product.supplier}|${product.brand}|${product.category}|${imei.price}|${imei.storage}|${imei.ptaNon}`;
                        if (!grouped[key]) {
                            grouped[key] = {
                                name: product.name,
                                supplier: product.supplier,
                                brand: product.brand,
                                category: product.category,
                                price: imei.price,
                                storage: imei.storage,
                                ptaNon: imei.ptaNon,
                                quantity: 0,
                                imeis: [] // Store IMEIs for filtering and QR code
                            };
                        }
                        grouped[key].quantity += 1;
                        grouped[key].imeis.push(imei.imei);
                    }
                });
            }
        });

        return Object.values(grouped);
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

    displayGroupedItems(items) {
        if (!this.groupedTable) return;

        this.groupedTable.innerHTML = "";
        let totalItems = 0;
        let totalValue = 0;

        if (items && items.length > 0) {
            items.forEach(item => {
                let row = document.createElement("tr");
                // Create QR code div
                const qrCodeDiv = document.createElement("div");
                qrCodeDiv.className = "qr-code";
                qrCodeDiv.style.width = "50px";
                qrCodeDiv.style.height = "50px";
                qrCodeDiv.style.margin = "auto";

                // Generate QR code for the first IMEI in the group
                if (item.imeis.length > 0) {
                    this.generateQRCode(item.imeis[0], qrCodeDiv);
                }

                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.supplier}</td>
                    <td>${item.brand}</td>
                    <td>${item.category}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.storage}GB</td>
                    <td>${item.ptaNon}</td>
                    <td>${item.quantity}</td>
                `;
                // Append QR code cell
                const qrCell = document.createElement("td");
                qrCell.appendChild(qrCodeDiv);
                row.appendChild(qrCell);

                this.groupedTable.appendChild(row);

                totalItems += item.quantity;
                totalValue += item.price * item.quantity;
            });
        }

        // Update totals
        this.totalItemsElement.textContent = totalItems;
        this.totalValueElement.textContent = totalValue.toFixed(2);

        // No items message
        if (totalItems === 0) {
            let emptyRow = document.createElement("tr");
            emptyRow.innerHTML = `<td colspan="9" class="text-center">No products available</td>`;
            this.groupedTable.appendChild(emptyRow);
        }
    }

    applyFilters() {
        const storageFilter = this.shadow.querySelector("#filterStorage").value;
        const ptaFilter = this.shadow.querySelector("#filterPtaNon").value;
        const imeiSearch = this.shadow.querySelector("#searchIMEI").value.trim().toLowerCase();

        let groupedItems = this.groupItems(this.cart);

        // Apply filters
        if (storageFilter) {
            groupedItems = groupedItems.filter(item => item.storage === storageFilter);
        }

        if (ptaFilter) {
            groupedItems = groupedItems.filter(item => item.ptaNon === ptaFilter);
        }

        if (imeiSearch) {
            groupedItems = groupedItems.filter(item => 
                item.imeis.some(imei => imei.toLowerCase().includes(imeiSearch))
            );
        }

        this.displayGroupedItems(groupedItems);
    }
}

customElements.define('grouped-product-list', GroupedProductList);