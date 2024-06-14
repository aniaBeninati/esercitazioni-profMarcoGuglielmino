//Esercizio 4(opzionale): Proprio come abbiamo fatto insieme, perchè non proviamo a mostrare a DOM gli errori specifici? tipo se manca il title etc? CATEGORY saltatelo tranquillamente

const titleErrorMessage = document.querySelector(".title-error");
const priceErrorMessage = document.querySelector(".price-error");
const descriptionErrorMessage = document.querySelector(".description-error");
const categoryErrorMessage = document.querySelector(".category-error");
const imagesErrorMessage = document.querySelector(".images-error");

const errorHandler = (err, containerEl) => {
    containerEl.innerHTML = "";
    const errorMessageEl = document.createElement("h2");
    errorMessageEl.textContent = `${err.statusCode} - ${err.error}`;
    
    titleErrorMessage.innerHTML = ""
    priceErrorMessage.innerHTML = ""
    descriptionErrorMessage.innerHTML = ""
    categoryErrorMessage.innerHTML = ""
    imagesErrorMessage.innerHTML = ""
    
    const messages = Array.isArray(err.message) ? err.message : [err.message];
    
    messages.forEach((message) => {
        if (message.includes("title")) {
            titleErrorMessage.textContent = message;
            return;
        } 
        
        if (message.includes("price")) {
            priceErrorMessage.textContent = message;
            return;
        } 
        
        if (message.includes("category")) {
            categoryErrorMessage.textContent = message;
        }
        
        if (message.includes("description")) {
            descriptionErrorMessage.textContent = message;
            return;
        } 
        
        if (message.includes("images")) {
            imagesErrorMessage.textContent = message;
            return;
        }
    });
    
    
    
    containerEl.append(errorMessageEl);
    console.error(`${err.statusCode} - ${err.error}`);
};

export default errorHandler;