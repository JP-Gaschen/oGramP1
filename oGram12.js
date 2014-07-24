var gNbPhrasesOk;


var gNbErrors = 0;
var gSelErrors = 0;

var gNbRate = 0;

var gPlay_html5_audio = false;

var gIgnoreClick = false;

var gX0,gY0,gx2,gy2;
var gElemP;
var gElem;
var gIdS,gIdP;
var gDemoPhase;
var gCligneDelay = 250;
var gTxt;

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

  gX0 = 490;
  gY0 = 500;
  
  parent.og.document.getElementById("titre").innerHTML =  parent.ba.titre;
  parent.og.document.getElementById("module").innerHTML =  parent.ba.module;
  parent.gPhraseOrder = parent.randsort(24);
   for (var i=0; i<24; i++)  {
     var j = parent.ranData(i) + 1;
     var k = j;
     if (j > 12) k = j-12;
     var n = '' + (i + 1);
     if (i < 9) n = '0' +n;
     var id="t" + n;
     //console.log(id);
     var mot = document.getElementById(id);

     var lefti = 50 + 220 * (i % 4);
     var topi = 130 + 50 * parseInt(i/4);
     mot.style.left = "" + lefti+"px";
     mot.style.top = "" + topi+"px";
     mot.style.color = "#000000";
     //console.log(mot.style.top);
     var mots = pcd[k-1][0].split(' ');
     
     if (j <= 12) mot.innerHTML =  mots[1];
     else mot.innerHTML =  mots[4];
  
  }
  
    $(".mots").hover(function() { 
        $(this).css('cursor','pointer'); }, function() { 
        $(this).css('cursor','auto'); 
  })
  
   $(".mots").click(function(e){
     e.stopPropagation();
     var iMot =  $(".mots").index(this);
     var n = '' + (iMot + 1);
     if (iMot < 9) n = '0' +n;
     var id="t" + n;
     //console.log(id);
     var txt = document.getElementById(id).innerHTML;
     //console.log(txt);
     selectMot(id,iMot,txt);
  });
  
  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {   // return
      parent.boutons.valider();
      return false;
    }
  });
  
  
  if (parent.isDemo){
    parent.ba.hideCarres();
    parent.enableBouton('displayMenu','menuC.gif');
    //for (var i=0; i<6; i++) parent.gPhraseOrder[i] = i;
    showPointer();
    window.setTimeout(startDemo,1000);
  } else {
    
    var serie = parent.ba.serie;
    parent.enableBouton('displayMenu','menuC.gif');
    
    parent.enableBouton('Bconsigne','consigneC.gif');
    
    
    
    //for (var i=0; i<6; i++) {console.log(parent.gPhraseOrder[i]);}
    $('#phrase').keydown(function (e) {
      var keyCode = e.keyCode || e.which;
    
      if (keyCode == 13) {   // return
        parent.boutons.valider();
        return false;
      }
    });
  }

  //diffusePhrase();

}

//SET CURSOR POSITION
function setCursor(node,pos){
    var node = (typeof node == "string" || 
    node instanceof String) ? document.getElementById(node) : node;
        if(!node){
            return false;
        }else if(node.createTextRange){
            var textRange = node.createTextRange();
            textRange.collapse(true);
            textRange.moveEnd(pos);
            textRange.moveStart(pos);
            textRange.select();
            return true;
        }else if(node.setSelectionRange){
            node.setSelectionRange(pos,pos);
            return true;
        }
        return false;
    }

