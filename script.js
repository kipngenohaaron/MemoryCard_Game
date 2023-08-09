const cards = document.querySelectorAll('.card');
const movesElement = document.getElementById('moves');
const resetButton = document.getElementById('reset-btn');
let flippedCards = [];
let canFlip = true;
let moves = 0;

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (!canFlip || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.querySelector('img').style.display = 'block';
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      canFlip = false;
      moves++;
      movesElement.textContent = moves;
      setTimeout(() => checkMatch(), 1000);
    }
  });
});

function checkMatch() {
  const [card1, card2] = flippedCards;
  const card1Data = card1.getAttribute('data-card');
  const card2Data = card2.getAttribute('data-card');

  if (card1Data === card2Data) {
    flippedCards = [];
    canFlip = true;
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.querySelector('img').style.display = 'none';
    card2.querySelector('img').style.display = 'none';
    flippedCards = [];
    canFlip = true;
  }
}

resetButton.addEventListener('click', () => {
  cards.forEach(card => {
    card.classList.remove('flipped');
    card.querySelector('img').style.display = 'none';
  });
  flippedCards = [];
  canFlip = true;
  moves = 0;
  movesElement.textContent = moves;
});
