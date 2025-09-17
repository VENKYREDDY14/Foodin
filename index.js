

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('restaurant-search');
    const optionsContainer = document.getElementById('restaurant-options');
    const searchContainer = document.getElementById('restaurant-search-container');
    const options = document.querySelectorAll('.option');

    // Show the dropdown when the input is focused
    searchInput.addEventListener('focus', () => {
        optionsContainer.classList.add('show');
    });

    // 🔹 Hide the dropdown when input loses focus
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            optionsContainer.classList.remove('show');
        }, 600); // small delay so option clicks still register
    });

    // Hide the dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
        const isClickInside = searchContainer.contains(event.target);
        if (!isClickInside) {
            optionsContainer.classList.remove('show');
        }
    });

    // Handle option clicks
    options.forEach(option => {
        option.addEventListener('click', () => {
            searchInput.value = option.textContent;
            optionsContainer.classList.remove('show');
        });
    });

    // Implement a simple live search filter
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(filter)) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    });
  });



  document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.querySelector(".location-input-container .search-input");
    const popup = document.getElementById("servicePopup");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const popupOkBtn = document.getElementById("popupOkBtn");

    // Example of valid pincodes (you can replace this with your real list)
    const validPincodes = ["110001", "560001", "400001"];

    // Function to show the popup
    function showPopup() {
      popup.classList.add("show");
    }

    // Function to hide the popup
    function hidePopup() {
      popup.classList.remove("show");
    }

    // Event listener for location input
    locationInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const enteredPincode = locationInput.value.trim();
        if (!validPincodes.includes(enteredPincode)) {
          showPopup();
        }
      }
    });

    // Close popup events
    closePopupBtn.addEventListener("click", hidePopup);
    popupOkBtn.addEventListener("click", hidePopup);

    // Close popup when clicking outside content
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        hidePopup();
      }
    });
  });

// =============== Utility Functions ===================

// Get cart data from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart data to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count on top right
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

// Snackbar function
function showSnackbar(msg) {
  let snackbar = document.getElementById("snackbar");
  if (!snackbar) {
    snackbar = document.createElement("div");
    snackbar.id = "snackbar";
    snackbar.className = "snackbar";
    document.body.appendChild(snackbar);
  }
  snackbar.textContent = msg;
  snackbar.classList.add("show");
  setTimeout(() => snackbar.classList.remove("show"), 3000);
}

// =============== Add to Cart Logic ===================
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');

      const product = {
        id: productCard.dataset.id,
        name: productCard.dataset.name,
        category: productCard.dataset.category,
        price: parseFloat(productCard.dataset.price),
        image: productCard.dataset.image,
        quantity: 1
      };

      let cart = getCart();

      // Check if product already exists
      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }

      saveCart(cart);
      updateCartCount();

      
      showSnackbar(`${product.name} added to cart!`);
    });
  });

  // Update cart count on page load
  updateCartCount();
});




function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  const itemCount = document.getElementById('item-count');

  const cart = getCart();
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    totalContainer.textContent = '0.00';
    itemCount.textContent = '0 Items in cart';
    return;
  }

  let total = 0;
  let count = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <div>
          <h4>${item.name}</h4>
          <p>${item.category || "Unknown"}</p>
        </div>
        <div class="cart-controls">
          <div class="cart-quantity">
            <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="increaseQty(${index})">+</button>
          </div>
          <div class="price-remove">
            <div class="cart-price">$ ${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" onclick="confirmRemoveItem(${index})"><i class="fa fa-times"></i></button>
          </div>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalContainer.textContent = total.toFixed(2);
  itemCount.textContent = `${count} Item${count > 1 ? "s" : ""} in cart`;
}

function increaseQty(index) {
  let cart = getCart();
  cart[index].quantity++;
  saveCart(cart);
  renderCart();
}

function decreaseQty(index) {
  let cart = getCart();
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);

let confirmAction = null; // stores the function to execute on "Yes"

// Show confirmation modal
function showConfirm(message, action) {
const modal = document.getElementById('confirm-modal');
const msg = document.getElementById('confirm-message');
msg.textContent = message;
confirmAction = action;
modal.style.display = 'flex';
}

// Close modal
function closeConfirm() {
document.getElementById('confirm-modal').style.display = 'none';
confirmAction = null;
}

// Confirm remove single item
function confirmRemoveItem(index) {
const cart = getCart();
const product = cart[index];
showConfirm(`Do you want to remove "${product.name}" from the cart?`, () => {
cart.splice(index, 1);
saveCart(cart);
renderCart();
});
}

// Confirm clear all
function confirmClearCart() {
showConfirm("Do you want to remove all items from the cart?", () => {
localStorage.removeItem('cart');
renderCart();
});
}

// Modal button events
document.getElementById('confirm-yes').addEventListener('click', () => {
if (confirmAction) confirmAction();
closeConfirm();
});

document.getElementById('confirm-no').addEventListener('click', closeConfirm);

