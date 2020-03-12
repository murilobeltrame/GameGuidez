// LISTEN FOR AUTH STATUS CHANGES
auth.onAuthStateChanged(function(user) {
    setupUi(user);
    if (user) {
        // Get Data
        db.collection('guides').get().then(function(snapshot) {
            setupGuides(snapshot.docs);
        });
    } else {
        setupGuides([]);
    }
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