/* ================================
   STYLEHUB - CART MANAGEMENT
   Handles cart display, item removal, and checkout
================================ */

/* ================================
   INITIALIZATION - Render cart on page load
================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Render cart items
  renderCart();
  
  // Setup clear cart button
  const clearCartBtn = document.getElementById('clear-cart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
  
  // Setup checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
  }
});

/* ================================
   RENDER CART - Display all cart items
================================ */
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  const cartSummary = document.getElementById('cartSummary');
  
  if (!cartContainer) return;
  
  // Check if cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart fade-in-up">
        <h3>🛒 Your cart is empty</h3>
        <p>Start shopping and add some amazing products!</p>
        <button class="btn" onclick="window.location.href='products.html'">Browse Products</button>
      </div>
    `;
    
    // Hide cart summary
    if (cartSummary) {
      cartSummary.style.display = 'none';
    }
    return;
  }
  
  // Calculate total price
  let total = 0;
  
  // Render each cart item
  cartContainer.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="cart-item fade-in-up" style="animation-delay: ${index * 0.1}s">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.cartId})">
          Remove
        </button>
      </div>
    `;
  }).join('');
  
  // Update total price
  if (totalPriceEl) {
    totalPriceEl.textContent = `Total: ₹${total}`;
  }
  
  // Show cart summary
  if (cartSummary) {
    cartSummary.style.display = 'block';
  }
}

/* ================================
   REMOVE FROM CART - Remove specific item
================================ */
function removeFromCart(cartId) {
  // Find item index
  const itemIndex = cart.findIndex(item => item.cartId === cartId);
  
  if (itemIndex > -1) {
    const removedItem = cart[itemIndex];
    
    // Remove item from cart
    cart.splice(itemIndex, 1);
    
    // Update UI
    updateCartCount();
    renderCart();
    
    // Show notification
    showToast(`${removedItem.name} removed from cart`, 'error');
  }
}

/* ================================
   CLEAR CART - Remove all items
================================ */
function clearCart() {
  if (cart.length === 0) {
    showToast('Your cart is already empty!', 'error');
    return;
  }
  
  // Confirm before clearing
  if (confirm('Are you sure you want to clear your entire cart?')) {
    cart = [];
    updateCartCount();
    renderCart();
    showToast('Cart cleared successfully', 'error');
  }
}

/* ================================
   CHECKOUT - Process order (demo)
================================ */
function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  
  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const itemCount = cart.length;
  
  // Show processing message
  showToast('Processing your order...', 'success');
  
  // Simulate checkout process
  setTimeout(() => {
    // Show success message with order details
    alert(`🎉 Order Placed Successfully!\n\n` +
          `Order Details:\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `Items: ${itemCount}\n` +
          `Total Amount: ₹${total}\n\n` +
          `Thank you for shopping with StyleHub!\n\n` +
          `📦 Your order will be delivered in 3-5 business days.\n` +
          `📧 Order confirmation sent to your email.`);
    
    // Clear cart after successful checkout
    cart = [];
    updateCartCount();
    renderCart();
    
    // Optional: Redirect to home page
    // window.location.href = 'index.html';
  }, 1500);
}

/* ================================
   HELPER FUNCTIONS
   These functions are imported from script.js
================================ */

// If script.js is not loaded, define these functions here
if (typeof updateCartCount === 'undefined') {
  function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = cart.length;
      
      if (cart.length > 0) {
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartCount.style.transform = 'scale(1)';
        }, 300);
      }
    }
  }
}

if (typeof showToast === 'undefined') {
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.style.background = type === 'success' ? '#4caf50' : '#ff4d4d';
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}