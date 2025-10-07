/* ================================
   STYLEHUB - MAIN JAVASCRIPT
   Handles products display, filtering, search, and cart
================================ */

/* ================================
   PRODUCT DATABASE - All available products
================================ */
const products = [
  // WOMEN'S COLLECTION
  { 
    id: 1, 
    name: "Floral Summer Dress", 
    price: 1499, 
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop", 
    category: "women" 
  },
  { 
    id: 2, 
    name: "Elegant Saree", 
    price: 2399, 
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop", 
    category: "women" 
  },
  { 
    id: 3, 
    name: "Casual Kurti", 
    price: 999, 
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop", 
    category: "women" 
  },
  { 
    id: 4, 
    name: "Party Gown", 
    price: 3499, 
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&auto=format&fit=crop", 
    category: "women" 
  },

  // MEN'S COLLECTION
  { 
    id: 5, 
    name: "Denim Jacket", 
    price: 2199, 
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop", 
    category: "men" 
  },
  { 
    id: 6, 
    name: "Formal Shirt", 
    price: 1299, 
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop", 
    category: "men" 
  },
  { 
    id: 7, 
    name: "Casual T-Shirt", 
    price: 799, 
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop", 
    category: "men" 
  },
  { 
    id: 8, 
    name: "Premium Blazer", 
    price: 3999, 
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop", 
    category: "men" 
  },

  // ACCESSORIES COLLECTION
  { 
    id: 9, 
    name: "Classic Leather Watch", 
    price: 3499, 
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&auto=format&fit=crop", 
    category: "accessories" 
  },
  { 
    id: 10, 
    name: "Designer Sunglasses", 
    price: 899, 
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop", 
    category: "accessories" 
  },
  { 
    id: 11, 
    name: "Leather Handbag", 
    price: 1899, 
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop", 
    category: "accessories" 
  },
  { 
    id: 12, 
    name: "Designer Belt", 
    price: 699, 
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&auto=format&fit=crop", 
    category: "accessories" 
  },

  // KIDS COLLECTION
  { 
    id: 13, 
    name: "Kids Denim Set", 
    price: 999, 
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&auto=format&fit=crop", 
    category: "kids" 
  },
  { 
    id: 14, 
    name: "Cute Princess Frock", 
    price: 899, 
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&auto=format&fit=crop", 
    category: "kids" 
  },
  { 
    id: 15, 
    name: "Baby Shoes", 
    price: 699, 
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&auto=format&fit=crop", 
    category: "kids" 
  },
  { 
    id: 16, 
    name: "Kids T-Shirt", 
    price: 499, 
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format&fit=crop", 
    category: "kids" 
  }
];

/* ================================
   CART MANAGEMENT - Using in-memory storage
================================ */
let cart = [];
let currentFilter = 'all';

/* ================================
   INITIALIZATION - Run on page load
================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Update cart count badge
  updateCartCount();
  
  // Display featured products on home page
  if (document.getElementById('featuredProducts')) {
    displayFeaturedProducts();
  }
  
  // Display all products on products page
  if (document.getElementById('product-list')) {
    initializeProductsPage();
  }
  
  // Add scroll effect to navbar
  window.addEventListener('scroll', handleNavbarScroll);
});

/* ================================
   NAVBAR SCROLL EFFECT - Add shadow when scrolling
================================ */
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/* ================================
   UPDATE CART COUNT - Update badge number
================================ */
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.length;
    
    // Animate badge when cart is updated
    if (cart.length > 0) {
      cartCount.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
      }, 300);
    }
  }
}

/* ================================
   DISPLAY FEATURED PRODUCTS - Show 3 random products on home page
================================ */
function displayFeaturedProducts() {
  const featured = document.getElementById('featuredProducts');
  if (!featured) return;
  
  // Shuffle and select 3 random products
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);
  
  featured.innerHTML = selected.map(p => `
    <div class="product-card fade-in-up" onclick="viewProduct(${p.id})">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="btn" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

/* ================================
   INITIALIZE PRODUCTS PAGE - Setup filters and search
================================ */
function initializeProductsPage() {
  // Get category from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get('category');
  
  // Display products based on URL category
  if (selectedCategory && selectedCategory !== 'all') {
    currentFilter = selectedCategory;
    const filtered = products.filter(p => p.category === selectedCategory);
    displayProducts(filtered);
    
    // Update active filter button
    updateActiveFilterButton(selectedCategory);
  } else {
    displayProducts(products);
  }
  
  // Setup filter buttons
  setupFilterButtons();
  
  // Setup search functionality
  setupSearch();
}

/* ================================
   DISPLAY PRODUCTS - Render product grid
================================ */
function displayProducts(list) {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  
  // Show empty state if no products
  if (list.length === 0) {
    productList.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <h3 style="color: #999; font-size: 1.5rem;">No products found</h3>
        <p style="color: #ccc; margin-top: 1rem;">Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }
  
  // Render product cards
  productList.innerHTML = list.map(p => `
    <div class="product-card fade-in-up" onclick="viewProduct(${p.id})">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="btn" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

/* ================================
   SETUP FILTER BUTTONS - Add click handlers to category filters
================================ */
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      filterByCategory(category);
      
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/* ================================
   UPDATE ACTIVE FILTER BUTTON - Highlight selected category
================================ */
function updateActiveFilterButton(category) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
    }
  });
}

/* ================================
   FILTER BY CATEGORY - Filter products by category
================================ */
function filterByCategory(category) {
  currentFilter = category;
  
  // Show loading animation
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('active');
  }
  
  // Simulate loading delay for better UX
  setTimeout(() => {
    if (loading) {
      loading.classList.remove('active');
    }
    
    // Filter products
    let filtered = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);
    
    // Apply search filter if search box has value
    const searchBox = document.getElementById('search');
    if (searchBox && searchBox.value.trim()) {
      const keyword = searchBox.value.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(keyword)
      );
    }
    
    displayProducts(filtered);
  }, 300);
}

/* ================================
   SETUP SEARCH - Real-time product search
================================ */
function setupSearch() {
  const searchBox = document.getElementById('search');
  if (!searchBox) return;
  
  searchBox.addEventListener('input', function() {
    const keyword = this.value.toLowerCase().trim();
    
    // Get products based on current filter
    let filtered = currentFilter === 'all' 
      ? products 
      : products.filter(p => p.category === currentFilter);
    
    // Apply search filter
    if (keyword) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(keyword)
      );
    }
    
    displayProducts(filtered);
  });
}

/* ================================
   ADD TO CART - Add product to shopping cart
================================ */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    // Add unique cart ID for removal
    cart.push({ ...product, cartId: Date.now() });
    updateCartCount();
    showToast(`✓ ${product.name} added to cart!`, 'success');
  }
}

/* ================================
   VIEW PRODUCT - Show product details (demo)
================================ */
function viewProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    alert(`Product Details:\n\n${product.name}\nPrice: ₹${product.price}\nCategory: ${product.category.toUpperCase()}\n\nClick "Add to Cart" to purchase!`);
  }
}

/* ================================
   TOAST NOTIFICATION - Show success/error messages
================================ */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.style.background = type === 'success' ? '#4caf50' : '#ff4d4d';
  toast.classList.add('show');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ================================
   SMOOTH SCROLL - Smooth scrolling for anchor links
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});