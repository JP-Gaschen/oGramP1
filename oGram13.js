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

var gIgnoreClick = false;
var gInnerHtmlSaved = [[]];

var gPhase2Delay = 1000;
var gCligneDelay = 250;
var gAbstractions0 = [];
var gAffTxt = [[]];
var gSavedAffTxt = [[]];
var sp = ["","s","p"];




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
  //console.log("init .js");

  gAffTxt= [[],["",""],["",""]];
  gSavedAffTxt= [[],["",""],["",""]];
  gInnerHtmlSaved = [["",""],["",""]];

  parent.og.document.getElementById("titre").innerHTML =  parent.ba.titre;
  parent.og.document.getElementById("module").innerHTML =  parent.ba.module;

  if (parent.gPhase == 1) {
    gPhase = 1;
    var pc = parent.corpus;
    var pcd = pc.corData;
    pc.iData = 0;
    pc.jData = 0;
    gX0 = 600;
    gY0 = 600;
    gNbPhrasesOk = 0;
    gNbMotsOk = 0;
    gNbMotsKo = 0;
  
  //top.moveTo(0,0); 
  //top.resizeTo(1280,800); 

    //$(".textinput").css("visibility","hidden");
    montreAbstractions0(0,parent.ba.serie - 1);
    montreAbstractions0(1,parent.ba.serie - 1);

    //animate1 (id,widthF,leftD,widthD,duration)
    animate1("p",120,133,124,3000);
    animate1("s",120,10,123,3000);
    
    if (parent.isDemo){
       parent.ba.hideCarres();
       parent.enableBouton('displayMenu','menuC.gif');
       window.setTimeout(startDemo,2000);
    } else {
      parent.enableBouton('displayMenu','menuC.gif');
      parent.enableBouton('Bvalider','validerC.gif');
      parent.enableBouton('Bconsigne','consigneC.gif');
      parent.enableBouton('Breecouter','ecouterC.gif');
    //parent.ba.showCarres(pc.nPhase1,pcd.length-pc.nPhase1);
    }
  } else {  // phase 2
    $("#phrase").css("color", "#aaaaaa");
    parent.enableBouton('displayMenu','menuC.gif');
    parent.enableBouton('Bvalider','validerC.gif');
    parent.enableBouton('Bconsigne','consigneC.gif');
    parent.enableBouton('Breecouter','ecouterC.gif');
    gNbPhrasesOk = 0;
    gNbMotsOk = 0;
    gNbMotsKo = 0;
    gPhase = 2;
    parent.corpus.iData = parent.corpus.nPhase1;
    parent.corpus.jData = 0;
    gDemoFrame = null;
    montreAbstractions0(0,parent.ba.serie);
    montreAbstractions0(1,parent.ba.serie);
    
    
    
    
    frames[0].registerClick2 ("#00ff00");
    frames[1].registerClick2 ("#00ff00");
    frames[1].frameElement.style.left = '0px';
  }
  diffusePhrase();
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


function clear_all() {
  //frames = document.getElementsByTagName("IFRAME");
  myframes = window.frames;
  //console.log(myframes.length);
  for (var i=0; i<myframes.length; i++){
    $(myframes[i].document).ready(function(){
//console.log(i);
      myframes[i].document.getElementById('Sp').innerHTML = "";
    });
  }
  if (gPhase==2) document.getElementById('phrase').innerHTML = "";
  
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
  for (var i=1; i<3; i++){
    var fName1 = "F1" + sp[i];
    gInnerHtmlSaved[0][i-1] =frames[i-1].document.getElementById('Sp').innerHTML;
    //console.log (fName2 + " " + gInnerHtmlSaved[0][i-1] );
    var fName2 = "F2" + sp[i];
    gInnerHtmlSaved[1][i-1] =frames[i+1].document.getElementById('Sp').innerHTML;
    //console.log (fName3 + " " + gInnerHtmlSaved[1][i-1] );
    
  }
}
function restoreStartState()  {
  //console.log("savedState " + gSavedAffTxt.toString());
  //console.log("toRestoreState " + gAffTxt.toString());
  copyArray(gSavedAffTxt,gAffTxt);
  //console.log("restoredState " + gAffTxt.toString());
  
  for (var i=1; i<3; i++){
    var fName1 = "F1" + sp[i];
    frames[i-1].document.getElementById('Sp').innerHTML = gInnerHtmlSaved[0][i-1];
    //console.log (fName2 + " " + gInnerHtmlSaved[0][i-1] );
    var fName2 = "F2" + sp[i];
    frames[i+1].document.getElementById('Sp').innerHTML = gInnerHtmlSaved[1][i-1];
    //console.log (fName3 + " " + gInnerHtmlSaved[1][i-1] );
    
  }
}

