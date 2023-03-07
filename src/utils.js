function rectInclude(left, right, up, down, x, y) {
  if (left < x && x < right && up < y && y < down) {
    return true
  }
  return false
}

function rotate90(grid) {
  const gridRow = grid.length
  const gridCol = grid[0].length
  let rotated = []
  for (let r = 0; r < gridCol; r++) {
    let row = []
    for (let c = 0; c < gridRow; c++) {
      let s = grid[c][gridCol-1 - r] === 'B' ? 'S' : 'B'
      row.push(s)
    }
    rotated.push(row)
  }
  return rotated
}

function fillGrid(grid, row, col, state) {
  for (let r = 0; r < state.length; r++) {
    for (let c = 0; c < state[0].length; c++) {
      grid[row + r][col + c] = state[r][c]
    }
  }
}

function genEmptyGrid(row, col) {
  let grid = []
  for (let r = 0; r < row; r++) {
    let rowCell = []
    for (let c = 0; c < col; c++) {
      rowCell.push(' ')
    }
    grid.push(rowCell)
  }
  return grid
}

function isEmpty(grid, row, col, nr, nc) {
  for (let r = 0; r < nr; r++) {
    for (let c = 0; c < nc; c++) {
      if (grid[row + r][col + c] !== ' ') {
        return false
      }
    }
  }
  return true
}

function n2ray(n, row, col) {
  n = n - 1
  let x, y, dx, dy
  if (n < row) {
    x = -1
    y = row - 1 - n
    dx = 1
    dy = 0
  } else if (n < row + col) {
    x = n - row
    y = -1
    dx = 0
    dy = 1
  } else if (n < row + col + row) {
    x = col
    y = n - (row + col)
    dx = -1
    dy = 0
  } else if (n < row + col + row + col) {
    x = col - 1 - (n - (row + col + row))
    y = row
    dx = 0
    dy = -1
  } else {
    return null
  }
  return { x, y, dx, dy }
}

function ray2n(x, y, row, col) {
  let n
  if (x === -1) {
    n = row-1 - y
  } else if (y === -1) {
    n = x + row
  } else if (x === col) {
    n = y + (row+col)
  } else if (y === row) {
    n = col-1 - x + (row+col+row)
  } else {
    return null
  }
  return n + 1
}