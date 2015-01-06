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

function newBoard() {
    var currentId;
    if (data.id.length) {
        var size = data.id.length;
        currentId = data.id[size - 1] + 1;
    } else {
        currentId = 0;
    }
    data.id.push(currentId);

    var board = document.createElement('li'),
        name = document.createElement('p'),
        deleteBoard = document.createElement('input'),
        creatingTodo = document.createElement('input'),
        list = document.createElement('ul'),
        deleteAllThatSelected = document.createElement('input');
    board.className = 'board';
    name.textContent = data.name[currentId] = document.getElementById('creating-board').value;
    document.getElementById('creating-board').value = '';
    deleteBoard.type = 'button';
    deleteBoard.className = 'delete-board';
    deleteBoard.value = 'X';
    creatingTodo.type = 'text';
    creatingTodo.className = 'creating-todo';
    creatingTodo.placeholder = 'Write your Todo';
    list.className = 'maden-todos';
    deleteAllThatSelected.type = 'button';
    deleteAllThatSelected.className = 'deletion-all-selected-todos';
    deleteAllThatSelected.value = 'Delete All Selected';
    board.appendChild(deleteBoard);
    board.appendChild(name);
    board.appendChild(creatingTodo);
    board.appendChild(list);
    board.appendChild(deleteAllThatSelected);
    deleteBoard.addEventListener('click', function(event) {
        event.target.parentNode.remove();
        data.id.splice(currentId, currentId + 1);
        data.name.splice(currentId, currentId + 1);
        data.todo.splice(currentId, currentId + 1);
    }, false);
    creatingTodo.addEventListener('keydown', function(event) {
        if (event.keyCode == 13 && event.target.value !== '') {
            var currentCreatingTodo = event.target;
            newTodo(currentCreatingTodo, currentId);
        }
    }, false);
    deleteAllThatSelected.addEventListener('click', function(event) {
        var currentBoard = event.target.parentNode.getElementsByTagName('ul')[0];
        while (currentBoard.querySelector(':checked') !== null) {
            currentBoard.querySelector(':checked').nextElementSibling.nextElementSibling.click();
        }
        saveOnServer();
    }, false);
    document.getElementById('maden-boards').appendChild(board);

    data.todo[currentId] = {
        id: [],
        text: [],
        isMarked: []
    };
    saveOnServer();
}
