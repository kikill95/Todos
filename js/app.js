//Deletee all selected
function deleteAllSelected() {
    var element = document.getElementById('maden-todos');

    while (document.querySelector(':checked') !== null) {
        element.removeChild(document.querySelector(':checked').parentNode);
    }
}

var el = document.getElementById('deletion');
el.addEventListener('click', deleteAllSelected, false);

//Delete current
[].forEach.call(document.querySelectorAll('.delete'), function(current) {
    current.addEventListener('click', function (event) {
        var target = event.target,
            parent = target.parentNode;
        parent.parentNode.removeChild(parent);
    })
});