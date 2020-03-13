// CONSTRUCT GUIDE LIST
var guideList = document.querySelector('.guides');

// MENU
var loggedOutLinks = document.querySelectorAll('.logged-out');
var loggedInLinks = document.querySelectorAll('.logged-in');
var adminItems = document.querySelectorAll('.admin');

// ACCOUNT DETAIL
var accountDetail = document.querySelector('.account-details');

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

function setupUi(user) {
    if (user) {
        console.info('Got user');
        if (user.admin) {
            console.info('User is an admin');
            adminItems.forEach(function(item) { item.style.display = 'block'; });
        }
        //account information
        db.collection('users').doc(user.uid).get().then(function(doc) {
            var html = `
                <div>Logged in as ${user.email}</div>
                <div>${doc.data().bio}</div>
                <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetail.innerHTML = html;
        });
        //toggle ui elements
        loggedInLinks.forEach(function(item) {
            item.style.display = 'block';
        });
        loggedOutLinks.forEach(function(item) {
            item.style.display = 'none';
        });
    } else {
        adminItems.forEach(function(item) { item.style.display = 'none'; });
        //account information
        accountDetail.innerHTML = '';
        //toggle ui elements
        loggedInLinks.forEach(function(item) {
            item.style.display = 'none';
        });
        loggedOutLinks.forEach(function(item) {
            item.style.display = 'block';
        });
    }
}

// SET MATERIALIZE COMPONENTS
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});