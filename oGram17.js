var gNbPhrasesOk;


var gNbErrors = 0;
var gNbRejoues = 0

var gNbRate = 0;

var gPlay_html5_audio = false;

var gIgnoreClick = false;




var selectedSingulier = 0;
var motAttendu;
var motReecrit;


function cligne(obj,n,cmd) {
  gCligne = 0;
//console.log("cligne n" + n + " " + obj.innerHTML);
  window.setTimeout(function() {hideCligne(obj,n,cmd)},gCligneDelay);
}
function hideCligne(obj,n,cmd) {
//console.log("hide " + gCligne);
  if (n <= 0) {
    //alert("stop cligne " + cmd);
    //obj.style.visibility = 'visible';
    obj.style.color = '#000000';
  //console.log("calling eval " + cmd);
    eval(cmd);
  } else {
    //obj.style.visibility = 'hidden';
    obj.style.color = '#ffffff';
    window.setTimeout(function () {showCligne(obj,n,cmd)},gCligneDelay);
  }
}
function showCligne(obj,n,cmd) {
//console.log("show " + gCligne + " " + obj.innerHTML);
  if (n <= 0) {
    //obj.style.visibility = 'visible';
    obj.style.color = '#000000';
  } else {
    
    //obj.style.visibility = 'visible';
    obj.style.color = '#000000';
    window.setTimeout(function() {hideCligne(obj,n-1,cmd)},gCligneDelay);
  }
}



function init() {
  ////console.log("init og");
  
  gPhase = parent.gPhase;


  var pc = parent.corpus;
  var pcd = pc.corData;

//console.log("rediffuse");
  
  pc.iData = 0;
  pc.jData = 0;
  
  gNbPhrasesOk = 0;
  gNbMotsOk = 0;
  gNbMotsKo = 0;
 
  parent.og.document.getElementById("titre").innerHTML =  parent.ba.titre;
  parent.og.document.getElementById("module").innerHTML =  parent.ba.module;
  
  $(".bouton").hover(function() { 
        $(this).css('cursor','pointer'); }, function() { 
        $(this).css('cursor','auto'); 
  })
  
  diffusePhrase();
  if (parent.isDemo){
    parent.ba.hideCarres();
    parent.enableBouton('displayMenu','menuC.gif');
    //for (var i=0; i<6; i++) parent.gPhraseOrder[i] = i;
    showPointer();
    window.setTimeout(startDemo,4000);
  } else {
    parent.enableBouton('displayMenu','menuC.gif');
    parent.enableBouton('Bconsigne','consigneC.gif');
    
    var serie = parent.ba.serie;
    
    //for (var i=0; i<6; i++) {console.log(parent.gPhraseOrder[i]);}
    
  }
}

 function diffusePhrase() {
  //console.log("diffusePhrase");
  
  rediffusePhrase();
}
function rediffusePhrase() {
  
  var pc = parent.corpus;
  var pcd = pc.corData;
  //console.log(pcd[pc.iData]);
  
  gIgnoreClick = false;
  document.getElementById('phrase').innerHTML=pcd[pc.iData][0];
  var nbMots = pcd[pc.iData][0].split(' ').length;
  var t = 800 + 300*nbMots;
 //console.log(nbMots);
  if (parent.ba.serie == 2) setTimeout(clearPhrase,t);
}

function clearPhrase () {
  document.getElementById('phrase').innerHTML = '';
}
function validerOK () {
  valider(1);
}
function validerKO () {
  valider(0);
}
function continuer() {
  if ($('.hidden',frames[0].document).length) {
    $('.hidden:first',frames[0].document).show();
    $('.hidden:first',frames[0].document).removeClass("hidden");
    if ($('.hidden',frames[0].document).length == 0) document.getElementById("Bcontinuer").innerHTML = 'Quitter';
    } else {
      parent.ba.init();
      parent.og.location = 'menu.html?version=46';
      
    }
 
  frames['Resume2'].window.scrollTo(0,3000); //window.scrollTo(0,3000); //
}




function auSuivant() {

  //console.log('Au suivant ratés ' + gNbRate);
  document.getElementById('phrase').innerHTML = "";
  var pc = parent.corpus;
  var pcd = pc.corData;
  //console.log("Au suivant og... " + pc.iData );
  

  
  pc.iData += 1;
  
  gNbErrors = 0;
  //if (pc.iData < pc.corData.length) {
  if (pc.iData < pc.corData.length) {
    //console.log("auSuivant 1");
    pc.jData = 0;
    
    diffusePhrase();
  //console.log("after diffusePhrase");
    if (parent.isDemo) { 
      showPointer();
      setTimeout(startDemo,2000);
    }
  
  } else {
      //console.log("auSuivant 4");  // fin de phase 1
      if (parent.isDemo) {
        hidePointer(); // test demo automatique
        
      } else {
        var nEx = pc.corData.length;
        var nOk = nEx - gNbRate;
        parent.boutons.pageResultats(nOk, nEx);
        //alert(nOk.toString() + " exercices réussis du premier coup sur " + nEx.toString());
      }
      setTimeout(parent.boutons.showMenu,4000);
        

  } 
}



function showPointer (){
  var p = document.getElementById("pointerimg");
  //console.log("showPointer " + gX0 + " " + gY0);
    p.style.left = gX0.toString() + "px";
    p.style.top = gY0.toString() + "px";
    p.style.visibility = "visible"
}
function hidePointer() {
  document.getElementById('pointerimg').style.visibility = "hidden";
}



function startDemo(){
  //alert("og start demo")
  gIgnoreClick = true;
  
  
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  
      
  
}



