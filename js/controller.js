//for automatic uploading info, but it has conflict with server work
/*
if (localStorage.data) {
    var temp = JSON.parse(localStorage.data);
    update(temp);
}
*/
function update(temp) {
    document.getElementById('clear-storage').click();
    var i, j;
    for (i = 0; i < temp.id.length; i++) {
        document.getElementById('creating-board').value = temp.name[i];
        document.getElementById('new-board').click();
        for (j = 0; j < temp.todo[i].id.length; j++) {
            var creatingTodo = document.querySelectorAll('.creating-todo')[i];
            creatingTodo.value = temp.todo[i].text[j];
            newTodo(creatingTodo, i);
            if (temp.todo[i].isMarked[j]) {
                creatingTodo.parentNode.querySelectorAll('.mark-done')[j].click();
            }
        }
    }
}
