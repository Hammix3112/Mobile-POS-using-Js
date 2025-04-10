class SellProduct extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        shadow.appendChild(link);

        const qrScript = document.createElement("script");
        qrScript.src = "https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js";
        shadow.appendChild(qrScript);

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
        shadow.appendChild(script);

        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container bg-white p-4 rounded shadow-lg py-4 d-flex flex-wrap align-items-center">
            <h1 class="h5 fw-bold text-primary mb-3">Add New Sale</h1>
            <div class="row w-100">
                <div class="mb-2 col-lg-6">
                    <label for="productName" class="form-label">Product Name</label>
                    <select id="productName" class="form-control">
                       <option value="">Select Product</option>
                    </select>
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="customerName" class="form-label">Customer Name</label>
                    <input type="text" id="customerName" class="form-control" placeholder="Enter customer name">
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="quantity" class="form-label">Quantity</label>
                    <input type="number" id="quantity" class="form-control" placeholder="Enter quantity" min="1" value="1">
                </div>
                <div class="mb-2 col-lg-6">
                    <label for="paymentMethod" class="form-label">Payment Method</label>
                    <select id="paymentMethod" class="form-control">
                        <option value="">Select Payment Method</option>
                        <option value="Easypaisa">Easypaisa</option>
                        <option value="JazzCash">JazzCash</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <div class="col-12">
                    <h3 class="h5 text-primary fw-bold mt-3">IMEI Details</h3>
                    <div class="mb-3">
                        <select id="imeiSelector" class="form-control">
                            <option value="">Select IMEI</option>
                        </select>
                    </div>
                </div>
                <div class="col-12">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>IMEI</th>
                                <th>Default Price</th>
                                <th>Selling Price</th>
                                <th>Product Storage</th>
                                <th>PTA Status</th>
                                <th>QR Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="imeiDetails">
                            <tr>
                                <td colspan="7" class="text-center">Select a product and IMEI to view details</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button id="addProduct" class="btn btn-primary mt-3">Add to Cart</button>
            
            <div id="cartContainer" class="mt-4 w-100" style="display: none;">
                <h3 class="h5 text-primary fw-bold">Current Cart</h3>
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Customer Name</th>
                            <th>IMEI</th>
                            <th>Storage</th>
                            <th>PTA Status</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Payment Method</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="cartItems">
                    </tbody>
                </table>
                <div class="d-flex justify-content-between align-items-center">
                    <h4 class="h6">Total: $<span id="cartTotal">0.00</span></h4>
                    <button id="checkoutBtn" class="btn btn-success">Checkout</button>
                </div>
            </div>
        </div>

        <div class="modal fade" id="sellModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Sale Confirmation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="modalMessage">
                        Product sold successfully!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        this.tempCart = [];
        this.inventory = [];
        
        try {
            this.inventory = JSON.parse(localStorage.getItem("cart")) || [];
            console.log("Loaded inventory data:", this.inventory);
        } catch (error) {
            console.error("Failed to load inventory data:", error);
            this.inventory = [];
        }

        this.shadow = shadow;
    }

    connectedCallback() {
        this.populateProductDropdown();
        this.addEventListeners();
    }

    addEventListeners() {
        const shadow = this.shadow;
        
        shadow.getElementById("productName").addEventListener("change", () => {
            console.log("Product changed");
            this.handleProductChange();
        });

        shadow.getElementById("imeiSelector").addEventListener("change", () => {
            console.log("IMEI changed");
            this.handleImeiChange();
        });

        shadow.getElementById("addProduct").addEventListener("click", () => {
            console.log("Add to Cart button clicked (main)");
            this.addToCart();
        });

        shadow.getElementById("checkoutBtn").addEventListener("click", () => {
            console.log("Checkout button clicked");
            this.checkout();
        });
    }

    populateProductDropdown() {
        const shadow = this.shadow;
        const productSelect = shadow.getElementById("productName");
        
        while (productSelect.options.length > 1) {
            productSelect.remove(1);
        }
        
        const uniqueProducts = [...new Set(this.inventory.map(item => item.name))];
        
        uniqueProducts.forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            productSelect.appendChild(option);
        });
    }

    handleProductChange() {
        const shadow = this.shadow;
        const productName = shadow.getElementById("productName").value;
        const imeiSelector = shadow.getElementById("imeiSelector");
        
        while (imeiSelector.options.length > 1) {
            imeiSelector.remove(1);
        }
        
        if (!productName) {
            return;
        }
        
        const products = this.inventory.filter(item => item.name === productName);
        
        products.forEach(product => {
            if (product.imeiDetails && product.imeiDetails.length > 0) {
                product.imeiDetails.forEach((imeiDetail, index) => {
                    if (!imeiDetail.isSold && (!imeiDetail.hasOwnProperty('quantity') || imeiDetail.quantity > 0)) {
                        const option = document.createElement("option");
                        option.value = `${product.id}-${index}`;
                        option.textContent = imeiDetail.imei;
                        option.dataset.productId = product.id;
                        imeiSelector.appendChild(option);
                    }
                });
            }
        });
    }

    handleImeiChange() {
        const shadow = this.shadow;
        const productName = shadow.getElementById("productName").value;
        const imeiSelector = shadow.getElementById("imeiSelector");
        const imeiValue = imeiSelector.value;
        const imeiDetailsTable = shadow.getElementById("imeiDetails");
        
        if (!productName || imeiValue === "") {
            imeiDetailsTable.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">Select a product and IMEI to view details</td>
                </tr>
            `;
            return;
        }
        
        const [productId, imeiIndex] = imeiValue.split('-').map(Number);
        const product = this.inventory.find(item => item.id === productId && item.name === productName);
        
        if (product && product.imeiDetails && product.imeiDetails[imeiIndex]) {
            const imeiDetail = product.imeiDetails[imeiIndex];
            
            imeiDetailsTable.innerHTML = `
                <tr>
                    <td>${imeiDetail.imei}</td>
                    <td>$${imeiDetail.price.toFixed(2)}</td>
                    <td>
                        <input type="number" class="form-control selling-price" value="${imeiDetail.price.toFixed(2)}" min="0" step="0.01">
                    </td>
                    <td>${imeiDetail.storage}</td>
                    <td>${imeiDetail.ptaNon}</td>
                    <td id="qrCodeContainer"></td>
                    <td>
                        <button class="btn btn-primary btn-sm add-imei">Add</button>
                    </td>
                </tr>
            `;
            
            setTimeout(() => {
                const qrCodeContainer = shadow.getElementById("qrCodeContainer");
                if (typeof QRCode !== 'undefined' && qrCodeContainer) {
                    new QRCode(qrCodeContainer, {
                        text: imeiDetail.imei,
                        width: 50,
                        height: 50
                    });
                }
            }, 100);
            
            const addButton = shadow.querySelector(".add-imei");
            if (addButton) {
                addButton.addEventListener("click", () => {
                    console.log("Add to Cart button clicked (IMEI table)");
                    this.addToCart();
                });
            } else {
                console.error("Add button in IMEI table not found");
            }
        }
    }

    addToCart() {
        console.log("addToCart() called");
        const shadow = this.shadow;
        const productName = shadow.getElementById("productName").value;
        const customerName = shadow.getElementById("customerName").value.trim();
        const imeiValue = shadow.getElementById("imeiSelector").value;
        const quantity = parseInt(shadow.getElementById("quantity").value) || 1;
        const paymentMethod = shadow.getElementById("paymentMethod").value;
        
        console.log("Inputs:", { productName, customerName, imeiValue, quantity, paymentMethod });

        if (!productName || !customerName || imeiValue === "" || isNaN(quantity) || quantity < 1 || !paymentMethod) {
            console.log("Validation failed");
            this.showModal("Please select a product, enter a customer name, select an IMEI, enter a valid quantity, and choose a payment method.");
            return;
        }
        
        const [productId, imeiIndex] = imeiValue.split('-').map(Number);
        const product = this.inventory.find(item => item.id === productId && item.name === productName);
        
        console.log("Selected product:", product);

        if (!product || !product.imeiDetails || !product.imeiDetails[imeiIndex]) {
            console.log("Product or IMEI not found");
            this.showModal("Product not found in inventory!");
            return;
        }
        
        const imeiDetail = product.imeiDetails[imeiIndex];
        
        const existingCartItem = this.tempCart.find(item => item.imei === imeiDetail.imei);
        if (existingCartItem) {
            console.log("IMEI already in cart");
            this.showModal("This IMEI is already in your cart!");
            return;
        }
        
        const sellingPriceInput = shadow.querySelector(".selling-price");
        const sellingPrice = parseFloat(sellingPriceInput.value);
        
        console.log("Selling price:", sellingPrice);

        if (isNaN(sellingPrice) || sellingPrice < 0) {
            console.log("Invalid selling price");
            this.showModal("Please enter a valid selling price.");
            return;
        }
        
        if (imeiDetail.hasOwnProperty('quantity') && imeiDetail.quantity < quantity) {
            console.log("Insufficient quantity");
            this.showModal(`Only ${imeiDetail.quantity} unit(s) available for this IMEI.`);
            return;
        }
        
        this.tempCart.push({
            productId: product.id,
            imeiIndex: imeiIndex,
            name: product.name,
            customerName: customerName,
            imei: imeiDetail.imei,
            storage: imeiDetail.storage,
            ptaNon: imeiDetail.ptaNon,
            quantity: quantity,
            price: sellingPrice,
            paymentMethod: paymentMethod, // Added payment method
            total: sellingPrice * quantity
        });
        
        console.log("Item added to cart:", this.tempCart[this.tempCart.length - 1]);
        this.updateCartDisplay();
        this.showModal("Product added to cart.");
    }

    updateCartDisplay() {
        const shadow = this.shadow;
        const cartContainer = shadow.getElementById("cartContainer");
        const cartItems = shadow.getElementById("cartItems");
        const cartTotal = shadow.getElementById("cartTotal");
        
        cartContainer.style.display = "block";
        
        cartItems.innerHTML = "";
        
        let total = 0;
        
        this.tempCart.forEach((item, index) => {
            total += item.total;
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.customerName}</td>
                <td>${item.imei}</td>
                <td>${item.storage}</td>
                <td>${item.ptaNon}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.paymentMethod}</td> <!-- Added payment method column -->
                <td>$${item.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </td>
            `;
            cartItems.appendChild(row);
        });
        
        cartTotal.textContent = total.toFixed(2);
        
        const removeButtons = shadow.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const index = parseInt(button.getAttribute("data-index"));
                this.removeFromTempCart(index);
            });
        });
    }

    removeFromTempCart(index) {
        this.tempCart.splice(index, 1);
        this.updateCartDisplay();
        
        if (this.tempCart.length === 0) {
            this.shadow.getElementById("cartContainer").style.display = "none";
        }
    }

    checkout() {
        if (this.tempCart.length === 0) {
            this.showModal("No items in cart to checkout.");
            return;
        }
        
        let currentInventory = JSON.parse(localStorage.getItem("cart")) || [];
        let salesData = JSON.parse(localStorage.getItem("sell")) || [];
        const currentDate = new Date().toISOString();
        
        this.tempCart.forEach(cartItem => {
            const productIndex = currentInventory.findIndex(item => item.id === cartItem.productId);
            
            if (productIndex !== -1) {
                const product = currentInventory[productIndex];
                
                if (product.imeiDetails && product.imeiDetails.length > 0) {
                    const imeiIndex = cartItem.imeiIndex;
                    
                    if (imeiIndex >= 0 && imeiIndex < product.imeiDetails.length) {
                        const soldImeiDetail = {...product.imeiDetails[imeiIndex]};
                        
                        salesData.push({
                            productId: product.id,
                            name: product.name,
                            customerName: cartItem.customerName,
                            price: cartItem.price,
                            quantity: cartItem.quantity,
                            storage: soldImeiDetail.storage,
                            ptaNon: soldImeiDetail.ptaNon,
                            imei: soldImeiDetail.imei,
                            paymentMethod: cartItem.paymentMethod, // Added payment method
                            total: cartItem.total,
                            date: currentDate
                        });
                        
                        if (soldImeiDetail.quantity !== undefined) {
                            soldImeiDetail.quantity = Math.max(0, soldImeiDetail.quantity - cartItem.quantity);
                            if (soldImeiDetail.quantity <= 0) {
                                soldImeiDetail.isSold = true;
                            }
                        } else {
                            soldImeiDetail.isSold = true;
                            soldImeiDetail.quantity = 0;
                        }
    
                        product.imeiDetails[imeiIndex] = soldImeiDetail;
                        
                        product.quantity = product.imeiDetails.filter(imei => 
                            !imei.isSold && (!imei.hasOwnProperty('quantity') || imei.quantity > 0)
                        ).length;
                        
                        if (product.quantity === 0) {
                            product.inStock = false;
                        }
                        
                        currentInventory[productIndex] = product;
                    }
                }
            }
        });
        
        localStorage.setItem("cart", JSON.stringify(currentInventory));
        localStorage.setItem("sell", JSON.stringify(salesData));
        
        const inventoryChangedEvent = new CustomEvent('inventoryChanged', {
            bubbles: true,
            composed: true,
            detail: { updatedInventory: currentInventory }
        });
        window.dispatchEvent(inventoryChangedEvent);
        
        this.tempCart = [];
        this.shadow.getElementById("cartContainer").style.display = "none";
        
        this.inventory = currentInventory;
        
        this.populateProductDropdown();
        this.handleProductChange();
        
        this.showModal("Checkout completed successfully!");
    }

    showModal(message) {
        const shadow = this.shadow;
        shadow.getElementById("modalMessage").textContent = message;
        
        setTimeout(() => {
            const sellModal = shadow.getElementById("sellModal");
            try {
                if (typeof bootstrap !== 'undefined') {
                    const modal = new bootstrap.Modal(sellModal);
                    modal.show();
                } else {
                    console.error("Bootstrap JS not loaded yet");
                    alert(message);
                }
            } catch (error) {
                console.error("Error showing modal:", error);
                alert(message);
            }
        }, 500);
    }
}

customElements.define('sell-product', SellProduct);