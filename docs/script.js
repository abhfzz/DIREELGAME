let nivel = 1;
let aciertos = 0;

let preguntasActuales = [];
let usadas = [];

let idx = 0;

let tiempo = 15;
let fase = "lectura";

let timer;

// HTML
const nivelHTML = document.getElementById("nivel");
const timerHTML = document.getElementById("timer");
const questionHTML = document.getElementById("question");

const progressHTML = document.getElementById("progress");

const botones = document.querySelectorAll("#answers button");

const startBtn = document.getElementById("start");

// BANCO
const bancoGeneral = [

{
 p:"¿Motor sin agua?",
 r:["Desviela","Luces fallan","Explota"],
 c:0
},

{
 p:"¿Motor sin aceite?",
 r:["Se daña","Corre mejor","Nada"],
 c:0
},

{
 p:"¿Sin batería?",
 r:["No arranca","Más potencia","Nada"],
 c:0
},

{
 p:"¿Bujía dañada?",
 r:["Falla motor","Más velocidad","Nada"],
 c:0
},

{
 p:"¿Radiador sirve para?",
 r:["Enfriar","Acelerar","Frenar"],
 c:0
},

{
 p:"¿P0171?",
 r:["Mezcla pobre","Normal","Rica"],
 c:0
},

{
 p:"¿CKP dañado?",
 r:["No arranca","Más potencia","Nada"],
 c:0
},

{
 p:"¿Alternador?",
 r:["Carga batería","Frena","Lubrica"],
 c:0
},

{
 p:"¿Sensor MAF?",
 r:["Mide aire","Aceite","Agua"],
 c:0
},

{
 p:"¿Sin chispa?",
 r:["No arranca","Más rápido","Nada"],
 c:0
}

];

// DIFÍCIL
const bancoDificil = [

{
 p:"¿Sensor afecta mezcla aire-combustible?",
 r:["MAF","ABS","TPS"],
 c:0
},

{
 p:"¿Knock sensor?",
 r:["Detonación","Voltaje","RPM"],
 c:0
},

{
 p:"¿MAP mide?",
 r:["Presión","RPM","Combustible"],
 c:0
}

];

// START
startBtn.onclick = () => {

 startBtn.style.display = "none";

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

 nivelHTML.innerText = "Nivel " + nivel;

 if(nivel < 5){

  let disponibles = bancoGeneral.filter(
   q => !usadas.includes(q)
  );

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

 if(!q){

  questionHTML.innerText = "Error";

  return;

 }

 questionHTML.innerText = q.p;

 botones[0].innerText = "A: " + q.r[0];
 botones[1].innerText = "B: " + q.r[1];
 botones[2].innerText = "C: " + q.r[2];

 botones.forEach(btn=>{
  btn.style.background = "#c40000";
 });

}

// TIEMPO
function iniciarTiempo(){

 tiempo = 15;

 fase = "lectura";

 clearInterval(timer);

 timer = setInterval(()=>{

  tiempo--;

  timerHTML.innerText = tiempo;

  // RESPONDER
  if(tiempo <= 7){

   fase = "respuesta";

  }

  // TERMINA
  if(tiempo <= 0){

   siguiente();

  }

 },1000);

}

// RESPUESTA
function responder(i){

 if(fase !== "respuesta") return;

 clearInterval(timer);

 let q = preguntasActuales[idx];

 // CORRECTA
 if(i === q.c){

  aciertos++;

  botones[i].style.background = "green";

  questionHTML.innerText = "✔ Correcto";

 }

 // INCORRECTA
 else{

  botones[i].style.background = "red";

  botones[q.c].style.background = "green";

  questionHTML.innerText = "✖ Incorrecto";

 }

 setTimeout(()=>{

  siguiente();

 },1200);

}

// SIGUIENTE
function siguiente(){

 clearInterval(timer);

 idx++;

 // PROGRESO
 let progreso = (
  (((nivel - 1) * 3) + idx) / 15
 ) * 100;

 progressHTML.style.height = progreso + "%";

 // NIVEL
 if(idx >= 3){

  nivel++;

  if(nivel > 5){

   fin();

   return;

  }

  siguienteNivel();

 }

 // SIGUIENTE PREGUNTA
 else{

  mostrarPregunta();

  iniciarTiempo();

 }

}

// FINAL
function fin(){

 let rango = "";

 if(aciertos >= 14){

  rango = "CONDUCTOR MASTER";

 }

 else if(aciertos >= 12){

  rango = "CONDUCTOR AVANZADO-MASTER";

 }

 else if(aciertos >= 10){

  rango = "CONDUCTOR AVANZADO";

 }

 else if(aciertos >= 8){

  rango = "CONDUCTOR MEDIO-AVANZADO";

 }

 else if(aciertos >= 6){

  rango = "CONDUCTOR MEDIO";

 }

 else if(aciertos >= 4){

  rango = "CONDUCTOR MEDIO-BÁSICO";

 }

 else if(aciertos >= 2){

  rango = "CONDUCTOR BÁSICO";

 }

 else{

  rango = "CONDUCTOR BEBÉ";

 }

 document.getElementById("questionBox").innerHTML = `
  <h1>${rango}</h1>
  <h2>${aciertos}/15 ACIERTOS</h2>
 `;

 botones.forEach(btn=>{

  btn.style.display = "none";

 });

}

// RANDOM
function shuffle(a){

 return a.sort(() => Math.random() - 0.5);

}
