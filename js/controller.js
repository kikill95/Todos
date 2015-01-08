setTimeout(function () {
    if (localStorage.data) {
        var i, j,
            temp = JSON.parse(localStorage.data);
        document.getElementById('clear-storage').click();
        for (i = 0; i < temp.id.length; i++) {
            document.getElementById('creating-board').value = temp.name[i];
            document.getElementById('new-board').click();
            for (j = 0; j < temp.todo[i].id.length; j++) {
                document.querySelectorAll('.creating-todo')[i].value = temp.todo[i].text[j];
                newTodo(document.querySelectorAll('.creating-todo')[i], i);
            }
        }
    }
}, 1000);

