let nivel=1;
let aciertos=0;
let preguntasActuales=[];
let usadas=new Set();
let idx=0;
let tiempoNivel=45;
let timer;

const bancoGeneral=[/* 50 preguntas aquí (igual estructura previa) */];
const bancoDificil=[/* 15 difíciles nivel 5 */];

function iniciar(){
 nivel=1;
 aciertos=0;
 usadas.clear();
 siguienteNivel();
}

document.getElementById("start").onclick=()=>{
 document.getElementById("start").style.display="none";
 iniciar();
};

function siguienteNivel(){
 idx=0;
 tiempoNivel=45;

 document.getElementById("nivel").innerText="Nivel "+nivel;

 if(nivel<5){
  let disponibles=bancoGeneral.filter((_,i)=>!usadas.has(i));
  preguntasActuales=shuffle(disponibles).slice(0,3);
  preguntasActuales.forEach(q=>usadas.add(bancoGeneral.indexOf(q)));
 }else{
  preguntasActuales=shuffle(bancoDificil).slice(0,3);
 }

 mostrarPregunta();
 iniciarTiempo();
}

function mostrarPregunta(){
 let q=preguntasActuales[idx];

 document.getElementById("question").innerText=q.p;

 document.querySelectorAll("#answers button")[0].innerText="A: "+q.r[0];
 document.querySelectorAll("#answers button")[1].innerText="B: "+q.r[1];
 document.querySelectorAll("#answers button")[2].innerText="C: "+q.r[2];
}

function responder(i){
 let q=preguntasActuales[idx];
 if(i===q.c) aciertos++;

 idx++;

 let progreso=(( (nivel-1)*3 + idx)/15)*100;
 document.getElementById("progress").style.height=progreso+"%";

 if(idx>=3){
  nivel++;
  if(nivel>5){
   fin();
   return;
  }
  siguienteNivel();
 }else{
  mostrarPregunta();
 }
}

function iniciarTiempo(){
 clearInterval(timer);
 timer=setInterval(()=>{
  tiempoNivel--;
  document.getElementById("timer").innerText=tiempoNivel;

  if(tiempoNivel<=0){
   clearInterval(timer);
   nivel++;
   if(nivel>5){fin(); return;}
   siguienteNivel();
  }
 },1000);
}

function fin(){
 let r="";
 if(aciertos>=14) r="Conductor MASTER";
 else if(aciertos>=12) r="Avanzado-MASTER";
 else if(aciertos>=10) r="Avanzado";
 else if(aciertos>=8) r="Medio-Avanzado";
 else if(aciertos>=6) r="Medio";
 else if(aciertos>=4) r="Medio-Básico";
 else if(aciertos>=2) r="Básico";
 else r="Bebé";

 document.getElementById("question").innerHTML=
 `<h2>Resultado: ${r}</h2><p>Aciertos: ${aciertos}/15</p>`;
}

function shuffle(a){return a.sort(()=>Math.random()-0.5);}
