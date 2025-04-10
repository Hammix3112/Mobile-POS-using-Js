class SellList extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        // HTML Template
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="bg-light py-4 d-flex flex-wrap align-items-center">
            <div class="container bg-white p-4 rounded shadow-lg ">
                <h1 class="h3 fw-bold mb-3 text-primary">Sell List</h1>
                
                <div class="d-flex flex-wrap gap-3">
                    <!-- Storage Filter Dropdown -->
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

                    <!-- PTA/NON-PTA Filter Dropdown -->
                    <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                        <label for="filterPtaNon" class="form-label">Filter by PTA/NON-PTA</label>
                        <select id="filterPtaNon" class="form-select">
                            <option value="">All</option>
                            <option value="PTA">PTA</option>
                            <option value="NON-PTA">NON-PTA</option>
                        </select>
                    </div>

                    <!-- IMEI Search Bar -->
                    <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                        <label for="searchIMEI" class="form-label">Search by IMEI</label>
                        <input type="text" id="searchIMEI" class="form-control" placeholder="Enter IMEI">
                    </div>

                    <!-- Payment Method Filter Dropdown -->
                    <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                        <label for="filterPaymentMethod" class="form-label">Filter by Payment Method</label>
                        <select id="filterPaymentMethod" class="form-select">
                            <option value="">All</option>
                            <option value="Easypaisa">Easypaisa</option>
                            <option value="JazzCash">JazzCash</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <!-- Product Name Filter Dropdown -->
                    <div class="mb-3 col-lg-3 col-md-4 col-sm-6">
                        <label for="filterProductName" class="form-label">Filter by Product Name</label>
                        <select id="filterProductName" class="form-select">
                            <option value="">All</option>
                            <!-- Options populated dynamically -->
                        </select>
                    </div>
                </div>
                
                <!-- Sell Table -->
                <div class="table-responsive">
                    <table class="table table-bordered text-center">
                        <thead class="table-primary">
                            <tr>
                                <th>IMEI</th>
                                <th>Name</th>
                                <th>Customer</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Storage</th>
                                <th>PTA/NON</th>
                                <th>Payment</th>
                                <th>Actions</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="sellItems">
                            <!-- Sell items will be added here dynamically -->
                        </tbody>
                    </table>
                </div>

                <!-- Add New Sale Button -->
                <a href="sellproduct.html" class="btn btn-primary mt-3">Add New Sale</a>
            </div>
        </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        // Load Bootstrap JS
        const bootstrapScript = document.createElement("script");
        bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        bootstrapScript.defer = true;
        bootstrapScript.onload = () => this.initializeSell();
        shadow.appendChild(bootstrapScript);

        this.shadow = shadow;
    }

    initializeSell() {
        let sell = JSON.parse(localStorage.getItem("sell")) || [];
        const shadow = this.shadow;

        // Sell Table
        let sellTable = shadow.querySelector("#sellItems");

        // Populate Product Name Filter
        const productNameSelect = shadow.querySelector("#filterProductName");
        const uniqueProductNames = [...new Set(sell.map(item => item.name))];
        uniqueProductNames.forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            productNameSelect.appendChild(option);
        });

        function displaySell(items) {
            sellTable.innerHTML = "";
            items.forEach((item, index) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.imei}</td>
                    <td>${item.name}</td>
                    <td>${item.customerName || 'N/A'}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>${item.storage}GB</td>
                    <td>${item.ptaNon}</td>
                    <td>${item.paymentMethod || 'N/A'}</td>
                    <td>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                        <button class="btn btn-info btn-sm print-btn" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                            </svg>
                        </button>
                    </td>
                    <td class="fw-bold text-danger">Sold</td>
                `;
                sellTable.appendChild(row);
            });

            // Delete button event listeners
            shadow.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    removeItem(index);
                });
            });

            // Print button event listeners
            shadow.querySelectorAll(".print-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    printReceipt(items[index]);
                });
            });
        }

        function removeItem(index) {
            sell.splice(index, 1);
            localStorage.setItem("sell", JSON.stringify(sell));
            displaySell(sell);
        }

        function printReceipt(item) {
            const receiptWindow = window.open('', '_blank');
            receiptWindow.document.write(`
                <html>
                <head>
                    <title>Sale Receipt</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .receipt { max-width: 400px; margin: auto; border: 1px solid #000; padding: 20px; }
                        h2 { text-align: center; }
                        .details { margin: 10px 0; }
                        .details div { margin: 5px 0; }
                        .total { font-weight: bold; margin-top: 10px; }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <h2>Sale Receipt</h2>
                        <div class="details">
                            <div><strong>IMEI:</strong> ${item.imei}</div>
                            <div><strong>Product Name:</strong> ${item.name}</div>
                            <div><strong>Customer Name:</strong> ${item.customerName || 'N/A'}</div>
                            <div><strong>Price:</strong> $${item.price.toFixed(2)}</div>
                            <div><strong>Quantity:</strong> ${item.quantity}</div>
                            <div><strong>Storage:</strong> ${item.storage}GB</div>
                            <div><strong>PTA Status:</strong> ${item.ptaNon}</div>
                            <div><strong>Payment Method:</strong> ${item.paymentMethod || 'N/A'}</div>
                            <div><strong>Date:</strong> ${new Date(item.date).toLocaleString()}</div>
                        </div>
                        <div class="total">Total: $${item.total.toFixed(2)}</div>
                    </div>
                    <script>
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    </script>
                </body>
                </html>
            `);
            receiptWindow.document.close();
        }

        // Filter Events
        shadow.querySelector("#filterStorage").addEventListener("change", function () {
            applyFilters();
        });

        shadow.querySelector("#filterPtaNon").addEventListener("change", function () {
            applyFilters();
        });

        shadow.querySelector("#searchIMEI").addEventListener("input", function () {
            applyFilters();
        });

        shadow.querySelector("#filterPaymentMethod").addEventListener("change", function () {
            applyFilters();
        });

        shadow.querySelector("#filterProductName").addEventListener("change", function () {
            applyFilters();
        });

        // Combined filter function
        function applyFilters() {
            const storageFilter = shadow.querySelector("#filterStorage").value;
            const ptaNonFilter = shadow.querySelector("#filterPtaNon").value;
            const imeiSearch = shadow.querySelector("#searchIMEI").value.trim();
            const paymentMethodFilter = shadow.querySelector("#filterPaymentMethod").value;
            const productNameFilter = shadow.querySelector("#filterProductName").value;

            let filteredSell = sell;

            if (storageFilter) {
                filteredSell = filteredSell.filter(item => item.storage === storageFilter);
            }
            if (ptaNonFilter) {
                filteredSell = filteredSell.filter(item => item.ptaNon.toLowerCase() === ptaNonFilter.toLowerCase());
            }
            if (imeiSearch) {
                filteredSell = filteredSell.filter(item => item.imei.includes(imeiSearch));
            }
            if (paymentMethodFilter) {
                filteredSell = filteredSell.filter(item => item.paymentMethod === paymentMethodFilter);
            }
            if (productNameFilter) {
                filteredSell = filteredSell.filter(item => item.name === productNameFilter);
            }

            displaySell(filteredSell);
        }

        displaySell(sell);
    }
}

customElements.define('sell-list', SellList);