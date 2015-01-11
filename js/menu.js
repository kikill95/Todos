document.getElementById('clear-storage').addEventListener('click', function() {
    localStorage.clear();
    data = ({
        id: [],
        name: [],
        todo: []
    });
    document.getElementById('maden-boards').innerHTML = '';
}, false);