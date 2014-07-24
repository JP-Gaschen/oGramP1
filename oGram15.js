var gNbPhrasesOk;
var gNbMotsOk;
var gNbMotsKo;
var gNbErrors = 0;
var gNbRejoues = 0;
var gDemoFrame;
var gX0,gY0;
var gPlay_html5_audio = false;
var gIntervalId;
var gNglide;
var gNbRate = 0;
var gPhase = 1;
var gLeftPos = 15;

var gIgnoreClick = false;
var gAffTxt = [[]];
var gSavedAffTxt = [[]];
var gInnerHtmlSaved = [[]];
var gPhase2Delay = 1000;
var gCligneDelay = 250;
var gAbstractions01 = [];
var gAbstractions03 = [];

var adjOldText = "";
var adjWindow;
var adjInd = 0;
var adjFullText = [];

var sp = ["","s","p"];
var spmf = ["","ms","fs","mp","fp"];

var gSuffixTd;
var gDemoLigne;

var gSuffixStyle = "position:absolute;font-size:22px;height:31px;line-height:24px;text-align:center;width:36px;background-color:#cc60ff;";
var gPrefixStyle = "position:absolute;font-size:22px;height:31px;line-height:24px;";


function cligne(obj,n,cmd) {
  gCligne = 0;
  //alert("cligne n" + n);
  window.setTimeout(function() {hideCligne(obj,n,cmd)},gCligneDelay);
}
function hideCligne(obj,n,cmd) {
  //alert("hide " + gCligne);
  if (n <= 0) {
    //alert("stop cligne " + cmd);
    obj.style.visibility = 'visible';
    eval(cmd);
  } else {
    obj.style.visibility = 'hidden';
    window.setTimeout(function () {showCligne(obj,n,cmd)},gCligneDelay);
  }
}
function showCligne(obj,n,cmd) {
  //alert("show " + gCligne);
  if (n <= 0) {
    obj.style.visibility = 'visible';
  } else {
    
    obj.style.visibility = 'visible';
    window.setTimeout(function() {hideCligne(obj,n-1,cmd)},gCligneDelay);
  }
}  
function init() {
  //console.log("init 15");
  gAffTxt= [["x"],["y"],["","","",""],["","","",""]];
  gSavedAffTxt= [["x"],["y"],["","","",""],["","","",""]];
  gInnerHtmlSaved = [["","","",""],["","","",""]];
  gPhase = 1;

  parent.og.document.getElementById("titre").innerHTML = parent.ba.titre;
  parent.og.document.getElementById("module").innerHTML =  parent.ba.module;

  if (parent.gPhase == 1) {
    gPhase = 1
    var pc = parent.corpus;
    var pcd = pc.corData;
    pc.iData = 0;
    pc.jData = 0;
    gX0 = 600;
    gY0 = 600;
    gNbPhrasesOk = 0;
    gNbMotsOk = 0;
    gNbMotsKo = 0;
    gLeftPos = 42;
  
  //top.moveTo(0,0); 
  //top.resizeTo(1280,800); 

    clear_all();

    // abstractions pour les noms
    //montreAbstractions01(0);
    //montreAbstractions01(1);
    
    frames[2].document.getElementById('Sp').innerHTML = "un";
    frames[3].document.getElementById('Sp').innerHTML = "une";
    frames[4].document.getElementById('Sp').innerHTML = "des";
    frames[5].document.getElementById('Sp').innerHTML = "des";
       
    //animate1 (id,widthF,leftD,widthD,duration)
    animate1("p",120,133,124,3000);
    animate1("s",120,10,123,3000);

    animate3("fp",120,630,124,3000);
    animate3("mp",120,509,121,3000);
    animate3("fs",120,388,121,3000);
    animate3("ms",120,265,123,3000);
  
  
    //frames[0].registerClick2 ("#00ff00");
    //frames[1].registerClick2 ("#00ff00");
  
  // abstractions déjà vues pour les adjectifs
    montreAbstractions03(0,parent.ba.serie - 1);
    montreAbstractions03(1,parent.ba.serie - 1);
    montreAbstractions03(2,parent.ba.serie - 1);
    montreAbstractions03(3,parent.ba.serie - 1);
  
  
  
  
    if (parent.isDemo){
       parent.ba.hideCarres();
       parent.enableBouton('displayMenu','menuC.gif');
       window.setTimeout(startDemo,5000);
    } else {
      
      parent.enableBouton('Bconsigne','consigneC.gif');
      parent.enableBouton('Breecouter','ecouterC.gif');
      parent.enableBouton('displayMenu','menuC.gif');
      
    //parent.ba.showCarres(pc.nPhase1,pcd.length-pc.nPhase1);
    }
  } else {
    gNbPhrasesOk = 0;
    gNbMotsOk = 0;
    gNbMotsKo = 0;
    gPhase = 2;
    parent.corpus.iData = parent.corpus.nPhase1;
    parent.corpus.jData = 0;
    gDemoFrame = null;
    gLeftPos = 15;
    
    montreAbstractions01(0);
    montreAbstractions01(1);
    frames[0].registerClick2 ("#00ff00");
    frames[1].registerClick2 ("#00ff00");
    
    montreAbstractions03(0,parent.ba.serie);
    montreAbstractions03(1,parent.ba.serie);
    montreAbstractions03(2,parent.ba.serie);
    montreAbstractions03(3,parent.ba.serie);
    frames[7].registerClick2 ("#cc60ff");
    frames[8].registerClick2 ("#cc60ff");
    frames[9].registerClick2 ("#cc60ff");
    frames[10].registerClick2 ("#cc60ff");
     // effacer les lignes versticales
    frames[8].frameElement.style.left = '0px';
    frames[9].frameElement.style.left = '0px';
    frames[10].frameElement.style.left = '0px';
    frames[8].frameElement.style.width = '70px';
    frames[9].frameElement.style.width = '70px';
    frames[10].frameElement.style.width = '70px';
    
    
    
    gIgnoreClick = false;
    gNbPhrasesOk=0;
   
    parent.enableBouton('displayMenu','menuC.gif');
    parent.enableBouton('Bconsigne','consigneC.gif');
    parent.enableBouton('Breecouter','ecouterC.gif');
   
  }
  setTimeout(diffusePhrase,3000);
}


