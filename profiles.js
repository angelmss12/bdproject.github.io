// Configuración de Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };
  
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  
  // Función para mostrar perfiles en la interfaz
  const displayProfiles = (profiles) => {
    const profileList = document.getElementById("profileList");
    profileList.innerHTML = "";
  
    profiles.forEach((profile) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>ID: ${profile.id}</p>
        <p>Nombre: ${profile.data().name}</p>
        <p>Edad: ${profile.data().age}</p>
        <p>Fecha de Nacimiento: ${profile.data().dateOfBirth.toDate().toLocaleDateString()}</p>
        <hr>
      `;
      profileList.appendChild(div);
    });
  };
  
  // Obtener perfiles de Firestore
  const getProfiles = () => {
    firestore.collection("SSmiths").get().then((querySnapshot) => {
      const profiles = [];
      querySnapshot.forEach((doc) => {
        profiles.push(doc);
      });
      displayProfiles(profiles);
    });
  };
  
  // Lógica para el botón de regresar
  const goBackBtn = document.getElementById("goBackBtn");
  
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  
  // Cargar perfiles al cargar la página
  window.addEventListener("load", () => {
    getProfiles();
  });
  