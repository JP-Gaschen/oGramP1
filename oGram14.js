var gNbPhrasesOk;


var gNbErrors = 0;


var gNbRate = 0;

var gPlay_html5_audio = false;

var gIgnoreClick = false;




var selectedMasculin = 0;
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

     var lefti = 150 + 180 * (i % 4);
     var topi = 200 + 50 * parseInt(i/4);
     mot.style.left = "" + lefti+"px";
     mot.style.top = "" + topi+"px";
     mot.style.color = "#00ff00";
     //console.log(mot.style.top);
     var mots = pcd[k-1][0].split(' ');
     
     if (j <= 12) mot.innerHTML =  mots[0];
     else mot.innerHTML =  mots[2];
  
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
    parent.boutons.document.getElementById('displayMenu').style.visibility='hidden';
    //for (var i=0; i<6; i++) parent.gPhraseOrder[i] = i;
    showPointer();
    window.setTimeout(startDemo,4000);
  } else {
    parent.boutons.document.getElementById('displayMenu').style.visibility='visible';
    //parent.boutons.document.getElementById('Breecouter').style.visibility='visible';
    var serie = parent.ba.serie;
    
    parent.boutons.document.getElementById('Bvalider').style.visibility='visible';
    //parent.boutons.document.getElementById('Brejouer').style.visibility='hidden';
    parent.boutons.document.getElementById('displayMenu').style.visibility='visible';
    
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
  if (document.getElementById(id).style.color == 'rgb(0, 255, 0)') {
    if (selectedMasculin == 0) {
    
      if (txt == mots[0]) {
        selectedMasculin = k;
        document.getElementById(id).style.color = '#007700';
      } else {
        //gNbErrors += 1;
        //console.log("pas un singulier");
      }
    } else {
      if (txt == mots[2] &&  k == selectedMasculin) {
        var phraseTxt = "";
        
          phraseTxt += "<span Id='sp0' style='color:#000000;'>" + mots[0] + "</span>";
          phraseTxt += "<span Id='sp1' style='color:#000000;'> " + mots[1] + " </span>";
          phraseTxt += "<span Id='sp2' style='color:#000000;'>" + mots[2] + "</span>";
          phraseTxt += "<span Id='sp3' style='color:#000000;'> " + mots[3] + " </span>";
          phraseTxt += "<span Id='sp4' style='color:#000000;'>" + mots[4] + "</span>";
          phraseTxt += "<span Id='sp5' style='color:#000000;'> " + mots[5] + " </span>";
          phraseTxt += "<span Id='sp6' style='color:#000000;'>" + mots[6] + "</span>";
        
        //console.log(phraseTxt);
        document.getElementById('phrase').innerHTML = phraseTxt;
        selectedMasculin = 0;
        document.getElementById(id).style.color = '#007700';
        $('#sp0').keyup(function (e) {
          //console.log(document.getElementById('sp1').innerHTML);
          document.getElementById('sp0').innerHTML = document.getElementById('sp0').innerHTML.replace(/oe/,'œ');
          //console.log(document.getElementById('sp1').innerHTML);
          document.getElementById('sp0').focus();
        });
  
        $('#sp2').keyup(function (e) {
          //console.log(document.getElementById('sp4').innerHTML);
          document.getElementById('sp2').innerHTML = document.getElementById('sp2').innerHTML.replace(/oe/,'œ');
          //console.log(document.getElementById('sp4').innerHTML);
          document.getElementById('sp2').focus();
        });
  
        setTimeout(efface,1200);
      } else {
        //console.log("mauvais 2e mot");
        //gNbErrors += 1;
      }
    }
  } else {
    //gNbErrors += 1;
    //console.log("déjà pris");
  }
}


function efface(){
  var ind = Date.now() % 4;
  var spId = "sp" + 2 * ind;
  //console.log(spId);
 
    motAttendu = document.getElementById(spId).innerHTML;
    motReecrit = spId;
    
    document.getElementById(spId).contentEditable = true;
    document.getElementById(spId).focus();
    document.getElementById(spId).innerHTML = '&nbsp;';
  
  
}


function continuer() {
  if ($('.hidden',frames[0].document).length) {
    $('.hidden:first',frames[0].document).show();
    $('.hidden:first',frames[0].document).removeClass("hidden");
    if ($('.hidden',frames[0].document).length == 0) document.getElementById("Bcontinuer").innerHTML = 'Quitter';
    } else {
      parent.ba.init();
      parent.og.location = 'menu.html?version=44';
      parent.boutons.document.getElementById('displayMenu').style.visibility='hidden';
    }
 
  frames['Resume2'].window.scrollTo(0,3000); //window.scrollTo(0,3000); //
}




function auSuivant() {

  //console.log('Au suivant ratés ' + gNbRate);
  document.getElementById('phrase').innerHTML = "";
  var pc = parent.corpus;
  var pcd = pc.corData;
  //console.log("Au suivant og... " + pc.iData );
  

  
  pc.kData += 1;
  
  gNbErrors = 0;
  //if (pc.iData < pc.corData.length) {
  if (pc.kData < pc.corData.length) {
    //console.log("auSuivant 1");
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
        var nEx = pc.corData.length;
        var nOk = nEx - gNbRate;
        
        alert(nOk.toString() + " exercices réussis du premier coup sur " + nEx.toString());
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
  
  //parent.boutons.document.getElementById('BstartDemo').style.visibility='hidden';
  var pc = top.frames[0];
  var pcd = pc.corData;
  //alert(pcd);
  var justesPoint = pcd[pc.iData+1][0] + gFinDePhrase;
  var mots =$('#phrase').text().split(' ');
  var phraseTxt = '';
  for (var j=0; j<mots.length; j++)  {
    if (j == pcd[pc.iData][2] - 1) phraseTxt += "<span id='s"+j+"' style='background-color:"+gGrise+";' >"+ mots[j]+ "</span>";
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
  var justesPoint = pcd[pc.iData+1][0] + gFinDePhrase;
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