function clear_all() {
  //frames = document.getElementsByTagName("IFRAME");
  myframes = window.frames;
  ////console.log(myframes.length);
  for (var i=0; i<myframes.length; i++){
    ////console.log("frame " + i);
    myframes[i].document.getElementById('Sp').innerHTML = "";
  }
  document.getElementById('phrase').innerHTML = "";
  
}

function clearBGC() {
  myframes = window.frames;
  for (var i=0; i<myframes.length; i++){
    myframes[i].document.getElementById('P1').style.backgroundColor = "rgb(255,255,255)";
    }
}

function copyArray(src, tgt) {
  for (var i=0; i < src.length; i++) {
    for (var j=0; j < src[i].length; j++) {
      tgt[i][j] = src[i][j];
    }
  }
}

function saveStartState()  {
  copyArray(gAffTxt,gSavedAffTxt);
  //gSavedAffTxt = gAffTxt.clone();
  //console.log("saveStart " + gSavedAffTxt.toString());
  for (var i=1; i<5; i++){
    var fName2 = "F2" + spmf[i];
    gInnerHtmlSaved[0][i-1] =frames[i+1].document.getElementById('Sp').innerHTML;
    //console.log (fName2 + " " + gInnerHtmlSaved[0][i-1] );
    var fName3 = "F3" + spmf[i];
    gInnerHtmlSaved[1][i-1] =frames[i+6].document.getElementById('Sp').innerHTML;
    //console.log (fName3 + " " + gInnerHtmlSaved[1][i-1] );
    
  }
}
function restoreStartState()  {
  //console.log("savedState " + gSavedAffTxt.toString());
  //console.log("toRestoreState " + gAffTxt.toString());
  copyArray(gSavedAffTxt,gAffTxt);
  //console.log("restoredState " + gAffTxt.toString());
  
  for (var i=1; i<5; i++){
    var fName2 = "F2" + spmf[i];
    frames[i+1].document.getElementById('Sp').innerHTML = gInnerHtmlSaved[0][i-1];
    //console.log (fName2 + " " + gInnerHtmlSaved[0][i-1] );
    var fName3 = "F3" + spmf[i];
    frames[i+6].document.getElementById('Sp').innerHTML = gInnerHtmlSaved[1][i-1];
    //console.log (fName3 + " " + gInnerHtmlSaved[1][i-1] );
    
  }
}
function diffusePhrase() {
  //console.log("diffusePhrase");
  saveStartState();
  
  parent.disableBouton('Bvalider','validerD.gif');

  rediffusePhrase();
}
function rediffusePhrase() {
  var fname;
  var dp = "" + parent.ba.program;
  //while (dp.length < 2) {dp = "0" + dp;}
  var da = "" + parent.ba.activity;
  //while (da.length < 2) {da = "0" + da;}
  
  var dirn = "sonsP" + dp + "A" + da;
  //alert(dirn);
  var pc = parent.corpus;
  var pcd = pc.corData;
  ////console.log(pcd);
  
  gIgnoreClick = false;


  var pn = pc.iData + 1;
  if (gPhase == 2) pn = pc.iData + 1 - pc.nPhase1;
  var ds = "" + parent.ba.serie;
  while (ds.length < 2) {ds = "0" + ds;}
  var sn = "" + pn;
  while (sn.length < 2) {sn = "0" + sn;}
  //alert(sn);
  if (parent.isDemo) fname = dirn + "/" + parent.audioType + "/" + "demo" + "d" + sn;
  else fname = dirn + "/" + parent.audioType + "/" + "s" + ds + "p" + gPhase + "d" + sn;
  //console.log(fname);
  parent.play_sound(fname);
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

function animate1 (id,widthF,leftD,widthD,duration) {
  //console.log("animate1 " + id);
  ////console.log($("#"+id).position().left);
  var animF = {};
  //animF["left"] = "" + left + "px";
  animF["width"] = "" + widthF + "px";
  ////console.log(anim['left']);
  //$("#"+id).each(function() {
  //  //console.log(this.innerHTML);
  //  });
  var didF = "#F1"+id;
  $(didF).animate(animF,duration);
  
  var animD = {};
  animD["left"] = "" + leftD + "px";
  animD["width"] = "" + (widthD) + "px";

  ////console.log(anim['left']);
  //$("#"+id).each(function() {
  //  //console.log(this.innerHTML);
  //  });
  var didD = ".box1"+id;
  $(didD).animate(animD,duration);
  
  //$(did).animate({left:10},2000);
} 

function animate3 (id,widthF,leftD,widthD,duration) {
  ////console.log("animate2 " + id);
  ////console.log($("#"+id).position().left);
  var animF = {};
  //animF["left"] = "" + left + "px";
  animF["width"] = "" + widthF + "px";
  animF["height"] = "-=10px";
  ////console.log(anim['left']);
  //$("#"+id).each(function() {
  //  //console.log(this.innerHTML);
  //  });
  var didF = "#F3"+id;
  $(didF).animate(animF,duration);
  
  var animD = {};
  animD["left"] = "" + leftD + "px";
  animD["width"] = "" + (widthD) + "px";
  animD["top"] = "+=10px";
  animD["height"] = "-=10px";
  ////console.log(anim['left']);
  //$("#"+id).each(function() {
  //  //console.log(this.innerHTML);
  //  });
  var didD = ".box3"+id;
  $(didD).animate(animD,duration);
  
  //$(did).animate({left:10},2000);
} 

function clear13() {
var myframes = window.frames;
  
  var frameNumbers = gPhase == 1 ?[0,1] : [2,3,4,5];
  for (var i=0; i<frameNumbers.length; i++) {
    j = frameNumbers[i];
    //console.log(" i " + i + " j " + j + " " + myframes[j].document.getElementById('Sp').innerHTML);
    myframes[j].document.getElementById('Sp').innerHTML = "";
  }
}

function auSuivant() {


  document.getElementById('phrase').innerHTML = "";
  clear13();
  var pc = parent.corpus;
  //console.log("Au suivant og... " + pc.iData);
  pc.iData += 1;
  
  gNbMotsOk = 0;
  if (gPhase == 1 && ((parent.isDemo && pc.iData < pc.corData.length) || pc.iData < pc.nPhase1)) {
  ////console.log("auSuivant 1");

    pc.jData = 0;
    diffusePhrase();
    
    if (parent.isDemo) { setTimeout(startDemo,2000);}
  } else if (gPhase == 2 && pc.iData < pc.corData.length) {
    ////console.log("auSuivant 2");
    pc.jData = 0;
    //if (gNbPhrasesOk > 8) {showResume(0,0);
    //} else {
      diffusePhrase();
    //}  
  } else if (gPhase == 2) {
    ////console.log("auSuivant 3");  // fin de phase 2
     parent.disableBouton('Bvalider','validerD.gif');
    
    var nEx = pc.corData.length - pc.nPhase1;
    var nOk = nEx - gNbRate;
    parent.boutons.pageResultats(nOk, nEx);
    //alert(nOk.toString() + " exercices réussis du premier coup sur " + nEx.toString());
    if (parent.ba.serie == 6) parent.og.location = "resumeFrame" + parent.ba.program+ parent.ba.activity + ".html?version=46";
    else setTimeout(parent.boutons.showMenu,4000);
  } else {
      ////console.log("auSuivant 4");  // fin de phase 1
      if (parent.isDemo) {
        hidePointer(); // test demo automatique
        setTimeout(parent.boutons.showMenu,2000);
      } else {
        gPhase = 2;
        gNbPhrasesOk = 0;
        
        gIgnoreClick = true;
        parent.og.document.getElementById('phrase').innerHTML = "observez";
        parent.disableBouton('Bvalider','validerD.gif');
        
      
        
        setTimeout (function() {addSuffix(0,0);},gPhase2Delay);
        setTimeout (function() {addSuffix(0,1);},gPhase2Delay);
        setTimeout (function() {addSuffix(0,2);},gPhase2Delay);
        setTimeout (function() {addSuffix(0,3);},gPhase2Delay);
    }

  } 
}


function addSuffix(m,n) {
  
  //console.log("addSuffix  m " + m + " n " + n );
  //var t = txt.split("<br>");
  var serie = parent.ba.serie;
  var pref;
  var tSuf;
  var t = gAffTxt[3][m].split(",");
  var suf = spmfSuffix03[serie][m];
  

  var newTxt = gAbstractions03[m];
  frames[m+7].document.getElementById('Sp').innerHTML = newTxt;
  var newTxt = "";
  for (var i=0; i<t.length - 1; i++) {
    var topPos = 33*i;
    if (suf == "") {
      pref = t[i];
      tSuf="&nbsp";
    } else {
      indSuf = t[i].lastIndexOf(suf);
      pref = t[i].substring(0,indSuf);
      tSuf = suf;
    }
    var w=frames[m+7].txtSize2(pref,22);
    var IdP = "Pref"+(i+1);
    var IdS = "Suff"+(i+1);
    var txt1 = "<span Id='" + IdP + "' class='prefix' style='" + gPrefixStyle + "left:1px;'>" + pref + "</span>";

    var txt2 = "<span Id='" + IdS + "' class='suffix' style='" + gSuffixStyle + "left:"+(w+3)+"px;'>" + tSuf + "</span>";
    
    newTxt += "<div style='height:33px;position:absolute;top:"+topPos+"px;'>" + txt1 + txt2 + "</div>";
  } 

  ////console.log(newTxt);
  frames[m+7].document.getElementById('Sub').innerHTML = newTxt;

  if (n == 0) {  //if (n < t.length -2) { 
    //setTimeout(function() {addSuffix(m,1,t)},gPhase2Delay);
    //setTimeout(function() {addSuffix(m,2,t)},gPhase2Delay);
    //setTimeout(function() {addSuffix(m,3,t)},gPhase2Delay);
  } else if (m < 3  && n == 3) {
        //txt2 = frames[1].document.getElementById('Sp').innerHTML;
        setTimeout (function() {addSuffix(m+1,0);}, gPhase2Delay);
        setTimeout (function() {addSuffix(m+1,1);}, gPhase2Delay);
        setTimeout (function() {addSuffix(m+1,2);}, gPhase2Delay);
        setTimeout (function() {addSuffix(m+1,3);}, gPhase2Delay);
  } else if (m == 3  && n == 3) {
    // une boucle ici ne fonctionne pas
    setTimeout (function() {cligneMots(0,0);},gPhase2Delay);
    setTimeout (function() {cligneMots(0,1);},gPhase2Delay);
    setTimeout (function() {cligneMots(0,2);},gPhase2Delay);
    setTimeout (function() {cligneMots(0,3);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,0);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,1);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,2);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,3);},gPhase2Delay);
    setTimeout (function() {cligneMots(2,0);},gPhase2Delay);
    setTimeout (function() {cligneMots(2,1);},gPhase2Delay);
    setTimeout (function() {cligneMots(2,2);},gPhase2Delay);
    setTimeout (function() {cligneMots(2,3);},gPhase2Delay);
    setTimeout (function() {cligneMots(3,0);},gPhase2Delay);
    setTimeout (function() {cligneMots(3,1);},gPhase2Delay);
    setTimeout (function() {cligneMots(3,2);},gPhase2Delay);
    setTimeout (function() {cligneMots(3,3);},gPhase2Delay);
  }
}
function cligneMots(m,n){
  //console.log("cligne m " + m + " n " + n);
  Id = 'Pref' + (n+1);
  var obj=frames[m+7].document.getElementById(Id);
  cmd = "removeMots2(" + m + "," + n + ");";
  //console.log(cmd);
  cligne(obj,3,cmd);
}
function removeMots2(m,n){
  var t = gAffTxt[3][m].split(",");
  var IdP = "Pref"+(n+1);
  var IdS = "Suff"+(n+1);
  frames[m+7].document.getElementById(IdP).style.visibility = 'hidden';
  frames[m+7].animate2(IdS,(gLeftPos));
  //if (m < 3 ) {
   //   setTimeout (function() {cligneMots(m+1,n);}, gPhase2Delay);
  // }// else if (n == 3) {
  if ( m == 3 && n == 3) {   
    // une boucle ici ne fonctionne pas
    setTimeout (function() {collapse(0,0);},gPhase2Delay);
    setTimeout (function() {collapse(1,0);},gPhase2Delay);
    setTimeout (function() {collapse(2,0);},gPhase2Delay);
    setTimeout (function() {collapse(3,0);},gPhase2Delay);
  }
  
}


