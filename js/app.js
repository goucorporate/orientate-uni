firebase.initializeApp({
  apiKey: "AIzaSyDHxUDcjemME87g5c4rH7SnaIskVYDSWJ0",
  authDomain: "orientate-uni-e277e.firebaseapp.com",
  projectId: "orientate-uni-e277e"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//limpiar myModal
function limpiarModal(){
  $('#titulo').val('');
  $('#descripcion').val('');
  $('#facultades').selectpicker('val',[]);
  $('#lugar').val('');
  $('#fecha').val('');
  $('#horario').val('');
  $('#enlace').val('');
}

function nuevo(){
  $("#myModal").modal('show');
  limpiarModal();
  var btnAceptar = document.getElementById('btnAceptar');
  btnAceptar.innerHTML = 'Agregar';
  btnAceptar.onclick = agregar;
}

//cargar contenido a myModal
function editar(id, rowInd){
  $("#myModal").modal('show');
  limpiarModal();

  var tabla = document.getElementById('tabla');
  var titulo = tabla.rows[rowInd].cells[0].innerHTML;
  var descripcion = tabla.rows[rowInd].cells[1].innerHTML;
  var fac_names = tabla.rows[rowInd].cells[2].innerHTML;
  var lugar = tabla.rows[rowInd].cells[3].innerHTML;
  var fecha = tabla.rows[rowInd].cells[4].innerHTML;
  var horario = tabla.rows[rowInd].cells[5].innerHTML;
  var enlace = tabla.rows[rowInd].cells[6].innerHTML;

  $('#titulo').val(titulo);
  $('#descripcion').val(descripcion);
  $('#lugar').val(lugar);
  $('#fecha').val(fecha);
  $('#horario').val(horario);
  $('#enlace').val(enlace);
  $('#facultades').selectpicker('val',fac_names.split(" "));

  var btnAceptar = document.getElementById('btnAceptar');
  btnAceptar.innerHTML = 'Guardar';
  btnAceptar.onclick = function(){
    var userRef = db.collection('eventos').doc(id);

    var titulo = $('#titulo').val();
    var descripcion = $('#descripcion').val();
    var lugar  = $('#lugar').val();
    var fecha = $('#fecha').val();
    var horario = $('#horario').val();
    var enlace = $('#enlace').val();

    var parts = fecha.split("/");
    var dt = new Date(parseInt(parts[2], 10),
                      parseInt(parts[1], 10) - 1,
                      parseInt(parts[0], 10));
    var date = dt/1000;
    var fac_names = "";
    var facultades = new Object;

    var fac_selects = $('#facultades').val() || [];

    for(var i=0; i<fac_selects.length;i++){
      fac_names = fac_names + ' ' + fac_selects[i];
      facultades[fac_selects[i]] = date;
    }

    $("#myModal").modal('hide');

    return userRef.update({
      titulo: titulo,
      descripcion: descripcion,
      fac_names: fac_names,
      facultades: facultades,
      lugar: lugar,
      fecha: fecha,
      date: date,
      horario: horario,
      enlace: enlace
    })
    .then(function(){
      console.log("Document succesfully updated!");
    })
    .catch(function(error){
      console.error("Error updating document: ",error);
    })
  }
}

//agregar documento
function agregar(event){
  var titulo = $('#titulo').val();
  var descripcion = $('#descripcion').val();
  var lugar  = $('#lugar').val();
  var fecha = $('#fecha').val();
  var horario = $('#horario').val();
  var enlace = $('#enlace').val();

  var parts = fecha.split("/");
  var dt = new Date(parseInt(parts[2], 10),
                    parseInt(parts[1], 10) - 1,
                    parseInt(parts[0], 10));
  var date = dt/1000;
  var fac_names = "";
  var facultades = new Object;

  var fac_selects = $('#facultades').val() || [];

  for(var i=0; i<fac_selects.length;i++){
    fac_names = fac_names + ' ' + fac_selects[i];
    facultades[fac_selects[i]] = date;
  }

  $("#myModal").modal('hide');

  db.collection("eventos").add({
      titulo: titulo,
      descripcion: descripcion,
      fac_names: fac_names,
      facultades: facultades,
      lugar: lugar,
      fecha: fecha,
      date: date,
      horario: horario,
      enlace: enlace
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

//borrar documentos
function eliminar(id){
  db.collection("eventos").doc(id).delete().then(function(){
    console.log("Document succesfully deleted");
  }).catch(function(error){
    console.error("Error removing document: ", error);
  });
}


//Leer documento
var tabla = document.getElementById('tabla');
db.collection("eventos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    var count = 0;
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
          <td>${doc.data().titulo}</td>
          <td>${doc.data().descripcion}</td>
          <td>${doc.data().fac_names}</td>
          <td>${doc.data().lugar}</td>
          <td>${doc.data().fecha}</td>
          <td>${doc.data().horario}</td>
          <td>${doc.data().enlace}</td>

          <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning" onclick="editar('${doc.id}',${count})">Editar</button></td>
        </tr>
        `;
        count++;
    });
});
