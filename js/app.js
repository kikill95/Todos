var data,
    dragSrcEl = null,
    newId,
    currentId,
    currentIdOfTodo;
if (localStorage.data) {
    data = JSON.parse(localStorage.data);
} else {
    data = new Object ({
    id: [],
    name: [],
    todo: []
});
}

document.getElementById('creating-board').addEventListener('keydown', newBoardByPressing);
document.getElementById('new-board').addEventListener('click', newBoardByClicking);

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
    board.id = 'Board ' + currentId;

    board.draggable = true;
    board.addEventListener('dragstart', function(e) {
        board.classList.add('dragged');

        dragSrcEl = board;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', board.innerHTML);
    });
    board.addEventListener('dragenter', function(e) {
        e.preventDefault();
        e.target.classList.add('over');
    });
    board.addEventListener('dragover', function(e) {
        if (e.preventDefault) { //for links, etc.
            e.preventDefault();
        }
        return false;
    });
    board.addEventListener('dragleave', function() {
        board.classList.remove('over');
    });
    board.addEventListener('drop', function(e) {
        if (e.stopPropagation) { //Stops some browsers from redirecting
            e.stopPropagation();
        }

        if (dragSrcEl != board) {
            dragSrcEl.innerHTML = board.innerHTML;
            board.innerHTML = e.dataTransfer.getData('text/html');

            var tempId = dragSrcEl.id;
            dragSrcEl.id = board.id;
            board.id = tempId;

            currentId = getId(dragSrcEl.id);
            addingAllNeededListeners(dragSrcEl);
            currentId = getId(board.id);
            addingAllNeededListeners(board);
        }
        return false;
    });
    board.addEventListener('dragend', function() {
        var cols = document.querySelectorAll('.board');
        [].forEach.call(cols, function (col) {
            col.classList.remove('over');
            col.classList.remove('dragged');
        });
    });

    name.className = 'name-of-board';
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

    name.addEventListener('dblclick', handlerForEditingBoard);
    deleteBoard.addEventListener('click', handlerForDeletingBoard);
    creatingTodo.addEventListener('keydown', handlerForCreatingTodo);
    deleteAllThatSelected.addEventListener('click', handlerForDeletionAllThatSelected);
    document.getElementById('maden-boards').appendChild(board);

    data.todo[currentId] = {
        id: [],
        text: [],
        isMarked: []
    };
    save();
}

function newTodo(currentCreatingTodo, numberOfTodo) {
    currentIdOfTodo = numberOfTodo;
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
    li.id = 'Todo# ' + newId;
    mark.type = 'button';
    mark.className = 'mark-done';
    check.type = 'checkbox';
    check.className = 'preparing-to-delete-todo';
    todo.textContent = currentCreatingTodo.value;
    currentCreatingTodo.value = '';
    todo.className = 'name-of-todo';
    todo.addEventListener('dblclick', handlerForEditingTodo);
    data.todo[currentIdOfTodo].text.push(todo.textContent);
    data.todo[currentIdOfTodo].isMarked.push(false);
    mark.addEventListener('click', handlerForMarkingTodo);
    btn.type = 'button';
    btn.value = 'X';
    btn.className = 'delete-todo';
    btn.addEventListener('click', handlerForDeletionTodo);

    li.appendChild(mark);
    li.appendChild(check);
    li.appendChild(todo);
    li.appendChild(btn);
    currentCreatingTodo.parentNode.getElementsByTagName('ul')[0].appendChild(li);
    save();
}

function save() {
    //localStorage.data = JSON.stringify(data);
    var i = 0;
    while (document.querySelectorAll('.deletion-all-selected-todos')[i]) {
        if (document.querySelectorAll('.deletion-all-selected-todos')[i].parentNode.querySelector('.mark-done') !== null) {
            document.querySelectorAll('.deletion-all-selected-todos')[i].style.display = 'block';
        } else {
            document.querySelectorAll('.deletion-all-selected-todos')[i].style.display = 'none';
        }
        i++;
    }
}

