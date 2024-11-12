
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCvBJvR2Zv5ssCc9ti80uALX95MDtP8w-k",
    authDomain: "appregistrogastos.firebaseapp.com",
    projectId: "appregistrogastos",
    storageBucket: "appregistrogastos.firebasestorage.app",
    messagingSenderId: "654146403708",
    appId: "1:654146403708:web:7525a60e0ca75e45fcf8f9",
    measurementId: "G-M1Y5TPF2H8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (e)=>{
    e.preventDefault()

    //Validamos campo nombre

    let entradaNombre = document.getElementById('name')
    let nombreError = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        nombreError.textContent = 'Introduce un nombre válido'
        nombreError.classList.add('error-message')
    }else{
        nombreError.textContent = ''
        nombreError.classList.remove('error-message')
    }

    //Validamos correo
    let correo = document.getElementById('email')
    let correoError = document.getElementById('emailError')
    let patternCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!patternCorreo.test(correo.value)){
        correoError.textContent = 'Introduce un email válido'
        correoError.classList.add('error-message')
    }else{
        correoError.textContent = ''
        correoError.classList.remove('error-message')
    }

    //Validamos contraseña
    let contraseña = document.getElementById('password')
    let contraseñaError = document.getElementById('passwordError')
    let patternContraseña = /^[A-Za-z\d]{6,}$/;

    if(!patternContraseña.test(contraseña.value)){
        contraseñaError.textContent = 'Introduce una contraseña que contenga mínimo 8 carácteres, almenos 1 número y 1 carácter especial'
        contraseñaError.classList.add('error-message')
    }else{
        contraseñaError.textContent = ''
        contraseñaError.classList.remove('error-message')
    }


    //Si todos los datos son válidos
    if(!nombreError.textContent && !correoError.textContent && !contraseñaError.textContent){

        //Backend que reciba la info

        db.collection("users").add({
            name: entradaNombre.value,
            email: correo.value,
            password: contraseña.value
        })
        .then((docRef) => {
            Swal.fire({
                title: "Perfecto",
                text: "¡Te registraste exitosamente!",
                icon: "success"
              }, docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });

    }
})