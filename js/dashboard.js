class Dashboard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        // Chart.js CDN
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        chartScript.defer = true;
        shadow.appendChild(chartScript);

        // HTML Template
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="bg-light py-4">
            <div class="container bg-white p-4 rounded shadow-lg">
                <h1 class="h3 fw-bold mb-4 text-primary">Dashboard</h1>
                <div class="row g-4">
                    <!-- Total Purchases -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card text-center h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Total Purchases</h5>
                                <p class="card-text display-6 fw-bold text-primary" id="totalPurchases">$0.00</p>
                            </div>
                        </div>
                    </div>
                    <!-- Total Sell -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card text-center h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Total Sell</h5>
                                <p class="card-text display-6 fw-bold text-success" id="totalSell">$0.00</p>
                            </div>
                        </div>
                    </div>
                    <!-- Total Items (Available Inventory) -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card text-center h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Total Products</h5>
                                <p class="card-text display-6 fw-bold text-info" id="totalItems">0</p>
                            </div>
                        </div>
                    </div>
                    <!-- Total Sell Products -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card text-center h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Total Sell Products</h5>
                                <p class="card-text display-6 fw-bold text-danger" id="totalSellProducts">0</p>
                            </div>
                        </div>
                    </div>
                    <!-- Total Expenses -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card text-center h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Total Expenses</h5>
                                <p class="card-text display-6 fw-bold text-secondary" id="totalExpenses">$0.00</p>
                            </div>
                        </div>
                    </div>
                    <!-- Total Profit -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card text-center h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Net Profit</h5>
                                <p class="card-text display-6 fw-bold text-warning" id="totalProfit">$0.00</p>
                            </div>
                        </div>
                    </div>
                    <!-- Total Pendings (New Section) -->
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card text-center h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Total Pendings</h5>
                                <p class="card-text display-6 fw-bold text-purple" id="totalPendings">$0.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Chart -->
                <div class="mt-5">
                    <h4 class="fw-bold text-secondary mb-3">Overview Chart</h4>
                    <canvas id="dashboardChart" style="max-height: 400px;"></canvas>
                </div>
            </div>
        </div>
        <style>
            .text-purple { color: #6f42c1; } /* Custom color for pendings */
        </style>
        `;

        shadow.appendChild(template.content.cloneNode(true));
        this.shadow = shadow;

        const bootstrapScript = document.createElement("script");
        bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        bootstrapScript.defer = true;
        shadow.appendChild(bootstrapScript);
    }

    connectedCallback() {
        setTimeout(() => {
            this.updateDashboard();
        }, 1000);

        window.addEventListener("inventoryChanged", () => this.updateDashboard());
        window.addEventListener("storage", () => this.updateDashboard());
        window.addEventListener("expensesChanged", () => this.updateDashboard());
        // Add listener for pending payment changes
        window.addEventListener("pendingStatusChanged", () => this.updateDashboard());
    }

    updateDashboard() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let sell = JSON.parse(localStorage.getItem("sell")) || [];
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        let customerPendings = JSON.parse(localStorage.getItem("pendingPayments")) || [];
        let shopkeeperPendings = JSON.parse(localStorage.getItem("shopkeeperPendingPayments")) || [];

        // Calculate Total Purchases
        let totalPurchases = 0;
        cart.forEach(product => {
            if (product.imeiDetails && product.imeiDetails.length > 0) {
                totalPurchases += product.imeiDetails.reduce((sum, imei) => sum + (parseFloat(imei.price) || 0), 0);
            }
        });

        // Calculate Total Sell
        let totalSell = 0;
        sell.forEach(item => {
            totalSell += (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
        });

        // Calculate Total Items
        let totalItems = cart.reduce((sum, product) => sum + (product.imeiDetails ? product.imeiDetails.length : 0), 0);

        // Calculate Total Sell Products
        let totalSellProducts = sell.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0);

        // Calculate Total Expenses
        let totalExpenses = expenses.reduce((sum, expense) => sum + (parseFloat(expense.price) || 0), 0);

        // Calculate Total Profit (Sell - Purchases - Expenses)
        let totalProfit = totalSell - totalPurchases - totalExpenses;

        // Calculate Total Pendings (Customer + Shopkeeper)
        let totalPendings = 0;
        customerPendings.forEach(pending => {
            totalPendings += parseFloat(pending.pendingAmount) || 0;
        });
        shopkeeperPendings.forEach(pending => {
            totalPendings += parseFloat(pending.pendingAmount) || 0;
        });

        // Update UI
        this.shadow.getElementById("totalPurchases").textContent = `$${totalPurchases.toFixed(2)}`;
        this.shadow.getElementById("totalSell").textContent = `$${totalSell.toFixed(2)}`;
        this.shadow.getElementById("totalItems").textContent = totalItems;
        this.shadow.getElementById("totalSellProducts").textContent = totalSellProducts;
        this.shadow.getElementById("totalExpenses").textContent = `$${totalExpenses.toFixed(2)}`;
        this.shadow.getElementById("totalProfit").textContent = `$${totalProfit.toFixed(2)}`;
        this.shadow.getElementById("totalPendings").textContent = `$${totalPendings.toFixed(2)}`;

        // Update Chart
        this.updateChart(totalPurchases, totalSell, totalItems, totalSellProducts, totalExpenses, totalProfit, totalPendings);
    }

    updateChart(totalPurchases, totalSell, totalItems, totalSellProducts, totalExpenses, totalProfit, totalPendings) {
        const ctx = this.shadow.getElementById("dashboardChart").getContext('2d');

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Purchases ($)', 'Sell ($)', 'Items', 'Sell Products', 'Expenses ($)', 'Profit ($)', 'Pendings ($)'],
                datasets: [{
                    label: 'Dashboard Metrics',
                    data: [totalPurchases, totalSell, totalItems, totalSellProducts, totalExpenses, totalProfit, totalPendings],
                    backgroundColor: [
                        'rgba(13, 110, 253, 0.6)',  // Primary (Purchases)
                        'rgba(25, 135, 84, 0.6)',   // Success (Sell)
                        'rgba(13, 202, 240, 0.6)',  // Info (Items)
                        'rgba(220, 53, 69, 0.6)',   // Danger (Sell Products)
                        'rgba(108, 117, 125, 0.6)', // Secondary (Expenses)
                        'rgba(255, 193, 7, 0.6)',   // Warning (Profit)
                        'rgba(111, 66, 193, 0.6)'   // Purple (Pendings)
                    ],
                    borderColor: [
                        'rgba(13, 110, 253, 1)',
                        'rgba(25, 135, 84, 1)',
                        'rgba(13, 202, 240, 1)',
                        'rgba(220, 53, 69, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(111, 66, 193, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label.includes('Items') || label.includes('Products')) {
                                    return `${label}: ${context.raw}`;
                                }
                                return `${label}: $${context.raw.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        });
    }
}

customElements.define('dash-board', Dashboard);