function diffusePhrase() {
  //console.log("diffusePhrase");
  saveStartState();
  if (gPhase==2) $("#phrase").css("color", "#aaaaaa");
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
  //console.log("continuer13");
  //console.log($('.hidden',frames[0].document).length);
  if ($('.hidden',frames[0].document).length) {
    $('.hidden:first',frames[0].document).show();
    $('.hidden:first',frames[0].document).removeClass("hidden");
    if ($('.hidden',frames[0].document).length == 0) document.getElementById("Bcontinuer").innerHTML = 'Quitter';
    } else {
      parent.ba.init();
      parent.og.location = 'menu.html?version=45';
      
    }
 
  frames['Resume2'].window.scrollTo(0,3000); //window.scrollTo(0,3000); //
}

function clear12() {
var myframes = window.frames;
  
  var frameNumbers = [2,3];
  for (var i=0; i<frameNumbers.length; i++) {
    j = frameNumbers[i];
    //console.log(" i " + i + " j " + j + " " + myframes[j].document.getElementById('Sp').innerHTML);
    myframes[j].document.getElementById('Sp').innerHTML = "";
  }
}

function auSuivant() {
  //console.log("Au suivant og...");

  if (gPhase == 2) document.getElementById('phrase').innerHTML = "";
  clear12();
  var pc = parent.corpus;
  pc.iData += 1;
  
  gNbMotsOk = 0;
  gNbMotsKo = 0;
  if (gPhase == 1 && ((parent.isDemo && pc.iData < pc.corData.length) || pc.iData < pc.nPhase1)) {
    //console.log("auSuivant 1");
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
      alert(nOk.toString() + " exercices réussis du premier coup sur " + nEx.toString());
      if (parent.ba.serie == 8)parent.og.location = "resumeFrame" + parent.ba.program+ parent.ba.activity + ".html?version=45";
    else setTimeout(parent.boutons.showMenu,2000);
  } else {
    //console.log("auSuivant 4");  // fin de phase 1
    if (parent.isDemo) {
      hidePointer(); // test demo automatique
      setTimeout(parent.boutons.showMenu,2000);
    } else {
      gPhase = 2;
      gNbPhrasesOk = 0;
      gIgnoreClick = true;
      document.getElementById('phrase').innerHTML = "observez";
      parent.disableBouton('Bvalider','validerD.gif');
      
      if (gAffTxt[1][0] == "") {
        setTimeout (function() {addSuffix(1,0);},gPhase2Delay);  // ligne 8
      } else {
        setTimeout (function() {addSuffix(0,0);},gPhase2Delay);
        setTimeout (function() {addSuffix(0,1);},gPhase2Delay);
        setTimeout (function() {addSuffix(0,2);},gPhase2Delay);
        setTimeout (function() {addSuffix(0,3);},gPhase2Delay);
      }
     }
  } 
}

function montreTxt1(m) {
  //console.log('montreTxt1');
  var serie = parent.ba.serie;
  var t = gAffTxt[1][m].split(",");
  
  var newTxt = "<div>";

  for (var i=0; i<t.length - 1; i++) {
    var topPos = 20*i + (serie-1) * 20;
    var tbl = "<table  style='position:absolute;top:"+topPos+"px;vertical-align:middle;'><tr><td>" + t[i] + "</td></tr></table>";
    newTxt += "<div><span style='line-height:20px;'>"  + tbl + "</span></div>";
    
    
  }
  newTxt +=  "</div>";
  //console.log(newTxt);
  frames[m].document.getElementById('Sp').innerHTML = newTxt;
}

function montreTxt2(m) {
  //console.log('montreTxt2');
  var serie = parent.ba.serie;
  var t = gAffTxt[2][m].split(",");
  
  var newTxt = "<div>";

  for (var i=0; i<t.length - 1; i++) {
    var topPos = 20*i + (serie-1) * 20;
    var tbl = "<table  style='position:absolute;top:"+topPos+"px;vertical-align:middle;font-size:34px;'><tr><td>" + t[i] + "</td></tr></table>";
    newTxt += "<div><span style='line-height:20px;'>"  + tbl + "</span></div>";
    
    
  }
  newTxt +=  "</div>";
  //console.log(newTxt);
  frames[m+2].document.getElementById('Sp').innerHTML = newTxt;
}

