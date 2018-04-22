//verificar a regra de segurança no firebase = request.auth != null

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

//Ouvir o evento change
fileButton.addEventListener('change', function (e) {
    //obter o arquivo
    var file = e.target.files[0];

    //Referenciar o Storage
    var storageRef = firebase.storage().ref('arquivos/' + file.name);

    //enviar o arquivo
    var task = storageRef.put(file);

    //Atualizar o progress Bar
    task.on('state_changed', 
        function progress(snapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(error) {
            console.error(error.code);
            console.error(error.message);
        },
        function complete(){
            alert('Envio commpleto!');
        }
    )
});