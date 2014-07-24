var gNbPhrasesOk;
var gNbMotsOk;
var gNbMotsKo;
var gNbErrors = 0;
var gNbRejoues = 0;
var gDemoFrame;
var gX0,gY0;

var gIntervalId;
var gNglide;

var gNbRate = 0;
var gPhase = 1;
var gIgnoreClick = false;
var gInfoCompl = false;

function init() {
  //console.log("init 11");
  var pc = parent.corpus;
  var pcd = pc.corData;
  pc.iData = 0;
  pc.jData = 0;
  gX0 = 600;
  gY0 = 600;
  gNbPhrasesOk = 0;
  gNbMotsOk = 0;
  gNbMotsKo = 0;
  
  parent.og.document.getElementById("titre").innerHTML =  parent.ba.titre;
  parent.og.document.getElementById("module").innerHTML =  parent.ba.module;
  //top.moveTo(0,0); 
  //top.resizeTo(1280,800); 
  
  
  clear_all();
  
  
  diffusePhrase();
  
  
  
  
  if (parent.isDemo){
     parent.ba.hideCarres();
     window.setTimeout(startDemo,2000);
  } else {
 
    parent.enableBouton('Bconsigne','consigneC.gif');
    parent.enableBouton('Breecouter','ecouterC.gif');
    parent.enableBouton('displayMenu','menuC.gif');
    
    //parent.ba.showCarres(pcd.length,0);
  }
    //myframes = window.frames;
    //myframes[3].document.getElementById('Sp').innerHTML = "1234567890123456789012345678901234567890";
}

function diffusePhrase() {
  //console.log("diffusePhrase");
  parent.disableBouton('Bvalider','validerD.gif');
  //document.getElementById('Brejouer').style.visibility='hidden';
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
  var ds = "" + parent.ba.serie;
  while (ds.length < 2) {ds = "0" + ds;}
  var sn = "" + pn;
  while (sn.length < 2) {sn = "0" + sn;}
  //alert(sn);
  if (parent.isDemo) fname = dirn + "/" + parent.audioType + "/" + "demo" + "d" + sn;
  else fname = dirn + "/" + parent.audioType + "/" + "s" + ds + "d" + sn;
  //console.log(fname);
  //parent.og.document.getElementById("titre").innerHTML = fname;
  parent.play_sound(fname);
}

function continuer() {
  //alert($('.hidden',frames[0].document).length);
  if ($('.hidden',frames[0].document).length) {
    $('.hidden:first',frames[0].document).show();
    $('.hidden:first',frames[0].document).removeClass("hidden");
    if ($('.hidden',frames[0].document).length == 0) document.getElementById("Bcontinuer").innerHTML = 'Quitter';
  } else {
    parent.ba.init();
    parent.og.location = 'menu.html?version=46';
    
  }
  $('body',frames['Resume2'].document).scrollTop(3000);
  //frames['Resume2'].window.scrollTo(0,3000); //window.scrollTo(0,3000); //
}


function clear_all() {
  //frames = document.getElementsByTagName("IFRAME");
  myframes = window.frames;
  for (var i=0; i<myframes.length; i++){
    //console.log(myframes[i].document.getElementById('Sp').outerHTML);
    myframes[i].document.getElementById('Sp').innerHTML = "";
    //console.log(myframes[i].document.getElementById('Sp').outerHTML);
  }
}

function clearBGC() {
  myframes = window.frames;
  for (var i=0; i<myframes.length; i++){
    myframes[i].document.getElementById('P1').style.backgroundColor = "rgb(255,255,255)";
    }
}


