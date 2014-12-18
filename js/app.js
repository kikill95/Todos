//Create Todo
function newLi() {
    var list = document.getElementById('maden-todos');

    var li = document.createElement('li'),
        mark = document.createElement('input'),
        check = document.createElement('input'),
        p = document.createElement('p'),
        btn = document.createElement('input');
    mark.type = 'button';
    mark.className = 'mark-done';
    check.type = 'checkbox';
    check.className = 'preparing-to-delete';
    p.textContent = document.getElementById('creating').value;
    document.getElementById('creating').value = '';
    mark.addEventListener('click', function (event) {
        var target = event.target,
            p = target.parentNode.getElementsByTagName('P')[0];
        if (p.className !== 'marked') {
            p.className = 'marked';
        } else {
            p.className = '';
        }
    });
    btn.type = 'button';
    btn.value = 'X';
    btn.className = 'delete';
    btn.addEventListener('click', function (event) {
        var target = event.target,
            parent = target.parentNode;
        parent.parentNode.removeChild(parent);
    });

    li.appendChild(mark);
    li.appendChild(check);
    li.appendChild(p);
    li.appendChild(btn);

    list.appendChild(li);
}

var create = document.getElementById('new-li');
create.addEventListener('click', newLi, false);

//Delete all selected
function deleteAllSelected() {
    var element = document.getElementById('maden-todos');

    while (document.querySelector(':checked') !== null) {
        element.removeChild(document.querySelector(':checked').parentNode);
    }
}

var el = document.getElementById('deletion');
el.addEventListener('click', deleteAllSelected, false);
