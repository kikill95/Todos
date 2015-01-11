document.getElementById('info').addEventListener('click', function() {
    var info = 'The amount of all todos is: ';
    if (document.querySelectorAll('.name-of-todo').length > 0) {
        info += document.querySelectorAll('.name-of-todo').length;
    } else {
        info += 'none';
    }
    info += '\nThe amount of maden todos is: ';
    if (document.querySelectorAll('.marked-todo').length) {
        info += document.querySelectorAll('.marked-todo').length;
    } else {
        info += 'none';
    }
    alert(info);
}, false);

document.getElementById('mark-all').addEventListener('click', function(e) {
    var btns = document.querySelectorAll('.mark-done');
    [].forEach.call(btns, function (el) {
        if (!el.parentNode.querySelector('.name-of-todo').classList.contains('marked-todo')) {
            el.click();
        }
    });
}, false);