let nivel=1;
let score=0;
let tiempo=10;
let progreso=0;
let posX=0;
let idx=0;
let preguntasNivel=[];
let timer;

// BANCO 50 PREGUNTAS
const banco={
1:[
{p:"¿Qué necesita el motor?",r:["Aire+comb+chispa","Gasolina","Aire"],c:0,code:"BASE"},
{p:"¿Bujía?",r:["Chispa","Enfría","Lubrica"],c:0,code:"IGN"},
{p:"Tacómetro:",r:["RPM","Temp","Volt"],c:0,code:"RPM"},
{p:"Radiador:",r:["Enfría","Lubrica","Acelera"],c:0,code:"COOL"},
{p:"Aceite:",r:["Lubrica","Enfría","Quema"],c:0,code:"OIL"},
{p:"Sin aire:",r:["No funciona","Rápido","Normal"],c:0,code:"AIR"},
{p:"Combustible:",r:["Gasolina","Agua","Aceite"],c:0,code:"FUEL"},
{p:"Explosión:",r:["Cilindro","Llanta","Filtro"],c:0,code:"CYL"},
{p:"RPM:",r:["Revoluciones","Voltaje","Presión"],c:0,code:"RPM"},
{p:"Encendido:",r:["Chispa","Aire","Agua"],c:0,code:"IGN"}
],
2:[
{p:"Sensor O2:",r:["Oxígeno","Temp","Volt"],c:0,code:"P0130"},
{p:"TPS:",r:["Acelerador","Temp","RPM"],c:0,code:"P0120"},
{p:"MAF:",r:["Flujo aire","Volt","Gas"],c:0,code:"P0100"},
{p:"ECT:",r:["Temp","Volt","RPM"],c:0,code:"P0115"},
{p:"CKP:",r:["Cigüeñal","Aire","Gas"],c:0,code:"P0335"},
{p:"MAP:",r:["Presión","Temp","Volt"],c:0,code:"P0105"},
{p:"IAT:",r:["Temp aire","Volt","RPM"],c:0,code:"P0110"},
{p:"Knock:",r:["Detonación","Volt","Gas"],c:0,code:"P0325"},
{p:"ABS:",r:["Ruedas","Motor","Aire"],c:0,code:"C0035"},
{p:"Velocidad:",r:["Velocidad","Temp","Volt"],c:0,code:"P0500"}
],
3:[
{p:"Batería:",r:["12V","5V","24V"],c:0,code:"ELE"},
{p:"Sin CKP:",r:["No arranca","Normal","Rápido"],c:0,code:"P0335"},
{p:"Alternador:",r:["Carga","Enfría","Lubrica"],c:0,code:"ALT"},
{p:"Fusible:",r:["Protege","Acelera","Lubrica"],c:0,code:"FUS"},
{p:"Relay:",r:["Activa","Frena","Apaga"],c:0,code:"REL"},
{p:"ECU:",r:["Controla","Lubrica","Enfría"],c:0,code:"ECU"},
{p:"Señal:",r:["Datos","Gas","Aceite"],c:0,code:"SIG"},
{p:"Corto:",r:["Falla","Mejora","Nada"],c:0,code:"SHORT"},
{p:"Cable:",r:["No señal","Rápido","Nada"],c:0,code:"WIRE"},
{p:"Tierra:",r:["Falla","Mejora","Nada"],c:0,code:"GND"}
],
4:[
{p:"P0171:",r:["Pobre","Rica","Normal"],c:0,code:"P0171"},
{p:"Humo negro:",r:["Rica","Pobre","Normal"],c:0,code:"SMOKE"},
{p:"Vibración:",r:["Falla encendido","Normal","Mejora"],c:0,code:"MIS"},
{p:"Check:",r:["Falla","Normal","Nada"],c:0,code:"CHK"},
{p:"Scanner:",r:["Lee datos","Acelera","Frena"],c:0,code:"OBD"},
{p:"Inyector:",r:["Falla","Mejora","Nada"],c:0,code:"INJ"},
{p:"Bujía mala:",r:["Falla","Mejora","Nada"],c:0,code:"IGN"},
{p:"Sensor malo:",r:["Datos falsos","Mejora","Nada"],c:0,code:"SNS"},
{p:"Motor falla:",r:["Diagnosticar","Ignorar","Acelerar"],c:0,code:"ENG"},
{p:"Código:",r:["Error","Velocidad","Temp"],c:0,code:"OBD"}
],
5:[
{p:"Pierde potencia:",r:["MAF sucio","Aceite","Llantas"],c:0,code:"P0100"},
{p:"Baja presión:",r:["Menos potencia","Más","Normal"],c:0,code:"FUEL"},
{p:"Primero:",r:["Escanear","Ignorar","Cambiar"],c:0,code:"OBD"},
{p:"Filtro:",r:["Menos aire","Más","Nada"],c:0,code:"AIR"},
{p:"Bomba:",r:["No gasolina","Más","Nada"],c:0,code:"FUEL"},
{p:"Sensor:",r:["Datos falsos","Mejora","Nada"],c:0,code:"SNS"},
{p:"ECU:",r:["Falla","Mejora","Nada"],c:0,code:"ECU"},
{p:"Sobrecalienta:",r:["Falla","Mejora","Nada"],c:0,code:"TEMP"},
{p:"Sin chispa:",r:["No arranca","Más","Nada"],c:0,code:"IGN"},
{p:"Diagnóstico:",r:["Clave","Inútil","Extra"],c:0,code:"OBD"}
]
};