function collapse(m,n) {
  //console.log("collapse m " + m + " n " + n);
  var serie = parent.ba.serie;
  var tSuf;
  var t = gAffTxt[3][m].split(",");
  var suf = spmfSuffix03[serie][m];
  var newTxt = gAbstractions03[m];
  var Id = "";
  var col2Txt = "";
  var pc = parent.corpus;

  frames[m+7].document.getElementById('Sp').innerHTML = newTxt;
  newTxt = "";
  //console.log("collapse(" + m + "," + n + ");");
  
  for (var i=0; i<t.length - 1 - n; i++) {
  
    var tPos = 33*i;
    Id = "Li"+(i+1);

    if (suf == "") {
      tSuf="&nbsp";
    } else {
      tSuf = suf;
    }
     var txt = "<span id='" + m + "' class='suffix' style='" + gSuffixStyle + "left:"+(gLeftPos)+"px;'>" + suf +"</span>";
    //tbl = "<span  style='position:absolute;left:"+(gLeftPos)+"px;text-align:center;' class='suffix'>" + tSuf +"</span>";
    
    newTxt += "<div Id='" + Id + "' style='position:absolute;height:33px;top:" + tPos + "px;'>" + txt + "</div>";
    
    
  }
  
  ////console.log(newTxt);
  
  frames[m+7].document.getElementById('Sub').innerHTML = newTxt;
  
  if (n < t.length -2) {
    frames[m+7].animate1(Id,34,2000);
    setTimeout(function() {collapse(m,n+1);},gPhase2Delay);
    } else if (m == 3) {
      var nEx = pc.corData.length - pc.nPhase1;
      var nOk = nEx - gNbRate;
      parent.boutons.pageResultats(nOk, nEx);
      setTimeout(parent.boutons.showMenu,4000);
    }
  

}

