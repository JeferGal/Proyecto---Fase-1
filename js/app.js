let cuenta = document.getElementById("cuenta");
let btn1 = document.getElementById("b1");
let btn2 = document.getElementById("b2");
let btn3 = document.getElementById("b3");
let btn4 = document.getElementById("b4");
let btn5 = document.getElementById("b5");
let btn6 = document.getElementById("b6");
let btn7 = document.getElementById("b7");
let btn8 = document.getElementById("b8");
let btn9 = document.getElementById("b9");
let btn0 = document.getElementById("b0");
let clear = document.getElementById("limpiar");
let ok = document.getElementById("entrar");
let errorCuenta = document.getElementById("errorNum");

// Asignar eventos click para cada boton numerico
btn1.onclick = function (e) {
  console.log(btn1.textContent);
  cuenta.textContent = cuenta.textContent + "1";
};

btn2.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "2";
};

btn3.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "3";
};

btn4.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "4";
};

btn5.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "5";
};

btn6.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "6";
};

btn7.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "7";
};

btn8.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "8";
};

btn9.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "9";
};

btn0.onclick = function (e) {
  cuenta.textContent = cuenta.textContent + "0";
};

// Evento al presionar ENTER
ok.onclick = function (e) {
// Si se entroduce "1234", mostrar pantalla para ingresar PIN
  if(cuenta.textContent == "1234"){ 
    screenPin(); //Funcion que cambia a la pantalla PIN
  } else {
    alert("Incorrecto"); //Alerta si el numero de cuenta es incorrecto
  }
};

// Evento para limpiar numero de cuenta (Boton "CLEAR")
clear.addEventListener("click", () => (cuenta.textContent = ""));

function logout() {
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("inicio").style.display = "block";
}

// Funcion que cambia a la pantalla de PIN
function screenPin() {
  console.log(cuenta.textContent);
  cuenta.textContent = "";
  var saludo2 = document.querySelector(".saludo2"); //Cambiar el texto de bienvenida para pedir PIN
  saludo2.innerHTML = "Ingresar PIN"; //Actualizar mensaje en la pantalla
  console.log(cuenta.textContent);
  console.log(saludo2);

//   Nuevo span donde se muestre el pin introducido
  var spanPin = document.createElement("span");
  spanPin.setAttribute("id", "pin");
  spanPin.setAttribute("class", "text-light");

// Evento del boton ENTER para validar el pin  
  ok.onclick = function () {
    document.getElementById("actions-screen").style.display = "block";
    document.getElementById("inicio").style.display = "none";
    // var pinData = document.getElementById("pin");

    // console.log(pinData.textContent);
    console.log(spanPin.getAttribute("id"));
  };
}

// Funcion para mostrar la pantalla del historial de transacciones
function viewHistory() {
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("history-screen").style.display = "block";
}

// Funcion para mostrar la pantalla con la grafica de transacciones
function viewGraph() {
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("graph-screen").style.display = "block";

  // Lógica para mostrar el gráfico (usar Chart.js)
  const ctx = document.getElementById("transactionsChart").getContext("2d");
  const transactionsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Depósitos", "Retiros", "Pagos de Servicios"],
      datasets: [
        {
          label: "Transacciones",
          data: [5, 2, 3],
          backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB"],
        },
      ],
    },
  });
}

// Función para volver a la pantalla de acciones desde el historial o el gráfico
function backToActions() {
  document.getElementById("history-screen").style.display = "none";
  document.getElementById("graph-screen").style.display = "none";
  document.getElementById("actions-screen").style.display = "block";
}
