//lets's get the html elements
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

const film = 11;
const levels = ['easy', 'medium', 'hard']

function addGenre() {
    const column = document.createElement('div');
    column.classList.add('genre-column');
    column.innerHTML = "this is genre";
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


        fetch(`https://opentdb.com/api.php?amount=1&category=11&difficulty=${level}&type=boolean`)
            .then(response => response.json())
            .then(data =>{ 
                console.log(data);
                card.setAttribute('data-question', data.results[0].question);//adds data-question attribute to the card which is set to the question attribute
                card.setAttribute('data-answer', data.results[0].correct_answer);//adds data-answer attribute to the card which is set to the correct answer
                card.setAttribute('data-value', card.getInnerHTML());// sets the data-value attribute the value of points in each card level
            });
    })
}

addGenre();