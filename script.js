const products=[
{name:"Handmade Cotton Bedsheet",cat:"Bedsheets",price:2499,icon:"🛏️"},
{name:"Handmade Comforter",cat:"Comforters",price:4999,icon:"🧣"},
{name:"Wooden Basket — Handcrafted",cat:"Wooden Baskets",price:1799,icon:"🧺"},
{name:"Recycled Paper Basket",cat:"Paper Baskets",price:999,icon:"♻️"},
{name:"Hand Block Print Bedsheet",cat:"Bedsheets",price:2199,icon:"🌿"},
{name:"Cozy Cotton Comforter",cat:"Comforters",price:4299,icon:"☁️"},
{name:"Round Wooden Storage Basket",cat:"Wooden Baskets",price:1599,icon:"🪵"},
{name:"Eco Paper Utility Basket",cat:"Paper Baskets",price:899,icon:"🌾"}];
let cart=JSON.parse(localStorage.getItem("limCart")||"[]");
const money=n=>"₹"+n.toLocaleString("en-IN");
function render(list=products){document.getElementById("products").innerHTML=list.map((p,i)=>`<article class="product"><div class="pic">${p.icon}</div><div class="product-info"><small>${p.cat}</small><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="add" onclick="add(${i})">🛒 Add to Cart</button></div></article>`).join("")}
function add(i){cart.push(products[i]);save();openCart()}
function save(){localStorage.setItem("limCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
function openCart(){document.getElementById("drawer").classList.add("open");document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span>${p.name}<br><small>${money(p.price)}</small></span><button onclick="removeItem(${i})">Remove</button></div>`).join(""):"<p>Your cart is empty.</p>";document.getElementById("total").textContent=money(cart.reduce((s,p)=>s+p.price,0))}
function removeItem(i){cart.splice(i,1);save();openCart()}
function closeCart(){document.getElementById("drawer").classList.remove("open")}
function checkout(){if(!cart.length)return alert("Your cart is empty.");alert("Checkout demo: connect Razorpay/UPI and your shipping system here.");}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("filter").onchange=e=>render(e.target.value==="All"?products:products.filter(p=>p.cat===e.target.value));
document.getElementById("search").oninput=e=>{let q=e.target.value.toLowerCase();render(products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q)))};
document.querySelectorAll(".cat-grid a[data-filter]").forEach(a=>a.onclick=()=>{document.getElementById("filter").value=a.dataset.filter;render(products.filter(p=>p.cat===a.dataset.filter))});
function openCustom(){document.getElementById("customModal").classList.add("open")}
function closeCustom(){document.getElementById("customModal").classList.remove("open")}
function submitCustom(){let n=document.getElementById("cname").value.trim();if(!n)return alert("Please enter your name.");alert("Thank you, "+n+"! Your customization request is ready to be connected to WhatsApp/email.");closeCustom()}
render();save();