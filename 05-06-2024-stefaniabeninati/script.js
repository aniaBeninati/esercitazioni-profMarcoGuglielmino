// Selezioniamo elementi del DOM
const macaronContainer = document.querySelector('.macaron-container');
const macarons = document.querySelectorAll('.macaron');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const closeButton = document.querySelector('.close-button');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');

const eventLog = document.getElementById('event-log');
const nameInput = document.getElementById('name-input');
const welcomeButton = document.getElementById('welcome-button');

// ESERCIZIO 1: Ascolto l'evento dall'elemento parent 
macaronContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('macaron') || event.target.classList.contains('macaron-img') || event.target.classList.contains('macaron-span')) {
        console.log(`Hai cliccato ${event.target.textContent}`);
        logThis.call(event.target);
    }
});

// ESERCIZIO 2:Funzione globale per loggare il contesto `this` 
function logThis() {
    console.log(this);
}

//Funzione per aprire la modale
// ESERCIZIO 4 CON SETTIMEOUT 5000
function openModal(macaronName) {
    modalTitle.textContent = `Ordina ${macaronName}`;
    modal.style.display = 'block';
    document.getElementById('macaron-form').reset();
    setTimeout(() => {
        closeModal();
    }, 5000);
    
    // ESERCIZIO 5 CON SETINTERVAL 1000
    let secondsLeft = 20; //HO MODIFICATO DA 5 A 20 PERCHè SI CHIUDEVA TROPPO PRESTO
    const countdownInterval = setInterval(() => {
        modalTitle.textContent = `La tua scelta si chiuderà tra ${secondsLeft} secondi`;
        secondsLeft--;
        if (secondsLeft < 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

//ESERCIZIO 3: Aggiungo l'evento di click ai macarons
macarons.forEach(macaron => {
    macaron.addEventListener('click', () => {
        openModal(macaron.getAttribute('data-name'));
    });
});


// Aggiungo l'evento di click al pulsante di invio della modale (DA ESERCITAZIONE IL PULSANTE INVIA  è IL PULSANTE SI)
document.getElementById('macaron-form').addEventListener('submit', (event) => {
    event.preventDefault();  // Previene l'invio del form
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const packaging = document.getElementById('packaging').value;
    console.log(`Quantità: ${quantity}, Indirizzo: ${address}, Confezione: ${packaging}`);
    closeModal();
});

// Funzione per chiudere la modale
function closeModal() {
    modal.style.display = 'none';
}

// Aggiungo l'evento di click per chiudere la modale quando clicchiamo la x in alto
closeButton.addEventListener('click', closeModal);

// Aggiungo l'evento di click per chiudere la modale (DA ESERCITAZIONE IL PULSANTE ANNULLA  è IL PULSANTE NO)
cancelButton.addEventListener('click', closeModal);







