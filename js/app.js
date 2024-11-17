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
//let ok = document.getElementById("entrar");
let errorCuenta = document.getElementById("errorNum");
let screen_deposit = document.getElementById("deposit-screen")
let withdraw_screen = document.getElementById("withdraw-screen")
const pinCorrecto = "1234"; // PIN válido para comparación
const pinIngresado = document.getElementById("pin-input").value.trim();
let intentos = 0;
const maxIntentos = 3;



let cuentaUsuario = {
  balance: 500,
  transacciones: []
};

let campoActivo = null; // Mantendrá referencia al campo de entrada actual 

document.getElementById("pin-input").addEventListener("focus", function () {
  campoActivo = this;
});





function agregarValorTeclado(valor) {
  if (campoActivo) {
    campoActivo.value += valor; // Agrega el valor al final del campo activo
  } else {
    console.warn("No hay campo activo para ingresar valores.");
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
  }
});




btn11.addEventListener("click", depositar);

// Evento al presionar ENTER

document.querySelectorAll(".btnop").forEach(button => {
  button.addEventListener("click", () => {
      if (withdraw_screen.style.display === "block") {
          retirar();
          cancelWithdraw();
      } else if (screen_deposit.style.display === "block") {
          depositar();
          cancelDeposit();
      } else {
          // Validación de PIN
          const pinIngresado = document.getElementById("pin-input").value.trim();
          if (pinIngresado === pinCorrecto) {
              alert("PIN correcto, bienvenido.");
              document.getElementById("actions-screen").style.display = "block";
              document.getElementById("inicio").style.display = "none";
              document.getElementById("pin-input").value = ""; // Limpiar campo
              intentos = 0;
          } else {
              intentos++;
              alert(`PIN incorrecto. Intentos restantes: ${maxIntentos - intentos}`);
              document.getElementById("pin-input").value = ""; // Limpiar para nuevo intento
              if (intentos >= maxIntentos) {
                  alert("Cuenta bloqueada. Comuníquese con el banco.");
                  button.disabled = true; // Deshabilitar botones
              }
          }
      }
  });
});



let enter2 = document.getElementById("entrar2");
enter2.addEventListener("click", () => {
    if (screen_deposit.style.display === "block") {
        depositar(); // Realiza el depósito
    } else if (withdraw_screen.style.display === "block") {
        retirar(); // Realiza el retiro
    }
});



function logout() {
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("inicio").style.display = "block";
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
  // Ocultar todas las pantallas secundarias
  document.getElementById("deposit-screen").style.display = "none";
  document.getElementById("withdraw-screen").style.display = "none";
  document.getElementById("history-screen").style.display = "none"; // Ocultar la pantalla de historial
  document.getElementById("graph-screen").style.display = "none"; // Por si usas la gráfica

  // Mostrar la pantalla principal de acciones
  document.getElementById("actions-screen").style.display = "block";
}


function showDepositMenu() {
  screen_deposit.style.display = "block";
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("cantidad-deposito").focus();
  campoActivo = document.getElementById("cantidad-deposito"); // Actualiza el campo activo

  updateBalanceDisplay(); // Asegúrate de llamar a esta función para actualizar el saldo
}