function addSuffix(m,n) {
  //alert("addSuffix  m " + m + " n " + n );
  //var t = txt.split("<br>");
  var serie = parent.ba.serie;
  var pref;
  var tSuf;
  var t = gAffTxt[1][m].split(",");
  var suf = spSuffix[serie][m];
  

  //var newTxt = gAbstractions0[m] + "<div>";
  var newTxt = "<div>";

  for (var i=0; i<t.length - 1; i++) {
    var topPos = 24*i + (serie-1) * 24;
    if (suf == "") {
      pref = t[i];
      tSuf="&nbsp";
    } else {
      indSuf = t[i].lastIndexOf(suf);
      pref = t[i].substring(0,indSuf);
      tSuf = suf;
    }
    var w=frames[m].txtSize2(pref,20);
    //console.log(w);
    var IdP = "Pref"+(i+1);
    var IdS = "Suff"+(i+1);
    if (i <= n){
    
    tbl = "<table Id='" + IdP + "' style='position:absolute;top:"+topPos+"px;left:1px;vertical-align:middle'><tr style='height:20px;font-size:20px;'><td >" + pref + "</td></tr></table>\
           <table Id='" + IdS + "' style='position:absolute;top:"+topPos+"px;left:"+(w+1)+"px;vertical-align:middle'><tr style='height:20px;font-size:20px;'><td class='suffix' style='width:31px; background:#00ff00;text-align:center'>" + tSuf +"</td></tr></table>";
    ////console.log(tbl);
    } else {
      tbl = "<table  style='position:absolute;top:"+topPos+"px;vertical-align:middle'><tr><td>" + t[i] + "</td></tr></table>";
    }
    
    newTxt += "<span style='line-height:20px;font-size:20px;'>"  + tbl + "</span>";
    
  }
  newTxt +=  "</div>";
  ////console.log(newTxt);
  frames[m].document.getElementById('Sp').innerHTML = newTxt;
  $("td.suffix",frames[m].document).each(function(){
    this.style.backgroundColor = "#00ff00"; 
  });
  if (n < t.length -2) { 
    //setTimeout(function() {addSuffix(m,n+1,t)},gPhase2Delay);
  } else if (m == 0) {
        //txt2 = frames[1].document.getElementById('Sp').innerHTML;
        setTimeout (function() {addSuffix(1,0);}, gPhase2Delay);
        setTimeout (function() {addSuffix(1,1);}, gPhase2Delay);
        setTimeout (function() {addSuffix(1,2);}, gPhase2Delay);
        setTimeout (function() {addSuffix(1,3);}, gPhase2Delay);
  } else if (gAffTxt[1][0] == "") {   // ligne 8
    setTimeout (function() {cligneMots(1,0);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,1);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,2);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,3);},gPhase2Delay); 
  } else {
    setTimeout (function() {cligneMots(0,0);},gPhase2Delay);
    setTimeout (function() {cligneMots(0,1);},gPhase2Delay);
    setTimeout (function() {cligneMots(0,2);},gPhase2Delay);
    setTimeout (function() {cligneMots(0,3);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,0);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,1);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,2);},gPhase2Delay);
    setTimeout (function() {cligneMots(1,3);},gPhase2Delay);
  }
}
function cligneMots(m,n){
  var IdP = 'Pref' + (n+1);
  var obj=frames[m].document.getElementById(IdP);
  cmd = "removeMots2(" + m + "," + n + ");";
  //alert(cmd);
  cligne(obj,3,cmd);
}
function removeMots2(m,n){
  var IdP = 'Pref' + (n+1);
  var IdS = "Suff"+(n+1);
  frames[m].document.getElementById(IdP).style.visibility = 'hidden';
  frames[m].animate2(IdS);

  if (gAffTxt[1][0] == "") {
      setTimeout (function() {collapse(1,0);},gPhase2Delay);  // ligne 8
  } else {
      setTimeout (function() {collapse(0,0);},gPhase2Delay);
      setTimeout (function() {collapse(1,0);},gPhase2Delay);
  }
  
}


