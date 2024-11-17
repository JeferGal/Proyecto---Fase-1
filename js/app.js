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
let btn11= document.getElementById("b11")
let clear = document.getElementById("limpiar");
let ok = document.getElementById("entrar");
let errorCuenta = document.getElementById("errorNum");
let screen_deposit = document.getElementById("deposit-screen")
let withdraw_screen = document.getElementById("withdraw-screen")

let cuentaUsuario = {
  balance: 500,
  transacciones: []
};

let campoActivo = null; // Mantendrá referencia al campo de entrada actual

// Cuando el campo cantidad esté activo
document.getElementById("cantidad").addEventListener("focus", function () {
    campoActivo = this; // Asigna el campo cantidad como activo
});

// Si quieres manejar otros campos en el futuro, puedes repetir este patrón para cada campo



function agregarValorTeclado(valor) {
  if (campoActivo) {
      campoActivo.value = campoActivo.value + valor; // Agrega el valor al campo activo
  } else {
      cuenta.textContent = cuenta.textContent + valor; // Si no hay campo activo, usa cuenta
  }
}

// Modificar los eventos de botones
btn1.onclick = function () { agregarValorTeclado("1"); };
btn2.onclick = function () { agregarValorTeclado("2"); };
btn3.onclick = function () { agregarValorTeclado("3"); };
btn4.onclick = function () { agregarValorTeclado("4"); };
btn5.onclick = function () { agregarValorTeclado("5"); };
btn6.onclick = function () { agregarValorTeclado("6"); };
btn7.onclick = function () { agregarValorTeclado("7"); };
btn8.onclick = function () { agregarValorTeclado("8"); };
btn9.onclick = function () { agregarValorTeclado("9"); };
btn0.onclick = function () { agregarValorTeclado("0"); };


// CLEAR
clear.addEventListener("click", () => {
  if (campoActivo) {
      campoActivo.value = ""; // Limpia el campo activo
  } else {
      cuenta.textContent = ""; // Limpia el número de cuenta
  }
});



btn11.addEventListener("click", depositar);

// Evento al presionar ENTER

ok.onclick = function () {
  if (cuenta.textContent === "1234") {
      screenPin(); // Cambia a la pantalla de PIN
  } else {
      alert("Número de cuenta incorrecto");
      cuenta.textContent = ""; // Limpia el campo si el número de cuenta es incorrecto
  }
};

let enter2 = document.getElementById("entrar2");
enter2.addEventListener("click", () => {
    if (screen_deposit.style.display === "block") {
        depositar(); // Realiza el depósito
    } else if (withdraw_screen.style.display === "block") {
        retirar(); // Realiza el retiro
    }
});



/*let enterButton = document.getElementById("entrar");
enterButton.addEventListener("click", () => {
  if (withdraw_screen.style.display === "block") {
      retirar(); // Realiza el retiro si estás en la pantalla de retiro
      cancelDeposit();
  } else if (screen_deposit.style.display === "block") {
      depositar(); // Realiza el depósito si estás en la pantalla de depósito
      cancelDeposit();
  } else {
      // Lógica para otras acciones como validar número de cuenta o PIN
      if (cuenta.textContent === "1234") {
          screenPin();
      } else {
          alert("Número de cuenta incorrecto");
          cuenta.textContent = "";
      }
  }
});*/

/*let enterButton = document.getElementById("entrar");
enterButton.addEventListener("click", () => {
    if (screen_deposit.style.display === "block") {
        depositar(); // Realiza el depósito si estás en la pantalla de depósito
        cancelDeposit();
    } else {
        // Lógica para otros casos, como validar número de cuenta o PIN
        if (cuenta.textContent === "1234") {
            screenPin();
        } else {
            alert("Número de cuenta incorrecto");
            cuenta.textContent = "";
        }
    }
});*/





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
  // Ocultar todas las pantallas extra al regresar al menú principal
  document.getElementById("deposit-screen").style.display = "none";
  document.getElementById("withdraw-screen").style.display = "none";

  // Mostrar pantalla principal
  document.getElementById("actions-screen").style.display = "block";

  // Reseteo o limpieza visual
  document.getElementById("cantidad").value = "";
}

