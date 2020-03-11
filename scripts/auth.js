// SIGN UP
var signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = signupForm['signup-email'].value;
    var password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(function(credential) {
        //console.log(credential.user);
        var modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});