function collapse(m,n) {
  var serie = parent.ba.serie;
  var tSuf;
  var t = gAffTxt[1][m].split(",");
  var suf = spSuffix[serie][m];
  var newTxt = gAbstractions0[m];
  var Id = "";
  var col2Txt = "";

  
  for (var i=0; i<t.length - 1 - n; i++) {
  
    var topPos = 24*i + (serie - 1)* 24;
    Id = "Li"+(i+1);

    if (suf == "") {
      tSuf="&nbsp";
    } else {
      tSuf = suf;
    }
    
    col2Txt += "<table Id='" + Id + "' style='position:absolute;top:"+topPos+"px;left:40px;vertical-align:middle'><tr><td  class='suffix' style='width:31px; background:#00ff00;text-align:center;line-height:20px;font-size:20px;'>" + tSuf +"</td></tr></table>";
    
    
    
  }
  newTxt += "<div>";
  
  newTxt += "<span style='width:31px;line-height:24px;'>" + col2Txt + "</span>";
  newTxt += "</div>";
  ////console.log(newTxt);
  
  frames[m].document.getElementById('Sp').innerHTML = newTxt;
  $("td.suffix",frames[m].document).each(function(){

    this.style.backgroundColor = "#00ff00"; 
  });
  if (n < t.length -2) { 
    frames[m].animate1(Id,2000);
    setTimeout(function() {collapse(m,n+1);},gPhase2Delay);
  } else if (m == 1) {

    setTimeout(parent.boutons.showMenu,2000);
    
  }
  

}
function montreAbstractions0(m,n) {
  //console.log("montreAbstractions0 m " + m);
  //if (m == 0 && n == 1) clear_all();
  var newTxt = "<div class='abstractions' style='visibility:hidden;margin-left:25px; margin-right:auto;line-height: 20px;'><span style='width:31px; font-size:20px;text-align:center;vertical-align:middle;'>";
  for (var i=1; i <= n; i++) {
   //alert("i="+i + " " + t[i]);
   suf = spSuffix[i][m];
   if (suf == "") {suf="&nbsp"}
   
    //tbl = "<table style='vertical-align:middle;'><tr><td id='" + m + "'' class='suffix' style='width:31px;border: 1px solid #000;text-align:center'>" + suf +"</td></tr></table>";
    tbl = "<table><tr><td id='" + m + "' class='suffix' style='width:31px;'>" + suf +"</td></tr></table>";
  // tbl = "<table width='12px' height='12px' style='border: 1px solid #000;background:#00ff00'><tr><td style='width:12px;align:center'>" + suf +"</td></tr></table>";
   if (suf != " ") {newTxt += "<span> " + tbl + " </span>";}
  }
  newTxt += "</span></div>";
  //console.log(newTxt);
  gAbstractions0[m] = newTxt;
  frames[m].document.getElementById('Sp').innerHTML = newTxt;
  $("td.suffix",frames[m].document).each(function(){

    this.style.backgroundColor = "#00ff00"; 
  });

}



function hidePointer() {
  document.getElementById('pointerimg').style.visibility = "hidden";
}

