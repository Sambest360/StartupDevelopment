let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({item, price});
  total += price;
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items-list'); // Updated to match the HTML structure
  const cartTotal = document.getElementById('total-price'); // Updated to match the HTML structure
  
  cartItems.innerHTML = cart.map((item, index) => `
    <div>
      ${item.item} - R${item.price.toFixed(2)} 
      <button onclick="removeItemFromCart(${index})" class="remove-btn">
        Remove
      </button>
    </div>
  `).join('');
  cartTotal.innerHTML = `Total: R${total.toFixed(2)}`;

  const style = document.createElement('style');
  style.textContent = `
    .remove-btn {
      background-color: #ff4d4d;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      margin-left: 10px;
      transition: background-color 0.3s ease;
    }
    .remove-btn:hover {
      background-color: #ff1a1a;
    }
  `;
  document.head.appendChild(style);
}

function clearCart() {
  cart = [];
  total = 0;
  updateCartDisplay();
}

function toggleCartPopup() {
  const popup = document.getElementById('cart-popup');
  popup.style.display = popup.style.display === 'none' || popup.style.display === '' ? 'flex' : 'none';
  updateCartDisplay(); // Ensure cart items are displayed when popup is toggled
}

function removeItemFromCart(index) {
  if (index >= 0 && index < cart.length) {
    const removedItem = cart.splice(index, 1)[0];
    total -= removedItem.price;
    updateCartDisplay();
  }
}

async function submitOrder(event) {
  event.preventDefault();

  const form = document.getElementById('orderForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  formData.append('order', JSON.stringify(cart));

  try {
    const response = await fetch('/submit-order', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();
    alert(result.message);
    
    form.reset();
    clearCart();
  } catch (error) {
    console.error('Error:', error);
    alert(`An error occurred: ${error.message}. Please try again.`);
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
