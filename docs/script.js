let nivel = 1;
let aciertos = 0;

let preguntasActuales = [];
let usadas = [];

let idx = 0;

let tiempo = 15;
let fase = "lectura";

let timer;

// BANCO GENERAL
const bancoGeneral = [
{p:"¿Qué necesita el motor?",r:["Aire+comb+chispa","Gasolina","Aire"],c:0},
{p:"Bujía:",r:["Chispa","Aceite","Agua"],c:0},
{p:"Radiador:",r:["Enfría","Lubrica","Acelera"],c:0},
{p:"RPM:",r:["Revoluciones","Voltaje","Presión"],c:0},
{p:"Aceite:",r:["Lubrica","Quema","Acelera"],c:0},
{p:"Sensor MAF:",r:["Flujo aire","Voltaje","Temp"],c:0},
{p:"TPS:",r:["Acelerador","Temp","RPM"],c:0},
{p:"MAP:",r:["Presión","Volt","Gas"],c:0},
{p:"CKP:",r:["Cigüeñal","Gas","Aire"],c:0},
{p:"ECT:",r:["Temperatura","RPM","Volt"],c:0},

{p:"ABS:",r:["Ruedas","Motor","Aire"],c:0},
{p:"Alternador:",r:["Carga","Enfría","Lubrica"],c:0},
{p:"Batería:",r:["12V","5V","24V"],c:0},
{p:"Fusible:",r:["Protege","Acelera","Lubrica"],c:0},
{p:"Relay:",r:["Activa","Frena","Lubrica"],c:0},
{p:"ECU:",r:["Controla","Lubrica","Enfría"],c:0},
{p:"P0171:",r:["Mezcla pobre","Rica","Normal"],c:0},
{p:"Humo negro:",r:["Rica","Pobre","Normal"],c:0},
{p:"Check Engine:",r:["Falla","Normal","Nada"],c:0},
{p:"Scanner:",r:["Diagnostica","Frena","Acelera"],c:0},

{p:"Inyector:",r:["Falla","Mejora","Nada"],c:0},
{p:"Sensor malo:",r:["Datos falsos","Mejora","Nada"],c:0},
{p:"Motor falla:",r:["Diagnosticar","Ignorar","Acelerar"],c:0},
{p:"Código OBD:",r:["Error","Temp","Velocidad"],c:0},
{p:"Falla intermitente:",r:["Difícil","Fácil","Nada"],c:0},
{p:"Sin CKP:",r:["No arranca","Normal","Rápido"],c:0},
{p:"Cable roto:",r:["Sin señal","Normal","Nada"],c:0},
{p:"Tierra:",r:["Falla","Mejora","Nada"],c:0},
{p:"Knock sensor:",r:["Detonación","Volt","RPM"],c:0},
{p:"Velocidad:",r:["Sensor","Aceite","Filtro"],c:0},

{p:"Oxígeno:",r:["Sensor O2","Radiador","ABS"],c:0},
{p:"P0100:",r:["MAF","TPS","MAP"],c:0},
{p:"P0335:",r:["CKP","ABS","TPS"],c:0},
{p:"Sin chispa:",r:["No arranca","Más potencia","Nada"],c:0},
{p:"Baja presión:",r:["Menos potencia","Más","Nada"],c:0}
];

