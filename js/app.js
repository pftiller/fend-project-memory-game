let icons = [
    'fa-birthday-cake',
    'fa-anchor',
    'fa-apple-alt',
    'fa-bicycle',
    'fa-bowling-ball',
    'fa-cloud',
    'fa-fish',
    'fa-grin',
    'fa-birthday-cake',
    'fa-anchor',
    'fa-apple-alt',
    'fa-bicycle',
    'fa-bowling-ball',
    'fa-cloud',
    'fa-fish',
    'fa-grin'
]

document.addEventListener('DOMContentLoaded', generateCards);

let currentClicks = 0;
let correctMatches = 0;
let flips = 0;
let seconds = 0;
let moves = 0;
let fragment = document.createDocumentFragment();
let cardContainer = document.createElement('div');
let timeKeeper;
let firstTarget;
let secondTarget;
let guessOne;
let guessTwo;

function generateCards() {
    console.log('starting to run function');
    for (let i = icons.length; i > 0; i--) {
            let backOfCard = document.createElement('div');
            let frontOfCard = document.createElement('div');
            let card = document.createElement('div');
            cardContainer.classList.add('container');
            card.classList.add('card');
            let randomNumber = Math.floor((Math.random() * icons.length));
            card.addEventListener('click', flipCard)
            frontOfCard.classList.add('back');
            backOfCard.classList.add('front', 'fas', `${icons[randomNumber]}`);
            card.appendChild(backOfCard);
            card.appendChild(frontOfCard);
            fragment.appendChild(card)
            icons.splice(randomNumber, 1);
    }
    cardContainer.appendChild(fragment);
    document.body.appendChild(cardContainer);
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = '<div class="modal-content"><h1>Congratulations!</h1><p class="text-align:center">You matched all the cards!</p><button class="replay-btn" onClick=location.reload()>Replay</button></div>';
    document.body.appendChild(modal);
}

function flipCard(event) {
    flips +=1;
    if(flips === 1) {
        timeKeeper = setInterval(myTimer, 1000);
    }
    console.log('event fired');
    var element = event.currentTarget;
    if (element.className === "card") {
        if(element.style.transform == "rotateY(180deg)") {
            currentClicks -= 1;  
            element.style.transform = "rotateY(0deg)";
        
    }
    else {
    element.style.transform = "rotateY(180deg)";
    currentClicks += 1;
        if(currentClicks ===1) {
                firstTarget = element;
                guessOne = firstTarget.querySelector('div').classList[2];
                console.log(guessOne);
        }
        else if(currentClicks === 2) {
                adjustStars()
                secondTarget = element;
                guessTwo = secondTarget.querySelector('div').classList[2];
                document.querySelector('.right').innerText=`Moves: ${moves +=1}`;
                currentClicks = 0;
                    if(guessOne == guessTwo) {
                        document.querySelector('.left').innerText=`Matches: ${correctMatches +=1}`;
                        firstTarget.removeEventListener('click', flipCard);
                        firstTarget.querySelector('div').classList.add('matched');
                        secondTarget.removeEventListener('click', flipCard);
                        secondTarget.querySelector('div').classList.add('matched');
                        if(correctMatches===8) {
                            clearInterval(timeKeeper);
                            setTimeout(() => {
                                document.querySelector('.modal').classList.toggle('show-modal');
                            }, 2000);
                        }
                    }
                    else {
                        setTimeout(() => {
                            firstTarget.style.transform = "rotateY(0deg)";
                            secondTarget.style.transform = "rotateY(0deg)";
                        }, 2000);
                    }
                }
            }
        }
    }
function adjustStars() {
    if(moves === 15) {
        document.querySelector('#stars').textContent='\uf005 \uf005';
    }
    else if (moves === 23) {
        document.querySelector('#stars').textContent='\uf005';
    }
    else if (moves > 28) {
        document.querySelector('#stars').textContent='0';
    }
}


function myTimer() {
    seconds +=1;
    document.querySelector('h3').innerText=`Time: ${seconds} seconds`
    console.log('time: ', seconds);
};


    