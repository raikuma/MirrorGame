class MirrorGame {
  constructor() {
    this.boardRow = 5
    this.boardCol = 5

    this.initPieces = [
      [['S', 'B'],
       ['B', 'S']],
      [['S', 'B'],
       ['B', 'S']],
      [['S'],
       ['B']],
      [['S'],
       ['B']]
    ]

    this.newGame()
  }

  newGame() {
    this.tryCount = 0

    this.answer = genEmptyGrid(this.boardRow, this.boardCol)

    for (let i = 0; i < this.initPieces.length; i++) {
      while (true) {
        let piece = this.initPieces[i]
        const rotateCount = Math.floor(Math.random() * 4)
        for (let j = 0; j < rotateCount; j++) {
          piece = rotate90(piece)
        }

        const pieceRow = piece.length
        const pieceCol = piece[0].length

        const r = Math.floor(Math.random() * (this.boardRow - pieceRow + 1))
        const c = Math.floor(Math.random() * (this.boardCol - pieceCol + 1))
        if (isEmpty(this.answer, r, c, pieceRow, pieceCol)) {
          fillGrid(this.answer, r, c, piece)
          break
        }
      }
    }
  }

  query(n) {
    this.tryCount++

    let {x, y, dx, dy} = n2ray(n, this.boardRow, this.boardCol)
    x += dx
    y += dy
    let reflect = 0
    while (0 <= x && x < this.boardCol && 0 <= y && y < this.boardRow) {
      if (this.answer[y][x] === 'S') {
        [dy, dx] = [-dx, -dy]
        reflect++
      } else if (this.answer[y][x] === 'B') {
        [dy, dx] = [dx, dy]
        reflect++
      }
      x += dx
      y += dy
    }
    const goal = ray2n(x, y, this.boardRow, this.boardCol)
    return {tryCount:this.tryCount, reflect, goal}
  }

  checkWin(board) {
    for (let r = 0; r < this.boardRow; r++) {
      for (let c = 0; c < this.boardCol; c++) {
        if (this.answer[r][c] !== board[r][c]) {
          return false
        }
      }
    }
    return true
  }
}