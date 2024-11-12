
// Inicialización de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvBJvR2Zv5ssCc9ti80uALX95MDtP8w-k",
    authDomain: "appregistrogastos.firebaseapp.com",
    projectId: "appregistrogastos",
    storageBucket: "appregistrogastos.firebasestorage.app",
    messagingSenderId: "654146403708",
    appId: "1:654146403708:web:7525a60e0ca75e45fcf8f9",
    measurementId: "G-M1Y5TPF2H8"
};
firebase.initializeApp(firebaseConfig);

// Referencia al servicio Firestore (si lo necesitas)
const db = firebase.firestore();

document.getElementById('login-formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;
    const correoError = document.getElementById('emailError');
    const patternCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validación del correo
    if (!patternCorreo.test(correo)) {
        correoError.textContent = 'Ingresa un correo válido';
        correoError.classList.add('error-message');
        return; // Detener si el correo no es válido
    } else {
        correoError.textContent = '';
        correoError.classList.remove('error-message');
    }

    try {
        // Autenticación en Firebase
        const userCredential = await firebase.auth().signInWithEmailAndPassword(correo, contraseña);
        Swal.fire({
            title: "Perfecto",
            text: "¡Inicio de sesión exitoso!",
            icon: "success"
        });

        // Redirigir a la ventana principal
        window.location.href = '/views/paginaPrincipal.html'; // Cambia esta ruta según corresponda
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error al iniciar sesión: " + error.message,
            icon: "error"
        });
    }
});