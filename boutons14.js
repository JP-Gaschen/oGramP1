
function valider(n) {
  n = n || 0

  if (gIgnoreClick && !parent.isDemo) {return;}
  var pc = parent.corpus;
  var pcd = pc.corData;
 
  //console.log("valider 16 " + n + " ko " + gNbMotsKo + ' ' + pc.kData);
  var id = "c" + (pc.kData +1);
  var program = parent.ba.program;
  var activity = parent.ba.activity;
  
  //console.log(parent.og.motAttendu);
  //console.log(document.getElementById(parent.og.motReecrit).innerHTML);
  if (document.getElementById(parent.og.motReecrit).innerHTML.replace(/ /,'').replace(/&nbsp;/,'') == parent.og.motAttendu) { 
  
  if (gNbErrors == 0) {
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
    
    setTimeout(auSuivant,200);  // à cause de safari...
  } else gNbErrors += 1;
}

