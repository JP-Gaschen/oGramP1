
function valider(n) {
  n = n || 0

  if (gIgnoreClick && !parent.isDemo) {return;}
  var pc = parent.corpus;
  var pcd = pc.corData;
 
  //console.log("valider 16 " + n + " ko " + gNbMotsKo + ' ' + pc.kData);
  var id1 = "c" + (pc.kData +1);
  var id2 = "c" + (pc.kData +13);
  var program = parent.ba.program;
  var activity = parent.ba.activity;
  
  //console.log(parent.og.motAttendu);
  //console.log(document.getElementById(parent.og.motReecrit).innerHTML);
  var mot = document.getElementById(parent.og.motReecrit);
  if (mot && mot.innerHTML.replace(/oe/,'œ').replace(/ /,'').replace(/&nbsp;/,'') == parent.og.motAttendu) { 
    if (gSelErrors == 0) {
      parent.ba.document.getElementById(id1).style.backgroundColor = "#00ff00";
    } else {
      gNbRate += 1;
      //if (gPhase == 1) {
      //  parent.ba.document.getElementById(id).style.backgroundColor = "#00ff00";
      //} else {
       parent.ba.document.getElementById(id1).style.backgroundColor = "#ff0000";
      //}
    }
    if (gNbErrors == 0) {
      parent.ba.document.getElementById(id2).style.backgroundColor = "#00ff00";
    } else {
      gNbRate += 1;
      parent.ba.document.getElementById(id2).style.backgroundColor = "#ff0000";
    }

    gNbErrors = 0;
    
    setTimeout(auSuivant,200);  // à cause de safari...
  } else {
    gNbErrors += 1;
    
    if (mot) mot.contentEditable = true;
    
    if (mot) mot.innerHTML = "&nbsp;";
    
    
    $('#'+motReecrit).focus();
    //document.getElementById(parent.og.motReecrit).focus();
    $('#'+motReecrit).unbind('keydown');
    $('#'+motReecrit).keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {   // return
      //console.log ("return in prepareRetype");
      valider();
      return false;
    }
     
  })
  }
}