function selectMot(id,iMot,txt) {
  var pc = parent.corpus;
  var pcd = pc.corData;
  //console.log("selectMot " + iMot + ' ' + txt);
  var j = parent.ranData(iMot) + 1;
  var k = j;
  if (j > 12) k = j-12;
  //console.log(pcd[k-1][0]);
  var mots = pcd[k-1][0].split(' ');
  //console.log(document.getElementById(id).style.color);
  if (document.getElementById(id).style.color == 'rgb(0, 0, 0)') {
    if (selectedSingulier == 0) {
    
      if (txt == mots[1]) {
        selectedSingulier = k;
        document.getElementById(id).style.color = '#777777';
      } else {
        gSelErrors += 1;
        //console.log("pas un singulier");
      }
    } else {
      if (txt == mots[4] &&  k == selectedSingulier) {
        var phraseTxt = "";
        
          phraseTxt += "<span Id='sp0' style='color:#000000;'>" + mots[0] + " </span>";
          phraseTxt += "<span Id='sp1' style='color:#000000;'>" + mots[1] + "</span>";
          phraseTxt += "<span Id='sp2' style='color:#000000;'> " + mots[2] + " </span>";
          phraseTxt += "<span Id='sp3' style='color:#000000;'>" + mots[3] + " </span>";
          phraseTxt += "<span Id='sp4' style='color:#000000;'>" + mots[4] + "</span>";
        
        //console.log(phraseTxt);
        document.getElementById('phrase').innerHTML = phraseTxt;
        selectedSingulier = 0;
        document.getElementById(id).style.color = '#777777';
        
        
       
  
        setTimeout(efface,1200);
      } else {
        //console.log("mauvais 2e mot");
        gSelErrors += 1;
      }
    }
  } else {
    //gNbErrors += 1;
    //console.log("déjà pris");
  }
}


function efface(){
  parent.enableBouton('Bvalider','validerC.gif');
  if (Date.now() % 2) {
    motAttendu = document.getElementById('sp1').innerHTML;
    motReecrit = 'sp1';
    
    document.getElementById('sp1').contentEditable = true;
    document.getElementById('sp1').focus();
    document.getElementById('sp1').innerHTML = '&nbsp;';
  } else {
    motAttendu = document.getElementById('sp4').innerHTML;
    motReecrit = 'sp4';
    
    document.getElementById('sp4').contentEditable = true;
    document.getElementById('sp4').focus();
    document.getElementById('sp4').innerHTML = '&nbsp;';
  }
  
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
  parent.disableBouton('Bvalider','validerD.gif');
  document.getElementById('phrase').innerHTML = "";
  var pc = parent.corpus;
  var pcd = pc.corData;
  //console.log("Au suivant og... " + pc.iData );
  

  
  pc.kData += 1;
  
  gNbErrors = 0;
  gSelErrors = 0;
  //if (pc.iData < pc.corData.length) {
  if (pc.kData < pc.corData.length) {
    //console.log("auSuivant 1");
    //parent.boutons.pageResultats(4,5);
    pc.jData = 0;
    
    
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
        var nEx = 2*pc.corData.length;
        var nOk = nEx - gNbRate;
        parent.boutons.pageResultats(nOk, nEx);
        //alert(nOk.toString() + " exercices réussis du premier coup sur " + nEx.toString());
      }
      setTimeout(parent.boutons.showMenu,4000);
        

  } 
}



function showPointer (){
  var p = document.getElementById("pointerimg");
    //console.log("showPointer " + p.height);
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
  var iDemo = 4;
  var motS = pcd[iDemo-1][0].split(' ')[1];
  var motP = pcd[iDemo-1][0].split(' ')[4];
  //console.log(motS);
  //console.log(motP);
  
  for (var i=0; i<24; i++) {
    n = '' + (i+1);
    if (i < 9) n = '0' +n;
    var id="t" + n;

    var moti = document.getElementById(id).innerHTML;
    if (moti == motS) gIdS = id;
    if (moti == motP) gIdP = id;
  }

  var elemS = document.getElementById(gIdS);
  
  gElem = document.getElementById(gIdS);
  gElemP = document.getElementById(gIdP);
  
  x2 = parseInt(elemS.style.left) + 50; 
  y2 = parseInt(elemS.style.top) + 35;
  gDemoPhase = 1;
  setTimeout(function() {StartGlide(gX0,gY0,x2,y2)},2000);
}

