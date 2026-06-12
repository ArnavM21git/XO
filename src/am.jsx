import { useState } from "react"
import "./App.css"

function App() {
  // ===== STATE 1: The board =====
  // Array of 9 slots, index 0-8, laid out like this:
  //  [0][1][2]
  //  [3][4][5]
  //  [6][7][8]
  // Each slot = null (empty) | "X" | "O"
  const [board, setBoard] = useState(Array(9).fill(null))

  // ===== STATE 2: Whose turn =====
  // true = X's turn, false = O's turn
  const [xIsNext, setXIsNext] = useState(true)

  // ===== DERIVED VALUE: winner =====
  // NOT state — recalculated every render straight from board
  const winner = calculateWinner(board)

  // ===== DERIVED VALUE: draw check =====
  // true only if no winner AND no empty cells left
  const isDraw = !winner && board.every((cell) => cell !== null)

  // ===== FUNCTION: runs when a cell is clicked =====
  function handleClick(index) {
    // Rule 1: ignore click if cell already filled
    if (board[index]) return

    // Rule 2: ignore click if game already won
    if (winner) return

    // NEVER mutate state directly (board[index] = "X" is WRONG)
    // Spread (...) creates a NEW array copy
    const newBoard = [...board]

    // Fill the clicked cell with current player's mark
    newBoard[index] = xIsNext ? "X" : "O"

    setBoard(newBoard)      // save new board -> triggers re-render
    setXIsNext(!xIsNext)    // flip turn for next click
  }

  // ===== FUNCTION: reset everything =====
  function handleReset() {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  // ===== STATUS MESSAGE LOGIC =====
  let status;
  if (winner) {
    status = `Winner: ${winner}`
  } else if (isDraw) {
    status = "It's a Draw!"
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <p className="status">{status}</p>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}                      // required for lists
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  )
}

// ===== HELPER FUNCTION: calculateWinner =====
// Lives OUTSIDE App() — it's a pure function, doesn't need React/state
function calculateWinner(board) {
  // All 8 possible winning combinations (indices on the board)
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal ↘
    [2, 4, 6], // diagonal ↙
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    // check: cell 'a' is filled AND all three cells match
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]   // returns "X" or "O"
    }
  }
  return null   // no winner found
}

export default App