function auSuivant() {
  //console.log("Au suivant 11");

  clear_all();
  var pc = parent.corpus;
  pc.iData += 1;
  
  gNbMotsOk = 0;
  gNbMotsKo = 0;
  if (pc.iData < pc.corData.length) {
    pc.jData = 0;
    diffusePhrase();
    if (parent.isDemo) { setTimeout(startDemo,2000);}
  } else {
    
    if (parent.isDemo) {
      setTimeout(parent.boutons.showMenu,2000);
    } else {
        var nEx = pc.corData.length;
        var nOk = nEx - gNbRate;
        parent.boutons.pageResultats(nOk, nEx);
        //alert(nOk.toString() + " exercices réussis du premier coup sur " + nEx.toString());
        if (nOk == nEx && parent.ba.serie > 1) alert("Vous pouvez, si vous le voulez, passer à l'activité suivante.");
        //alert("fini")};
        
        
        if (parent.ba.serie == 4)  parent.og.location = "resumeFrame" + parent.ba.program+ parent.ba.activity + ".html?version=46";
        else setTimeout(parent.boutons.showMenu,2000);
    }
  } 
}

    

function process_click_global(w){
  if (gIgnoreClick) {return;}
   if (!parent.isDemo) {
     parent.enableBouton('Bvalider','validerC.gif');
   }

  //alert('clique' && window.name);
  var cl = parseInt(w.name.substring(5));

  //alert(cl);

  //var w1 = window.parent;
  //var top = w1.parent;
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var i = pc.iData;
  var j = pc.jData;
  var elem = w.document.getElementById('P1');
  if (i < pcd.length && j+1 < pcd[i].length){
    //alert("clique dans " + cl + " " +i+ " " + j + " " + pcd[i].length);
    var exp =  pcd[i][j+1];
    if (cl == exp) {
      gNbMotsOk += 1;
      ////console.log("pcg gNbMotsOk " + gNbMotsOk.toString());
     
      var txt1 = pcd[i][0];
      var txt2 = txt1.replace(/,/g,"");
      var txt3 = txt2.replace(/-/g," ");
      var txt4 = txt3.replace(/'/g,"' ");
      var txt5 = txt4.replace(/_/g,"-");
      //alert (txt2);

      var txt = txt5.split(" ")[j];
      //alert (txt);
      var txtMot = txt;
      if (txtMot[txtMot.length - 1] == ".") txtMot = txtMot.substring(0,txtMot.length - 1);
      
      //txtMot = '&nbsp;' + txtMot + ' ';
      txtMot = txtMot + '<br>';
      var h =  $(w.document).height();
      //console.log(h);
      var topPos;
      if (cl == 1 || cl == 3 || cl == 7) topPos = 50;
      else topPos = (h/2) - 12;
      
      var leftPos = parseInt(w.document.getElementById('P1').style.paddingLeft);
      if (leftPos) leftPos += 6;
      else leftPos = 7;
      var mot = "<div id='mot' style='position:absolute;font-size:24px;top:" + topPos + "px;left:" + leftPos + "px;line-height:28px;'>"  + txtMot + "</div>";
      if (w.document.getElementById('Sp').innerHTML == '') w.document.getElementById('Sp').innerHTML = mot;
      else w.document.getElementById('mot').innerHTML += txtMot;
      //console.log(w.document.getElementById('mot').innerHTML);
      //console.log(w.document.getElementById('Sp').innerHTML);
      
      
      
      j += 1;
      parent.corpus.jData = j;
      if (j+1 == pcd[i].length) {
        //gIgnoreClick = true;
        //document.getElementById('pointerimg').style.visibility = "hidden";
        if (parent.isDemo) {
          parent.boutons.valider();
        }
      } else {
        if (parent.isDemo) {
          //alert("setTimeout");
          var toId = setTimeout(startDemo,500);
        }
        //alert(document.getElementById('Sp').innerHTML);
        //alert (pcd[i][0].split(" ")[j-2]);
        
      }
    } else {
      gNbMotsKo += 1;
      
      
    }
  } else gNbMotsKo += 1;
  //window.setTimeout(clearBGC,400);
}


function startDemo(){
  
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var i = pc.iData;
  var j = pc.jData;
  if (i < pcd.length){
    var exp =  pcd[i][j+1];
    //alert(exp);
    gDemoFrame = document.getElementById("F" + exp.toString());
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
