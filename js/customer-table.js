class customerTable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        // HTML Template (Includes the Modal Inside Shadow DOM)
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container bg-white p-4 rounded shadow-lg">
            <h1 class="h5 fw-bold text-primary mb-3 mt-4">All Customers</h1>
            <button class="btn btn-success mb-3" id="openCustomerForm">+ Add Customer</button>

            <table class="table table-bordered" id="customerTable">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>CNIC</th>
                        <th>Product IMEI</th>
                        <th>Contact No.</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <!-- Bootstrap Modal (Inside Shadow DOM) -->
        <div id="customerModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Customer</h5>
                        <button type="button" class="btn-close" id="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="customerName" class="form-label">Customer Name</label>
                            <input type="text" id="customerName" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="customerCnic" class="form-label">CNIC</label>
                            <input type="number" id="customerCnic" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="customerProduct" class="form-label">Product IMEI</label>
                            <input type="text" id="customerProduct" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="contactNo" class="form-label">Contact No.</label>
                            <input type="number" id="contactNo" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="closeModalFooter">Close</button>
                        <button class="btn btn-primary" id="addCustomer">Add Customer</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        // Event Listeners
        this.setupEventListeners();
        this.loadCustomers();
    }

    setupEventListeners() {
        const shadow = this.shadowRoot;
        const openButton = shadow.getElementById("openCustomerForm");
        const modal = shadow.getElementById("customerModal");
        const closeButton = shadow.getElementById("closeModal");
        const closeButtonFooter = shadow.getElementById("closeModalFooter");

        openButton.addEventListener("click", () => {
            modal.classList.add("show");
            modal.style.display = "block";
        });

        closeButton.addEventListener("click", this.closeModal.bind(this));
        closeButtonFooter.addEventListener("click", this.closeModal.bind(this));

        shadow.getElementById("addCustomer").addEventListener("click", () => {
            this.addCustomer();
            this.closeModal();
        });
    }

    closeModal() {
        const modal = this.shadowRoot.getElementById("customerModal");
        modal.classList.remove("show");
        modal.style.display = "none";
    }

    addCustomer() {
        const shadow = this.shadowRoot;
        const customerTable = shadow.querySelector("#customerTable tbody");

        let name = shadow.getElementById("customerName").value.trim();
        let cnic = shadow.getElementById("customerCnic").value.trim();
        let product = shadow.getElementById("customerProduct").value.trim();
        let contact = shadow.getElementById("contactNo").value.trim();

        if (name && cnic && product && contact) {
            let customers = JSON.parse(localStorage.getItem("customers")) || [];
            let newCustomer = { name, cnic, product, contact };
            customers.push(newCustomer);
            localStorage.setItem("customers", JSON.stringify(customers));

            this.addCustomerToTable(customerTable, newCustomer);
            this.clearFields();
        }
    }

    addCustomerToTable(table, customer) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.cnic}</td>
            <td>${customer.product}</td>
            <td>${customer.contact}</td>
            <td><button class='btn btn-danger btn-sm delete-btn'>Delete</button></td>
        `;

        row.querySelector(".delete-btn").addEventListener("click", () => {
            this.deleteCustomer(customer.name);
            row.remove();
        });

        table.appendChild(row);
    }

    loadCustomers() {
        const shadow = this.shadowRoot;
        const customerTable = shadow.querySelector("#customerTable tbody");
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers.forEach(customer => this.addCustomerToTable(customerTable, customer));
    }

    deleteCustomer(name) {
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers = customers.filter(customer => customer.name !== name);
        localStorage.setItem("customers", JSON.stringify(customers));
    }

    clearFields() {
        const shadow = this.shadowRoot;
        shadow.getElementById("customerName").value = "";
        shadow.getElementById("customerCnic").value = "";
        shadow.getElementById("customerProduct").value = "";
        shadow.getElementById("contactNo").value = "";
    }
}

// Define the custom element
customElements.define('customer-table', customerTable);