// iniciar
document.getElementById("start").onclick=()=>{
 document.getElementById("game").style.display="block";
 document.getElementById("start").style.display="none";
 cargarNivel();
};

function shuffle(a){return a.sort(()=>Math.random()-0.5);}

function cargarNivel(){
 document.getElementById("level").innerText=nivel;
 preguntasNivel=shuffle([...banco[nivel]]).slice(0,3);
 idx=0;
 mostrarPregunta();
}

function mostrarPregunta(){
 if(idx>=preguntasNivel.length){
  nivel++;
  if(nivel>5){
   document.getElementById("question").innerHTML="<h2>🏁 Finalizado</h2>";
   return;
  }
  cargarNivel(); return;
 }

 let q=preguntasNivel[idx];
 document.getElementById("code").innerText=q.code;

 document.getElementById("question").innerHTML=
 `<h3>${q.p}</h3>`+
 q.r.map((x,i)=>`<button onclick="responder(${i},${q.c})">${x}</button>`).join("");

 iniciarTiempo();
}

function iniciarTiempo(){
 tiempo=10;
 document.getElementById("time").innerText=tiempo;

 clearInterval(timer);
 timer=setInterval(()=>{
  tiempo--;
  document.getElementById("time").innerText=tiempo;

  if(tiempo<=0){
   clearInterval(timer);
   idx++;
   mostrarPregunta();
  }
 },1000);
}

function responder(i,c){
 clearInterval(timer);

 if(i===c){
  score+=10;
  progreso+=10;
 }else{
  progreso-=5;
 }

 if(progreso<0)progreso=0;

 document.getElementById("score").innerText=score;
 document.getElementById("truck").style.left=progreso+"%";

 idx++;
 mostrarPregunta();
}

// CONTROLES MÓVIL
document.getElementById("left").onclick=()=>{posX-=10; actualizar();}
document.getElementById("right").onclick=()=>{posX+=10; actualizar();}
document.getElementById("accelerate").onclick=()=>{progreso+=5; actualizar();}
document.getElementById("brake").onclick=()=>{progreso-=5; actualizar();}

// TECLADO
document.addEventListener("keydown",(e)=>{
 if(e.key==="ArrowLeft") posX-=10;
 if(e.key==="ArrowRight") posX+=10;
 if(e.key==="ArrowUp") progreso+=5;
 if(e.key==="ArrowDown") progreso-=5;

 if(progreso<0)progreso=0;
 actualizar();
});

function actualizar(){
 document.getElementById("truck").style.left=progreso+"%";
 document.getElementById("truck").style.transform=`translateX(${posX}px)`;
 document.getElementById("score").innerText=score;
}
