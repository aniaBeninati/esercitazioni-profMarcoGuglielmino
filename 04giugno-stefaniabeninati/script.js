
const div = document.querySelector('.counter');
const p = document.querySelector('.counter p');

/*const p = document.createElement('p');
const stopButton = document.createElement('button');
const startButton = document.createElement('button');

stopButton.className = 'stop';
startButton.className = 'start';
startButton.textContent = 'Start';
stopButton.textContent = 'Stop';
div.append(startButton, stopButton);*/

//come alternativa ho voluto ricreare i bottoni su html e lavorare di stile da li.

//p.textContent = new Date();

const startButton = document.querySelectorAll('button')[0];
const stopButton = document.querySelectorAll('button')[1];

const runInterval = (isOnlyHour) => {
    const id = setInterval(() => {
        const now = new Date();
        let formattedTime;
        if(isOnlyHour){
            const options = { 
                hour: '2-digit', minute: '2-digit', second: '2-digit' 
            };
            formattedTime = now.toLocaleTimeString('it-IT', options);
        } else {
            formattedTime = now.toLocaleString('it-IT');
        }
        p.textContent = formattedTime;
        console.log(p.textContent)
    },1000)
    
    return id;
}


let intervalId = runInterval();
startButton.addEventListener('click', () => {
    console.log(intervalId);
    clearInterval(intervalId)
    intervalId = runInterval();
    console.log(intervalId);
});

stopButton.addEventListener('click', () => {
    console.log(intervalId);
    clearInterval(intervalId)
});

const nascondiData = document.getElementById("nascondiData");
nascondiData.addEventListener('click', () => {
    console.log(intervalId);
    clearInterval(intervalId)
    intervalId = runInterval(true);
    console.log(intervalId);
});



/*let number = 0;

const loggerFn = (arg) => {
    console.log("loggerFn", arg)
}
loggerFn('primo log')
loggerFn('secondo log')
loggerFn('terzo log')
*/
