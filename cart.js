const cartContainer = document.querySelector(".cart-container");
const cartTotalValue = document.querySelector(".cart-detail-value-number");


// The selected items will go inside this vector
let cart = [];


// Get the items stored and put them in the cart vector
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"))
}



let totalValue = 0;
JSON.parse(localStorage.getItem("totalValue"))


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
            
                        // Saves the modification in the cart local storage, 
                        localStorage.setItem("cart", JSON.stringify(cart));
            
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
                        cartElementContentQuantityInput.value = item.Quantity;

                        // add an event listener to the input element's keydown event --TEACHER CHATGPT--
                        cartElementContentQuantityInput.addEventListener("keydown", (event) => {


                            // disable manual input using the keyboard --TEACHER CHATGPT--
                            if (event.key !== "ArrowUp" && event.key !== "ArrowDown" && event.key !== "Tab" && event.key !== "Escape" && event.key !== "Enter") {
                            event.preventDefault();
                            }
                        });

                        
                        
                        cartElementContentQuantityInput.addEventListener("input", (event) => {
                            

                            const value = event.target.value;

                            item.Quantity = parseInt(value);

                            item.Total = item.Price * item.Quantity;

                            
                            cartElementContentTotalValue.innerText ="R$  " + item.Total.toFixed(2);
                           
                            localStorage.setItem("cart", JSON.stringify(cart));


                           

                        });

                        cartElementContentQuantity.appendChild(cartElementContentQuantityInput);
        
                        let totalCartValue = cart.reduce((total, item) => total + item.Total, 0); 
                        totalValue += totalCartValue;
                        localStorage.setItem("totalValue", JSON.stringify(totalValue));
                        console.log(totalValue)
                        


                        
        
    
        
    }

}


