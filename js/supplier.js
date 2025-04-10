class Supplier extends HTMLElement {
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
        <div class="container bg-white p-4 rounded shadow-lg">
            <h1 class="h3 fw-bold text-primary mb-3">Supplier Details</h1>
            <div class="row">
                <div class="mb-2 col-lg-6">
                    <label for="supplierName" class="form-label">Supplier Name</label>
                    <input type="text" id="supplierName" class="form-control" placeholder="Enter supplier name">
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="supplierCnic" class="form-label">CNIC</label>
                    <input type="text" id="supplierCnic" class="form-control" placeholder="XXXXX-XXXXXXX-X">
                    <small id="cnicError" class="text-danger d-none">Invalid CNIC format! Use XXXXX-XXXXXXX-X</small>
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="supplierProduct" class="form-label">Product</label>
                    <input type="text" id="supplierProduct" class="form-control" placeholder="Enter product">
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="contactNo" class="form-label">Contact No.</label>
                    <input type="number" id="contactNo" class="form-control" placeholder="Enter contact number">
                </div>
            </div>
            <button id="addSupplier" class="btn btn-primary mt-3">Add New Supplier</button>
            <div id="popupMessage" class="alert alert-success d-none mt-3" role="alert">Supplier added successfully!</div>
        </div>`;

        // Attach template to Shadow DOM
        shadow.appendChild(template.content.cloneNode(true));

        this.addSupplierEvent();
    }

    addSupplierEvent() {
        const shadow = this.shadowRoot;
        const popupMessage = shadow.getElementById("popupMessage");

        shadow.getElementById("addSupplier").addEventListener("click", () => {
            let name = shadow.getElementById("supplierName").value.trim();
            let cnic = shadow.getElementById("supplierCnic").value.trim();
            let product = shadow.getElementById("supplierProduct").value.trim();
            let contact = shadow.getElementById("contactNo").value.trim();
            let cnicError = shadow.getElementById("cnicError");

            if (!this.validateCNIC(cnic)) {
                cnicError.classList.remove("d-none");
                return;
            } else {
                cnicError.classList.add("d-none");
            }

            if (name && cnic && product && contact) {
                let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
                let newSupplier = { name, cnic, product, contact };
                suppliers.push(newSupplier);
                localStorage.setItem("suppliers", JSON.stringify(suppliers));

                console.log("Supplier Added:", newSupplier);
                this.clearFields();

                // Show popup message
                popupMessage.classList.remove("d-none");
                setTimeout(() => popupMessage.classList.add("d-none"), 3000);
            }
        });
    }

    validateCNIC(cnic) {
        const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
        return cnicPattern.test(cnic);
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
customElements.define('supp-lier', Supplier);
