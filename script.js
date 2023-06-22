//your JS code here. If required.
var player1 = '';
    var player2 = '';
    var currentPlayer = '';
    var moves = 0;
    var gameOver = false;

    var cells = document.querySelectorAll('.cell');
    var messageElement = document.querySelector('.message');
    var submitButton = document.getElementById('submit');
    var gameContainer = document.getElementById('game-container');

    submitButton.addEventListener('click', function() {
      player1 = document.getElementById('player-1').value;
      player2 = document.getElementById('player-2').value;

      if (player1 && player2) {
        currentPlayer = player1;
        messageElement.textContent = player1 + ", you're up!";
        gameContainer.style.display = 'block';
      }
    });

    function checkWinner() {
      var winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
      ];

      for (var i = 0; i < winningCombinations.length; i++) {
        var combination = winningCombinations[i];
        var cell1 = document.getElementById(combination[0]).textContent;
        var cell2 = document.getElementById(combination[1]).textContent;
        var cell3 = document.getElementById(combination[2]).textContent;

        if (cell1 === cell2 && cell2 === cell3 && cell1 !== '') {
          return true;
        }
      }

      return false;
    }

    function checkDraw() {
      return moves === 9;
    }

    function handleClick(event) {
      var cell = event.target;

      if (!cell.textContent && !gameOver) {
        cell.textContent = currentPlayer;
        moves++;

        if (checkWinner()) {
          gameOver = true;
          messageElement.textContent = currentPlayer + ", congratulations, you won!";
        } else if (checkDraw()) {
          gameOver = true;
          messageElement.textContent = "It's a draw!";
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          messageElement.textContent = currentPlayer + ", you're up!";
        }
      }
    }

    cells.forEach(function(cell) {
      cell.addEventListener('click', handleClick);
    });