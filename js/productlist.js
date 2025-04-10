class ProductList extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        const template = document.createElement('template');
        template.innerHTML = `
    <div class="bg-light py-4 d-flex flex-wrap align-items-center">
        <div class="container bg-white p-4 rounded shadow-lg ">
            <h1 class="h3 fw-bold mb-3 text-primary">Product List</h1>
            <div class="d-flex flex-wrap gap-3">
                <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                    <label for="filterStorage" class="form-label">Filter by Storage</label>
                    <select id="filterStorage" class="form-select">
                        <option value="">All</option>
                        <option value="64">64GB</option>
                        <option value="128">128GB</option>
                        <option value="256">256GB</option>
                        <option value="512">512GB</option>
                        <option value="1024">1024GB</option>
                    </select>
                </div>
                <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                    <label for="filterPtaNon" class="form-label">Filter by PTA/NON-PTA</label>
                    <select id="filterPtaNon" class="form-select">
                        <option value="">All</option>
                        <option value="PTA">PTA</option>
                        <option value="Non-PTA">Non-PTA</option>
                    </select>
                </div>
                <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                    <label for="searchIMEI" class="form-label">Search by IMEI</label>
                    <input type="text" id="searchIMEI" class="form-control" placeholder="Enter IMEI">
                </div>
                <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                    <label for="searchProductName" class="form-label">Search by Product Name</label>
                    <input type="text" id="searchProductName" class="form-control" placeholder="Enter Product Name">
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered text-center">
                    <thead class="table-primary">
                        <tr>
                            <th>IMEI</th>
                            <th>Name</th>
                            <th>Supplier</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Storage</th>
                            <th>PTA Status</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="cartItems"></tbody>
                </table>
            </div>
            <div class="mt-3 d-flex justify-content-between">
                <a href="addproduct.html" class="btn btn-primary">Add Product</a>
                <div>
                    <span class="me-3"><strong>Total Items:</strong> <span id="totalItems">0</span></span>
                    <span><strong>Total Value:</strong> $<span id="totalValue">0.00</span></span>
                </div>
            </div>
        </div>
    </div>
`;

        shadow.appendChild(template.content.cloneNode(true));

        this.shadow = shadow;
        try {
            this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
            this.cart = [];
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        script.defer = true;
        shadow.appendChild(script);
    }

    connectedCallback() {
        setTimeout(() => {
            this.initializeUI();
            this.setupEventListeners();
        }, 500);

        window.addEventListener("inventoryChanged", () => {
            this.loadCartFromLocalStorage();
            this.displayCart(this.cart);
        });

        window.addEventListener("pendingStatusChanged", (event) => {
            const { imei, status } = event.detail;
            this.updateStatus(imei, status);
            this.displayCart(this.cart);
        });

        window.addEventListener("storage", () => {
            this.loadCartFromLocalStorage();
            this.displayCart(this.cart);
        });
    }

    initializeUI() {
        this.cartTable = this.shadow.querySelector("#cartItems");
        this.totalItemsElement = this.shadow.querySelector("#totalItems");
        this.totalValueElement = this.shadow.querySelector("#totalValue");
        this.displayCart(this.cart);
    }

    loadCartFromLocalStorage() {
        try {
            this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
        }
    }

    setupEventListeners() {
        this.shadow.querySelector("#filterStorage").addEventListener("change", () => this.applyFilters());
        this.shadow.querySelector("#filterPtaNon").addEventListener("change", () => this.applyFilters());
        this.shadow.querySelector("#searchIMEI").addEventListener("input", () => this.applyFilters());
        this.shadow.querySelector("#searchProductName").addEventListener("input", () => this.applyFilters());
    }

    displayCart(items) {
        if (!this.cartTable) return;

        this.cartTable.innerHTML = "";
        let totalImeiCount = 0;
        let totalValue = 0;
        const shopkeeperPendingPayments = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];
        const customerPendingPayments = JSON.parse(localStorage.getItem("pendingPayments")) || []; // If both exist

        if (items && items.length > 0) {
            items.forEach((product) => {
                if (product.imeiDetails && product.imeiDetails.length > 0) {
                    product.imeiDetails.forEach((imeiDetail, index) => {
                        const isShopkeeperPending = shopkeeperPendingPayments.some(payment => payment.product === imeiDetail.imei);
                        const isCustomerPending = customerPendingPayments.some(payment => payment.product === imeiDetail.imei);
                        const status = imeiDetail.isSold ? "Sold" : (isShopkeeperPending || isCustomerPending ? "Draft" : "Available");

                        let row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${imeiDetail.imei}</td>
                            <td>${product.name}</td>
                            <td>${product.supplier}</td>
                            <td>${product.brand}</td>
                            <td>${product.category}</td>
                            <td>$${imeiDetail.price.toFixed(2)}</td>
                            <td>${imeiDetail.storage}</td>
                            <td>${imeiDetail.ptaNon}</td>
                            <td class="${status === 'Sold' ? 'text-danger' : status === 'Draft' ? 'text-warning' : 'text-success'}">${status}</td>
                            <td>
                                <button class="btn btn-danger btn-sm delete-imei" 
                                        data-product-id="${product.id}" 
                                        data-imei-index="${index}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>   
                                    </svg>
                                </button>
                            </td>
                        `;
                        this.cartTable.appendChild(row);

                        totalImeiCount++;
                        totalValue += imeiDetail.price;
                    });
                }
            });
        }

        this.totalItemsElement.textContent = totalImeiCount;
        this.totalValueElement.textContent = totalValue.toFixed(2);

        if (totalImeiCount === 0) {
            let emptyRow = document.createElement("tr");
            emptyRow.innerHTML = `<td colspan="10" class="text-center">No products available</td>`;
            this.cartTable.appendChild(emptyRow);
        }

        this.shadow.querySelectorAll(".delete-imei").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = event.currentTarget.getAttribute("data-product-id");
                const imeiIndex = parseInt(event.currentTarget.getAttribute("data-imei-index"));
                this.removeImei(productId, imeiIndex);
            });
        });
    }

    updateStatus(imei, status) {
        const shopkeeperPendingPayments = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];
        const customerPendingPayments = JSON.parse(localStorage.getItem("pendingPayments")) || [];
        const isPending = shopkeeperPendingPayments.some(payment => payment.product === imei) || 
                          customerPendingPayments.some(payment => payment.product === imei);

        for (let product of this.cart) {
            const imeiDetail = product.imeiDetails.find(detail => detail.imei === imei);
            if (imeiDetail) {
                if (status === "Sold") {
                    imeiDetail.isSold = true;
                } else if (status === "Available" && !isPending) {
                    imeiDetail.isSold = false;
                }
                // No need to set "Draft" here; it's derived from pending payments in displayCart
                break;
            }
        }
        this.saveCartToLocalStorage();
    }

    removeImei(productId, imeiIndex) {
        const productIndex = this.cart.findIndex(item => item.id.toString() === productId);
        if (productIndex !== -1) {
            const product = this.cart[productIndex];
            product.imeiDetails.splice(imeiIndex, 1);
            if (product.imeiDetails.length === 0) {
                this.cart.splice(productIndex, 1);
            }
            this.saveCartToLocalStorage();
            this.displayCart(this.cart);
        }
    }

    saveCartToLocalStorage() {
        try {
            localStorage.setItem("cart", JSON.stringify(this.cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
        }
    }

    applyFilters() {
        const storageFilter = this.shadow.querySelector("#filterStorage").value;
        const ptaFilter = this.shadow.querySelector("#filterPtaNon").value;
        const imeiSearch = this.shadow.querySelector("#searchIMEI").value.trim().toLowerCase();
        const productSearch = this.shadow.querySelector("#searchProductName").value.trim().toLowerCase();

        let filteredCart = [...this.cart];

        if (storageFilter) {
            filteredCart = filteredCart.filter(product => 
                product.imeiDetails.some(imei => imei.storage.includes(storageFilter))
            );
        }

        if (ptaFilter) {
            filteredCart = filteredCart.filter(product => 
                product.imeiDetails.some(imei => imei.ptaNon === ptaFilter)
            );
        }

        if (imeiSearch) {
            filteredCart = filteredCart.filter(product => 
                product.imeiDetails.some(imei => imei.imei.toLowerCase().includes(imeiSearch))
            );
        }

        if (productSearch) {
            filteredCart = filteredCart.filter(product => 
                product.name.toLowerCase().includes(productSearch)
            );
        }

        this.displayCart(filteredCart);
    }
}

customElements.define('product-list', ProductList);