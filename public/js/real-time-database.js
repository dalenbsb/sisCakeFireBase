var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var idadeInput = document.getElementById('idadeInput');
var btnAdd = document.getElementById('btnAdd');

//Ao clicar no botao
btnAdd.addEventListener('click', function(){
    create(nameInput.value, idadeInput.value);
});

function create(nome, idade){
    var data = {
        nome: nome,
        idade: idade
    };
    
    return firebase.database().ref().child('users').push(data);
}

firebase.database().ref('users').on('value', function (snapshot){
    usersList.innerHTML = '';
    snapshot.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().nome + ' : ' + item.val().idade));
        usersList.appendChild(li);
    });
});