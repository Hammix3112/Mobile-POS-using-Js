class ExpenseTable extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        this.shadow.appendChild(link);

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="container bg-white p-4 rounded shadow-lg">
                <h1 class="h5 fw-bold text-primary mb-3 mt-4">All Expenses</h1>
                <div class="mb-3 d-flex justify-content-between">
                    <button class="btn btn-success" id="openExpenseForm">+ Add Expense</button>
                    <div>
                        <input type="text" class="form-control d-inline-block w-auto" id="filterInput" placeholder="Filter expenses...">
                        <button class="btn btn-primary ms-2" id="printBtn">Print</button>
                    </div>
                </div>
                <table class="table table-bordered" id="expenseTable">
                    <thead>
                        <tr>
                            <th class="sortable" data-sort="name">Expense Name</th>
                            <th class="sortable" data-sort="date">Date</th>
                            <th class="sortable" data-sort="day">Day</th>
                            <th class="sortable" data-sort="price">Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-end fw-bold">Total:</td>
                            <td id="totalAmount">$0.00</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div id="expenseModal" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Expense</h5>
                            <button type="button" class="btn-close" id="closeModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label for="expenseName" class="form-label">Expense Name</label>
                                <input type="text" id="expenseName" class="form-control">
                            </div>
                            <div class="mb-2">
                                <label for="expenseDate" class="form-label">Date</label>
                                <input type="date" id="expenseDate" class="form-control">
                            </div>
                            <div class="mb-2">
                                <label for="expenseDay" class="form-label">Day</label>
                                <input type="text" id="expenseDay" class="form-control">
                            </div>
                            <div class="mb-2">
                                <label for="expensePrice" class="form-label">Price</label>
                                <input type="number" step="0.01" id="expensePrice" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" id="closeModalFooter">Close</button>
                            <button class="btn btn-primary" id="addExpense">Add Expense</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.shadow.appendChild(template.content.cloneNode(true));
        this.setupEventListeners();
        this.loadExpenses();
    }

    setupEventListeners() {
        const shadow = this.shadow;
        const openButton = shadow.getElementById("openExpenseForm");
        const modal = shadow.getElementById("expenseModal");
        const closeButton = shadow.getElementById("closeModal");
        const closeButtonFooter = shadow.getElementById("closeModalFooter");
        const addButton = shadow.getElementById("addExpense");
        const filterInput = shadow.getElementById("filterInput");
        const printBtn = shadow.getElementById("printBtn");
        const sortHeaders = shadow.querySelectorAll(".sortable");

        openButton.addEventListener("click", () => {
            modal.classList.add("show");
            modal.style.display = "block";
            document.body.classList.add("modal-open");

            // Automatically set current date and day
            const today = new Date();
            shadow.getElementById("expenseDate").value = today.toISOString().split('T')[0]; // e.g., "2025-03-26"
            shadow.getElementById("expenseDay").value = today.toLocaleString('en-US', { weekday: 'long' }); // e.g., "Wednesday"
        });

        closeButton.addEventListener("click", () => this.closeModal());
        closeButtonFooter.addEventListener("click", () => this.closeModal());

        addButton.addEventListener("click", () => {
            if (this.addExpense()) {
                this.closeModal();
            }
        });

        filterInput.addEventListener("input", () => this.filterExpenses());

        printBtn.addEventListener("click", () => this.printExpenses());

        sortHeaders.forEach(header => {
            header.addEventListener("click", () => this.sortTable(header.dataset.sort));
        });
    }

    closeModal() {
        const modal = this.shadow.getElementById("expenseModal");
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }

    addExpense() {
        const expenseTable = this.shadow.querySelector("#expenseTable tbody");
        let name = this.shadow.getElementById("expenseName").value.trim();
        let date = this.shadow.getElementById("expenseDate").value.trim();
        let day = this.shadow.getElementById("expenseDay").value.trim();
        let price = this.shadow.getElementById("expensePrice").value.trim();

        if (name && date && day && price) {
            const newExpense = { 
                name: name,
                date: date,
                day: day,
                price: parseFloat(price)
            };

            let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
            expenses.push(newExpense);
            localStorage.setItem("expenses", JSON.stringify(expenses));

            this.addExpenseToTable(expenseTable, newExpense);
            this.clearFields();
            this.updateTotal();
            return true;
        } else {
            console.log("Please fill all fields");
            return false;
        }
    }

    addExpenseToTable(table, expense) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.date}</td>
            <td>${expense.day}</td>
            <td>$${expense.price.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        `;

        row.querySelector(".delete-btn").addEventListener("click", () => {
            this.deleteExpense(expense.name);
            row.remove();
            this.updateTotal();
        });

        table.appendChild(row);
    }

    loadExpenses() {
        const expenseTable = this.shadow.querySelector("#expenseTable tbody");
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenseTable.innerHTML = "";
        expenses.forEach(expense => this.addExpenseToTable(expenseTable, expense));
        this.updateTotal();
    }

    deleteExpense(name) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses = expenses.filter(expense => expense.name !== name);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        this.loadExpenses();
    }

    clearFields() {
        this.shadow.getElementById("expenseName").value = "";
        this.shadow.getElementById("expenseDate").value = "";
        this.shadow.getElementById("expenseDay").value = "";
        this.shadow.getElementById("expensePrice").value = "";
    }

    updateTotal() {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const total = expenses.reduce((sum, expense) => sum + expense.price, 0);
        this.shadow.getElementById("totalAmount").textContent = `$${total.toFixed(2)}`;
    }

    filterExpenses() {
        const filter = this.shadow.getElementById("filterInput").value.toLowerCase();
        const expenseTable = this.shadow.querySelector("#expenseTable tbody");
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        
        expenseTable.innerHTML = "";
        const filteredExpenses = expenses.filter(expense => 
            expense.name.toLowerCase().includes(filter) ||
            expense.date.toLowerCase().includes(filter) ||
            expense.day.toLowerCase().includes(filter) ||
            expense.price.toString().includes(filter)
        );
        
        filteredExpenses.forEach(expense => this.addExpenseToTable(expenseTable, expense));
        this.updateTotal();
    }

    sortTable(field) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const expenseTable = this.shadow.querySelector("#expenseTable tbody");
        
        expenses.sort((a, b) => {
            if (field === "price") {
                return a[field] - b[field];
            }
            return a[field].localeCompare(b[field]);
        });

        expenseTable.innerHTML = "";
        expenses.forEach(expense => this.addExpenseToTable(expenseTable, expense));
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    printExpenses() {
        const printWindow = window.open('', '_blank');
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const total = expenses.reduce((sum, expense) => sum + expense.price, 0);

        printWindow.document.write(`
            <html>
            <head>
                <title>Expense Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .total { font-weight: bold; }
                    h1 { color: #007bff; }
                </style>
            </head>
            <body>
                <h1>Expense Report</h1>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${expenses.map(expense => `
                            <tr>
                                <td>${expense.name}</td>
                                <td>${expense.date}</td>
                                <td>${expense.day}</td>
                                <td>$${expense.price.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr class="total">
                            <td colspan="3">Total</td>
                            <td>$${total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.print();
    }
}

customElements.define('expense-table', ExpenseTable);