function withdraw() {
  withdraw_screen.style.display = "block";
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("cantidad-retiro").focus();
  campoActivo = document.getElementById("cantidad-retiro"); // Actualiza el campo activo
  toggleEnterButtons(false);
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
  console.log("Monto a retirar: ", monto);

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
  const balanceDepositElement = document.querySelector("#deposit-screen h3:first-child"); // Selecciona el elemento del saldo en la pantalla de depósito
  const balanceWithdrawElement = document.querySelector("#withdraw-screen h3:first-child"); // Selecciona el elemento del saldo en la pantalla de retiro

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

function checkBalance() {
  const saldoActual = cuentaUsuario.balance.toFixed(2); // Formatea el saldo a 2 decimales
  alert(`Tu saldo es $${saldoActual}`);
}

function viewHistory() {
  // Ocultar otras pantallas
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("history-screen").style.display = "block";

  const historyList = document.getElementById("transaction-history"); // Lista en la pantalla de historial
  historyList.innerHTML = ""; // Limpiar el historial antes de mostrar

  // Iterar sobre el arreglo de transacciones
  cuentaUsuario.transacciones.forEach(transaccion => {
      const listItem = document.createElement("li");
      listItem.textContent = `${transaccion.fecha} - ${transaccion.tipo}: $${transaccion.monto.toFixed(2)}`;
      historyList.appendChild(listItem);
  });

  if (cuentaUsuario.transacciones.length === 0) {
      historyList.innerHTML = "<li>No hay transacciones registradas.</li>";
  }
}

function viewGraph() {
  // Ocultar la pantalla de acciones y mostrar la pantalla de gráfico
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("graph-screen").style.display = "block";

  const ctx = document.getElementById("transactionsChart").getContext("2d");

  // Extraer los datos del historial de transacciones
  const labels = cuentaUsuario.transacciones.map((transaccion, index) => `Transacción ${index + 1}`);
  const data = cuentaUsuario.transacciones.map(transaccion => transaccion.monto);
  const tipos = cuentaUsuario.transacciones.map(transaccion => transaccion.tipo);

  // Crear un gráfico de barras
  new Chart(ctx, {
      type: 'bar', // Puedes cambiar a 'line', 'pie', etc.
      data: {
          labels: labels, // Etiquetas para cada transacción
          datasets: [{
              label: 'Monto de Transacciones',
              data: data, // Datos de montos
              backgroundColor: tipos.map(tipo => tipo === 'Depósito' ? 'green' : 'red'), // Color según tipo
              borderColor: 'black',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: true
              },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          return `${tipos[tooltipItem.dataIndex]}: $${tooltipItem.raw.toFixed(2)}`;
                      }
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function cancelAll() {
  // Ocultar todas las pantallas secundarias
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("deposit-screen").style.display = "none";
  document.getElementById("withdraw-screen").style.display = "none";
  document.getElementById("history-screen").style.display = "none";
  document.getElementById("graph-screen").style.display = "none";
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("pay-services-screen").style.display = "none";
  


  // Mostrar la pantalla de inicio (PIN)
  document.getElementById("inicio").style.display = "block";

  // Limpiar el campo de PIN y resetear el estado del sistema
  document.getElementById("pin-input").value = ""; 
  intentos = 0; // Reinicia los intentos de PIN si aplica
}

function payServices() {
  document.getElementById("actions-screen").style.display = "none";
  document.getElementById("pay-services-screen").style.display = "block";

  // Mostrar el saldo actual
  document.getElementById("current-balance").textContent = cuentaUsuario.balance.toFixed(2);
}

function payService() {
  const servicio = document.getElementById("service-type").value;
  const monto = parseFloat(document.getElementById("cantidad-servicio").value);

  if (!isNaN(monto) && monto > 0) {
      if (monto <= cuentaUsuario.balance) {
          // Deducir del saldo
          cuentaUsuario.balance -= monto;

          // Registrar la transacción en el historial
          cuentaUsuario.transacciones.push({
              tipo: `Pago de ${servicio.charAt(0).toUpperCase() + servicio.slice(1)}`,
              monto: monto,
              fecha: new Date().toLocaleString()
          });

          alert(`Pago de ${servicio} exitoso. Nuevo saldo: $${cuentaUsuario.balance.toFixed(2)}`);

          // Actualizar el saldo mostrado
          document.getElementById("current-balance").textContent = cuentaUsuario.balance.toFixed(2);
          document.getElementById("cantidad-servicio").value = ""; // Limpiar el campo
      } else {
          alert("Saldo insuficiente para realizar este pago.");
      }
  } else {
      alert("Por favor, ingrese un monto válido.");
  }
}







