var flashcards = {};
var currentCardSet = null;

var flashcardContainer = document.getElementById('flashcard-container');
var questionElement = document.getElementById('question');
var answerElement = document.getElementById('answer');
var nextButton = document.getElementById('next');
var toggleAnswerButton = document.getElementById('toggleAnswer');

// Fetch flashcards using XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.open('GET', 'flashcards.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
                flashcards = JSON.parse(xhr.responseText).sets;
                displaySets();
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.error('Error loading flashcards:', xhr.status);
        }
    }
};
xhr.send();

function displaySets() {
    for (var setName in flashcards) {
        var card = document.createElement('div');
        card.className = 'card';
        card.textContent = setName;
        card.onclick = function() {
            var selectedSetName = this.textContent;
            selectRandomFlashcard(selectedSetName);
        };
        flashcardContainer.appendChild(card);
    }
}

function selectRandomFlashcard(setName) {
    currentCardSet = flashcards[setName];
    var randomIndex = Math.floor(Math.random() * currentCardSet.length);
    showCard(randomIndex);
}

function showCard(index) {
    var currentCard = currentCardSet[index];
    questionElement.textContent = currentCard.question;
    answerElement.textContent = currentCard.answer;
    answerElement.classList.add('hidden');
}

nextButton.addEventListener('click', function() {
    var randomIndex = Math.floor(Math.random() * currentCardSet.length);
    showCard(randomIndex);
});

toggleAnswerButton.addEventListener('click', function() {
    answerElement.classList.toggle('hidden');
});
