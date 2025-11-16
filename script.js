const cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Função de virar
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

// Verificação de par
function checkMatch() {
  const firstValue = firstCard.dataset.card;
  const secondValue = secondCard.dataset.card;

  if (firstValue === secondValue) {
    disableCards();
    matches++;

    if (matches === 5) {
      setTimeout(() => {
        alert("🎉 Parabéns! Você completou o Jogo da Memória!");
      }, 300);
    }
  } else {
    unflipCards();
  }
}

// Bloquear par encontrado
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

// Desvirar cartas erradas
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 900);
}

// Resetar variáveis
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Embaralhar cartas
(function shuffle() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Clique em cada carta
cards.forEach(card => card.addEventListener("click", flipCard));
