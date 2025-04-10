class logOut extends HTMLElement {
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
        <div class="container bg-white p-4 rounded shadow-lg text-center" style="max-width: 800px;">
            <h1 class="h5 mb-3">You are logging out from Mobile POS</h1>
            <button id="logoutBtn" class="btn btn-danger  w-10">Logout</button>
        </div>
    </div>
        `;

        // Attach template to Shadow DOM
        shadow.appendChild(template.content.cloneNode(true));

        // Load Bootstrap JS inside Shadow DOM
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        script.defer = true;
        shadow.appendChild(script);
    }

    connectedCallback() {
        this.checkAuth();
        this.shadowRoot.getElementById("logoutBtn").addEventListener("click", () => this.logout());
    }

    checkAuth() {
        const user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "login.html"; // Redirect to login if not authenticated
        }
    }

    logout() {
        localStorage.removeItem("user");
        window.location.href = "login.html";
    }
}

// Define the custom element
customElements.define('log-out', logOut);

// Login Page Script (Create login.html with a simple form)
if (window.location.pathname.includes("login.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            if (username && password) {
                localStorage.setItem("user", username);
                window.location.href = "dashboard.html";
            } else {
                alert("Please enter valid credentials");
            }
        });
    });
}