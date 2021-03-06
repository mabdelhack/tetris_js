document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  const startPosition = 4
  const speedInterval = 300
  let nextRandom = 0
  let nextRotation = 0
  let timerId
  let score = 0
  const colors = [
    'orange',
    'red',
    'blue',
    'green',
    'purple'
  ]


  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2 + 1, width * 2 + 2, width * 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2,width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]


  let currentPosition = startPosition

  let randomTetromino = Math.floor(Math.random() * theTetrominos.length)
  let randomRotation = Math.floor(Math.random() * theTetrominos[0].length)
  let currentRotation = randomRotation
  let current = theTetrominos[randomTetromino][currentRotation]


  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[randomTetromino]
    })
  }

  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
      squares[currentPosition + index].style.backgroundColor = ''
    })
  }

  // timerId = setInterval(moveDown, speedInterval)

  function control (e) {
    if (e.keyCode === 37) {
      moveLeft()
    }
    else if (e.keyCode === 39) {
      moveRight()
    }
    else if (e.keyCode === 38) {
      rotate()
    }
    else if (e.keyCode === 40) {
       moveDown()
    }
  }

  document.addEventListener('keyup', control)

  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      randomTetromino = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominos.length)
      randomRotation = nextRotation
      nextRotation = Math.floor(Math.random() * theTetrominos[0].length)
      current = theTetrominos[randomTetromino][randomRotation]
      currentPosition = startPosition
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }


  function moveLeft () {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }

  function moveRight () {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    if (!isAtRightEdge) currentPosition += 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }

  function rotate () {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominos[randomTetromino][currentRotation]
    draw()
  }


  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0


  const upNextTetrominoes = [
    [
      [1, displayWidth + 1, displayWidth * 2 + 1, 2],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 2],
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2],
      [displayWidth, displayWidth * 2 + 1, displayWidth * 2 + 2, displayWidth * 2]
    ],
    [
      [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
      [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1],
      [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
      [displayWidth + 1, displayWidth + 2, displayWidth * 2,displayWidth * 2 + 1]
    ],
    [
      [1, displayWidth, displayWidth + 1, displayWidth + 2],
      [1, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1],
      [1, displayWidth, displayWidth + 1, displayWidth * 2 + 1]
    ],
    [
      [0, 1, displayWidth, displayWidth + 1],
      [0, 1, displayWidth, displayWidth + 1],
      [0, 1, displayWidth, displayWidth + 1],
      [0, 1, displayWidth, displayWidth + 1]
    ],
    [
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth + 3],
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
      [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth + 3]
    ]
  ]


  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom][nextRotation].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, speedInterval)
      nextRandom = Math.floor(Math.random() * theTetrominos.length)
      displayShape()
    }
  })

  function addScore() {
    for(let i = 0; i < 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'END'
      clearInterval(timerId)

    }
  }































})
