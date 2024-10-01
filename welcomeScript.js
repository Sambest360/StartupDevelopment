


let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = ()=>{
    navbar.classList.toggle('active');
    searchform.classList.remove('active');
    cartitem.classList.remove('active');
}

let searchform = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = ()=>{
    searchform.classList.toggle('active');
    navbar.classList.remove('active');
    cartitem.classList.remove('active');
}

let cartitem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = ()=>{
    cartitem.classList.toggle('active');
    navbar.classList.remove('active');
    searchform.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchform.classList.remove('active');
    cartitem.classList.remove('active');
}


 // Function to update cart count
 function updateCartCount() {
    const cartCount = localStorage.getItem('cartCount') || 0;
    document.getElementById('welcomeCartCount').innerText = cartCount;
}

// Initialize cart count on page load
updateCartCount();

// Example function to add items to cart
function addToCart() {
    let cartCount = parseInt(localStorage.getItem('cartCount') || 0);
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    updateCartCount();
}

// Simulate adding items to cart
document.getElementById('welcomeCart').addEventListener('click', addToCart);