
const itemContainer = document.querySelector(".item-container");

// Footer Const
const footerCart = document.querySelector(".footer");
const footerCartQuantity = document.querySelector(".footer-cart-item");
const footerCartValue = document.querySelector(".footer-cart-value");


// totaValue represents the total value of the cart
let totalValue = 0;


// The selected items will go inside this vector
let cart = [];


// Get the items stored and put them in the cart vector
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"))
}


// If the page gets refresh and are items in the cart the footer will no dissapear
if (cart.length > 0) {
    footerCart.style.opacity = "1";
}


// Get the items quantity stored and put them in the inner text
footerCartQuantity.innerText = localStorage.getItem("footerCartQuantity");


// The items shop 
let items = [
    {
        Image: 'shop-assets/1.jpg',
        Title: 'Ilana Matte Side Plate.' , 
        Price: '155.23'  ,
        id: 1
    },
    {
        Image: 'shop-assets/2.jpg',
        Title: 'Ilana Matte Side Plate.2.' , 
        Price: '155.34' ,
        id: 2
    },
    {
        Image: 'shop-assets/3.jpg',
        Title: 'Ilana Matte Side Plate.3.' , 
        Price: '155.12'  ,
        id: 3
    },
    {
        Image: 'shop-assets/4.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        id: 4
    },
];


// Refresh the pages
udpateView()



function udpateView() {

    itemContainer.innerHTML = "";



    for (let i = 0; i < items.length; i++) {
        const item = items[i];
            
        
        // Create the item
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemContainer.appendChild(itemElement);

        const itemElementImage = document.createElement("img");
        itemElementImage.classList.add("item-image");
        itemElementImage.src = item.Image;
        itemElement.appendChild(itemElementImage);

        const itemElementText = document.createElement("div");
        itemElementText.classList.add("item-text");
        itemElement.appendChild(itemElementText);

        const itemElementTextName = document.createElement("span");
        itemElementTextName.classList.add("item-name");
        itemElementTextName.innerText = item.Title;
        itemElementText.appendChild(itemElementTextName);

        const itemElementTextPrice = document.createElement("span");
        itemElementTextPrice.classList.add("item-price");
        itemElementTextPrice.innerText = "R$" + item.Price;
        itemElementText.appendChild(itemElementTextPrice);

        const itemElementTextButton = document.createElement("button");
        itemElementTextButton.classList.add("item-button")
        itemElementTextButton.innerText = "Add to cart.";
        itemElementText.appendChild(itemElementTextButton);

            



        // Button Add to Cart event
        itemElementTextButton.addEventListener ("click", () => {

                
                /* Check if the item already exists in the cart. 
                If the item is not found (i.e., index is -1) add the item to the cart */
            
                const index = cart.findIndex((cartItem) => cartItem.id === item.id);
                if (index === -1) {
                // Item does not exist in the cart, add it
                cart.push(item);
                } else {
                // Item already exists in the cart, update its quantity
                alert ("You already have this item in the cart.\r\nTo alter the quantity you must go to the cart.");
                return;
                }
                

                // Makes the footer appear
                footerCart.style.opacity = "1";


                // The quantity of items in the cart is displayed in the footer
                footerCartQuantity.innerText = cart.length + " products in the cart.";

                // The total value of the cart is displayed in the footer
                totalValue += parseFloat(item.Price.replace(",", "."));
    
                const formattedTotalValue = totalValue.toLocaleString();

                footerCartValue.innerText = "R$  " + formattedTotalValue;


                // Saves in localstorage 
                localStorage.setItem("footerCartQuantity", footerCartQuantity.innerText);
                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("totalValue", JSON.stringify(totalValue));



                console.log(cart);
                



            })
            


    }


    // Get the cart total value stored and put them in the inner text

    if (localStorage.getItem("totalValue")) {
        totalValue = JSON.parse(localStorage.getItem("totalValue"));
        const formattedTotalValue = totalValue.toLocaleString();
        footerCartValue.innerText = "R$  " + formattedTotalValue;
    }
    


}




