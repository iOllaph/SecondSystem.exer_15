

// HTML const
const cartContainer = document.querySelector(".cart-container");
const cartTotalValue = document.querySelector(".cart-detail-value-number");
const cartTotalItem = document.querySelector(".cart-detail-text-value");
const footerText = document.querySelector(".footer-a");
const footerButton = document.querySelector(".button-checkout");




// The selected items will go inside this vector
let cart = [];

// Get the items stored and put them in the cart vector
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}



let totalCartValue = 0;
if (localStorage.getItem("totalCartValue")) {
    totalCartValue = JSON.parse(localStorage.getItem("totalCartValue"))
}

// This expression in Math.round must be used to round the numbers in a simply way
totalCartValue = Math.round(totalCartValue * 100) / 100; 

cartTotalValue.innerText = "R$   " + totalCartValue;



let totalQuantity = 0;

if (localStorage.getItem("totalQuantity")) {
    totalQuantity = JSON.parse(localStorage.getItem("totalQuantity"));
}

cartTotalItem.innerText = totalQuantity + "  items";



//If cart is empty the alert is triggered
if (cart.length == 0) {
    alert("Your cart is empty");
    footerText.innerText = "Go Shopping."

} else {
    footerText.innerText = "Continue Shopping."
    footerButton.style.display = "block";
}



// Button Checkout Function 
 function Checkout() {
    

    
    alert(    
        "Thank you for completing your order "
    );



    // Cart becomes empty
    cart.length = 0;

    totalCartValue = 0;
    cartTotalValue.innerText = "R$   " + totalCartValue.toFixed(2);

    totalQuantity = 0
    cartTotalItem.innerText = totalQuantity + "  items";
  

    // Saves the modification in the cart local storage, 
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    localStorage.setItem("totalCartValue",JSON.stringify(totalCartValue))   
    
    
    
    cartContainer.innerHTML = "";



    alert("Your cart is empty");
    footerButton.style.display = "none";
    footerText.innerText = "Go Shopping."
}
 


// Refresh the pages
udpateView()



