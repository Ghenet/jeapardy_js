//lets's get the html elements
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let score = 0;

const genres = [
    {
        name: 'Books',
        id: 10
    },
    {
        name: 'Film',
        id: 11
    },
    {
        name: 'Music',
        id: 12
    },
    {
        name: 'Video Games',
        id: 15
    }
];
const levels = ['easy', 'medium', 'hard']

function addGenre(genre) {
    const column = document.createElement('div');
    column.classList.add('genre-column');
    column.innerHTML = genre.name;
    game.append(column); //add the column to the game div

    //lets make a call to the api for each level
    levels.forEach(level => {
        //add a card element
        const card = document.createElement('div');
        card.classList.add('card');
        column.append(card);

     //add display points for each type of level questions
        if(level=== 'easy') {
            card.innerHTML = 100;
        }
        if(level === 'medium') {
            card.innerHTML = 200;
        }
        if(level === 'hard') {
            card.innerHTML = 300;
        }


        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            .then(response => response.json())
            .then(data =>{ 
                console.log(data);
                card.setAttribute('data-question', data.results[0].question);//adds data-question attribute to the card which is set to the question attribute
                card.setAttribute('data-answer', data.results[0].correct_answer);//adds data-answer attribute to the card which is set to the correct answer
                card.setAttribute('data-value', card.getInnerHTML());// sets the data-value attribute the value of points in each card level
            })
           .then(done =>  card.addEventListener('click', flipCard)); //adds eventlistner once all the data is fetched in the previous then
    })
}


genres.forEach(genre => addGenre(genre)); //loops over all the 4 genres to create 4 cols

function flipCard() {
    console.log('clicked');
    const textDisplay = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');
    trueButton.innerHTML = 'True';
    falseButton.innerHTML = 'False';
    trueButton.addEventListener('click',getResult);
    falseButton.addEventListener('click', getResult);
    textDisplay.innerHTML = this.getAttribute('data-question');
    this.append(textDisplay, trueButton, falseButton);

    // remove the eventListener so that we can only flip one card at a time
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.removeEventListener('click', flipCard));
}

function getResult() {
    // add the eventListener back on after answer is clicked
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click', flipCard));

    const cardOfButton = this.parentElement;
    if(cardOfButton.getAttribute('data-answer') === this.innerHTML) {
        score=score + parseInt(cardOfButton.getAttribute('data-value'));
        scoreDisplay.innerHTML = score;
        cardOfButton.classList.add('correct-answer');
// removes each child element after clicking T/F so that the card is flipped back to points won on that card
        setTimeout(() => {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.firstChild);
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
        }, 100);
    }else {
        cardOfButton.classList.add('wrong-answer');
        setTimeout(()=> {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.firstChild);
            }
            cardOfButton.innerHTML = 0; 
        },100)
    }
    cardOfButton.removeEventListener('click', flipCard);
}