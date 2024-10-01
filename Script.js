let body = document.querySelector('body');
let iconCartSpan = document.querySelector('.iconcart span');
let iconCart = document.querySelector('.iconcart');
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

let closeCart = document.querySelector('.close');
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

let MenuitemHTML = document.querySelector('.Menu');
let Menuitems = [];
const initApp = () => {
    // get data product
    fetch('Menu.json')
    .then(response => response.json())
    .then(data => {
        Menuitems = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            
        }addCartToHTML();
    })
}
initApp();

let CartHTML = document.querySelector('.Cart')
let cart = [];
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
    
}
const addCartToMemory = () => { 
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () =>{
    CartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('items');
            newCart.dataset.id = cart.product_id;
            let positionProduct = Menuitems.findIndex((value) => value.id == cart.product_id);
            let info = Menuitems[positionProduct];
            newCart.innerHTML = `
              <div class="image">
                    <img src="${info.image}" alt="">
                </div>  
                <div class="Name" id="Name">
                ${info.name}
                </div>
                <div class="price">
                    R${info.price}
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="Add">+</span>
                </div>
            `;
            CartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
CartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('Add')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('Add')){
            type = 'Add'
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) =>{
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'Add':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

//To select and add item to the database
const addDataToHTML = () =>{
    MenuitemHTML.innerHTML = '';
    if(Menuitems.length > 0){
        Menuitems.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('items');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <h3>Get Yours</h3>
                    <div class="price">R${product.price} <span>R40.99</span></div>
                  <button class="btn">
                    Add to cart
                </button>
            `;
            MenuitemHTML.appendChild(newProduct);
        })
    }
}
// When user clicks add to cart to process the add to cart
MenuitemHTML.addEventListener('click', (event) =>{
    let positionClick = event.target;
    if(positionClick.classList.contains('btn')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id)
    }
})



