class ShopkepperPendings extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        // HTML Template with Adjusted IDs and Labels
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container bg-white p-4 rounded shadow-lg">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h5 fw-bold text-primary mt-4">Shopkeeper Pending Payments</h1>
                <button class="btn btn-primary" id="printShopkeeperPayments">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                    </svg> Print
                </button>
            </div>
            <button class="btn btn-success mb-4 shadow-sm" id="openShopkeeperPaymentForm">
                + Add Shopkeeper Pending Payment
            </button>

            <div class="table-responsive">
                <table class="table table-bordered table-hover" id="shopkeeperPaymentTable">
                    <thead class="table-dark">
                        <tr>
                            <th>Shop Name</th>
                            <th>Pendings</th>
                            <th>Sell.Price</th>
                            <th>Pro.Name</th>
                            <th>IMEI</th>
                            <th>Contact</th>
                            <th>CNIC</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

        <!-- Modal for Adding Shopkeeper Pending Payment -->
        <div id="shopkeeperPaymentModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content shadow">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Add New Shopkeeper Pending Payment</h5>
                        <button type="button" class="btn-close btn-close-white" id="closeShopkeeperModal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="shopkeeperName" class="form-label fw-semibold">Shopkeeper Name</label>
                                <input type="text" id="shopkeeperName" class="form-control rounded-3" placeholder="Enter shopkeeper name" required>
                            </div>
                            <div class="col-md-6">
                                <label for="shopkeeperPendingAmount" class="form-label fw-semibold">Pending Amount</label>
                                <input type="number" id="shopkeeperPendingAmount" class="form-control rounded-3" step="0.01" placeholder="0.00" required>
                            </div>
                            <div class="col-md-6">
                                <label for="shopkeeperSellingPrice" class="form-label fw-semibold">Selling Price</label>
                                <input type="number" id="shopkeeperSellingPrice" class="form-control rounded-3" step="0.01" placeholder="0.00" required>
                            </div>
                            <div class="col-md-6">
                                <label for="shopkeeperProductName" class="form-label fw-semibold">Product Name</label>
                                <input type="text" id="shopkeeperProductName" class="form-control rounded-3" placeholder="Enter product name" required>
                            </div>
                            <div class="col-md-6">
                                <label for="shopkeeperProductImei" class="form-label fw-semibold">Product IMEI</label>
                                <input type="text" id="shopkeeperProductImei" class="form-control rounded-3" placeholder="Enter IMEI" required>
                            </div>
                            <div class="col-md-6">
                                <label for="shopkeeperContactNo" class="form-label fw-semibold">Contact No.</label>
                                <input type="number" id="shopkeeperContactNo" class="form-control rounded-3" placeholder="Enter contact number" required>
                            </div>
                            <div class="col-md-6">
                                <label for="shopkeeperCnic" class="form-label fw-semibold">Shopkeeper CNIC</label>
                                <input type="number" id="shopkeeperCnic" class="form-control rounded-3" placeholder="Enter CNIC" required>
                            </div>
                            <div class="col-md-6">
                                <label for="shopkeeperPaymentMethod" class="form-label fw-semibold">Payment Method</label>
                                <select id="shopkeeperPaymentMethod" class="form-select rounded-3" required>
                                    <option value="">Select Payment Method</option>
                                    <option value="Easypaisa">Easypaisa</option>
                                    <option value="JazzCash">JazzCash</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-light">
                        <button class="btn btn-outline-secondary" id="closeShopkeeperModalFooter">Cancel</button>
                        <button class="btn btn-primary shadow-sm" id="addShopkeeperPayment">Save Payment</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        // Bootstrap Icons
        const iconLink = document.createElement('link');
        iconLink.rel = 'stylesheet';
        iconLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
        shadow.appendChild(iconLink);

        // Event Listeners
        this.setupEventListeners();
        this.loadPendingPayments();
    }

    setupEventListeners() {
        const shadow = this.shadowRoot;
        const openButton = shadow.getElementById("openShopkeeperPaymentForm");
        const modal = shadow.getElementById("shopkeeperPaymentModal");
        const closeButton = shadow.getElementById("closeShopkeeperModal");
        const closeButtonFooter = shadow.getElementById("closeShopkeeperModalFooter");
        const printButton = shadow.getElementById("printShopkeeperPayments");

        openButton.addEventListener("click", () => {
            modal.classList.add("show");
            modal.style.display = "block";
        });

        closeButton.addEventListener("click", this.closeModal.bind(this));
        closeButtonFooter.addEventListener("click", this.closeModal.bind(this));

        shadow.getElementById("addShopkeeperPayment").addEventListener("click", () => {
            this.addPendingPayment();
            this.closeModal();
        });

        printButton.addEventListener("click", () => {
            this.printTable();
        });
    }

    closeModal() {
        const modal = this.shadowRoot.getElementById("shopkeeperPaymentModal");
        modal.classList.remove("show");
        modal.style.display = "none";
    }

    addPendingPayment() {
        const shadow = this.shadowRoot;
        const paymentTable = shadow.querySelector("#shopkeeperPaymentTable tbody");

        let name = shadow.getElementById("shopkeeperName").value.trim();
        let pendingAmount = shadow.getElementById("shopkeeperPendingAmount").value.trim();
        let sellingPrice = shadow.getElementById("shopkeeperSellingPrice").value.trim();
        let productName = shadow.getElementById("shopkeeperProductName").value.trim();
        let product = shadow.getElementById("shopkeeperProductImei").value.trim();
        let contact = shadow.getElementById("shopkeeperContactNo").value.trim();
        let cnic = shadow.getElementById("shopkeeperCnic").value.trim();
        let paymentMethod = shadow.getElementById("shopkeeperPaymentMethod").value;

        if (name && pendingAmount && sellingPrice && productName && product && contact && cnic && paymentMethod) {
            let payments = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];
            let newPayment = { name, pendingAmount, sellingPrice, productName, product, contact, cnic, paymentMethod };
            payments.push(newPayment);
            localStorage.setItem("shopkeeperPendingPayments", JSON.stringify(payments));

            this.addPaymentToTable(paymentTable, newPayment);
            this.clearFields();

            // Notify ProductList of status change
            this.updateProductStatus(product, "Draft");
        }
    }

    addPaymentToTable(table, payment) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${payment.name}</td>
            <td>${payment.pendingAmount}</td>
            <td>${payment.sellingPrice}</td>
            <td>${payment.productName}</td>
            <td>${payment.product}</td>
            <td>${payment.contact}</td>
            <td>${payment.cnic}</td>
            <td>${payment.paymentMethod}</td>
            <td>
                <button class='btn btn-danger btn-sm delete-btn me-2' title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
                <button class='btn btn-warning btn-sm draft-btn me-2' title="Sell as Draft">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </button>
                <button class='btn btn-info btn-sm return-btn' title="Return Payment">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </button>
            </td>
        `;

        row.querySelector(".delete-btn").addEventListener("click", () => {
            this.deletePendingPayment(payment.name, payment.product);
            this.updateProductStatus(payment.product, "Available");
            row.remove();
        });

        row.querySelector(".draft-btn").addEventListener("click", () => {
            this.sellProduct(payment);
            this.deletePendingPayment(payment.name, payment.product);
            this.updateProductStatus(payment.product, "Sold");
            row.remove();
        });

        row.querySelector(".return-btn").addEventListener("click", () => {
            this.returnPendingPayment(payment);
            this.updateProductStatus(payment.product, "Available");
            row.remove();
        });

        table.appendChild(row);
    }

    loadPendingPayments() {
        const shadow = this.shadowRoot;
        const paymentTable = shadow.querySelector("#shopkeeperPaymentTable tbody");
        let payments = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];
        payments.forEach(payment => {
            this.addPaymentToTable(paymentTable, payment);
            this.updateProductStatus(payment.product, "Draft");
        });
    }

    deletePendingPayment(name, product) {
        let payments = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];
        payments = payments.filter(payment => !(payment.name === name && payment.product === product));
        localStorage.setItem("shopkeeperPendingPayments", JSON.stringify(payments));
    }

    returnPendingPayment(payment) {
        // Remove the payment from shopkeeperPendingPayments in localStorage
        let payments = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];
        payments = payments.filter(p => !(p.name === payment.name && p.product === payment.product));
        localStorage.setItem("shopkeeperPendingPayments", JSON.stringify(payments));

        // Optionally, log the return action or notify the user
        console.log(`Payment for ${payment.product} returned successfully.`);
    }

    sellProduct(payment) {
        let inventory = JSON.parse(localStorage.getItem("cart")) || [];
        let salesData = JSON.parse(localStorage.getItem("sell")) || [];
        const currentDate = new Date().toISOString();

        let productFound = false;
        for (let product of inventory) {
            const imeiDetail = product.imeiDetails.find(imei => imei.imei === payment.product);
            if (imeiDetail) {
                productFound = true;
                imeiDetail.isSold = true;
                imeiDetail.quantity = 0;
                product.quantity = product.imeiDetails.filter(imei => 
                    !imei.isSold && (!imei.hasOwnProperty('quantity') || imei.quantity > 0)
                ).length;

                if (product.quantity === 0) {
                    product.inStock = false;
                }

                salesData.push({
                    productId: product.id,
                    name: product.name,
                    customerName: payment.name,
                    price: parseFloat(payment.sellingPrice),
                    quantity: 1,
                    storage: imeiDetail.storage || "Unknown",
                    ptaNon: imeiDetail.ptaNon || "Unknown",
                    imei: payment.product,
                    paymentMethod: payment.paymentMethod,
                    total: parseFloat(payment.sellingPrice),
                    date: currentDate
                });
                break;
            }
        }

        if (!productFound) {
            alert(`Product with IMEI ${payment.product} not found in inventory!`);
            return;
        }

        localStorage.setItem("cart", JSON.stringify(inventory));
        localStorage.setItem("sell", JSON.stringify(salesData));

        const inventoryChangedEvent = new CustomEvent('inventoryChanged', {
            bubbles: true,
            composed: true,
            detail: { updatedInventory: inventory }
        });
        window.dispatchEvent(inventoryChangedEvent);
    }

    updateProductStatus(imei, status) {
        const inventoryChangedEvent = new CustomEvent('pendingStatusChanged', {
            bubbles: true,
            composed: true,
            detail: { imei, status }
        });
        window.dispatchEvent(inventoryChangedEvent);
    }

    clearFields() {
        const shadow = this.shadowRoot;
        shadow.getElementById("shopkeeperName").value = "";
        shadow.getElementById("shopkeeperPendingAmount").value = "";
        shadow.getElementById("shopkeeperSellingPrice").value = "";
        shadow.getElementById("shopkeeperProductName").value = "";
        shadow.getElementById("shopkeeperProductImei").value = "";
        shadow.getElementById("shopkeeperContactNo").value = "";
        shadow.getElementById("shopkeeperCnic").value = "";
        shadow.getElementById("shopkeeperPaymentMethod").value = "";
    }

    printTable() {
        const shadow = this.shadowRoot;
        const table = shadow.getElementById("shopkeeperPaymentTable").outerHTML;
        const title = "<h1>Shopkeeper Pending Payments</h1>";
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Shopkeeper Pending Payments</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
                    <style>
                        body { padding: 20px; }
                        .btn { display: none; }
                        @media print {
                            body { margin: 0; }
                        }
                    </style>
                </head>
                <body>
                    ${title}
                    ${table}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
}

customElements.define('shopkepper-pendings', ShopkepperPendings);