const cellSize = 75
const canvasWidth = 862.5
const canvasHeight = 450

let gameObjects = []
let game
let renderer
let submitBoard

window.onload = init

function init() {
  const historyDiv = $('#historyDiv') // For auto scroll
  const historyTable = document.querySelector('#historyTable')
  const queryInput = document.querySelector('#queryInput')
  const queryButton = document.querySelector('#queryButton')
  const submitButton = document.querySelector('#submitButton')
  const resultText = document.querySelector('#resultText')

  const canvas = document.querySelector('#canvas')
  renderer = new Renderer(canvas)

  game = new MirrorGame()
  console.log('Answer:', game.answer)

  submitBoard = new Board(0, 0, game.boardCol, game.boardRow)
  submitBoard.onNumberClick = function(n) {
    queryInput.value = n
  }
  gameObjects.push(submitBoard)

  const laserView = new LaserView(submitBoard)
  laserView.z = 2
  gameObjects.push(laserView)

  // Init pieces
  for (let i = 0; i < game.initPieces.length; i++) {
    const x = canvasHeight + cellSize/2 + cellSize*2.5*Math.floor(i/2)
    const y = cellSize/2 + cellSize/4 + cellSize*2.5*Math.floor(i%2)
    const cellState = game.initPieces[i]
    const color = cellState[0].length > 1 ? '#73AB84' : '#99D19C'
    const piece = new Piece(x, y, cellState, color, submitBoard)
    gameObjects.push(piece)
  }

  // Handle user control
  canvas.addEventListener('mousedown', function(event) {
    gameObjects.forEach(obj => obj.onMouseEvent(event))
  })
  canvas.addEventListener('mousemove', function(event) {
    gameObjects.forEach(obj => obj.onMouseEvent(event))
  })
  canvas.addEventListener('mouseup', function(event) {
    gameObjects.forEach(obj => obj.onMouseEvent(event))
  })
  window.addEventListener('keydown', function(event) {
    gameObjects.forEach(obj => obj.onKeyboardEvent(event))
  })

  // handleQueryForm
  queryButton.addEventListener('click', function(event) {
    const start = parseInt(queryInput.value)
    if (start) {
      const {tryCount, reflect, goal} = game.query(start)
      const row = historyTable.insertRow(tryCount-1)
      row.insertCell(0).innerHTML = tryCount
      row.insertCell(1).innerHTML = start
      row.insertCell(2).innerHTML = reflect
      row.insertCell(3).innerHTML = goal
      historyDiv.scrollTop(historyDiv[0].scrollHeight)
      submitButton.disabled = false
    }
  })

  submitButton.disabled = true
  submitButton.addEventListener('click', function(event) {
    const win = game.checkWin(submitBoard.grid.cellState)
    if (win) {
      resultText.style.color = 'green'
      resultText.innerHTML = 'Correct!'
    } else {
      resultText.style.color = 'red'
      resultText.innerHTML = 'Incorrect...'
    }
    submitButton.disabled = true
  })

  window.requestAnimationFrame(gameLoop)
}

function gameLoop(timeStamp) {
  draw()
  window.requestAnimationFrame(gameLoop)
}

function draw() {
  renderer.drawBackground()
  gameObjects.sort((a, b) => (a.z - b.z))
  gameObjects.forEach(obj => obj.draw())
}
