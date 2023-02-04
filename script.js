//hamtaogamevaxoao
window.addEventListener('load', () => {
	//chuong trinh di vao tu day
    initActions()    
})

function newGame(_boardSize, _level) {    
    boardSize = _boardSize;
    boxSize = parseInt(Math.sqrt(boardSize))
    level = _level; 

    board = new Board(boardSize);
    isBoardValidate = board.createBoard(boardSize);
    console.log('isBoardValidate', isBoardValidate)

    //dao lo
    solvedBoard = copyBoard(board.board)
    digger = new Digger(level, board.board, boardSize)
    questionBoard = copyBoard(board.board)

    // ve len giao dien
    view = new View()
    view.createBoardHTML(boardSize)
    view.printBoard(questionBoard)

    initActions()

 
}

function clearUserInput(){
    board.board = copyBoard(questionBoard)
    view.printBoard(questionBoard)
}