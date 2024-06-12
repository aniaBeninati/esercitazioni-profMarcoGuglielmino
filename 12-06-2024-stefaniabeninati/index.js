const inputTitleEl = document.querySelector('.title');
const inputPriceEl = document.querySelector('.price');
const inputDescriptionEl = document.querySelector('.description');
const inputCategoryEl = document.querySelector('.category-id');
const inputImagesEl = document.querySelector('.images');
const buttonFormEl = document.querySelector('.button-form');
const inputDeleteEl = document.querySelector('.delete');
const buttonDeleteEl = document.querySelector('.button-delete');
const containerEl = document.querySelector(".card-container");

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

//Esercizio 1: Creiamo il nostro metodo POST e aggiungiamo dei dati alla API, rispettando ciò che la documentazione ci dice, salviamoci l'ID* che l'api ci fornirà ai dati che avremo mandato
//Esercizio 2: Vogliamo provare ad interagire con il DOM? Creiamo un form come abbiamo fatto durante la lezione con i vari campi input necessari per compilare il nostro oggetto da mandare con la POST alla API
const POST = async (data) => {
    const risultato = await fetch (apiProductsPost, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    const objResp = await risultato.json();
    
    return objResp.id;
}

//AZIONE
buttonDeleteEl.addEventListener('click', e => {
    e.preventDefault(); 
//RICHIAMO
deleteById().then(()=>{
        const movieCard  = document.createElement('div');
        movieCard.innerHTML = `
        <p>${"Oggetto rimosso"}</p>`;
        containerEl.appendChild(movieCard);
        setTimeout(function(){
            containerEl.innerHTML="";
        }, 3000)
    })
});
        
        
//Esercizio 3: Creiamo una funzione DELETE che passato un ID cancella un oggetto esistente nella API

//CREO 
const deleteById = async () => {
    const risultato = await fetch(apiProductsPost+"/"+inputDeleteEl.value,{ //Esercizio 4(Opzionale): Creiamo un campo input + button specifico per la DELETE, inseriamo l'id all'interno del campo input e al click del button cancellerà l'id che abbiamo specificato
        method: "DELETE"
    });
        
    const data = await risultato.json()
        
    console.log(data)
}

//CREO 
const GET = async () => {
    const risultato = await fetch (apiProductsPost);
    const objResp = await risultato.json(); 
    console.log(objResp);
    return objResp;
}

//Esercizio 5(Opzionale): Stampiamo a DOM il risultato della GET a questa nuova API
//RICHIAMO
GET();//quando carica la pagina compare il GET