// CONSTRUCT GUIDE LIST
var guideList = document.querySelector('.guides');

function setupGuides(data) {

    if (data.length) {
        var html = '';
        data.forEach(function(doc) {
            var guide = doc.data();
            var li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.content}</div>
            </li>
        `;
            html += li;
        });
        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = '<h5 class="center">Login to view guides</h5>';
    }
}

// SET MATERIALIZE COMPONENTS
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});