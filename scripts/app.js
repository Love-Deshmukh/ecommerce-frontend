console.log("E-Commerce Website Loaded");

// 🌐 Toggle Mobile Navigation
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });
}

// 🛍️ Utility: Cart Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = totalItems;
}
updateCartCount();

// 🛒 Add to Cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// 🏬 Homepage: Load Product Grid
const productGrid = document.getElementById("productGrid");

async function fetchProducts() {
  if (!productGrid) return;

  try {
    productGrid.innerHTML = `<p>Loading products...</p>`;
    const cached = localStorage.getItem("products");

    let products;
    if (cached) {
      products = JSON.parse(cached);
    } else {
      const res = await fetch("https://fakestoreapi.com/products");
      products = await res.json();
      localStorage.setItem("products", JSON.stringify(products));
    }

    displayProducts(products);
  } catch (err) {
    productGrid.innerHTML = `<p style="color:red;">Failed to load products.</p>`;
    console.error(err);
  }
}

function displayProducts(products) {
  productGrid.innerHTML = ""; // clear loader
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
      </a>
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}
fetchProducts();

// 📦 Product Detail Page
const productId = new URLSearchParams(window.location.search).get("id");
const productDetail = document.getElementById("productDetail");

if (productId && productDetail) {
  fetchProductDetails(productId);
}

async function fetchProductDetails(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    renderProductDetails(product);
  } catch (error) {
    productDetail.innerHTML = `<p style="color:red;">Product not found.</p>`;
  }
}

function renderProductDetails(product) {
  productDetail.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.title}" />
      <div class="details">
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <p class="description">${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

// 🧾 Checkout Button
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.length) return alert("Cart is empty!");
    window.location.href = "checkout.html";
  });
}

// 🔐 Signup Password Strength (optional)
const signupPassword = document.getElementById("signupPassword");
const strengthBar = document.getElementById("strengthBar");

if (signupPassword && strengthBar) {
  signupPassword.addEventListener("input", function (e) {
    const val = e.target.value;
    let score = 0;
    if (val.length >= 8) score += 25;
    if (/[A-Z]/.test(val)) score += 25;
    if (/[a-z]/.test(val)) score += 25;
    if (/\d/.test(val)) score += 25;
    strengthBar.value = score;
  });
}

// 👁️ Toggle Password Visibility
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) field.type = field.type === "password" ? "text" : "password";
}

// 🔁 Toggle Login/Signup Forms
function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  if (loginForm && signupForm) {
    loginForm.classList.toggle("hidden");
    signupForm.classList.toggle("hidden");
  }
}