// NIVEL 5 DIFÍCIL
const bancoDificil = [
{p:"¿Qué sensor afecta mezcla aire-combustible?",r:["MAF","ABS","CKP"],c:0},
{p:"P0171 significa:",r:["Mezcla pobre","Rica","Normal"],c:0},
{p:"Sin CKP:",r:["No arranca","Normal","Más potencia"],c:0},
{p:"P0100 corresponde:",r:["MAF","TPS","ECT"],c:0},
{p:"Knock sensor detecta:",r:["Detonación","Voltaje","RPM"],c:0},
{p:"ECU significa:",r:["Unidad control","Aceite","Alternador"],c:0},
{p:"Sensor O2 mide:",r:["Oxígeno","Gasolina","Volt"],c:0},
{p:"MAP mide:",r:["Presión","RPM","Combustible"],c:0},
{p:"Relay sirve para:",r:["Activar","Lubricar","Enfriar"],c:0},
{p:"TPS detecta:",r:["Acelerador","Presión","Aceite"],c:0},

{p:"Humo negro:",r:["Mezcla rica","Pobre","Normal"],c:0},
{p:"Batería estándar:",r:["12V","24V","5V"],c:0},
{p:"Alternador:",r:["Carga","Frena","Lubrica"],c:0},
{p:"Fusible:",r:["Protege","Acelera","Lubrica"],c:0},
{p:"ABS controla:",r:["Frenos","Motor","Aceite"],c:0}
];

// START
document.getElementById("start").onclick = () => {
 document.getElementById("start").style.display = "none";
 iniciarJuego();
};

// INICIO
function iniciarJuego(){
 nivel = 1;
 aciertos = 0;
 usadas = [];
 siguienteNivel();
}

// NIVEL
function siguienteNivel(){

 idx = 0;

 document.getElementById("nivel").innerText = "Nivel " + nivel;

 if(nivel < 5){

  let disponibles = bancoGeneral.filter(q => !usadas.includes(q));

  preguntasActuales = shuffle(disponibles).slice(0,3);

  usadas.push(...preguntasActuales);

 }else{

  preguntasActuales = shuffle(bancoDificil).slice(0,3);

 }

 mostrarPregunta();
 iniciarTiempo();
}

// MOSTRAR
function mostrarPregunta(){

 let q = preguntasActuales[idx];

 document.getElementById("question").innerText = q.p;

 let botones = document.querySelectorAll("#answers button");

 botones[0].innerText = "A: " + q.r[0];
 botones[1].innerText = "B: " + q.r[1];
 botones[2].innerText = "C: " + q.r[2];
}

// TIEMPO
function iniciarTiempo(){

 tiempo = 15;
 fase = "lectura";

 clearInterval(timer);

 timer = setInterval(()=>{

  tiempo--;

  document.getElementById("timer").innerText = tiempo;

  // 8 segundos lectura
  if(tiempo <= 7){
   fase = "respuesta";
  }

  // tiempo terminado
  if(tiempo <= 0){
   siguiente();
  }

 },1000);
}

// RESPUESTA
function responder(i){

 if(fase !== "respuesta") return;

 let q = preguntasActuales[idx];

 if(i === q.c){
  aciertos++;
 }

 siguiente();
}

// SIGUIENTE
function siguiente(){

 clearInterval(timer);

 idx++;

 // barra progreso
 let progreso = (((nivel - 1) * 3 + idx) / 15) * 100;

 document.getElementById("progress").style.height = progreso + "%";

 // cambio nivel
 if(idx >= 3){

  nivel++;

  if(nivel > 5){
   fin();
   return;
  }

  siguienteNivel();

 }else{

  mostrarPregunta();
  iniciarTiempo();

 }
}

// FIN
function fin(){

 let rango = "";

 if(aciertos >= 14) rango = "CONDUCTOR MASTER";
 else if(aciertos >= 12) rango = "CONDUCTOR AVANZADO-MASTER";
 else if(aciertos >= 10) rango = "CONDUCTOR AVANZADO";
 else if(aciertos >= 8) rango = "CONDUCTOR MEDIO-AVANZADO";
 else if(aciertos >= 6) rango = "CONDUCTOR MEDIO";
 else if(aciertos >= 4) rango = "CONDUCTOR MEDIO-BÁSICO";
 else if(aciertos >= 2) rango = "CONDUCTOR BÁSICO";
 else rango = "CONDUCTOR BEBÉ";

 document.getElementById("questionBox").innerHTML = `
  <h1>${rango}</h1>
  <h2>${aciertos} / 15 aciertos</h2>
 `;
}

// RANDOM
function shuffle(a){
 return a.sort(() => Math.random() - 0.5);
}
