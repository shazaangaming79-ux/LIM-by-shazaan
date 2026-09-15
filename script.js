const products = [
  {id:1,cat:"Bedsheets",name:"Floral Circle Embroidered Bedsheet",price:"Price on request",img:"assets/bedsheet-floral-circle.jpg"},
  {id:2,cat:"Bedsheets",name:"Red Floral Vine Bedsheet",price:"Price on request",img:"assets/bedsheet-floral-vine.jpg"},
  {id:3,cat:"Bedsheets",name:"Hand Embroidered Floral Bedsheet",price:"Price on request",img:"assets/bedsheet-red-floral.jpg"},
  {id:4,cat:"Bedsheets",name:"Pastel Floral Handcrafted Bedsheet",price:"Price on request",img:"assets/bedsheet-pastel-floral.jpg"},
  {id:5,cat:"Comforters",name:"Colourful Patchwork Bedspread",price:"Price on request",img:"assets/handmade-patchwork-bedspread.jpg"},
  {id:6,cat:"Comforters",name:"Patchwork Quilt",price:"Price on request",img:"assets/patchwork-quilt.jpg"},
  {id:7,cat:"Textile Rugs",name:"Recycled Textile Handwoven Rug",price:"Price on request",img:"assets/recycled-fabric-rug.jpg"},
  {id:8,cat:"Baskets",name:"Handwoven Natural Basket",price:"Price on request",img:"assets/woven-basket.jpg"},
  {id:9,cat:"Indian Suits",name:"Mint Embroidered Indian Suit — Inspiration",price:"Custom quote",img:"assets/indian-suit-mint.jpg"},
  {id:10,cat:"Indian Suits",name:"White Embroidered Indian Suit — Inspiration",price:"Custom quote",img:"assets/indian-suit-white.jpg"}
];
let cart=[];

function renderProducts(){
  const q=(document.querySelector("#search")?.value||"").toLowerCase();
  const f=document.querySelector("#filter")?.value||"All";
  const list=products.filter(p=>(f==="All"||p.cat===f)&&(p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)));
  document.querySelector("#products").innerHTML=list.length?list.map(p=>`
    <article class="product">
      <div class="product-img"><img src="${p.img}" alt="${p.name}"></div>
      <div class="product-info">
        <small>${p.cat}</small><h3>${p.name}</h3><div class="price">${p.price}</div>
        <button onclick="addToCart(${p.id})">${p.cat==="Indian Suits"?"Enquire About This Style":"Add to Enquiries"}</button>
      </div>
    </article>`).join(""):`<p>No products found.</p>`;
}
function addToCart(id){const p=products.find(x=>x.id===id);if(!cart.some(x=>x.id===id))cart.push(p);updateCart();openCart()}
function updateCart(){
  document.querySelector("#cartCount").textContent=cart.length;
  document.querySelector("#cartItems").innerHTML=cart.length?cart.map(p=>`
    <div class="cart-row"><img src="${p.img}" alt=""><div><b>${p.name}</b><p>${p.price}</p><button onclick="removeFromCart(${p.id})">Remove</button></div></div>`).join(""):"<p>Your enquiry list is empty.</p>";
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);updateCart()}
function openCart(){document.querySelector("#drawer").classList.add("open")}
function closeCart(){document.querySelector("#drawer").classList.remove("open")}
function openCustom(){document.querySelector("#customModal").classList.add("open")}
function closeCustom(){document.querySelector("#customModal").classList.remove("open")}

function sendEnquiry(){
  const names=cart.map(p=>p.name).join(", ");
  const message=`Hello LIM by Shazaan, I would like to enquire about: ${names}. Please share availability, price, delivery details and payment options.`;
  // Replace the placeholder number below with the LIM WhatsApp Business number.
  const whatsappNumber="91XXXXXXXXXX";
  if(whatsappNumber.includes("X")) alert("Add your WhatsApp Business number in script.js before using this button.\n\nEnquiry: "+message);
  else window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank");
}

function submitCustom(){
  const name=document.querySelector("#cname").value.trim();
  const phone=document.querySelector("#cphone").value.trim();
  const fabric=document.querySelector("#cfabric").value;
  const colour=document.querySelector("#ccolour").value.trim();
  const details=document.querySelector("#cdetails").value.trim();
  if(!name||!phone||!details){alert("Please fill in your name, WhatsApp number and requirements.");return}
  const msg=`LIM CUSTOM SUIT REQUEST%0AName: ${name}%0AWhatsApp: ${phone}%0AFabric: ${fabric}%0AColour: ${colour||"Not specified"}%0ARequirements: ${details}`;
  const whatsappNumber="91XXXXXXXXXX";
  if(whatsappNumber.includes("X")) alert("Add your WhatsApp Business number in script.js before using this button.");
  else window.open(`https://wa.me/${whatsappNumber}?text=${msg}`,"_blank");
}
renderProducts();updateCart();