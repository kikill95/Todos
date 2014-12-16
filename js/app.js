//Deletee all selected
function deleteAllSelected() {
    var element = document.getElementById("maden-todos");

    while (document.querySelector(":checked") !== null) {
        element.removeChild(document.querySelector(":checked").parentNode);
    }
}

var el = document.getElementById("deletion");
el.addEventListener("click", deleteAllSelected, false);