function demoSuite() {
  hidePointer();
  if (gDemoPhase == 1) {
    var txt = document.getElementById(gIdS).innerHTML;
    selectMot(gIdS,$('.mots').index(document.getElementById(gIdS)),txt);
    gElem = gElemP;
    x2 = parseInt(gElem.style.left) + 50; 
    y2 = parseInt(gElem.style.top) + 35;
    gDemoPhase = 2;
    setTimeout(showPointer,1000);
    setTimeout(function() {StartGlide(gX0,gY0,x2,y2)},2000);
  } else {
    var txt = document.getElementById(gIdP).innerHTML;
    selectMot(gIdP,$('.mots').index(document.getElementById(gIdP)),txt);
    setTimeout(finitDemo,2000);
  
  }
  

}

function StartGlide(x1,y1,x2,y2) {
    var p = document.getElementById("pointerimg");
    //alert("startglide1 " + p.style.left);
    //console.log("startGlide start " + x1 + " " + y1);
    //console.log("startGlide end " + x2 + " " + y2);
    p.style.left = x1.toString() + "px";
    p.style.top = y1.toString() + "px";
    p.style.visibility = "visible";
    //alert("startglide2");
    gX0 = 490;
    gY0 = 500;
    gNglide = 1;
    gIntervalId = window.setInterval("Glide('" + x1 + "','" + y1 + "','" + x2 + "','" + y2 + "')",8);
}
function Glide(x1,y1,x2,y2)
{
    //console.log("glide "+gNglide);
    var p =document.getElementById("pointerimg");
    var xn = Math.round((gNglide*(x2 - x1))/100.0) + parseInt(x1);
    var yn = Math.round((gNglide*(y2 - y1))/100.0) + parseInt(y1);
    //console.log(xn + " " + yn);
    gNglide += 1;
    if (gNglide > 99) {
    //alert(d);
        p.style.left =x2.toString() + "px";
        p.style.top = y2.toString() + "px";
        window.clearInterval(gIntervalId);
        //alert(gDemoFrame);
        
        var cmd="demoSuite()";
        //var cmd = setTimeout(finitDemo,2000);
        cligne(gElem,3,cmd);
        //setTimeout(hidePointer,500);
    }else{
      p.style.left =xn.toString() + "px";
      p.style.top = yn.toString() + "px";
    }
}

function prepareRetype() {
//console.log("prepareRetype");
//console.log( document.getElementById('phrase').innerHTML);
  var spanId = 'verbe';
  var spanIdPlus = '#'+spanId;
 
//console.log(spanIdPlus);
  var elem = document.getElementById(spanId);
//console.log(elem.innerHTML);
//console.log("prepareRetype " + spanId + " " + elem.innerHTML);
  elem.contentEditable = true;
  $(spanIdPlus).focus();
  elem.innerHTML = "&nbsp;";
  //setTimeout(function() {$('#verbe').focus();},1000);
  //elem.focus();

  $(spanIdPlus).unbind('keydown');
   $(spanIdPlus).keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    //console.log("keyDown " + keyCode);
    if (keyCode == 13) {   // return
    //console.log ("return in prepare ");
      parent.boutons.valider();
      return false;
    }
     
  })
}

function finitDemo() {
  //console.log("finit demo");
  gNreveal = 0;
  reveal();
  gNreveal = 1;
  gIntervalId = window.setInterval(reveal,400);
}

function reveal() {
  var txt = motAttendu.substring(0,gNreveal);
  document.getElementById(motReecrit).innerHTML = txt;
  gNreveal += 1;
  if (gNreveal > motAttendu.length) {
    window.clearInterval(gIntervalId);
    //setTimeout(auSuivant,3000);
    setTimeout(parent.boutons.showMenu,2000);
  }
}

