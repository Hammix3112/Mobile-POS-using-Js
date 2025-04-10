class customerForm extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        // Form Template
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container bg-white p-4 rounded shadow-lg">
            <h1 class="h3 fw-bold text-primary mb-3">Customer Details</h1>
            <div class="row">
                <div class="mb-2 col-lg-6">
                    <label for="customerName" class="form-label">Customer Name</label>
                    <input type="text" id="customerName" class="form-control" placeholder="Enter customer name">
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="customerCnic" class="form-label">CNIC</label>
                    <input type="number" id="customerCnic" class="form-control" placeholder="Enter CNIC">
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="customerProduct" class="form-label">Purchased Product IMEI:</label>
                    <input type="text" id="customerProduct" class="form-control" placeholder="Enter product IMEI">
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="contactNo" class="form-label">Contact No.</label>
                    <input type="number" id="contactNo" class="form-control" placeholder="Enter contact number">
                </div>
            </div>
            <button id="addCustomer" class="btn btn-primary mt-3">Add New Customer</button>
        </div>`;

        shadow.appendChild(template.content.cloneNode(true));

        this.addCustomerEvent();
    }

    addCustomerEvent() {
        const shadow = this.shadowRoot;
        
        shadow.getElementById("addCustomer").addEventListener("click", () => {
            let name = shadow.getElementById("customerName").value.trim();
            let cnic = shadow.getElementById("customerCnic").value.trim();
            let product = shadow.getElementById("customerProduct").value.trim();
            let contact = shadow.getElementById("contactNo").value.trim();

            if (name && cnic && product && contact) {
                let customers = JSON.parse(localStorage.getItem("customers")) || [];
                let newCustomer = { name, cnic, product, contact };
                customers.push(newCustomer);
                localStorage.setItem("customers", JSON.stringify(customers));

                // Dispatch an event so the table updates
                document.dispatchEvent(new CustomEvent("customerAdded"));

                // Clear fields
                this.clearFields();
            }
        });
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
customElements.define('customer-component', customerForm);

