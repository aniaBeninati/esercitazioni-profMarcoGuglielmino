import errorHandler from "./errorHandler.js";


const inputTitleEl = document.querySelector('.title');
const inputPriceEl = document.querySelector('.price');
const inputDescriptionEl = document.querySelector('.description');
const inputCategoryEl = document.querySelector('.category-id');
const inputImagesEl = document.querySelector('.images');
const buttonFormEl = document.querySelector('.button-form');
const inputDeleteEl = document.querySelector('.delete');
const buttonDeleteEl = document.querySelector('.button-delete');
const buttonPutEl = document.querySelector('.button-put');
const inputSelectByIdEl = document.querySelector('.select-by-id');
const buttonSelectorByIdEl = document.querySelector('.button-selectbyid');

const containerEl = document.querySelector(".card-container");

const titleErrorMessage = document.querySelector(".title-error");
const priceErrorMessage = document.querySelector(".price-error");
const descriptionErrorMessage = document.querySelector(".description-error");
const categoryErrorMessage = document.querySelector(".category-error");
const imagesErrorMessage = document.querySelector(".images-error");

/*Esercizio 1: Abbiamo visto oggi la possibilità di utilizzare altri due metodi http ovvero PUT  e PATCH , 
sempre sulla base della fantastica api: https://api.escuelajs.co/ dopo aver creato un 
prodotto con il metodo POST modifichiamolo in parte o interamente, verificate che effettivamente 
il nostro prodotto è stato aggiornato sul database facendo un getById dello stesso*/

const apiProductsPost = `https://api.escuelajs.co/api/v1/products`;
let ritornoIdChiamata; //variabile che chiama ID

//AZIONE
buttonFormEl.addEventListener('click', e => {
    e.preventDefault(); //viene utilizzata in JavaScript per prevenire evento
    const data = {
        title: inputTitleEl.value,
        price: Number(inputPriceEl.value),
        description: inputDescriptionEl.value,
        categoryId: Number(inputCategoryEl.value),
        images: [inputImagesEl.value],
    }
    
    //RICHIAMO
    POST(data).then(id => {//con il then che ci indica che abbiamo finito, prendo id salvo nella variabile ed in fine stampo in console
        ritornoIdChiamata = id;//popolato la mia variabile 
        console.log(ritornoIdChiamata)
    });
})


//CREO 

//Esercizio 3: Gestiamo gli eventuali errori per esempio dentro la POST  come abbiamo visto insieme sfruttando trycatch statement, va benissimo un errore in console log customizzato, l'importante è che passi dal catch!
const POST = async (data) => {
    try {
        const risultato = await fetch (apiProductsPost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const objResp = await risultato.json();
        
        if (objResp.error) {
            if (data.categoryId === 0) {
                objResp.message.push("category must be a positive number")
            }
            console.log(objResp)
            throw objResp;
        }
        
        if (data.categoryId === 0) {
            throw {
                message: ["category must be a positive number"]
            }
        }
        
        titleErrorMessage.innerHTML = ""
        priceErrorMessage.innerHTML = ""
        descriptionErrorMessage.innerHTML = ""
        categoryErrorMessage.innerHTML = ""
        imagesErrorMessage.innerHTML = ""
        
        containerEl.innerHTML = "";
        
        return objResp.id;
        
    } catch (err) {
        errorHandler(err, containerEl)
    }
};


buttonPutEl.addEventListener('click', e => {
    e.preventDefault(); //viene utilizzata in JavaScript per prevenire evento
    const data = {
        title: inputTitleEl.value,
        price: Number(inputPriceEl.value),
        description: inputDescriptionEl.value,
        categoryId: Number(inputCategoryEl.value),
        images: [inputImagesEl.value],
    }
    
    //RICHIAMO
    PUT(data).then(id => {//con il then che ci indica che abbiamo finito, prendo id salvo nella variabile ed in fine stampo in console
        GETBYID(ritornoIdChiamata);
    });
})

const PUT = async (product) => {
    //product = data;
    const res = await fetch(apiProductsPost+"/"+ritornoIdChiamata, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    
    const data = res.json();
    
    return data;
}

//DICHIARO LA FUNZIONE PER VERIFICARE SE HA PRESO LE MODIFICHE CON PUT
const GETBYID = async (id) => {
    const risultato = await fetch (apiProductsPost+"/"+id);
    const objResp = await risultato.json(); 
    console.log(objResp);
    return objResp;
}

//AZIONE
buttonDeleteEl.addEventListener('click', e => {
    e.preventDefault(); 
    //RICHIAMO
    deleteById().then(()=>{
        const movieCard  = document.createElement('div');
        movieCard.innerHTML = `
        <p>${"Item Removed"}</p>`;
        containerEl.appendChild(movieCard);
        setTimeout(function(){
            containerEl.innerHTML="";
        }, 3000)
    })
});



//CREO Esercizio 2: Dopo averlo modificato cancelliamolo con il metodo DELETE
const deleteById = async () => {
    const risultato = await fetch(apiProductsPost+"/"+inputDeleteEl.value,{ //Esercizio 4(Opzionale): Creiamo un campo input + button specifico per la DELETE, inseriamo l'id all'interno del campo input e al click del button cancellerà l'id che abbiamo specificato
        method: "DELETE"
    });
    
    const data = await risultato.json()
    
    console.log(data)
}


//AZIONE Esercizio 5 
buttonSelectorByIdEl.addEventListener('click', e => {
    e.preventDefault(); //viene utilizzata in JavaScript per prevenire evento
    GETBYID(inputSelectByIdEl.value).then(obj => {//con il then che ci indica che abbiamo finito, prendo id salvo nella variabile ed in fine stampo in console
        inputTitleEl.value = obj.title;
        inputPriceEl.value = obj.price;
        inputDescriptionEl.value = obj.description;
        inputCategoryEl.value = obj.category.id;
        inputImagesEl.value = obj.images[0];
    });
})