function udpateView() {

    cartContainer.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];


        // create the items of the cart

        

        const cartElement = document.createElement("div");
        cartElement.classList.add("cart-item");
        cartContainer.appendChild(cartElement);


            // Inside CartElement
            const cartElementDivison = document.createElement("hr");
            cartElementDivison.classList.add("solid");
            cartElement.appendChild(cartElementDivison);


            const cartElementImage = document.createElement("img");
            cartElementImage.src = item.Image;
            cartElement.appendChild(cartElementImage);
        
                
            const cartElementContent = document.createElement("div");
            cartElementContent.classList.add("item-content");
            cartElement.appendChild(cartElementContent);



                    // Inside CartElementContent
                    const cartElementContentTitle = document.createElement("span");
                    cartElementContentTitle.classList.add("item-title");
                    cartElementContentTitle.innerText = item.Title;
                    cartElementContent.appendChild(cartElementContentTitle);

                    const cartElementContentQuantity = document.createElement("div");
                    cartElementContentQuantity.classList.add("item-quantity");
                    cartElementContent.appendChild(cartElementContentQuantity);

                    

                    /*---------------UPDATED TOTAL VALUE-------------------------*/



                    const cartElementContentTotalValue = document.createElement("span");
                    cartElementContentTotalValue.classList.add("item-total-value");
                    cartElementContentTotalValue.innerText = "R$  " + updateValue();

                    // When refresh the page, if there is an item.total value it will show 
                    function updateValue() {

                        if (item.Price > item.Total || !item.Total) {
                            
                            /* the use of return, is to return this value in the innerText const.
                            whitout it it will show nothing */
                            return item.Price;
                    
                        }
                        else {

                            return item.Total;
                        }
                    }
                
                    cartElementContent.appendChild(cartElementContentTotalValue);


                    /*---------------REMOVE BUTTON-------------------------*/


                    const cartElementContentRemove = document.createElement("button");
                    cartElementContentRemove.classList.add("button-Remove");
                    cartElementContentRemove.innerText = "Remove";
                    cartElementContent.appendChild(cartElementContentRemove);


                    // Delete the item 
                    cartElementContentRemove.addEventListener("click", () =>{
                               
                        // Finds the item that is selected
                        var index = cart.findIndex(function(cartElementFind) {
                            return cartElementFind.id == item.id
                        } )
                        
                        // Remove it from the cart vector
                        cart.splice(index, 1);




                        //Refresh the Quantity count
                        let totalQuantity = 0;
                        for (let i = 0; i < cart.length; i++) {
                            const item = cart[i];
                            totalQuantity += item.Quantity;
                        }

                        cartTotalItem.innerText = totalQuantity + "  items"; 



                        //Refresh the totalCartValue count
                        let totalCartValue = 0;
                            for (let i = 0; i < cart.length; i++) {
                                const item = cart[i];
    
                                    totalCartValue += item.Total;
                    
                        }

                        cartTotalValue.innerText = "R$   " + totalCartValue.toFixed(2);


                         
                        if (cart.length == 0) {
                            alert("Your cart is empty");
                             footerButton.style.display = "none";
                        } else {
                            footerText.innerText = "Proceed to Checkout."
                            footerButton.style.display = "block";
                        }



                        // Saves the modification in the cart local storage, 
                        localStorage.setItem("cart", JSON.stringify(cart));
                        localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
                        localStorage.setItem("totalCartValue",JSON.stringify(totalCartValue))    


                        
                        cartElement.remove(); 
                    })

                    /*------------------INPUT NUMBER-------------------*/


                        // Inside CartElementContentQuantity

                        const cartElementContentQuantityLabel = document.createElement("label");
                        cartElementContentQuantityLabel.innerText = "Quantity";
                        cartElementContentQuantity.appendChild(cartElementContentQuantityLabel);

                        const cartElementContentQuantityInput = document.createElement("input");
                        cartElementContentQuantityInput.classList.add("input-quantity");
                        cartElementContentQuantityInput.type = "number";
                        cartElementContentQuantityInput.min = 1;
                        cartElementContentQuantityInput.value = item.Quantity || 1;
                        cartElementContentQuantity.appendChild(cartElementContentQuantityInput);

                        // add an event listener to the input element's keydown event --TEACHER CHATGPT--
                        cartElementContentQuantityInput.addEventListener("keydown", (event) => {


                            // disable manual input using the keyboard --TEACHER CHATGPT--
                            if (event.key !== "ArrowUp" && event.key !== "ArrowDown" && event.key !== "Tab" && event.key !== "Escape" && event.key !== "Enter") {
                            event.preventDefault();
                            }
                        });

                     
                        
                        // Input Number Funcion
                        cartElementContentQuantityInput.addEventListener("input", (event) => {
                            

                            const value = event.target.value;

                            item.Quantity = parseInt(value);

                            item.Total = item.Price * item.Quantity;

                            // This expression in Math.round must be used to round the numbers in a simply way
                            item.Total = Math.round(item.Total * 100) / 100; 
                            
                            cartElementContentTotalValue.innerText ="R$  " + item.Total.toFixed(2);
                           


                            localStorage.setItem("cart", JSON.stringify(cart));

                            
                            
                            let totalQuantity = 0;
                            for (let i = 0; i < cart.length; i++) {
                                const item = cart[i];
                                totalQuantity += item.Quantity;
                            }
                            cartTotalItem.innerText = totalQuantity + "  items";
                            localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity)); 

                            

                            let totalCartValue = 0;
                            for (let i = 0; i < cart.length; i++) {
                                const item = cart[i];
                           
                                totalCartValue += item.Total;

                            }
                            cartTotalValue.innerText = "R$   " + totalCartValue.toFixed(2);
                            localStorage.setItem("totalCartValue",JSON.stringify(totalCartValue));

                        });        
            

                        
                       
            
                        
                    
                    

                        
        
    
        
    }

}


