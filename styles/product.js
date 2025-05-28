document.addEventListener("DOMContentLoaded", () => {
  const productId = new URLSearchParams(window.location.search).get("id");
  const productDetail = document.getElementById("productDetail");

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
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
        <div class="details">
          <h2>${product.title}</h2>
          <p class="price">$${product.price}</p>
          <p class="description">${product.description}</p>
          <div class="variation-group">
            <label for="size">Size:</label>
            <select id="size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL" disabled>XL (Out of Stock)</option>
            </select>
          </div>
          <div class="quantity-selector">
            <button id="decrease">−</button>
            <input type="number" id="quantity" value="1" min="1" max="10" readonly>
            <button id="increase">+</button>
          </div>
          <button onclick="addToCart(${product.id})" id="addToCart">Add to Cart</button>
          <p id="feedbackMessage" style="color: green;"></p>
        </div>
      </div>
    `;
  }

  if (productId) fetchProductDetails(productId);
});
