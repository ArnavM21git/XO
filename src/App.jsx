import { useState, useEffect  } from "react"
import "./App.css"

function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))

  const [xIsNext, setXIsNext] = useState(true)

  useEffect(() => {
  console.log("Board updated:", board)}, [board])

  useEffect(() => {
  document.title = `Next: ${xIsNext ? "X" : "O"}`}, [xIsNext])

  const winner = calculateWinner(board)

  const isDraw = !winner && board.every((cell) => cell !== null)

  function handleClick(index) {

    if (board[index]) return

    if (winner) return

    const newBoard = [...board]

    newBoard[index] = xIsNext ? "X" : "O"

    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  
  function handleReset() {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

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
            key={index}
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

function calculateWinner(board) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
  
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null;
}

export default App;