document.getElementById('clear-storage').addEventListener('click', function() {
    //localStorage.clear();
    data = ({
        id: [],
        name: [],
        todo: []
    });
    document.getElementById('maden-boards').innerHTML = '';
});

function getId(str) {
    var numberStr = str.slice(6);
    return parseInt(numberStr);
}

//handlers
function handlerForEditingBoard(event) {
    var el = event.target;
    el.style.display = 'none';
    var editLabel = document.createElement('input');
    editLabel.type = 'text';
    editLabel.className = 'edit-name-of-board';
    editLabel.value = el.textContent;
    event.target.parentNode.insertBefore(editLabel, event.target.parentNode.querySelector('.creating-todo')).focus();
    editLabel.addEventListener('keypress', function(e) {
        if (e.keyCode == 13 && editLabel.value !== '') {
            el.textContent = data.name[currentId] = editLabel.value;
            editLabel.parentNode.removeChild(editLabel);
            el.style.display = 'block';
            save();
        }
    });
}
function handlerForDeletingBoard(event) {
    event.target.parentNode.remove();
    data.id.splice(currentId, currentId + 1);
    data.name.splice(currentId, currentId + 1);
    data.todo.splice(currentId, currentId + 1);
    save();
}
function handlerForCreatingTodo(event) {
    if (event.keyCode == 13 && event.target.value !== '') {
        var currentCreatingTodo = event.target;
        newTodo(currentCreatingTodo, currentId);
    }
}
function handlerForDeletionAllThatSelected(event) {
    var currentBoard = event.target.parentNode.getElementsByTagName('ul')[0];
    while (currentBoard.querySelector(':checked') !== null) {
        currentBoard.querySelector(':checked').nextElementSibling.nextElementSibling.click();
    }
    save();
}
function handlerForEditingTodo(event) {
    var el = event.target;
    el.style.display = 'none';
    var editLabel = document.createElement('input');
    editLabel.type = 'text';
    editLabel.className = 'edit-name-of-todo';
    editLabel.value = el.textContent;
    el.parentNode.insertBefore(editLabel, el.parentNode.querySelector('.delete-todo')).focus();
    editLabel.addEventListener('keypress', function(e) {
        if (e.keyCode == 13 && editLabel.value !== '') {
            el.textContent = data.todo[currentIdOfTodo].text[newId] = editLabel.value;
            editLabel.parentNode.removeChild(editLabel);
            el.style.display = 'inline-block';
            save();
        }
    });
}
function handlerForMarkingTodo(event) {
    var target = event.target.parentNode.getElementsByTagName('p')[0];
    target.className = target.className !== 'name-of-todo marked-todo' ? 'name-of-todo marked-todo' : 'name-of-todo';
    data.todo[currentIdOfTodo].isMarked[newId] = !data.todo[currentIdOfTodo].isMarked[newId];
    save();
}
function handlerForDeletionTodo(event) {
    var target = event.target,
        parent = target.parentNode;
    parent.parentNode.removeChild(parent);

    data.todo[currentIdOfTodo].id.splice(newId, newId + 1);
    data.todo[currentIdOfTodo].text.splice(newId, newId + 1);
    data.todo[currentIdOfTodo].isMarked.splice(newId, newId + 1);
    save();
}

function addingAllNeededListeners(element) {
    element.querySelector('.name-of-board').addEventListener('dblclick', handlerForEditingBoard);
    element.querySelector('.delete-board').addEventListener('click', handlerForDeletingBoard);
    element.querySelector('.creating-todo').addEventListener('keydown', handlerForCreatingTodo);
    element.querySelector('.deletion-all-selected-todos').addEventListener('click', handlerForDeletionAllThatSelected);
    var lis = element.querySelectorAll('.name-of-todo');
    [].forEach.call(lis, function (el) {
        el = el.parentNode;
        var newId = getId(el.id);
        el.querySelector('.name-of-todo').addEventListener('dblclick', handlerForEditingTodo);
        el.querySelector('.mark-done').addEventListener('click', handlerForMarkingTodo);
        el.querySelector('.delete-todo').addEventListener('click', handlerForDeletionTodo);
    });
}