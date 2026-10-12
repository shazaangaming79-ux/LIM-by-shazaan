
const products = [
  {id:1,cat:"Bedsheets",name:"Floral Circle Embroidered Bedsheet",price:0,img:"assets/bedsheet-floral-circle.jpg"},
  {id:2,cat:"Bedsheets",name:"Red Floral Vine Bedsheet",price:0,img:"assets/bedsheet-floral-vine.jpg"},
  {id:3,cat:"Bedsheets",name:"Hand Embroidered Floral Bedsheet",price:0,img:"assets/bedsheet-red-floral.jpg"},
  {id:4,cat:"Bedsheets",name:"Pastel Floral Handcrafted Bedsheet",price:0,img:"assets/bedsheet-pastel-floral.jpg"},
  {id:5,cat:"Comforters",name:"Colourful Patchwork Bedspread",price:0,img:"assets/handmade-patchwork-bedspread.jpg"},
  {id:6,cat:"Comforters",name:"Patchwork Quilt",price:0,img:"assets/patchwork-quilt.jpg"},
  {id:7,cat:"Textile Rugs",name:"Recycled Textile Handmade Rug",price:0,img:"assets/recycled-fabric-rug.jpg"},
  {id:8,cat:"Baskets",name:"Handwoven Natural Basket",price:0,img:"assets/woven-basket.jpg"},
  {id:9,cat:"Indian Suits",name:"Mint Embroidered Indian Suit",price:0,img:"assets/indian-suit-mint.jpg"},
  {id:10,cat:"Indian Suits",name:"White Embroidered Indian Suit",price:0,img:"assets/indian-suit-white.jpg"}
];

let cart = JSON.parse(localStorage.getItem("limCart") || "[]");

function saveCart() {
  localStorage.setItem("limCart", JSON.stringify(cart));
}

function renderProducts() {
  const search = document.querySelector("#search");
  const filter = document.querySelector("#filter");

  const q = search ? search.value.toLowerCase() : "";
  const f = filter ? filter.value : "All";

  const list = products.filter(p =>
    (f === "All" || p.cat === f) &&
    p.name.toLowerCase().includes(q)
  );

  const container = document.querySelector("#products");
  if (!container) return;

  container.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}"
          onerror="this.style.display='none'">
      </div>
      <div class="product-info">
        <small>${p.cat}</small>
        <h3>${p.name}</h3>
        <p>${p.price > 0 ? "₹" + p.price : "Price on request"}</p>
        <button class="btn"
          onclick="addToCart(${p.id})">
          Add to Cart
        </button>
      </div>
    </article>
  `).join("") || "<p>No products found.</p>";
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({...product, qty:1});
  }

  saveCart();
  updateCart();
  alert(product.name + " added to your cart!");
}

function updateCart() {
  const count = document.querySelector("#cartCount");
  const items = document.querySelector("#cartItems");

  if (count) {
    count.textContent = cart.reduce((sum, p) => sum + p.qty, 0);
  }

  if (items) {
    if (!cart.length) {
      items.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      items.innerHTML = cart.map(p => `
        <div class="cart-row">
          <img src="${p.img}" alt="${p.name}"
            onerror="this.style.display='none'">
          <div>
            <strong>${p.name}</strong>
            <p>${p.price > 0 ? "₹" + p.price : "Price on request"}</p>
            <button onclick="changeQty(${p.id},-1)">−</button>
            <span>${p.qty}</span>
            <button onclick="changeQty(${p.id},1)">+</button>
            <button onclick="removeFromCart(${p.id})">Remove</button>
          </div>
        </div>
      `).join("");

      const total = cart.reduce(
        (sum, p) => sum + p.price * p.qty, 0
      );

      items.innerHTML += `
        <h3>Total: ₹${total.toLocaleString("en-IN")}</h3>
        <button class="btn dark" onclick="openCheckout()">
          Proceed to Checkout
        </button>
      `;
    }
  }
}

function changeQty(id, amount) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart();
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  updateCart();
}

function openCart() {
  const drawer = document.querySelector("#drawer");
  if (drawer) drawer.classList.add("open");
  updateCart();
}

function closeCart() {
  const drawer = document.querySelector("#drawer");
  if (drawer) drawer.classList.remove("open");
}

function openCustom() {
  const drawer = document.querySelector("#customModal");
  if (drawer) drawer.classList.add("open");
}

function closeCustom() {
  const drawer = document.querySelector("#customModal");
  if (drawer) drawer.classList.remove("open");
}

function openCheckout() {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.qty, 0
  );

  const checkout = document.querySelector("#checkoutModal");

  if (!checkout) {
    alert("Checkout form has not been added to index.html yet.");
    return;
  }

  checkout.innerHTML = `
    <div class="checkout-box">
      <button onclick="closeCheckout()">✕</button>
      <h2>Checkout</h2>
      <p>Order total: ₹${total.toLocaleString("en-IN")}</p>

      <form id="checkoutForm">
        <label>Full Name</label>
        <input id="customerName" required>

        <label>Phone Number</label>
        <input id="customerPhone" type="tel"
          pattern="[0-9]{10}" maxlength="10" required>

        <label>Delivery Address</label>
        <textarea id="customerAddress" required></textarea>

        <button type="submit">Place Order</button>
      </form>
    </div>
  `;

  checkout.style.display = "block";

  document.querySelector("#checkoutForm").onsubmit = function(e) {
    e.preventDefault();

    const order = {
      orderNumber: "LIM" + Date.now(),
      customer: document.querySelector("#customerName").value.trim(),
      phone: document.querySelector("#customerPhone").value.trim(),
      address: document.querySelector("#customerAddress").value.trim(),
      products: cart.map(p => ({
        id: p.id,
        name: p.name,
        quantity: p.qty,
        price: p.price
      })),
      total: total,
      createdAt: new Date().toISOString()
    };

    // Temporary local storage only; this does not notify the seller.
    const orders = JSON.parse(localStorage.getItem("limOrders") || "[]");
    orders.push(order);
    localStorage.setItem("limOrders", JSON.stringify(orders));

    alert(
      "Order recorded on this device!\n" +
      "Order number: " + order.orderNumber +
      "\nThis is a demo. Your seller has not been notified."
    );

    cart = [];
    saveCart();
    updateCart();
    closeCheckout();
    closeCart();
  };
}

function closeCheckout() {
  const checkout = document.querySelector("#checkoutModal");
  if (checkout) checkout.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector("#search");
  const filter = document.querySelector("#filter");

  if (search) search.addEventListener("input", renderProducts);
  if (filter) filter.addEventListener("change", renderProducts);

  renderProducts();
  updateCart();
});