function montreAbstractions01(m) {
  //console.log("montreAbstractions0 m " + m);
  //if (m == 0 && n == 1) clear_all();
  var newTxt = "<div class='abstractions' style='visibility:hidden;margin-left:21px; margin-right:auto;'>"

  for (var i=1; i < spSuffix01.length; i++) {
   //alert("i="+i + " " + t[i]);
   var tPos = 1 + (i-1)* 33;
   suf = spSuffix01[i][m];
   if (suf == "") {suf="&nbsp"}
   
    //tbl = "<table style='vertical-align:middle;'><tr><td id='" + m + "'' class='suffix' style='width:31px;border: 1px solid #000;text-align:center'>" + suf +"</td></tr></table>";
   var txt = "<span id='" + m + "' class='suffix' style='" + gSuffixStyle + "'>" + suf +"</span>";
   
   if (suf != " ") {newTxt += "<div style='position:absolute;top:"+tPos+"px;'>" + txt + "</div>";}
  }
  newTxt += "</div>";
  
  //console.log(newTxt);
  gAbstractions01[m] = newTxt;
  //console.log(newTxt);

  frames[m].document.getElementById('Sp').innerHTML = newTxt;
  
  

}





function montreAbstractions03(m,n) {
  ////console.log("montreAbstractions0 m " + m);
  //alert("montreAbstractions03");
  //if (m == 0 && n == 1) clear_all();
  var serie = parent.ba.serie;

  var newTxt = "<div class='abstractions' style='visibility:hidden;margin-left:" + gLeftPos + "px; margin-right:auto;'>"
  for (var i=1; i <= n; i++) {
   //alert("i="+i + " " + t[i]);
   var tPos = 1 + 33*(i-1);
   suf = spmfSuffix03[i][m];
   if (suf == "") {suf="&nbsp"}
   
    var txt = "<span id='" + m + "' class='suffix' style='" + gSuffixStyle + "'>" + suf +"</span>";
   
   if (suf != " ") {newTxt += "<div style='position:absolute;top:"+tPos+"px;'>" + txt + "</div>";}
    
  }

  var tPos = 1 + n * 33;
  newTxt += "</div><div Id='Sub' style='position:absolute;top:"+tPos+"px;'></div>" ;
  ////console.log(newTxt);
  gAbstractions03[m] = newTxt;
  frames[m+7].document.getElementById('Sp').innerHTML = newTxt;
  
}


