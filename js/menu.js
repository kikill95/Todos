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

