class ReportPage extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        // Bootstrap Icons
        const iconLink = document.createElement('link');
        iconLink.rel = 'stylesheet';
        iconLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
        shadow.appendChild(iconLink);

        // HTML Template
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="container bg-white p-4 rounded shadow-lg">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="h5 fw-bold text-primary mt-4">Transaction Report</h1>
                    <div>
                        <button class="btn btn-primary me-2" id="printReport">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                      </svg> Print Full Report
                        </button>
                        <button class="btn btn-info" id="printDailyReport">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                      </svg> Print Daily Report
                        </button>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card text-center p-3">
                            <h6 class="fw-bold">Total Available</h6>
                            <p class="h4 text-primary" id="totalAvailable">0.00</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center p-3">
                            <h6 class="fw-bold">Total Sales</h6>
                            <p class="h4 text-success" id="totalSales">0.00</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center p-3">
                            <h6 class="fw-bold">Total Pending</h6>
                            <p class="h4 text-warning" id="totalPending">0.00</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center p-3">
                            <h6 class="fw-bold">Total Expenses</h6>
                            <p class="h4 text-danger" id="totalExpenses">0.00</p>
                        </div>
                    </div>
                    <div class="col-md-3 mt-3">
                        <div class="card text-center p-3" id="totalProfit" style="display: none;">
                            <h6 class="fw-bold">Total Profit</h6>
                            <p class="h4 text-success" id="profitAmount">0.00</p>
                        </div>
                        <div class="card text-center p-3" id="totalLoss" style="display: none;">
                            <h6 class="fw-bold">Total Loss</h6>
                            <p class="h4 text-danger" id="lossAmount">0.00</p>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="mb-4">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <label for="startDate" class="form-label fw-semibold">Start Date</label>
                            <input type="date" id="startDate" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label for="endDate" class="form-label fw-semibold">End Date</label>
                            <input type="date" id="endDate" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label for="typeFilter" class="form-label fw-semibold">Type</label>
                            <select id="typeFilter" class="form-select">
                                <option value="all">All</option>
                                <option value="shopkeeper">Shopkeeper</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="statusFilter" class="form-label fw-semibold">Status</label>
                            <select id="statusFilter" class="form-select">
                                <option value="all">All</option>
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                                <option value="pending">Pending</option>
                                <option value="returned">Returned</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-secondary" id="clearFilters">Clear Filters</button>
                    </div>
                </div>

                <!-- Transactions Table -->
                <div class="table-responsive mb-4">
                    <h6 class="fw-bold">Detailed Transactions</h6>
                    <table class="table table-bordered table-hover" id="reportTable">
                        <thead class="table-dark">
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Product</th>
                                <th>IMEI</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <!-- Daily Summary Table -->
                <div class="table-responsive">
                    <h6 class="fw-bold">Daily Summary</h6>
                    <table class="table table-bordered table-hover" id="dailyTable">
                        <thead class="table-dark">
                            <tr>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Available</th>
                                <th>Sales</th>
                                <th>Pending</th>
                                <th>Expenses</th>
                                <th>Profit/Loss</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
        this.setupEventListeners();
        this.loadReportData();
    }

    setupEventListeners() {
        const shadow = this.shadowRoot;
        const printButton = shadow.getElementById("printReport");
        const printDailyButton = shadow.getElementById("printDailyReport");
        const startDate = shadow.getElementById("startDate");
        const endDate = shadow.getElementById("endDate");
        const typeFilter = shadow.getElementById("typeFilter");
        const statusFilter = shadow.getElementById("statusFilter");
        const clearFilters = shadow.getElementById("clearFilters");

        printButton.addEventListener("click", () => this.printReport());
        printDailyButton.addEventListener("click", () => this.printDailyReport());
        [startDate, endDate, typeFilter, statusFilter].forEach(element => {
            element.addEventListener("change", () => this.loadReportData());
        });
        clearFilters.addEventListener("click", () => this.clearFilters());
    }

    loadReportData() {
        const shadow = this.shadowRoot;
        const tableBody = shadow.querySelector("#reportTable tbody");
        const dailyTableBody = shadow.querySelector("#dailyTable tbody");
        const startDate = shadow.getElementById("startDate").value;
        const endDate = shadow.getElementById("endDate").value;
        const typeFilter = shadow.getElementById("typeFilter").value;
        const statusFilter = shadow.getElementById("statusFilter").value;

        // Fetch data from localStorage
        const shopkeeperPendings = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];
        const customerPendings = JSON.parse(localStorage.getItem("pendingPayments")) || [];
        const sales = JSON.parse(localStorage.getItem("sell")) || [];
        const inventory = JSON.parse(localStorage.getItem("cart")) || [];
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

        // Process available products
        const availableProducts = inventory.flatMap(item => {
            const unsoldItems = item.imeiDetails
                .filter(imei => !imei.isSold)
                .map(imei => {
                    const price = parseFloat(item.price) || 0;
                    console.log(`Item: ${item.name}, IMEI: ${imei.imei}, Price: ${price}`); // Debugging
                    return {
                        name: item.name,
                        productName: item.name,
                        product: imei.imei,
                        amount: price,
                        date: item.date || new Date().toISOString(),
                        type: "inventory",
                        paymentMethod: "N/A",
                        status: "available"
                    };
                });
            return unsoldItems;
        });
        console.log("Available Products:", availableProducts); // Debugging

        // Combine data
        const allTransactions = [
            ...shopkeeperPendings.map(p => ({ ...p, type: "shopkeeper", status: "pending", date: p.date || new Date().toISOString() })),
            ...customerPendings.map(p => ({ ...p, type: "customer", status: "pending", date: p.date || new Date().toISOString() })),
            ...sales.map(s => ({ ...s, type: s.customerName.includes("Shop") ? "shopkeeper" : "customer", status: "sold" })),
            ...availableProducts
        ];

        // Filter transactions for table
        let filteredTransactions = allTransactions.filter(t => {
            const date = new Date(t.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            return (
                (!start || date >= start) &&
                (!end || date <= end) &&
                (typeFilter === "all" || t.type === typeFilter) &&
                (statusFilter === "all" || t.status === statusFilter)
            );
        });

        // Calculate overall totals
        const totalSales = sales.reduce((sum, s) => sum + (parseFloat(s.total) || 0), 0);
        const totalPending = [
            ...shopkeeperPendings.map(p => parseFloat(p.pendingAmount) || 0),
            ...customerPendings.map(p => parseFloat(p.pendingAmount) || 0)
        ].reduce((sum, p) => sum + p, 0);
        const totalAvailable = availableProducts.reduce((sum, p) => {
            const amount = parseFloat(p.amount) || 0;
            console.log(`Adding to totalAvailable: ${amount}`); // Debugging
            return sum + amount;
        }, 0);
        const totalExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.price) || 0), 0);
        const profitLoss = totalSales - totalExpenses;

        console.log("Total Available Calculated:", totalAvailable); // Debugging

        // Update summary boxes
        shadow.getElementById("totalSales").textContent = totalSales.toFixed(2);
        shadow.getElementById("totalPending").textContent = totalPending.toFixed(2);
        shadow.getElementById("totalAvailable").textContent = totalAvailable.toFixed(2);
        shadow.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);

        const profitCard = shadow.getElementById("totalProfit");
        const lossCard = shadow.getElementById("totalLoss");
        const profitAmount = shadow.getElementById("profitAmount");
        const lossAmount = shadow.getElementById("lossAmount");
        if (profitLoss >= 0) {
            profitCard.style.display = "block";
            lossCard.style.display = "none";
            profitAmount.textContent = profitLoss.toFixed(2);
        } else {
            profitCard.style.display = "none";
            lossCard.style.display = "block";
            lossAmount.textContent = Math.abs(profitLoss).toFixed(2);
        }

        // Populate transactions table
        tableBody.innerHTML = "";
        filteredTransactions.forEach(t => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${new Date(t.date).toLocaleDateString()}</td>
                <td>${t.name || t.customerName || "Inventory"}</td>
                <td>${t.type}</td>
                <td>${t.productName || t.name}</td>
                <td>${t.product || t.imei}</td>
                <td>${t.sellingPrice || t.price || t.pendingAmount || t.amount}</td>
                <td>${t.paymentMethod}</td>
                <td>${t.status}</td>
            `;
            tableBody.appendChild(row);
        });

        // Daily Summary
        const dailyData = {};
        allTransactions.forEach(t => {
            const dateStr = new Date(t.date).toLocaleDateString();
            if (!dailyData[dateStr]) {
                dailyData[dateStr] = { available: 0, sales: 0, pending: 0, expenses: 0 };
            }
            if (t.status === "available") dailyData[dateStr].available += parseFloat(t.amount) || 0;
            if (t.status === "sold") dailyData[dateStr].sales += parseFloat(t.total) || parseFloat(t.price) || 0;
            if (t.status === "pending") dailyData[dateStr].pending += parseFloat(t.pendingAmount) || 0;
        });
        expenses.forEach(e => {
            const dateStr = new Date(e.date).toLocaleDateString();
            if (!dailyData[dateStr]) {
                dailyData[dateStr] = { available: 0, sales: 0, pending: 0, expenses: 0 };
            }
            dailyData[dateStr].expenses += parseFloat(e.price) || 0;
        });

        dailyTableBody.innerHTML = "";
        Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b)).forEach(date => {
            const day = new Date(date).toLocaleString('en-US', { weekday: 'long' });
            const { available, sales, pending, expenses } = dailyData[date];
            const dailyProfitLoss = sales - expenses;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${date}</td>
                <td>${day}</td>
                <td>${available.toFixed(2)}</td>
                <td>${sales.toFixed(2)}</td>
                <td>${pending.toFixed(2)}</td>
                <td>${expenses.toFixed(2)}</td>
                <td class="${dailyProfitLoss >= 0 ? 'text-success' : 'text-danger'}">${dailyProfitLoss.toFixed(2)}</td>
            `;
            dailyTableBody.appendChild(row);
        });
    }

    clearFilters() {
        const shadow = this.shadowRoot;
        shadow.getElementById("startDate").value = "";
        shadow.getElementById("endDate").value = "";
        shadow.getElementById("typeFilter").value = "all";
        shadow.getElementById("statusFilter").value = "all";
        this.loadReportData();
    }

    printReport() {
        const shadow = this.shadowRoot;
        const reportContent = shadow.querySelector(".container").outerHTML;
        const currentDate = new Date().toLocaleDateString();
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Transaction Report - ${currentDate}</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
                    <style>
                        body { padding: 20px; font-family: Arial, sans-serif; color: #333; }
                        .container { max-width: 1000px; margin: 0 auto; }
                        .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
                        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
                        .btn, .form-control, .form-select { display: none; }
                        .card { border: 1px solid #ddd; border-radius: 5px; margin-bottom: 10px; }
                        .table { font-size: 14px; border-collapse: collapse; }
                        th, td { border: 1px solid #ccc; padding: 8px; }
                        th { background-color: #343a40; color: white; }
                        @media print { 
                            body { margin: 0; padding: 0; }
                            .header, .footer { position: fixed; width: 100%; }
                            .header { top: 0; }
                            .footer { bottom: 0; }
                            .container { margin-top: 60px; margin-bottom: 40px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>Transaction Report</h2>
                        <p>Generated on ${currentDate}</p>
                    </div>
                    ${reportContent}
                    <div class="footer">
                        <p>Generated by Your Application | Page 1 of 1</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }

    printDailyReport() {
        const shadow = this.shadowRoot;
        const dailyTable = shadow.querySelector("#dailyTable").outerHTML;
        const currentDate = new Date().toLocaleDateString();
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Daily Transaction Report - ${currentDate}</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
                    <style>
                        body { padding: 20px; font-family: Arial, sans-serif; color: #333; }
                        .container { max-width: 1000px; margin: 0 auto; }
                        .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
                        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
                        .table { font-size: 14px; border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ccc; padding: 8px; text-align: right; }
                        th { background-color: #343a40; color: white; text-align: center; }
                        td:first-child, td:nth-child(2) { text-align: left; }
                        .text-success { color: #28a745; }
                        .text-danger { color: #dc3545; }
                        @media print { 
                            body { margin: 0; padding: 0; }
                            .header, .footer { position: fixed; width: 100%; }
                            .header { top: 0; }
                            .footer { bottom: 0; }
                            .container { margin-top: 60px; margin-bottom: 40px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>Daily Transaction Report</h2>
                        <p>Generated on ${currentDate}</p>
                    </div>
                    <div class="container">
                        ${dailyTable}
                    </div>
                    <div class="footer">
                        <p>Generated by Your Application | Page 1 of 1</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
}

customElements.define('report-page', ReportPage);