function hidePointer() {
  document.getElementById('pointerimg').style.visibility = "hidden";
}

function process_click_global(w){
 //console.log("click_global ");
  if (gIgnoreClick  && !parent.isDemo) {return;}
  if (!parent.isDemo)  parent.enableBouton('Bvalider','validerC.gif');
 //console.log('clique ' + window.name);
  var cl = parseInt(w.name.substring(5));
  var c2 = w.name.substring(6);
  
  if (gPhase == 2 && cl == 1) {return;}  // click2 pour les noms
  if (gPhase == 2 && cl == 3) {return;}  // click2 pour les adjectifs
  //console.log("process_click_global " + cl + c2);
  
  //var w1 = window.parent;
  //var top = w1.parent;
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var i = pc.iData;
  var j = pc.jData;
 
  if (i < pcd.length && j + 1 < pcd[i].length){
    //console.log("clique dans " + cl + " i " +i+ " j " + j + " length " + pcd[i].length);
    var exp1 =  pcd[i][j+1][0];
    var exp2 =  pcd[i][j+1][1];
    if (cl == exp1 && (c2.length == 1 && c2 == sp[exp2] || (c2.length == 2 && c2 == spmf[exp2]))) {

      gNbMotsOk += 1;
      var txt1 = pcd[i][0];
      var txt2 = txt1.replace(/,/g,"");
      var txt3 = txt2.replace(/-/g," ");
      var txt4 = txt3.replace(/'/g,"' ");
      var txt5 = txt4.replace(/_/g,"-");
      //alert (txt2);
      

      var txt = txt5.split(" ")[j];
      //alert (txt);
      var tbl = "<span style='line-height:22px;font-size:22px;height:33px'>" + txt + "</span>";
      var newTxt = "<div style='height:33px;'>"  + tbl + "</div>";
      document.getElementById('phrase').innerHTML += txt + " ";
      if (gPhase == 1) {
        ////console.log(" " + exp1 + " " + exp2 + " " + txt);
        if (exp1 == 1) {   // noms
          //if (gAffTxt[2][exp2-1].indexOf(txt+",") < 0) {
            w.document.getElementById('Sp').innerHTML += newTxt;
            //gAffTxt[2][exp2-1] += txt + ",";
          //}
          
        }
        if (exp1 == 3) {  // exp1 = 3 : adjectifs
          if (gAffTxt[3][exp2-1].indexOf(txt+",") < 0) {
            adjOldText = w.document.getElementById('Sub').innerHTML;
            adjWindow = w;
            adjInd = exp2 - 1;
            w.document.getElementById('Sub').innerHTML += newTxt;
            adjFullText[adjInd] = w.document.getElementById('Sub').innerHTML;
            //if (parent.ba.serie > 1 || gAffTxt[3][exp2-1] != "" )
            //  setTimeout(function(){
            //  w.document.getElementById('Sp').innerHTML = oldText;
            //},1000);
            gAffTxt[3][exp2-1] += txt + ",";
          }
        }
      }
      j += 1;
      parent.corpus.jData = j;
      if (j+1 == pcd[i].length) {
        //if (i < pc.nPhase1 && gDemoFrame){  // == 0
          if (parent.isDemo) {
             parent.boutons.valider();
          }
      } else {
        //parent.corpus.jData = j;
        if (parent.isDemo) {
          //alert("setTimeout");
          setTimeout(startDemo,1000);
        }
        //alert(document.getElementById('Sp').innerHTML);
        //alert (pcd[i][0].split(" ")[j-2]);
        
      }
    } else {
      gNbMotsKo += 1;
      
    }
  } else  {
    gNbMotsKo += 1;
  }
  //window.setTimeout(clearBGC,400);
}

function process_click2_global(w,ligne){
  //console.log("click2_global " + ligne);

  if (gIgnoreClick && !parent.isDemo) {return;}
 
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var i = pc.iData;
  var j = pc.jData;
  var cl = parseInt(w.name.substring(5));
  if (i < pcd.length && j + 1 < pcd[i].length){
    //console.log("clique dans " + cl + " " +i+ " " + j + " " + pcd[i].length);
    var exp1 =  pcd[i][j+1][0];
    var exp2 =  pcd[i][j+1][1];
    var exp3 =  pcd[i][j+1][2];
    var c2 = w.name.substring(6);
    var col;
    if (cl == 1) {col = sp.indexOf(c2);}  // noms
    else {col = spmf.indexOf(c2);}  // adjectifs
     
     
    //console.log("1 " + exp1 + " " + cl);
    //console.log("2 " + exp2 + " " + col);
    //console.log("3 " + exp3 + " " + ligne);

    if (cl == exp1 && col == exp2 && ligne == exp3) {
      gNbMotsOk += 1;
      var txt1 = pcd[i][0];
      var txt2 = txt1.replace(/,/g,"");
      var txt3 = txt2.replace(/-/g," ");
      var txt4 = txt3.replace(/'/g,"' ");
      var txt5 = txt4.replace(/_/g,"-");
      //alert (txt2);
      

      var txt = txt5.split(" ")[j];
      //alert (txt);
      
      document.getElementById('phrase').innerHTML += txt + " ";
      
      j += 1;
       parent.corpus.jData = j;
      if (j+1 == pcd[i].length) {
        
          //gIgnoreClick = true;
          if (parent.isDemo) {
            setTimeout(parent.boutons.valider,1500);
          }

      } else {
          //parent.corpus.jData = j;
          
        //alert(document.getElementById('Sp').innerHTML);
        //alert (pcd[i][0].split(" ")[j-2]);
        if (parent.isDemo) {
          setTimeout(startDemo,1500);
        }
      }
    } else {
      gNbMotsKo += 1;
      
    }
  } else gNbMotsKo += 1;

  return false;
}
function startDemo(){
  //alert("og start demo")
  gIgnoreClick = true;
 
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var i = pc.iData;
  var j = pc.jData;
  if (i < pcd.length){
    var exp1 = pcd[i][j+1][0];
    var exp2 = pcd[i][j+1][1];
    var exp3 = pcd[i][j+1][2];
    //alert(exp);
    var r;
    var x2;
    var y2;
    if (exp1 == 1) {  //noms 
      gDemoFrame = document.getElementById("F" + exp1 + sp[exp2]);
      r = gDemoFrame.getBoundingClientRect(); 
      
      x2 = (r.left + r.right)/2;
      y2 = (r.top + r.bottom)/2; 
    } else {
      gDemoFrame = document.getElementById("F" + exp1 + spmf[exp2]);
      r = gDemoFrame.getBoundingClientRect();
      x2 = (r.left + r.right)/2;
      y2 = (r.top + r.bottom)/2; 
    }
    //alert(f);
    //alert(f.contentWindow.innerHeight);
    
  
    
    //console.log(x2);
    //console.log(y2);
    StartGlide(gX0,gY0,x2,y2);
  }
}


function StartGlide(x1,y1,x2,y2)
{
    var p = document.getElementById("pointerimg");
    //console.log("startglide " + p.style.left);
    p.style.left = x1.toString() + "px";
    p.style.top = y1.toString() + "px";
    p.style.visibility = "visible";
    //alert("startglide2");
    gX0 = x2;
    gY0 = y2;
    gNglide = 1;
    gIntervalId = window.setInterval("Glide('" + x1 + "','" + y1 + "','" + x2 + "','" + y2 + "')",4);
}
function Glide(x1,y1,x2,y2)
{
    //alert("glide "+gNglide);
    var p =document.getElementById("pointerimg");
    var xn = Math.round((gNglide*(x2 - x1))/100.0) + parseInt(x1);
    var yn = Math.round((gNglide*(y2 - y1))/100.0) + parseInt(y1);
    gNglide += 1;
    if (gNglide > 99) {
    //alert(d);
        //p.style.visibility = "hidden";
        window.clearInterval(gIntervalId);
        //alert(gDemoFrame);
        var cl = parseInt(gDemoFrame.name.substring(5));
        gDemoFrame.contentWindow.process_click(1);
    }else{
      p.style.left =xn.toString() + "px";
      p.style.top = yn.toString() + "px";
    }
}
