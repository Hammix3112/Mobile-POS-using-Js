class getHelp extends HTMLElement {
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
        <div class="bg-light py-4 d-flex flex-column align-items-center">
            <div class="container bg-white p-4 rounded shadow-lg">
                <h1 class="h3 fw-bold mb-3">Get Help with Mobile POS</h1>
                <p class="text-secondary">Need assistance with your Mobile POS System? Whether you're setting up
                 a new system, troubleshooting an issue, or looking for ways to optimize your
                  sales process, we're here to help. From integrating payment methods and managing
                   inventory to ensuring smooth transactions, our support team is ready to guide you
                    every step of the way.Contact us for expert advice and solutions tailored to your business needs.
                </p>
                <p class="text-secondary">
                 Security is a crucial aspect of mPOS systems, as they handle sensitive customer payment data.
                Modern mPOS solutions use end-to-end encryption and tokenization to protect transactions from
                 fraud and breaches. Regular software updates help maintain security and compliance with industry
                  standards. To maximize efficiency, businesses should train staff on best practices and 
               use analytics tools to gain insights into sales trends, customer behavior, and inventory levels
                </p>
                <p class="text-secondary">
                Setting up an mPOS system is simple and requires minimal hardware, such as a mobile device
                 and a card reader. Most mPOS systems integrate with inventory management and customer
                relationship management (CRM) tools, allowing businesses to streamline operations. Additionally,
                 features like barcode scanning, tax calculations, and multi-payment support make transactions seamless.
                  Many systems also support offline mode, ensuring business continuity even without an internet connection.
                </p>
                <p class="text-secondary">Need assistance with your Mobile POS System? Whether it's setup,
                 troubleshooting, or optimizing transactions, 
                 we're here to help. Contact us for expert support! (0800-0032001)
                </p>
                
            </div>
        </div>
        `;

        // Attach template to Shadow DOM
        shadow.appendChild(template.content.cloneNode(true));

        // Load Bootstrap JS inside Shadow DOM
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        script.defer = true;
        script.onload = () => this.initializeCart();
        shadow.appendChild(script);
    }

    initializeCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const shadow = this.shadowRoot;

  

            // Remove item event listener
            shadow.querySelectorAll("button[data-index]").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    removeItem(index);
                });
            });
        }
    }


// Define the custom element
customElements.define('get-help', getHelp);