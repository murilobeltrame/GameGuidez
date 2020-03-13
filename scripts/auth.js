// LISTEN FOR AUTH STATUS CHANGES
auth.onAuthStateChanged(function(user) {
    setupUi(user);
    if (user) {
        // Get Data
        db.collection('guides').onSnapshot(function(snapshot) {
            setupGuides(snapshot.docs);
        });
    } else {
        setupGuides([]);
    }
});

// CREATE NEW GUIDE
var createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var title = createForm.title.value;
    var content = createForm.content.value;
    db.collection('guides').add({
        title: title,
        content: content
    }).then(function() {
        var modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(function(error) {
        console.error(error.message);
    });
});

// SIGN UP
var signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = signupForm['signup-email'].value;
    var password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(function(credential) {
        var modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// SIGN IN
var loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = loginForm['login-email'].value;
    var password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(function(credential) {
        var modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// LOGOUT
var logout = document.querySelector('#logout');
logout.addEventListener('click', function(e) {
    e.preventDefault();
    auth.signOut();
});