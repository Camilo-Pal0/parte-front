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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        console.log("Usuario logueado:", userId);

        db.collection("gastos")
            .where("userId", "==", userId)
            .orderBy("createdAt", "desc")
            .onSnapshot(
                (querySnapshot) => {
                    const listaGastos = document.getElementById('listaGastos');
                    listaGastos.innerHTML = '';

                    if (querySnapshot.empty) {
                        console.log("No se encontraron documentos para este usuario.");
                        listaGastos.innerHTML = '<div>No hay gastos registrados.</div>';
                        return;
                    }

                    querySnapshot.forEach((doc) => {
                        const gasto = doc.data();
                        console.log("Gasto encontrado:", gasto); // Para verificar los datos

                        // Crea un "papelito" por cada gasto
                        const tarjeta = document.createElement('div');
                        if(gasto.categoria == "transporte"){
                            tarjeta.classList.add('gasto-item');
                            tarjeta.innerHTML = `
                            <p><strong>Categoría:</strong> ${gasto.categoria || 'Sin categoría'}</p>
                            <p><strong>Fecha:</strong> ${gasto.fecha || 'Sin fecha'}</p>
                            <p><strong>Valor:</strong> ${gasto.valor || 'Sin valor'}</p>
                            <p><strong>Descripción:</strong> ${gasto.descripcion || 'Sin descripción'}</p>
                            `;
                        
                        }else if(gasto.categoria == "entretenimiento"){
                            tarjeta.classList.add('gasto-item1');
                            tarjeta.innerHTML = `
                            <p><strong>Categoría:</strong> ${gasto.categoria || 'Sin categoría'}</p>
                            <p><strong>Fecha:</strong> ${gasto.fecha || 'Sin fecha'}</p>
                            <p><strong>Valor:</strong> ${gasto.valor || 'Sin valor'}</p>
                            <p><strong>Descripción:</strong> ${gasto.descripcion || 'Sin descripción'}</p>
                            `;
                        }else{
                            tarjeta.classList.add('gasto-item3');
                            tarjeta.innerHTML = `
                            <p><strong>Categoría:</strong> ${gasto.categoria || 'Sin categoría'}</p>
                            <p><strong>Fecha:</strong> ${gasto.fecha || 'Sin fecha'}</p>
                            <p><strong>Valor:</strong> ${gasto.valor || 'Sin valor'}</p>
                            <p><strong>Descripción:</strong> ${gasto.descripcion || 'Sin descripción'}</p>
                            `;
                        }
                        listaGastos.appendChild(tarjeta);  
                    });
                },
                (error) => {
                    console.error("Error obteniendo documentos:", error);
                }
            );
    } else {
        console.log("No hay usuario logueado");
    }
});

document.getElementById('botonFormulario').addEventListener('click', (e)=>{
    e.preventDefault
    window.location.href = '/views/formularioRegistro.html'
})
document.getElementById('botonPaginaPrincipal').addEventListener('click', (e)=>{
    e.preventDefault
    window.location.href = '/views/paginaPrincipal.html'
})

