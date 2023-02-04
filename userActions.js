//cachamchucnang
let isFirstTime = true
let isFirstTime_dotMenu = true
let emptyItems
let keyPadItems
let user__level = [level, 'Evil']
let user__size = boardSize

function initActions() {
  if (isFirstTime) {
    let submitButton = document.querySelector('#header__submit > i')
    let body = document.querySelector('body')
    let startButton = document.querySelector('#start')
    let home__options = document.querySelectorAll('.selection .options span')

    submitButton.addEventListener('click', submitHandler)
    body.addEventListener('keyup', keyUpHandler)
    startButton.addEventListener('click', startHandler)
    home__options.forEach((x) =>
      x.addEventListener('click', homeOptionsHandler)
    )

    isFirstTime = false
  }

  let selection

  function emptyItemHandler() {
    emptyItems.forEach((x) => x.classList.remove('selected'))
    this.classList.add('selected')
  }

  function keyPadHandler(event) {
    event.stopPropagation()
    if ((selection = document.querySelector('.selected'))) {
      selection.textContent = this.textContent
      let x = selection.id[0]
      let y = selection.id[1]
      board.board[x][y] =
        this.textContent == '' ? 0 : parseInt(this.textContent)
		if(this.textContent==0){
			selection0 = document.querySelector('.selected')
			selection0.style = 'none'
		}
    }
  }

  function submitHandler(event) {
    event.stopPropagation()
	if(user__size == 9)
		alert(
			'Các hàng ngang: Phải có đủ các số từ 1 đến 9, không trùng số và không cần đúng thứ tự.\nCác hàng dọc: Phải có đủ các số từ 1 đến 9, không trùng số và không cần đúng thứ tự.\nCác số trong 1 khung nhỏ (3x3) phải có đủ các chữ số từ 1 đến 9 và không quan tâm thứ tự.'
			)
	else
		alert(
			'Các hàng ngang: Phải có đủ các số từ 1 đến 4, không trùng số và không cần đúng thứ tự.\nCác hàng dọc: Phải có đủ các số từ 1 đến 4, không trùng số và không cần đúng thứ tự.\nCác số trong 1 khung nhỏ (2x2) phải có đủ các chữ số từ 1 đến 4 và không quan tâm thứ tự.'
			)
  }

  function dotMenuHandler(e) {
    e.stopPropagation()
    dotMenuDiv = document.querySelector('#dotMenu')
    dotMenuDiv.classList.add('d-block')

    if (isFirstTime_dotMenu) {
      isFirstTime_dotMenu = false

      //thuc hien giai toan
      solverStartButton.addEventListener('click', () => solverStartHandler()) //click vao bat dau xu li


      //tai lai trang 
      document.querySelector('#back').addEventListener('click', (event) => {
        event.stopPropagation()
        window.location.reload()
      })
		
		
      //xoa tat ca cac nut da dien
      document.querySelector('#clear').addEventListener('click', (event) => {
        event.stopPropagation()
        clearUserInput()
		selection0 = document.querySelectorAll('.emptyItem')
		selection0.forEach(function(item){
			item.style = 'none'
		});
		// selection1 = document.querySelectorAll('.selected')
		// selection1.forEach(function(item){
		
		// });
        dotMenuDiv.classList.remove('d-block')
      })

      //tao game moi
      document.querySelector('#newGame').addEventListener('click', (event) => {
        haha = 1
        event.stopPropagation()
        dotMenuDiv.classList.remove('d-block')
        startHandler()
      })

      document.querySelector('#solver').addEventListener('click', (event) => {
        event.stopPropagation()
        
      })

      //an menu khi nhan vao div
      document.querySelector('body').addEventListener('click', () => {
        dotMenuDiv.classList.remove('d-block')
      })
    }
  }

  function keyUpHandler(event) {
    if ((selection = document.querySelector('.selected'))) {
      let k = event.keyCode
      solver1 = copyBoard(board.board)
      solver3 = copyBoard(board.board)
      let validater = new Validate(solver1, boardSize)
      let isValid = validater.runTests()
      solver2 = new Solver(board.board)
      solver2.startSolving1()
      solver2 = board.board
      board.board = solver1
      //neu la size 4 chi cho nhap k= 1-4(49-52(ban phim trai) or 97-100(ban phim phai))
      if (user__size == 4) {
        if ((k > 48 && k < 53) || (k > 96 && k < 101)) {
          selection.textContent = event.keyCode == 46 ? '' : event.key
          let x = selection.id[0]
          let y = selection.id[1]
          // board.board[x][y] = event.keyCode == 46 ? 0 : parseInt(event.key)
          solver3[x][y] = event.keyCode == 46 ? 0 : parseInt(event.key)
        } else {
          alert('Chỉ được phép nhập 1-4')
          solver3[x][y] = 0
        }
      }
      //neu la size 9 chi cho nhap k= 1-9(49-57(ban phim trai) or 97-105(ban phim phai))
      else if (user__size == 9) {
        if ((k > 48 && k < 58) || (k > 96 && k < 106)) {
          selection.textContent = event.keyCode == 46 ? '' : event.key
          let x = selection.id[0]
          let y = selection.id[1]
          // board.board[x][y] = event.keyCode == 46 ? 0 : parseInt(event.key)
          solver3[x][y] = event.keyCode == 46 ? 0 : parseInt(event.key)
        } else {
          alert('Chỉ được phép nhập 1-9')
          solver3[x][y] = 0
        }
      }
      selection1 = document.querySelector('.selected')
      let x = selection.id[0]
      let y = selection.id[1]
      if (solver3[x][y] != solver2[x][y]) {
        selection1.style.backgroundColor = 'red'
        selection1.style.color = 'whitesmoke'
      } else if (solver3[x][y] == solver2[x][y]) {
        selection1.style.backgroundColor = '#45aaf2'
        selection1.style.color = 'whitesmoke'
        board.board[x][y] = event.keyCode == 46 ? 0 : parseInt(event.key)
      }

      
    }
  }
  //bat dau game khi nguoi choi bam vao nut start
  function startHandler() {
    let home = document.querySelector('#home')
    let main__container = document.querySelector('#main__container')
    //tat home
    home.style.display = 'none'
    //bat dau tro choi
    main__container.style.display = 'block'
    newGame(user__size, user__level[0])
    declareBoardElements()
    // Set the time we're counting when hit the start
    var now = new Date().getTime()
    // Update the count down every 1 second
    var x = setInterval(function () {
      var now1 = new Date().getTime()
      var distance = now1 - now
      // Time calculations for days, hours, minutes and seconds
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var secs = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result in the element with id="demo"
      document.getElementById('time').innerHTML =
        hours + 'h ' + mins + 'm ' + secs + 's '
      // If the count down is finished, write some text
      if (iswin()) {
        clearInterval(x)
        document.getElementById('time').innerHTML =
          'You Win\n' + hours + 'h ' + mins + 'm ' + (secs - 1) + 's '
      }
      document.querySelector('#newGame').addEventListener('click', (event) => {
        clearInterval(x)
      })
    }, 1000)
  }
  function iswin() {
    let validater = new Validate(board.board, boardSize)
    let isValid = validater.runTests()
    if (isValid) {
      return true
    } else return false
  }

  function homeOptionsHandler(event) {
    event.stopPropagation()
    let remaining = this.parentNode
    remaining = remaining.querySelectorAll('span')
    if (this.parentNode.parentNode.id == 'selection__level') {
      //nut div: id cha cua no
      remaining.forEach((x) => {
        x.style.background = 'none'
        x.style.color = 'black'
      })
      this.style.color = 'white'
      this.style.background = '#0097e6'
      user__level[0] = parseInt(this.dataset['level'])
      user__level[1] = this.textContent
    } else if (this.parentNode.parentNode.id == 'selection__size') {
      remaining.forEach((x) => (x.style.color = 'black'))
      this.style.color = '#0097e6'
      user__size = parseInt(this.dataset['size'])
    }
  }
  //giải quyết bài toán
  function solverStartHandler() {
    event.stopPropagation()
    clearUserInput()
    dotMenuDiv.classList.remove('d-block')
    solver = new Solver(board.board)
    solver.startSolving()
  }

  function speedRangeHandler(event) {
    event.stopPropagation()
  }

  function declareBoardElements() {
    emptyItems = document.querySelectorAll('.emptyItem')
    keyPadItems = document.querySelectorAll('.keypad__item')
    dotMenuButton = document.querySelector('#dotMenuSpan')
    solverMenu = document.querySelector('#solverMenu')
    solverStartButton = document.querySelector('#solverStart')

    emptyItems.forEach((x) => x.addEventListener('click', emptyItemHandler))
    keyPadItems.forEach((x) => x.addEventListener('click', keyPadHandler))
    dotMenuButton.addEventListener('click', (e) => dotMenuHandler(e))
  }
}
