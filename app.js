var flashcards = [];
var currentCardIndex = 0;

var questionElement = document.getElementById('question');
var answerElement = document.getElementById('answer');
var nextButton = document.getElementById('next');
var toggleAnswerButton = document.getElementById('toggleAnswer');

// Fetch flashcards using XMLHttpRequest (for older browsers)
var xhr = new XMLHttpRequest();
xhr.open('GET', 'flashcards.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
                flashcards = JSON.parse(xhr.responseText);
                showCard();
            } catch (error) {
                questionElement.textContent = "Error parsing flashcards.";
                console.error('Error parsing JSON:', error);
            }
        } else {
            questionElement.textContent = "Error loading flashcards.";
            console.error('Error loading flashcards:', xhr.status);
        }
    }
};
xhr.send();

function showCard() {
    var currentCard = flashcards[currentCardIndex];
    questionElement.textContent = currentCard.question;
    answerElement.textContent = currentCard.answer;
    answerElement.classList.add('hidden');
}

nextButton.addEventListener('click', function() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    showCard();
});

toggleAnswerButton.addEventListener('click', function() {
    answerElement.classList.toggle('hidden');
});
