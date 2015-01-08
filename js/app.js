var data;
if (localStorage.data) {
    data = JSON.parse(localStorage.data)
} else {
    data = new Object ({
    id: [],
    name: [],
    todo: []
});
}

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
        save();
    }, false);
    document.getElementById('maden-boards').appendChild(board);

    data.todo[currentId] = {
        id: [],
        text: [],
        isMarked: []
    };
    save();
}

function newTodo(currentCreatingTodo, currentIdOfTodo) {
    var newId;
    if (data.todo[currentIdOfTodo].id.length) {
        var size = data.todo[currentIdOfTodo].id.length;
        newId = data.todo[currentIdOfTodo].id[size - 1] + 1;
    } else {
        newId = 0;
    }
    data.todo[currentIdOfTodo].id.push(newId);

    var li = document.createElement('li'),
        mark = document.createElement('input'),
        check = document.createElement('input'),
        todo = document.createElement('p'),
        btn = document.createElement('input');
    mark.type = 'button';
    mark.className = 'mark-done';
    check.type = 'checkbox';
    check.className = 'preparing-to-delete-todo';
    todo.textContent = currentCreatingTodo.value;
    currentCreatingTodo.value = '';

    data.todo[currentIdOfTodo].text.push(todo.textContent);
    data.todo[currentIdOfTodo].isMarked.push(false);

    mark.addEventListener('click', function (event) {
        var target = event.target.parentNode.getElementsByTagName('p')[0];
        target.className = target.className !== 'marked-todo' ? 'marked-todo' : '';
        data.todo[currentIdOfTodo].isMarked[newId] = !data.todo[currentIdOfTodo].isMarked[newId];
        save();
    }, false);
    btn.type = 'button';
    btn.value = 'X';
    btn.className = 'delete-todo';
    btn.addEventListener('click', function (event) {
        var target = event.target,
            parent = target.parentNode;
        parent.parentNode.removeChild(parent);

        data.todo[currentIdOfTodo].id.splice(newId, newId + 1);
        data.todo[currentIdOfTodo].text.splice(newId, newId + 1);
        data.todo[currentIdOfTodo].isMarked.splice(newId, newId + 1);
        save();
    }, false);
    li.appendChild(mark);
    li.appendChild(check);
    li.appendChild(todo);
    li.appendChild(btn);
    currentCreatingTodo.parentNode.getElementsByTagName('ul')[0].appendChild(li);
    save();
}

function save() {
    localStorage.data = JSON.stringify(data);
    var i = 0;
    while (document.querySelectorAll('.deletion-all-selected-todos')[i]) {
        if (document.querySelectorAll('.deletion-all-selected-todos')[i].parentNode.querySelector('.mark-done') !== null) {
            document.querySelectorAll('.deletion-all-selected-todos')[i].style.display = 'block';
        } else {
            document.querySelectorAll('.deletion-all-selected-todos')[i].style.display = 'none'
        }
        i++;
    }
}

document.getElementById('clear-storage').addEventListener('click', function() {
    document.getElementById('maden-boards').innerHTML = "";
    localStorage.clear();
    data = ({
        id: [],
        name: [],
        todo: []
    });
    document.getElementById('maden-boards').innerHTML = '';
}, false);