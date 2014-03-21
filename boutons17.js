
function valider(n) {
  //console.log("valider " + n);

  if (gIgnoreClick && !parent.isDemo) {return;}
  var pc = parent.corpus;
  var pcd = pc.corData;
 
  //console.log("valider 16 " + n + " ko " + gNbMotsKo + ' ' + pc.kData);
  var id = "c" + (pc.iData +1);
  var program = parent.ba.program;
  var activity = parent.ba.activity;
  
  //console.log(parent.og.motAttendu);
  //console.log(document.getElementById(parent.og.motReecrit).innerHTML);
  if (n == pcd[pc.iData][1]) {
    if (gNbErrors == 0 && gNbRejoues < 2) {
      parent.ba.document.getElementById(id).style.backgroundColor = "#00ff00";
      gNbPhrasesOk += 1;
    } else {
      gNbRate += 1;
      gNbPhrasesOk = 0;
      //if (gPhase == 1) {
      //  parent.ba.document.getElementById(id).style.backgroundColor = "#00ff00";
      //} else {
       parent.ba.document.getElementById(id).style.backgroundColor = "#ff0000";
      //}
    }

    gNbErrors = 0;
    gNbRejoues = 0;
    
    setTimeout(auSuivant,200);  // à cause de safari...
  } else gNbErrors += 1;
}

function rejouer() {
  //console.log("rejouer 17");
  var pc = parent.corpus;
  pc.jData = 0;
  //console.log("gNbMotsOk " + parent.og.gNbMotsOk.toString());
  gNbMotsOk = 0;
  gNbMotsKo = 0;
  gNbRejoues += 1;
  
  
  diffusePhrase();
  

  //document.getElementById('Brecommencer').style.visibility='hidden';
}