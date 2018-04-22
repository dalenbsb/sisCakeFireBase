//BUTTONS
var authEmailPassButton = document.getElementById('authEmailPassButton');
var createUserButton = document.getElementById('createUserButton');
var autFacebookButton = document.getElementById('autFacebookButton');
var autGitHubButton = document.getElementById('autGitHubButton');
var autTwitterButton = document.getElementById('autTwitterButton');
var autGoogleButton = document.getElementById('autGoogleButton');
var autAnonymouslyButton = document.getElementById('autAnonymouslyButton');
var logOutButton = document.getElementById('logOutButton');

//INPUTS
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

//DISPLAYS
var displayName = document.getElementById('displayName');

//CRIAR NOVO USUARIO
createUserButton.addEventListener('click', function(){
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then( function (){
            alert('Bem vindo '+ emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console.');
        });
});

//AUTENTICAR COM E-MAIL E SENHA
authEmailPassButton.addEventListener('click', function (){
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem vindo ' + emailInput.value;
            alert('Autenticado ' + emailInput.value)
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifque o erro no console');
        });
});

//Logout
logOutButton.addEventListener('click', function (){
    firebase
    .auth()
    .signOut()
    .then(function () {
        displayName.innerText = 'Você não está autenticado.';
        alert('Você se deslogou');
    }, function (error){
        console.error(error);
    });
});

//AUTENTICAR ANONIMO
autAnonymouslyButton.addEventListener('click', function (){
    firebase
        .auth()
        .signInAnonymously()
        .then(function (result){
            console.log(result);
            displayName.innerText = 'Bem vindo, desconhecido';
            alert('Autenticado Anonimamente');
        })
        .catch(function (error) {
            console.error(erro.code);
            console.error(erro.mensage);
            alert('Falha ao autenticar anonimante, verifique o erro no console');
        });
});

//AUTENTICAR COM GITHUB
autGitHubButton.addEventListener('click', function (){
    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

//AUTENTICAR COM FACEBOOK
autFacebookButton.addEventListener('click', function (){
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

//AUTENTICAR COM TWITTER
autTwitterButton.addEventListener('click', function (){
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});

//AUTENTICAR COM GOOGLE
autGoogleButton.addEventListener('click', function (){
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});

function signIn(provider){
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            var token = result.credential.acessToken;
            displayName.innerText = 'Bem vindo, ' + result.user.displayName;
        }).catch(function(error){
            console.error(erro.code);
            console.error(erro.mensage);
            alert('Falha ao autenticar, verifique o erro no console');
        });
}