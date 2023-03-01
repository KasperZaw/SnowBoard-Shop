
gsap.from("#guy-snow",{
  scrollTrigger : {
      scrub:true
  },
 y:-220,
 scale: 2.5,
  
  
})
gsap.from("#snow-splash",{
  scrollTrigger : {
      scrub:true
  },
 y:-10  

})



const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]


toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

navbarLinks.addEventListener('scroll', () => {
    navbarLinks.style.background = 'black'
})




var navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
    if (window.pageYOffset > 0) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

  
});
window.addEventListener("scroll", function() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled-bg");
  } else {
    navbar.classList.remove("scrolled-bg");
  }
});


// Start of shopping cart we have here variable and function to open and close cart. Just eventslisteners to make it work.
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// open cart
cartIcon.addEventListener('click', () => {
      cart.classList.add("active")
});

//close cart
closeCart.addEventListener('click', () => {
  cart.classList.remove("active")
});

//cart working js


if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}
/*
so theres is for loop that loop throught all removecartbuttons
are there, so if i creat another one i can delete it to with click. var buton
take the object of removecarbutton and we add to it eventlistener to make it removecartitem
function removeCartItem we make input =event.target to target this event

*/


function ready(){
  // remove items from cart
  var removeCartButtons = document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons)
  for(var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
  }
  // quantity change
  var quantityInputs = document.getElementsByClassName('cart-quantity')
  for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  //so here is same thing we getting addCart from html and we loop throught it next var //Add cart
  //button means object from addCart string and we add to it listener to work on click
  var addCart = document.getElementsByClassName('add-cart')
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i]
    button.addEventListener('click', addCartClicked)
    
  }
  
}

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove();
  updateTotal();
}
/*
  and this one means if input.value is not a number or input.value is smaller or equal 0 input.value
  should equal 1 so bassicly that means that when we add to shoping cart a item it always must be 1
*/

function quantityChanged(event){
  var input = event.target 
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateTotal()
}

 /*
  Important to note here is need to use [0] after all this classname elements because even
  if there only one product it is still a string.
  here we making getting access to title price and img of the products and we pass them to next function addProductToCart(title, price, productImg);
 */
function addCartClicked(event){

var button = event.target;
var shopProducts = button.parentElement;
var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
var price = shopProducts.getElementsByClassName('price')[0].innerText;
var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
addProductToCart(title, price, productImg);

updateTotal();
}

// update total                    
                    
function updateTotal() {                    
  var cartContent = document.getElementsByClassName('cart-content')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0                    
  for (var i = 0; i < cartBoxes.length; i++) {                    
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName('cart-price')[0];
      var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
      total = Math.round(total * 100) / 100;

      document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}


/*
The function takes three arguments, title, price, and productImg, which are the information about the product being added to the cart.
The function creates a new div element with a class of cart-box for styling purposes.
It then gets the main shopping cart container using getElementsByClassName and retrieves
the elements with the class cart-product-title.
Next, it loops through the cartItemsNames array and checks if the product with
the same title is already in the cart. If a product
with the same title is found, the function returns without adding the product again. If the
product is not found, the function likely adds the product information to the shopping cart.
*/
function addProductToCart(title, price, productImg){
var cartShopBox = document.createElement('div');
cartShopBox.classList.add('cart-box');
var cartItems = document.getElementsByClassName('cart-content')[0];
var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
for (var i = 0; i < cartItemsNames.length; i++) {
  if (cartItemsNames[i].innerText == title) {
    return;
  }
}

/*
here we putting all object of productImg title and price in right 
place to product shoping cart look the 
same all the time but with different img title and price depends on html */

var cartBoxContent = `
                                  <img src="${productImg}" alt="cartImg" class="cart-img">
                                  <div class="detail-box">
                                    <div class="cart-product-title">${title}</div>
                                    <div class="cart-price">${price}</div>
                                    <input type="number" value="1" class="cart-quantity">
                                  </div>
                  
                                  <!-- Remove Cart -->
                                  <i class="fa-solid fa-trash cart-remove"></i>                      
`                    

cartShopBox.innerHTML = cartBoxContent;
cartItems.appendChild(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].
addEventListener('click', removeCartItem);

cartShopBox.getElementsByClassName('cart-quantity')[0].
addEventListener('change', quantityChanged);
}

