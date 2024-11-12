// Importa los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvBJvR2Zv5ssCc9ti80uALX95MDtP8w-k",
    authDomain: "appregistrogastos.firebaseapp.com",
    projectId: "appregistrogastos",
    storageBucket: "appregistrogastos.appspot.com",
    messagingSenderId: "654146403708",
    appId: "1:654146403708:web:7525a60e0ca75e45fcf8f9",
    measurementId: "G-M1Y5TPF2H8"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Escucha cambios en el estado de autenticación de Firebase
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Si el usuario está autenticado, muestra su información
            const nombre = user.displayName || "Usuario";
            const fotoPerfil = user.photoURL || "/img/profile-user.png";

            // Inserta el mensaje de bienvenida y la foto de perfil en el contenedor
            document.getElementById('bienvenida').innerHTML = `
                <h2>Bienvenido, ${nombre}!</h2>
                <img src="${fotoPerfil}" alt="Foto de perfil" width="100" height="100">
                <p id="frase-motivadora"></p>
            `;

            //frase aleatoria después de insertar el contenido
            const frases = [
                "¡Cada peso cuenta, tu control marca la diferencia!",
                "¡Organiza hoy, disfruta mañana!",
                "Pequeños ahorros, grandes logros.",
                "¡Lleva tus cuentas sin volverte loco!",
                "Cada decisión financiera es un paso hacia tus metas."
            ];

            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
            document.getElementById('frase-motivadora').textContent = fraseAleatoria;

        } else {
            // Si no hay usuario autenticado, redirige a la página de inicio de sesión
            window.location.href = '/index.html';
        }
    });

    // Selecciona el botón de cierre de sesión
    const logoutButton = document.getElementById('logout-button');

    // Agrega un listener al botón para manejar el cierre de sesión
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Cierre de sesión exitoso
            window.location.href = '/index.html'; // Redirige a la página de inicio de sesión
        }).catch((error) => {
            // Maneja los errores que puedan ocurrir al cerrar sesión
            console.error('Error al cerrar sesión:', error);
        });
    });

    //botón formulario registro
    document.getElementById('boton-formulario').addEventListener('click', ()=>{
        window.location.href = '/views/formularioRegistro.html'
    })
    document.getElementById('boton-dashboard').addEventListener('click', ()=>{
        window.location.href = '/views/dashboard.html'
    })
});
