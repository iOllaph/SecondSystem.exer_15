
const itemContainer = document.querySelector(".item-container");


// Footer Const
const footerCart = document.querySelector(".footer");
const footerCartQuantity = document.querySelector(".footer-cart-item");
const footerCartValue = document.querySelector(".footer-cart-value");


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


let totalCartValue = 0;
if (localStorage.getItem("totalCartValue")) {
    totalCartValue = JSON.parse(localStorage.getItem("totalCartValue"))
}


// This expression in Math.round must be used to round the numbers in a simply way
totalCartValue = Math.round(totalCartValue * 100) / 100; 


footerCartValue.innerText = "R$   " + totalCartValue;


let totalQuantity = 0;

if (localStorage.getItem("totalQuantity")) {
    totalQuantity = JSON.parse(localStorage.getItem("totalQuantity"));
}
footerCartQuantity.innerText = totalQuantity  + " products in the cart.";


// The items shop 
let items = [
    {
        Image: 'shop-assets/1.jpg',
        Title: 'Ilana Matte Side Plate.' , 
        Price: '155.23'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 1
    },
    {
        Image: 'shop-assets/2.jpg',
        Title: 'Ilana Matte Side Plate.2.' , 
        Price: '155.34' ,
        Quantity: 1 ,
        Total: 0 ,
        id: 2
    },
    {
        Image: 'shop-assets/3.jpg',
        Title: 'Ilana Matte Side Plate.3.' , 
        Price: '155.12'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 3
    },
    {
        Image: 'shop-assets/4.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 4
    },
    {
        Image: 'shop-assets/5.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 5
    },
    {
        Image: 'shop-assets/6.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 6
    },
    {
        Image: 'shop-assets/7.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 7
    },
    {
        Image: 'shop-assets/8.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 8
    },
    {
        Image: 'shop-assets/9.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 9
    },
    {
        Image: 'shop-assets/10.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 10
    },
    {
        Image: 'shop-assets/11.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 11
    },
    {
        Image: 'shop-assets/12.jpg',
        Title: 'Ilana Matte Side Plate.4.' , 
        Price: '155.55'  ,
        Quantity: 1 ,
        Total: 0 ,
        id: 12
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

        item.Total = item.Price * item.Quantity;

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


                
                let totalQuantity = 0;
                 for (let i = 0; i < cart.length; i++) {
                     const item = cart[i];
                    totalQuantity += item.Quantity ;
                    }
                footerCartQuantity.innerText = totalQuantity  + " products in the cart.";
                localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity)); 
            


                // The total value of the cart is displayed in the footer
                let totalCartValue = 0;
                for (let i = 0; i < cart.length; i++) {
                    const item = cart[i];
                    
                    totalCartValue += item.Total;


                }
                footerCartValue.innerText = "R$   " + totalCartValue.toFixed(2) ;
                localStorage.setItem("totalCartValue",JSON.stringify(totalCartValue))


                // Saves in localstorage 
                localStorage.setItem("cart", JSON.stringify(cart));


            })



    }

}




