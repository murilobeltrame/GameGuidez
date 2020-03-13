// ADD ADMIN CLOUD FUNCTION
var adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var adminEmail = document.querySelector('#admin-email').value;
    var addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({
        email: adminEmail
    }).then(function(result) {
        console.log(result);
    });
});

// LISTEN FOR AUTH STATUS CHANGES
auth.onAuthStateChanged(function(user) {
    if (user) {
        user.getIdTokenResult().then(function(idTokenResult) {
            user.admin = idTokenResult.claims.admin;
            setupUi(user);
        });
        // Get Data
        db.collection('guides').onSnapshot(function(snapshot) {
            setupGuides(snapshot.docs);
        });
    } else {
        setupGuides([]);
        setupUi();
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
        return db.collection('users').doc(credential.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(function() {
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