document.getElementById('new-li').addEventListener('click', newLiByClicking, false);
document.getElementById('creating').addEventListener('keydown', newLiByPressing, false);
document.getElementById('deletion').addEventListener('click', deleteAllSelected, false);


function newLiByClicking() {
    if (document.getElementById('creating').value !== '') {
        newLi();
    }
}

function newLi() {
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

    document.getElementById('maden-todos').appendChild(li);
}

function newLiByPressing(event) {
    if (event.keyCode == 13 && document.getElementById('creating').value !== '') {
        newLi();
    }
}

function deleteAllSelected() {
    while (document.querySelector(':checked') !== null) {
        document.getElementById('maden-todos').removeChild(document.querySelector(':checked').parentNode);
    }
}