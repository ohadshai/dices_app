var scores, roundScore, activePlayer, gamePlaying;
const winAmount = 20;



// document.querySelector('#current-' + activePlayer).textContent = dice;

init();

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice = 0;

    hide_dices()
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
}

function hide_dices(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function switch_player(){
    roundScore = 0;
    previousDice = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    activePlayer = 1 - activePlayer;
}

function win(){
    hide_dices()
    document.getElementById('name-'+ activePlayer).textContent = "Winner!";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    gamePlaying = false;
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (!gamePlaying) return;
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';

    if (!(dice1 == dice2)){
        roundScore+=dice1 + dice2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        var totalScore = scores[activePlayer] + roundScore;
        var input = document.querySelector('.final-score').value;
        var finalScore;
        if (input){
            finalScore = input;
        }
        else {
            finalScore = 100
        }
        if (totalScore >= finalScore) {
            document.getElementById('score-'+ activePlayer).textContent = totalScore;
            win();
        }
    }
    else{
        if (dice1 == 1 && dice2 == 1){
            scores[activePlayer] = 0;
            document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];
        }
        switch_player();
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (!gamePlaying) return;
    scores[activePlayer]+= roundScore;
    document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];
    switch_player();
})

document.querySelector('.btn-new').addEventListener('click', function(){
    document.getElementById('name-'+ activePlayer).textContent = 'Player ' + (activePlayer + 1);
    init();
})