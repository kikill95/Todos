var data = new Object ({
    id: [],
    name: [],
    todo: []
});

document.getElementById('creating-board').addEventListener('keydown', newBoardByPressing, false);
document.getElementById('new-board').addEventListener('click', newBoardByClicking, false);

function newBoardByPressing(event) {
    if (event.keyCode == 13 && document.getElementById('creating-board').value !== '') {
        newBoard();
    }
}

function newBoardByClicking() {
    if (document.getElementById('creating-board').value !== '') {
        newBoard();
    }
}