// Initialize Firebase
var config = {
  apiKey: "<YOUR FIREBASE API KEY>",
  authDomain: "<YOUR FIREBASE AUTH DOMAIN>",
  projectId: "<YOUR FIREBASE PROJECT ID>"
};
firebase.initializeApp(config);

var emailtxt = document.getElementById('emailtxt');
var passtxt = document.getElementById('passtxt');
var errortxt = document.getElementById('errortxt');
var btnAceptar = document.getElementById('btnAceptar');

// Añadir Evento login
btnAceptar.addEventListener('click', e => {
  //Obtener email y pass
  const email = emailtxt.value;
  const pass = passtxt.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => {errortxt.innerHTML = e.message;});
});

firebase.auth().onAuthStateChanged(function(user){
  if(user)
    window.location.replace("index.html");
});