function showDepositMenu() {
  screen_deposit.style.display = "block";
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("cantidad-deposito").focus(); // Forzar foco en cantidad-deposito
  campoActivo = document.getElementById("cantidad-deposito"); // Actualiza campoActivo
  toggleEnterButtons(false); // Mostrar ENTER2
  updateBalanceDisplay();
}

function withdraw() {
  withdraw_screen.style.display = "block";
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("cantidad-retiro").focus(); // Forzar foco en cantidad-retiro
  campoActivo = document.getElementById("cantidad-retiro"); // Actualiza campoActivo
  toggleEnterButtons(false); // Mostrar ENTER2
}



function depositar() {
  const monto = parseFloat(document.getElementById("cantidad-deposito").value);
  console.log("Monto a depositar:", monto); // Verifica que se capture el valor

  if (!isNaN(monto) && monto > 0) {
      cuentaUsuario.balance += monto;
      cuentaUsuario.transacciones.push({ tipo: 'Depósito', monto, fecha: new Date().toLocaleString() });
      alert(`Depósito exitoso. Nuevo balance: $${cuentaUsuario.balance.toFixed(2)}`);
      updateBalanceDisplay();
      document.getElementById("cantidad-deposito").value = ""; // Limpia el campo de entrada

      // Regresar al menú principal
      cancelDeposit();
  } else {
      alert("Por favor, ingrese un monto válido.");
  }
}

function retirar() {
  const monto = parseFloat(document.getElementById("cantidad-retiro").value);

  if (!isNaN(monto) && monto > 0) {
      if (monto <= cuentaUsuario.balance) {
          cuentaUsuario.balance -= monto;
          cuentaUsuario.transacciones.push({ tipo: 'Retiro', monto, fecha: new Date().toLocaleString() });
          alert(`Retiro exitoso. Nuevo balance: $${cuentaUsuario.balance.toFixed(2)}`);
          updateBalanceDisplay();
          document.getElementById("cantidad-retiro").value = ""; // Limpia el campo de entrada

          // Regresar al menú principal
          cancelWithdraw();
      } else {
          alert("Saldo insuficiente.");
      }
  } else {
      alert("Por favor, ingrese un monto válido.");
  }
}




function updateBalanceDisplay() {
  const balanceDepositElement = document.querySelector("#deposit-screen h3:first-child");
  const balanceWithdrawElement = document.querySelector("#withdraw-screen h3:first-child");

  if (balanceDepositElement) {
      balanceDepositElement.textContent = `Saldo Actual: $${cuentaUsuario.balance.toFixed(2)}`;
  }

  if (balanceWithdrawElement) {
      balanceWithdrawElement.textContent = `Saldo Actual: $${cuentaUsuario.balance.toFixed(2)}`;
  }
}



function cancelDeposit() {
  screen_deposit.style.display = "none";
  document.getElementById("actions-screen").style.display = "block";
  toggleEnterButtons(true); // Restaurar ENTER original
}

function cancelWithdraw() {
  withdraw_screen.style.display = "none";
  document.getElementById("actions-screen").style.display = "block";
  toggleEnterButtons(true); // Restaurar ENTER original
}

function toggleEnterButtons(showEnter) {
  let enter1 = document.getElementById("entrar"); // Botón ENTER original
  let enter2 = document.getElementById("entrar2"); // Botón ENTER2 para depósito/retiro

  if (showEnter) {
      enter1.style.display = "inline-block"; // Mostrar ENTER original
      enter2.style.display = "none"; // Ocultar ENTER2
  } else {
      enter1.style.display = "none"; // Ocultar ENTER original
      enter2.style.display = "inline-block"; // Mostrar ENTER2
  }
}


