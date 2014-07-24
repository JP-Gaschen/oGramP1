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


var gCligneDelay = 250;

var gLeft = 0;
var gMot;
var gsavedPhrase;
var gPhrase;
var gChars = [[]];
var gGrise = '#dddddd';




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

function getCharacterOffsetWithin(range, node) {
    var treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT, //NodeFilter.SHOW_TEXT,
        function(node) {
            var nodeRange = document.createRange();
            nodeRange.selectNode(node);
            return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
        false
    );

    var charCount = 0;
    while (treeWalker.nextNode()) {
    //console.log("len " + treeWalker.currentNode.length);

        charCount += treeWalker.currentNode.length;
    }
    //console.log("node type " + range.startContainer.nodeType)
    if (range.startContainer.nodeType == 3) {
        //console.log("startOffset " + range.startOffset);
        charCount += range.startOffset;
    }
    return charCount;
}

function compteMots (txt) {
  var compte = 0;
  for (var i=0; i < txt.length; i++) {
    var code = txt.charCodeAt(i);
    //console.log(txt.charAt(i) + " " + txt.charCodeAt(i));
    if (code == 32 || code == 160) {
      //console.log("is space " + code);
      compte +=1;
    }
  }
  return (compte + 1);
}


function init() {
  ////console.log("init og");
  
  gPhase = parent.gPhase;


  var pc = parent.corpus;
  var pcd = pc.corData;
  pc.iData = 0;
  pc.jData = 0;
  gX0 = 800;
  gY0 = 700;
  gNbPhrasesOk = 0;
  gNbMotsOk = 0;
  gNbMotsKo = 0;


  
  gChars = [[""]];
  gLeft = 74;
  
  parent.og.document.getElementById("titre").innerHTML =  parent.ba.titre;
  parent.og.document.getElementById("module").innerHTML =  parent.ba.module;
  
  document.getElementById("Nouveau").style.backgroundColor=parent.vertFg;
  document.getElementById("Ancien").style.backgroundColor=parent.vertBg;
  
  
  $('#phrase').keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    //console.log(keyCode);
    var el = document.getElementById("phrase");
    var range = window.getSelection().getRangeAt(0);
    var pos = getCharacterOffsetWithin(range, el);
    var outerLen = document.getElementById('nnn').outerHTML.length;
    var innerLen = document.getElementById('nnn').innerHTML.length;
    //console.log("spanlen " + innerLen + " " + outerLen);
    if (pos >  document.getElementById('phrase').innerHTML.indexOf('<span')) {
      //pos += outerLen - innerLen;
    }
    //var currentPhrase = document.getElementById("phrase").innerHTML;
    currentPhrase = $("#phrase").text();
    var c2 = currentPhrase.charCodeAt(pos-2);
    var c1 = currentPhrase.charCodeAt(pos-1);
    var c0 = currentPhrase.charCodeAt(pos);
    var char2 = currentPhrase.charAt(pos-2);
    var char1 = currentPhrase.charAt(pos-1);
    var char0 = currentPhrase.charAt(pos);
    //console.log(currentPhrase);
    //console.log(pos + " c0 " + c0 + " " + char0 + "   c1 " + c1 + " " + char1 + "   c2 " +  c2 + " " + char2);

    // backSpace 8 or delete 46
    // 38 est le code pour &
    if ((keyCode == 8 && (c1 == 32 || c1 == 160)) || (keyCode == 46 && (c0 == 32 || c0 == 160))) {
      //console.log("not deleting a space");
      e.preventDefault();
      return false;
    }
    if (keyCode == 54) {
      //console.log("not inserting a &");
      e.preventDefault();
      return false;
    }
    if (keyCode == 32) {    // spaceBar
      //console.log("space");
      //console.log("space " + $('#phrase').text());
      var phraseTxt = $('#phrase').text().replace(/\s /g, " ? ").replace(/\s/g, " ");
      var mots =phraseTxt.split(' ');
      //for (var i=0; i<mots.length; i++)//console.log(mots[i]);
      //var mots =$('#phrase').text().replace(/\s+/g, " ").split(' ');
      var justesPoint = pcd[pc.iData+1][0].replace(/'/,"' ").replace(/-/,"- ");
      var justes = justesPoint.split(' ');
      var nbMots = compteMots($('#phrase').text());
      //console.log(nbMots + " " + mots.length + " ?? " + justes.length);
      if (mots.length >= justes.length) {
        e.preventDefault();
        return false;
      }
    }
    if (keyCode == 13) {   // return
      parent.boutons.valider();
      return false;
    }
  });
  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 8) {   // backspace
      var target = e.target || e.srcElement;
    //console.log(target.id)
      if (target.id != 'phrase') {
        e.preventDefault();
        return false;
      } else return true;
    }
  });
  $('#phrase').keyup(function (e) {
    //console.log(document.getElementById('phrase').innerHTML);
    var sp =  document.getElementById('nnn');
    if (sp) {
      var left = gLeft + sp.offsetLeft;
      //document.getElementById('Nouveau').style.color="#00ff00";
      document.getElementById('Nouveau').style.left = "" + left + "px";
    }
  });
  
  if (parent.isDemo){
    parent.ba.hideCarres();
    parent.enableBouton('displayMenu','menuC.gif');
    //for (var i=0; i<6; i++) parent.gPhraseOrder[i] = i;
    showPointer();
    window.setTimeout(startDemo,4000);
  } else {
    
    var serie = parent.ba.serie;
    
    parent.enableBouton('displayMenu','menuC.gif');
    parent.enableBouton('Bvalider','validerC.gif');
    parent.enableBouton('Bconsigne','consigneC.gif');
    
    //parent.gPhraseOrder = parent.randsort(6);
    //for (var i=0; i<6; i++) {console.log(parent.gPhraseOrder[i]);}
    
  }
  
  diffusePhrase();

}


