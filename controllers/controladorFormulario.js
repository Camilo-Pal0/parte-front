
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


let cajaDescripcion = document.getElementById('descripcion');
let cajaFecha = document.getElementById('fecha');
let cajaValor = document.getElementById('valor');
let cajaCategoria = document.getElementById('categoria');

let botonRegistro = document.getElementById('botonRegistro');

// Escuchar el click en el botón de registro
botonRegistro.addEventListener('click', function(evento) {
    evento.preventDefault();

    // Verificar que el usuario esté logueado
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Obtenemos el userId del usuario logueado
            const userId = user.uid;

            // Creamos el objeto de gasto
            let gasto = {
                categoria: cajaCategoria.value,
                fecha: cajaFecha.value,
                descripcion: cajaDescripcion.value,
                valor: parseFloat(cajaValor.value),
                userId: userId, // Asocia el gasto al usuario actual
                createdAt: firebase.firestore.FieldValue.serverTimestamp() // Fecha del servidor
            };

            // Guardar el gasto en Firestore
            const db = firebase.firestore();
            db.collection("gastos").add(gasto)
                .then(() => {
                    console.log("Gasto agregado exitosamente");
                    Swal.fire({
                        title: "Perfecto",
                        text: "¡Se hizo el registro con éxito!",
                        icon: "success"
                    });

                    // Limpiar el formulario después de enviar
                    cajaDescripcion.value = "";
                    cajaFecha.value = "";
                    cajaValor.value = "";
                    cajaCategoria.value = "Elige una categoría";
                })
                .catch((error) => {
                    console.error("Error al agregar el gasto: ", error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo registrar el gasto.",
                        icon: "error"
                    });
                });
        } else {
            // Redirigir a la página de inicio de sesión si no está logueado
            Swal.fire({
                title: "Usuario no autenticado",
                text: "Por favor, inicia sesión para registrar el gasto.",
                icon: "warning"
            });
        }
    });
});

document.getElementById('botonDashboard').addEventListener('click', (e)=>{
    e.preventDefault()
    window.location.href = '/views/dashboard.html'
})

document.getElementById('botonVolver').addEventListener('click', (e)=>{
    e.preventDefault()
    window.location.href = '/views/paginaPrincipal.html'
})
