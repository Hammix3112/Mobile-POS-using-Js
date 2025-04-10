class UserSales extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
            <div class="container mt-4 p-4 bg-white border rounded shadow-sm">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="mb-0 text-primary">Profit Calculation</h3>
                    <button id="calculateProfit" class="btn btn-primary">Calculate Profit</button>
                </div>
                <div class="mt-4">
                    <table class="table table-bordered table-striped d-none" id="profitTable">
                        <thead class="table-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>IMEI</th>
                                <th>Quantity Sold</th>
                                <th>Selling Price</th>
                                <th>Cost Price</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody id="profitTableBody"></tbody>
                    </table>
                    <div id="totalProfit" class="mt-3 alert alert-info d-none"></div>
                    <div id="noDataMessage" class="mt-3 alert alert-warning d-none">No sales data available for profit calculation.</div>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById("calculateProfit").addEventListener("click", () => this.calculateProfit());

        // Listen for inventory or sales changes
        window.addEventListener("inventoryChanged", () => this.calculateProfit());
        window.addEventListener("storage", () => this.calculateProfit());
    }

    calculateProfit() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let sell = JSON.parse(localStorage.getItem("sell")) || [];

        console.log("Cart Data:", cart);
        console.log("Sell Data:", sell);

        let totalProfit = 0;
        let profitTableBody = this.shadowRoot.getElementById("profitTableBody");
        let profitTable = this.shadowRoot.getElementById("profitTable");
        let totalProfitDisplay = this.shadowRoot.getElementById("totalProfit");
        let noDataMessage = this.shadowRoot.getElementById("noDataMessage");

        profitTableBody.innerHTML = ""; // Clear previous data
        profitTable.classList.add("d-none");
        totalProfitDisplay.classList.add("d-none");
        noDataMessage.classList.add("d-none");

        if (sell.length === 0) {
            noDataMessage.textContent = "No sales data available for profit calculation.";
            noDataMessage.classList.remove("d-none");
            return;
        }

        sell.forEach(soldItem => {
            // Find the product in the inventory by IMEI
            let inventoryItem = cart.find(item =>
                item.imeiDetails.some(imei => imei.imei === soldItem.imei)
            );

            if (inventoryItem) {
                let imeiDetail = inventoryItem.imeiDetails.find(imei => imei.imei === soldItem.imei);
                if (imeiDetail) {
                    let costPrice = imeiDetail.price || 0;
                    let profit = (soldItem.price - costPrice) * soldItem.quantity;
                    totalProfit += profit;

                    // Add row to the table
                    let row = `
                        <tr>
                            <td>${soldItem.name}</td>
                            <td>${soldItem.imei}</td>
                            <td>${soldItem.quantity}</td>
                            <td>$${soldItem.price.toFixed(2)}</td>
                            <td>$${costPrice.toFixed(2)}</td>
                            <td class="${profit >= 0 ? 'text-success' : 'text-danger'} fw-bold">$${profit.toFixed(2)}</td>
                        </tr>
                    `;
                    profitTableBody.insertAdjacentHTML("beforeend", row);
                } else {
                    console.warn(`IMEI ${soldItem.imei} not found in inventory details for ${soldItem.name}`);
                }
            } else {
                console.warn(`No inventory match found for sold item: ${soldItem.name} (IMEI: ${soldItem.imei})`);
            }
        });

        // Show results
        if (profitTableBody.children.length > 0) {
            profitTable.classList.remove("d-none");
            totalProfitDisplay.innerHTML = `<strong>Gross Profit: $${totalProfit.toFixed(2)}</strong>`;
            totalProfitDisplay.classList.remove("d-none");
        } else {
            noDataMessage.textContent = "No matching inventory found for sales data!";
            noDataMessage.classList.remove("d-none");
        }
    }
}

customElements.define('user-sales', UserSales);