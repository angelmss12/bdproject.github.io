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
const auth = firebase.auth();
const firestore = firebase.firestore();

// Observador de autenticación
auth.onAuthStateChanged((user) => {
  const authSection = document.getElementById("authSection");
  if (user) {
    authSection.innerHTML = `<p>¡Hola, ${user.displayName}!</p>`;
  } else {
    authSection.innerHTML = `<p>No has iniciado sesión.</p>`;
  }
});

// Función para iniciar sesión con Google
const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

// Función para iniciar sesión con Facebook
const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider);
};

// Función para cerrar sesión
const signOut = () => {
  auth.signOut();
};

// Función para agregar entidad
const addEntity = (data) => {
  firestore.collection("SSmiths").add(data);
};

// Función para actualizar entidad
const updateEntity = (id, newData) => {
  firestore.collection("SSmiths").doc(id).update(newData);
};

// Función para eliminar entidad
const deleteEntity = (id) => {
  firestore.collection("SSmiths").doc(id).delete();
};

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
      <p>Nacionalidad: ${profile.data().nationality}</p>
      <p>Nivel de Estudios: ${profile.data().educationLevel}</p>
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

// Lógica para manejar el formulario de agregar entidad
const addForm = document.getElementById("addForm");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const entityData = {
    name: document.getElementById("nameField").value,
    age: parseInt(document.getElementById("ageField").value, 10),
    dateOfBirth: new Date(document.getElementById("dateField").value),
    nationality: document.getElementById("nationalityField").value,
    educationLevel: document.getElementById("educationLevelField").value,
  };

  // Agregar la entidad a la base de datos
  addEntity(entityData);
});

// Lógica para manejar el formulario de eliminar entidad
const deleteForm = document.getElementById("deleteForm");

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener el ID de la entidad a eliminar
  const entityIdToDelete = document.getElementById("deleteId").value;

  // Eliminar la entidad de la base de datos
  deleteEntity(entityIdToDelete);
});

// Lógica para manejar el formulario de actualizar entidad
const updateForm = document.getElementById("updateForm");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const entityIdToUpdate = document.getElementById("updateId").value;
  const updatedEntityData = {
    name: document.getElementById("updateNameField").value,
    age: parseInt(document.getElementById("updateAgeField").value, 10),
    dateOfBirth: new Date(document.getElementById("updateDateField").value),
    nationality: document.getElementById("updateNationalityField").value,
    educationLevel: document.getElementById("updateEducationLevelField").value,
  };

  // Actualizar la entidad en la base de datos
  updateEntity(entityIdToUpdate, updatedEntityData);
});

// Lógica para manejar la consulta de perfiles
const viewProfilesBtn = document.getElementById("viewProfilesBtn");

viewProfilesBtn.addEventListener("click", () => {
  window.location.href = "profiles.html";
  getProfiles(); // Obtener y mostrar perfiles al cargar la página de perfiles
});
