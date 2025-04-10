class supplierTable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        // HTML Template (Includes the Modal)
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container bg-white p-4 rounded shadow-lg">
            <h1 class="h5 fw-bold text-primary mb-3 mt-4">All Suppliers</h1>
            <button class="btn btn-success mb-3" id="opensupplierForm">+ Add Supplier</button>

            <table class="table table-bordered" id="supplierTable">
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>CNIC</th>
                        <th>Product</th>
                        <th>Contact No.</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <!-- Bootstrap Modal -->
        <div id="supplierModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Supplier</h5>
                        <button type="button" class="btn-close" id="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="supplierName" class="form-label">Supplier Name</label>
                            <input type="text" id="supplierName" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="supplierCnic" class="form-label">CNIC</label>
                            <input type="text" id="supplierCnic" class="form-control" placeholder="XXXXX-XXXXXXX-X" maxlength="15">
                            <small id="cnicError" class="text-danger d-none">Invalid CNIC format! Use XXXXX-XXXXXXX-X</small>
                        </div>
                        <div class="mb-2">
                            <label for="supplierProduct" class="form-label">Product</label>
                            <input type="text" id="supplierProduct" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="contactNo" class="form-label">Contact No.</label>
                            <input type="number" id="contactNo" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="closeModalFooter">Close</button>
                        <button class="btn btn-primary" id="addsupplier">Add Supplier</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        // Event Listeners
        this.setupEventListeners();
        this.loadSuppliers();
    }

    setupEventListeners() {
        const shadow = this.shadowRoot;
        const openButton = shadow.getElementById("opensupplierForm");
        const modal = shadow.getElementById("supplierModal");
        const closeButton = shadow.getElementById("closeModal");
        const closeButtonFooter = shadow.getElementById("closeModalFooter");
        const cnicInput = shadow.getElementById("supplierCnic");

        // Open modal
        openButton.addEventListener("click", () => {
            modal.classList.add("show");
            modal.style.display = "block";
        });

        // Close modal
        closeButton.addEventListener("click", this.closeModal.bind(this));
        closeButtonFooter.addEventListener("click", this.closeModal.bind(this));

        // CNIC auto-format
        cnicInput.addEventListener("input", (event) => {
            let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
            if (value.length > 13) value = value.slice(0, 13) + "-" + value.slice(13);
            event.target.value = value;
        });

        // Add Supplier
        shadow.getElementById("addsupplier").addEventListener("click", () => {
            if (this.addsupplier()) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = this.shadowRoot.getElementById("supplierModal");
        modal.classList.remove("show");
        modal.style.display = "none";
    }

    addsupplier() {
        const shadow = this.shadowRoot;
        const supplierTable = shadow.querySelector("#supplierTable tbody");

        let name = shadow.getElementById("supplierName").value.trim();
        let cnic = shadow.getElementById("supplierCnic").value.trim();
        let product = shadow.getElementById("supplierProduct").value.trim();
        let contact = shadow.getElementById("contactNo").value.trim();
        let cnicError = shadow.getElementById("cnicError");

        // Validate CNIC
        if (!this.validateCNIC(cnic)) {
            cnicError.classList.remove("d-none");
            return false;
        } else {
            cnicError.classList.add("d-none");
        }

        if (name && cnic && product && contact) {
            let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
            let newSupplier = { name, cnic, product, contact };
            suppliers.push(newSupplier);
            localStorage.setItem("suppliers", JSON.stringify(suppliers));

            this.addsupplierToTable(supplierTable, newSupplier);
            this.clearFields();
            return true;
        }
        return false;
    }

    validateCNIC(cnic) {
        const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
        return cnicPattern.test(cnic);
    }

    addsupplierToTable(table, supplier) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.cnic}</td>
            <td>${supplier.product}</td>
            <td>${supplier.contact}</td>
            <td><button class='btn btn-danger btn-sm delete-btn'>Delete</button></td>
        `;

        row.querySelector(".delete-btn").addEventListener("click", () => {
            this.deletesupplier(supplier.name);
            row.remove();
        });

        table.appendChild(row);
    }

    loadSuppliers() {
        const shadow = this.shadowRoot;
        const supplierTable = shadow.querySelector("#supplierTable tbody");
        let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
        suppliers.forEach(supplier => this.addsupplierToTable(supplierTable, supplier));
    }

    deletesupplier(name) {
        let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
        suppliers = suppliers.filter(supplier => supplier.name !== name);
        localStorage.setItem("suppliers", JSON.stringify(suppliers));
    }

    clearFields() {
        const shadow = this.shadowRoot;
        shadow.getElementById("supplierName").value = "";
        shadow.getElementById("supplierCnic").value = "";
        shadow.getElementById("supplierProduct").value = "";
        shadow.getElementById("contactNo").value = "";
    }
}

// Define the custom element
customElements.define('supplier-table', supplierTable);
