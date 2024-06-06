const containerEl = document.querySelector(".card-container");
const loadProductsButton = document.getElementById("loadProductsButton"); //ESERCIZIO 4
const filterByCategoryButton = document.createElement('title-button');
const closeButton = document.querySelector('.close-button');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');
const eventLog = document.getElementById('event-log');
const nameInput = document.getElementById('name-input');
const welcomeButton = document.getElementById('welcome-button');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');


//Esercizio 1: esercitiamoci con fetch , effettuiamo una chiamata a https://fakestoreapi.com/products, sfruttando i .then() stampiamo a console i dati ottenuti comprensibili per js

loadProductsButton.addEventListener("click", () => {
    fetch("https://fakestoreapi.com/products").then((res) => { 
        // console.log(res);
        // console.log(res.json);
        return res.json()})
        .then((responseData) => {
            //console.log(responseData)
            for (let i = 0; i < responseData.length; i++) {
                const product = responseData[i];
                
                const productCard = document.createElement('div');
                productCard.classList.add('product-card'); // Aggiungi una classe per styling
                
                const title = document.createElement('p');
                title.textContent = product.title;
                title.classList.add('product-title'); // Aggiungi una classe per styling
                
                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;
                productImage.classList.add('product-image'); // Aggiungi una classe per styling
                
                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price}`;
                productPrice.classList.add('product-price'); // Aggiungi una classe per styling
                
                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;
                productDescription.classList.add('product-description'); // Aggiungi una classe per styling
                
                // Aggiungi gli elementi creati al productCard
                productCard.appendChild(title);
                productCard.appendChild(productImage);
                productCard.appendChild(productPrice);
                productCard.appendChild(productDescription);
                
                // Aggiungi la card al container
                containerEl.appendChild(productCard);
                
                productCard.addEventListener('click', () => {
                    openModal(title.textContent);
                });
            }
            
            //Esercizio 5 (opzionale - pazzo): -solo per pazzi- e se inserissimo un campo input che all'inserimento del testo filtra i prodotti stampati sul DOM?*
            document.getElementById('title-input').addEventListener('input', (event) => {
                const searchQuery = event.target.value.toLowerCase();
                const filteredProducts = responseData.filter(product => product.title.toLowerCase().includes(searchQuery));
                
                containerEl.innerHTML = ''; // Cancella i prodotti esistenti
                
                filteredProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card'); 
                    
                    const title = document.createElement('p');
                    title.textContent = product.title;
                    title.classList.add('product-title'); 
                    
                    const productImage = document.createElement('img');
                    productImage.src = product.image;
                    productImage.alt = product.title;
                    productImage.classList.add('product-image'); 
                    
                    const productPrice = document.createElement('p');
                    productPrice.textContent = `$${product.price}`;
                    productPrice.classList.add('product-price'); 
                    
                    const productDescription = document.createElement('p');
                    productDescription.textContent = product.description;
                    productDescription.classList.add('product-description'); 
                    
                    
                    productCard.appendChild(title);
                    productCard.appendChild(productImage);
                    productCard.appendChild(productPrice);
                    productCard.appendChild(productDescription);
                    
                    
                    containerEl.appendChild(productCard);
                    
                    productCard.addEventListener('click', () => {
                        openModal(title.textContent);
                    });
                });
                
            }
        );
    })
    
    .catch((error) => {
        console.error('Error fetching the products:', error);
    });
});

//console.log("PROMISE", fetch("https://fakestoreapi.com/products"));


function openModal(name) {
    modalTitle.textContent = `Ordina ${name}`;
    modal.style.display = 'block';
    document.getElementById('product-form').reset();
}

document.getElementById('product-form').addEventListener('submit', (event) => {
    event.preventDefault();  // Previene l'invio del form
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const packaging = document.getElementById('packaging').value;
    console.log(`Taglia o numero: ${quantity}, Indirizzo: ${address}, Confezione: ${packaging}`);
    closeModal();
});


function closeModal() {
    modal.style.display = 'none';
}


closeButton.addEventListener('click', closeModal);


cancelButton.addEventListener('click', closeModal);


function openWelcomeModal(message) {
    const modal = document.getElementById('modal-email');
    const modalMessage = document.getElementById('modal-message');
    
    
    modalMessage.textContent = message;
    
    
    modal.style.display = 'block';
}

document.getElementById('close-button-email').addEventListener('click', () => {
    const modal = document.getElementById('modal-email');
    modal.style.display = 'none';
});

welcomeButton.addEventListener('click', () => {
    const name = nameInput.value;
    if (name) {
        openWelcomeModal(`La tua email è ${name}`);
    } else {
        openWelcomeModal('Non hai inserito la tua email!');
    }
});


