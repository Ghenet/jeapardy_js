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
    levels.forEach((level) => {
        //add a card element
        const card = document.createElement('div');
        card.classList.add('card');
        column.append(card);

        fetch(`https://opentdb.com/api.php?amount=10&category=11&difficulty=${level}&type=boolean`)
            .then(res => responce.json())
            .then(data => console.log(data));
    })
}

addGenre();