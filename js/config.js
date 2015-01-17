document.getElementById('load-from-server').addEventListener('click', function load(e) {
    var request = new XMLHttpRequest(),
        Btn = e.target;
    request.addEventListener('load', function() {
        Btn.textContent = 'Load from server';
        Btn.disabled = false;
        var temp = JSON.parse(this.responseText);
        update(temp);
    });
    request.open('GET', 'http://localhost:1337/');
    request.send();
    Btn.textContent = 'Loading...';
    Btn.disabled = true;
});

document.getElementById('update-server').addEventListener('click', function(e) {
    var request = new XMLHttpRequest(),
        Btn = e.target;
    request.addEventListener('load', function() {
        Btn.textContent = 'Update server';
        Btn.disabled = false;
    });
    request.open('POST', 'http://localhost:1337/');
    request.send(JSON.stringify(data));
    Btn.textContent = 'Updating...';
    Btn.disabled = true;
});

document.getElementById('clear-server').addEventListener('click', function(e) {
    var request = new XMLHttpRequest(),
        Btn = e.target;
    request.addEventListener('load', function() {
        Btn.textContent = 'Clear server';
        Btn.disabled = false;
    });
    request.open('POST', 'http://localhost:1337/');
    request.send(null);
    Btn.textContent = 'Clearing...';
    Btn.disabled = true;
});