function diffusePhrase() {
//console.log("diffusePhrase start");
  
  rediffusePhrase();
}
function rediffusePhrase () {

  var pc = parent.corpus;
  var pcd = pc.corData;
//console.log("rediffuse");
  var i = parent.ranData(pc.iData);
  parent.og.gIgnoreClick = false;
  var pcdi = pcd[i][0].replace(/'/g ,"' ").replace(/-/,"- ").replace(/,/," ,");
  var mots = pcdi.split(' ');
  //console.log("pcdi " + pcdi.length);
  //console.log(document.getElementById('textinput').style.width);
  var phraseTxt = '';
  var phraseAvant = '';
  var phraseApres = '';
  var jMot = pcd[i][2]-1;
  //console.log(mots[jMot]);
  if (mots[jMot] == "s'") jMot += 1;
  for (var j=1; j<mots.length; j++)  {
     if (mots[j] != ',') mots[j] = ' ' + mots[j];
     //console.log(mots[j]);
  }
  for (var j=0; j<mots.length; j++)  {
    phraseTxt += "<span id='s"+j+"' >"+ mots[j]+ "</span>";
    //if (j < mots.length - 1 && mots[j+1] != ',') phraseTxt += ' ';
    if (j < jMot) phraseAvant += "<span>" + mots[j] + "</span>";
    if (j > jMot ) phraseApres += "<span>" + mots[j] + "</span>";
  }
  if (phraseAvant != '') phraseAvant += ' ';
  gPhrase = phraseAvant + "<span id='nnn' contentEditable='false' style='color:"+parent.menuFg+";'>" + pcd[i][1] +"</span>" + phraseApres;
  //gPhrase = phraseAvant + "<span id='nnn'>" + pcd[i][1] +"</span>" + phraseApres;
  //console.log(phraseTxt);
  //console.log(gPhrase);
  var diffuseTxt = '';
  
  //if (pcd[i][4] != undefined) phraseTxt += " " + pcd[i][4];

//console.log(phraseTxt);
  document.getElementById('phrase').innerHTML = phraseTxt;

  
  var mot = document.getElementById('s'+(pcd[i][2]-1));
  mot.style.contentEditable = false;
  gMot = mot;

  
  //console.log(mot.innerHTML);
  //console.log(mot.offsetLeft);

  var leftOffset = 70 + mot.offsetLeft;
  if (pcd[i][2] > 1) leftOffset = 80 + mot.offsetLeft;
  var nouv = document.getElementById('Nouveau');
  nouv.style.left = '' + leftOffset + 'px';
  nouv.innerHTML = pcd[i][1].replace(/-/,"");
  nouv.style.visibility = 'hidden';
  nouv.style.backgroundColor=parent.menuFg;
  nouv.style.lineHeight = '34px';
  

  var anc = document.getElementById('Ancien');
  anc.style.left = '' + leftOffset + 'px';
  anc.innerHTML = mots[pcd[i][2]-1].replace(/-/,"");
  if (mots[pcd[i][2]-1] == "s'") anc.innerHTML += " " + mots[pcd[i][2]];
  anc.style.visibility = 'hidden';
  anc.style.backgroundColor=parent.menuFg; // essai
  if (i == 0 || pcd[i-1].length == 1) setTimeout(function() {anime()},3000);
  else setTimeout(function() {anime()},1000);
}
function anime() {
  var pc = parent.corpus;
  var pcd = pc.corData;
//console.log("anime");
  var i = parent.ranData(pc.iData);
  
  var mot = document.getElementById('s'+(pcd[i][2]-1));
  mot.style.color=parent.menuFg;
  if (mot.innerHTML.length > pcd[i][1].length) {
    mot.innerHTML= pcd[i][1] + mot.innerHTML.substring(pcd[i][1].length);
  //console.log(mot.innerHTML);
  }
  if (mot.innerHTML.length <= pcd[i][1].length) {
    mot.innerHTML= pcd[i][1].substring(0,mot.innerHTML.length);
  //console.log(mot.innerHTML);
  }
  

  //ajuste();
  gNmove = 1;
  gIntervalId = window.setInterval(move,8);
}


function move() {
  var pc = parent.corpus;
  var pcd = pc.corData;
  var nouv = document.getElementById('Nouveau');
  nouv.style.visibility = 'visible';
  nouv.style.top = '' + (142 + gNmove) + 'px';
  var anc = document.getElementById('Ancien');
  anc.style.visibility = 'visible';
  anc.style.top = '' + (306 + gNmove) + 'px';
  gNmove += 1;
  if (gNmove == 40) ajuste();
  if (gNmove == 120) nouv.style.backgroundColor = parent.menuBg;
  if (gNmove > 140) {
    window.clearInterval(gIntervalId);
    //nouv.style.visibility = 'hidden';
    anc.style.visibility = 'hidden';
    gMot.style.color = '#000000';
    document.getElementById("Nouveau").innerHTML = pcd[parent.ranData(pc.iData)][1];
    //console.log("'" + document.getElementById("Nouveau").innerHTML + "'");
    document.getElementById("Nouveau").style.backgroundColor=parent.menuBg;
    //document.getElementById("Nouveau").style.visibility='hidden';
  //console.log(document.getElementById('phrase').innerHTML);
  //console.log($('#phrase').text());
    //document.getElementById('phrase').innerHTML = $('#phrase').text();
    //console.log(gPhrase);
    document.getElementById('phrase').innerHTML = gPhrase;
  }
}

function ajuste () {
  var ancTxt = document.getElementById('Ancien').innerHTML;
  var nouvTxt = document.getElementById('Nouveau').innerHTML;
//console.log("nouv " + nouvTxt.length );
//console.log("anc " + ancTxt.length );
  if (ancTxt.length > nouvTxt.length) {
    var txt = gMot.innerHTML;
  //console.log(txt);
    var to = 0; 
    for ( var i = ancTxt.length; i > nouvTxt.length - 1; i-- ) {
    //console.log("i ", +i + " " + txt.substring(0,i));
      //setTimeout(function() {gMot.innerHTML = txt.substring(0,i);},to);
      setTimeout(
        (function(s) {
            return function() {
                gMot.innerHTML = s;
            }
        })(txt.substring(0,i)), to);

      to += 100;
    }
  }
  if (ancTxt.length < nouvTxt.length) {
    
    var txt = nouvTxt;
    var to = 0; 
    for ( var i = ancTxt.length; i <= nouvTxt.length; i++ ) {
    //console.log("i ", +i + " " + txt.substring(0,i));
  
      setTimeout(
        (function(s) {
            return function() {
                gMot.innerHTML = s;
            }
        })(txt.substring(0,i)), to);

      to += 100;
    }
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

  
  document.getElementById('phrase').innerHTML = "";
  var pc = parent.corpus;
  var pcd = pc.corData;
  //console.log('Au suivant ' + pc.iData + ' ' + pcd[pc.iData].length );
  

  if ((pc.iData+2) % 4 == 0) {
    pc.iData += 1;
  }
  pc.iData += 1;
  pc.kData += 1;
  gNbMotsOk = 0;
  gNbRejoues = 0;
  gNbErrors = 0;
  //if (pc.iData < pc.corData.length) {
  if (pc.iData < pc.corData.length - 1) {
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
        var nEx = pc.corData.length - 4;
        var nOk = nEx - gNbRate;
        document.getElementById("Ancien").style.visibility = 'hidden';
        document.getElementById("Nouveau").style.visibility = 'hidden';
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
  var justesPoint = pcd[pc.iData+1][0];
  var mots =$('#phrase').text().split(' ');
  var phraseTxt = '';
  for (var j=0; j<mots.length; j++)  {
    if (j == pcd[pc.iData][2] - 1) phraseTxt += "<span id='s"+j+"' style='background-color:" + parent.menuFg + ";' >"+ mots[j]+ "</span>";
    else phraseTxt += "<span id='s"+j+"' >"+ mots[j]+ "</span>";
    if (j < mots.length - 1) phraseTxt += ' ';
  }
  //gsavedPhrase = document.getElementById('phrase').innerHTML;
  document.getElementById('phrase').innerHTML = phraseTxt;
      
  
  montreNouveau(0);
}
function montreNouveau(n) {
  //console.log('montreNouveau');
  document.getElementById("Nouveau").style.visibility = 'hidden';
  var pc = top.frames[0];
  var pcd = pc.corData;
  var mots =$('#phrase').text().split(' ');
  var justesPoint = pcd[pc.iData+1][0];
  justes = justesPoint.split(' ');
  var k = 0;
  gChars[n] = [];
  if (n != pcd[pc.iData][2] - 1 && mots[n] != justes[n]){
    var iCommun = -1;
    var i=1;
    while (mots[n].substring(0,i) == justes[n].substring(0,i)) i += 1;
  //console.log("commun " + i + "  " + justes[n].substring(0,i-1));
    for (var j = mots[n].length; j > i-1; j--) {
      gChars[n][k] = mots[n].substring(0,j-1);
    //console.log(gChars[n][k]);
      k += 1;
    }
    for (var j= i; j<justes[n].length+1; j++ ) {
      gChars[n][k] = justes[n].substring(0,j);
    //console.log(gChars[k]);
      k += 1;
    }
  //console.log(gChars);
    var obj =document.getElementById('s' + n);
    var cmd = "remplace(" + n + ",0)";
    if (obj) cligne(obj,3,cmd);
    if (n+1 < mots.length) setTimeout(function() {montreNouveau(n+1);},3000);
    else setTimeout(parent.boutons.showMenu,4000);
  }
  else if (n+1 < mots.length) montreNouveau(n+1);
  else  setTimeout(parent.boutons.showMenu,2000);
}

function remplace (n,k) {
  var pc = top.frames[0];
  var pcd = pc.corData;
//console.log("remplace " + n + " " + k);
  var obj =document.getElementById('s' + n);
  obj.innerHTML = gChars[n][k];
  var sp =  document.getElementById('s' +  (pcd[pc.iData][2] - 1));
    if (sp) {
      var left = gLeft + sp.offsetLeft;
      //document.getElementById('Nouveau').style.color="#00ff00";
      document.getElementById('Nouveau').style.left = "" + left + "px";
    }
  if (k+1 < gChars[n].length) setTimeout(function () {remplace(n,k+1);},200);
}



