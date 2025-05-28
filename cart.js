function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartContainer");
  const checkoutBtn = document.getElementById("checkoutBtn");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.disabled = true;
    updateCartCount(0);
    document.getElementById("totalPrice").textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const productEl = document.createElement("div");
    productEl.className = "cart-item";

    productEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div>
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        ${item.size ? `<p>Size: ${item.size}</p>` : ""}
        <div class="quantity-controls">
          <button onclick="updateQty(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQty(${index}, 1)">+</button>
        </div>
        <button onclick="removeItem(${index})" class="remove">Remove</button>
      </div>
    `;

    container.appendChild(productEl);
  });

  calculateTotal();
  checkoutBtn.disabled = false;
  updateCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
}

function updateQty(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart[index]) return;

  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart[index]) return;

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("totalPrice").textContent = total.toFixed(2);
}

function updateCartCount(count = null) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = count !== null ? count : cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Lazy loading enhancement (for images with data-src)
  const images = document.querySelectorAll("img[data-src]");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        obs.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
});
