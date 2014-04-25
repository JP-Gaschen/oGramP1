
function valider() {
  //console.log("valider 11");

  if (parent.og.gIgnoreClick && !parent.isDemo) {return;}
  var pc = parent.corpus;
  var pcd = pc.corData;
  var myFrames = window.frames;
  var id = "c" + (pc.iData +1);
  var program = parent.ba.program;
  var activity = parent.ba.activity;
//console.log("valider gNbMotsOk " + gNbMotsOk);
//console.log("valider gNbMotsKo " + gNbMotsKo);
  ////console.log("valider nmots " + pcd[pc.iData].length.toString());
  if (gNbMotsOk ==  pcd[parent.ranData(pc.iData)].length - 1 ) {
    
    if (gNbErrors == 0 && gNbRejoues < 2 && gNbMotsKo == 0) {
      parent.ba.document.getElementById(id).style.backgroundColor = "#00ff00";
      gNbPhrasesOk += 1;
    } else {
      parent.ba.document.getElementById(id).style.backgroundColor = "#ff0000";
      gNbPhrasesOk = 0;
      gNbRate += 1;
    }
    
    gNbErrors = 0;
    gNbRejoues = 0;
    gNbMotsKo = 0;
    setTimeout(auSuivant,1000);  // à cause de safari...
  }
}

function rejouer() {
  //console.log("rejouer 25");
  var pc = parent.corpus;
  pc.jData = 0;
  //console.log("gNbMotsOk " + parent.og.gNbMotsOk.toString());
  gNbMotsOk = 0;
  gNbMotsKo = 0;
  gNbRejoues += 1;
  clear_all();
  diffusePhrase();
  

  //document.getElementById('Brecommencer').style.visibility='hidden';
}
