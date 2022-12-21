// VARIÁVEIS

const box = ["", "", "", "", "", "", "", "", ""];
const symbols = ["O", "X"];
const modal = document.querySelector(".container_finished");
const playerWinner = document.querySelector(".winner_response");
const squares = document.querySelectorAll(".object_to_play");
const player = document.querySelector(".player_time");
const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let playerTime = 0;
let gameOver = false;

// LÓGICA PRINCIPAL DO JOGO DA VELHA

const handleClick = (square) => {
  let squareTarget = square.target;
  let position = squareTarget.id;

  handleMove(position);
  updateSquares();
};

// LÓGICA DE VARIAÇÃO ENTRE X OU O

const handleMove = (position) => {
  if (gameOver) {
    return;
  }

  if (box[position] == "") {
    box[position] = symbols[playerTime];

    gameOver = win();

    playerTime == 0 ? (playerTime = 1) : (playerTime = 0);
  }
};

// VENCER O JOGO E PAUSAR AS AÇÕES DE CLICK

const win = () => {
  for (let i = 0; i < winStates.length; i++) {
    let seq = winStates[i];

    let position1 = seq[0];
    let position2 = seq[1];
    let position3 = seq[2];

    if (gameOver == false) {
      if (
        box[position1] == box[position2] &&
        box[position1] == box[position3] &&
        box[position1] != ""
      ) {
        modal.classList.add("show_modal");
        playerTime == 0
          ? (playerWinner.innerHTML = "O jogador 1 (O) venceu")
          : (playerWinner.innerHTML = "O jogador 2 (X) venceu");
        return true;
      }

      // JOGO DEU VELHA

      if (box.filter((square) => square).length === 9) {
        modal.classList.add("show_modal");
        playerWinner.innerHTML = "O jogo deu velha";
        return true;
      }
    }
  }
  resetGame();
  return gameOver;
};

// MOSTRAR 'X' OU 'O' AO CLICAR EM CADA BLOCO

const updateSquares = () => {
  squares.forEach((square) => {
    let position = square.id;
    let symbol = box[position];

    if (symbols != "") {
      square.innerHTML = `<div class = '${symbol}'></div>`;

      // MOSTRA O JOGADOR DA VEZ

      player.innerHTML = `Jogador da Vez: ${symbols[playerTime]}`;
    }
  });
};

// FUNÇÕES DE CLIQUE E LOADING DA PÁGINA

document.addEventListener("DOMContentLoaded", () => {
  player.innerHTML = "Jogador da Vez: O";
  squares.forEach((square) => {
    square.addEventListener("click", handleClick);
  });
});

// REINICIAR O JOGO

const resetGame = () => {
  let reset = document.querySelector(".btn_reset");
  reset.addEventListener("click", () => {
    modal.classList.remove("show_modal");

    squares.forEach((square) => {
      square.innerHTML = "";
    });
    box.fill("");
    gameOver = false;
  });
};