function process_click_global(w){
  if (gIgnoreClick  && !parent.isDemo) {return;}
  if (!parent.isDemo) {
    if (gPhase==1) parent.enableBouton('Bvalider','validerC.gif');
  }
  //console.log('clique ' + window.name);
  var cl = parseInt(w.name.substring(5));
  var c2 = w.name.substring(6);
  
  //console.log(" " + cl + c2);
  if (gPhase == 2 && cl == 1) {return;}  // click2 pour les noms
  //var w1 = window.parent;
  //var top = w1.parent;
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var i = pc.iData;
  var j = pc.jData;
  //console.log("click_global j=",j);
 
  if (i < pcd.length && j+1 < pcd[i].length){
    //alert("clique dans " + cl + " " +i+ " " + j + " " + pcd[i].length);
    var exp1 =  pcd[i][j+1][0];
    var exp2 =  pcd[i][j+1][1];
    if (cl == exp1 && c2 == sp[exp2]) {
      gNbMotsOk += 1;
      var txt1 = pcd[i][0];
      var txt2 = txt1.replace(/,/g,"");
      var txt3 = txt2.replace(/-/g," ");
      var txt4 = txt3.replace(/'/g,"' ");
      var txt5 = txt4.replace(/_/g,"-");
      //console.log(txt5);
      

      var txt = txt5.split(" ")[j];
      //console.log( w.document.getElementById('Sp').innerHTML);
      var tbl = "<table  style='vertical-align:middle'><tr><td>" + txt + "</td></tr></table>";
      var newTxt = "<div><span style='line-height:20px;font-size:20px;'>"  + tbl + "</span></div>";
      //var newTxt = "<span style='line-height:16px;'>, "  + txt + "</span>";
      //console.log(newTxt);
      if (gPhase==2) document.getElementById('phrase').innerHTML += txt + " ";
      //if (gPhase == 1) {
        ////console.log(" " + exp1 + " " + exp2 + " " + txt);
        if (exp1 == 1) {  // nom
          if (gAffTxt[1][exp2-1].indexOf(txt+",") < 0) {
            if (gPhase == 1) w.document.getElementById('Sp').innerHTML += newTxt;
            
            gAffTxt[1][exp2-1] += txt + ",";
          }
        }
        if (exp1 == 2) {  // determinant
          w.document.getElementById('Sp').innerHTML = newTxt;
        }
      //}
      j += 1;
      parent.corpus.jData = j;
      if (j+1 == pcd[i].length) {
        if (parent.isDemo){  // == 0
          setTimeout(auSuivant,1500);
        } else {
          //gIgnoreClick = true;
         
          setTimeout(hidePointer,1000);
          
          if (parent.isDemo) {
            gDemoFrame = null;
            gNbPhrasesOk = 0;
          }
        }
      } else {
          //parent.corpus.jData = j;
          if (parent.isDemo) {
            //alert("setTimeout");
            var toId = setTimeout(startDemo,1000);
            }
        //alert(document.getElementById('Sp').innerHTML);
        //alert (pcd[i][0].split(" ")[j-2]);
        
        }
    } else {
      gNbMotsKo += 1;
    }
  } else  gNbMotsKo += 1;
  
  //window.setTimeout(clearBGC,400);
}
function process_click2_global(w,ligne){
  //console.log("click2_global "  + ligne);
  if (!parent.isDemo) {
    if (gPhase==1) parent.enableBouton('Bvalider','validerC.gif');
    
  }
  if (gIgnoreClick) {return;}
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var i = pc.iData;
  var j = pc.jData;
  //console.log("click2_global j=",j);
  var cl = parseInt(w.name.substring(5));
  if (i < pcd.length && j+1 < pcd[i].length){
    //console.log("clique dans " + cl + " " +i+ " " + j + " " + pcd[i].length);
    var exp1 =  pcd[i][j+1][0];
    var exp2 =  pcd[i][j+1][1];
    var exp3 =  pcd[i][j+1][2];
    var c2 = w.name.substring(6);
    var col =sp.indexOf(c2); 
    //alert("1 " + exp1 + " " + cl);
    //alert("2 " + exp2 + " " + col);
    //alert("3 " + exp3 + " " + ligne);
    if (cl == exp1 && col == exp2 && ligne == exp3) {
      gNbMotsOk += 1;
      var txt1 = pcd[i][0];
      var txt2 = txt1.replace(/,/g,"");
      var txt3 = txt2.replace(/-/g," ");
      var txt4 = txt3.replace(/'/g,"' ");
      var txt5 = txt4.replace(/_/g,"-");
      //console.log(txt5);
      

      var txt = txt5.split(" ")[j];
      //console.log (txt);
      if (exp1 == 1) {  // nom
        //console.log(gAffTxt[1][exp2-1]);
        if (gPhase==2) document.getElementById('phrase').innerHTML += txt + " ";
        else if (gAffTxt[1][exp2-1].indexOf(txt+",") < 0) gAffTxt[1][exp2-1] += txt + ",";
      }
            
      j += 1;
      parent.corpus.jData = j;
      if (j+1 == pcd[i].length) {
        
          //gIgnoreClick = true;
      
          setTimeout(hidePointer,1000);
          clear12();
          $("#phrase").css("color", "#000000");
          setTimeout(function() {$("#phrase").css("color", "#aaaaaa");},200);
          setTimeout(function() {$("#phrase").css("color", "#000000");},400);
          setTimeout(function() {$("#phrase").css("color", "#aaaaaa");},600);
          setTimeout(function() {$("#phrase").css("color", "#000000");},800);
          setTimeout(function() {parent.enableBouton('Bvalider','validerC.gif');},200);
        
      } else {
          //parent.corpus.jData = j;
          
        //alert(document.getElementById('Sp').innerHTML);
        //alert (pcd[i][0].split(" ")[j-2]);
        
        }
    } else {
      gNbMotsKo += 1;
      
    }
  } else  gNbMotsKo += 1;
  //console.log("ko=",gNbMotsKo);
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
    var exp1 =  pcd[i][j+1][0];
    var exp2 =  pcd[i][j+1][1];
    //alert(exp);
    gDemoFrame = document.getElementById("F" + exp1 + sp[exp2]);
    //alert(f);
    //alert(f.contentWindow.innerHeight);
    var r = gDemoFrame.getBoundingClientRect(); 
  
    var x2 = (r.left + r.right)/2;
    var y2 = (r.top + r.bottom)/2;
    //alert(x2);
    //alert(y2);
    StartGlide(gX0,gY0,x2,y2);
  }
}


function StartGlide(x1,y1,x2,y2)
{
    var p = document.getElementById("pointerimg");
    //alert("startglide1 " + p.style.left);
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
        gDemoFrame.contentWindow.process_click(1);
    }else{
      p.style.left =xn.toString() + "px";
      p.style.top = yn.toString() + "px";
    }
}
