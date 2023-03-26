const itemContainer = document.querySelector(".item-container");


const footerCart = document.querySelector(".footer");
const footerCartQuantity = document.querySelector(".footer-cart-item");
const footerCartValue = document.querySelector(".footer-cart-value");


const itemImage = document.querySelector(".item-image");
const itemTitle = document.querySelector(".item-name");
const itemPrice = document.querySelector(".item-price");



let totalValue = 0;




let cart = [];

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"))
}

if (cart.length > 0) {
    footerCart.style.opacity = "1";
}

footerCartQuantity.innerText = localStorage.getItem("footerCartQuantity");


let items = [
    {
        Image: 'shop-assets/1.jpg',
        Title: 'Ilana Matte Side Plate.' , 
        Price: '155.23'  ,
        id: 1
    },
    {
        Image: 'shop-assets/1.jpg',
        Title: 'Ilana Matte Side Plate.' , 
        Price: '155.34' ,
        id: 2
    },
    {
        Image: 'shop-assets/1.jpg',
        Title: 'Ilana Matte Side Plate.' , 
        Price: '155.12'  ,
        id: 3
    },
    {
        Image: 'shop-assets/1.jpg',
        Title: 'Ilana Matte Side Plate.' , 
        Price: '155.55'  ,
        id: 4
    },
];

udpateView()

console.log(items);


function udpateView() {

    itemContainer.innerHTML = "";



    for (let i = 0; i < items.length; i++) {
        const item = items[i];
            
           
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

            


            

        itemElementTextButton.addEventListener ("click", () => {

                cart.push(item);

                footerCart.style.opacity = "1";
    
                footerCartQuantity.innerText = cart.length + " products in the cart.";
    
                totalValue += parseFloat(item.Price.replace(",", "."));
    
                const formattedTotalValue = totalValue.toLocaleString();

                footerCartValue.innerText = "R$  " + formattedTotalValue

                localStorage.setItem("footerCartQuantity", footerCartQuantity.innerText);
                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("totalValue", JSON.stringify(totalValue));



                console.log(cart);
                



            })
            


    }



    if (localStorage.getItem("totalValue")) {
        totalValue = JSON.parse(localStorage.getItem("totalValue"));
        const formattedTotalValue = totalValue.toLocaleString();
        footerCartValue.innerText = "R$  " + formattedTotalValue;
    }
    


}




