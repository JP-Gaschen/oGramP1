
function valider(n) {
  n = n || 0;
  var pc = parent.corpus;
  //console.log("valider 16 " + n + " ko " + gNbMotsKo + ' ' + pc.kData);
  if (gIgnoreClick && !parent.isDemo) {return;}
  
  var pcd = pc.corData;
  var myFrames = window.frames;

  var id = "c" + (pc.kData +1);
  var program = parent.ba.program;
  var activity = parent.ba.activity;
  if (n == pcd[pc.iData][2] - 1) {
    valider(n+1);
    return;
  }
  //document.getElementById('phrase').innerHTML = document.getElementById('phrase').innerHTML.replace(/&nbsp;/, ' ');
  //console.log($('#phrase').text());
  var phraseTxt = $('#phrase').text().replace(/\s\s/g, " &#63; ").replace(/\s/g, " ");
  //console.log(phraseTxt);

  var mots =phraseTxt.split(' ');
  //var mots = document.getElementById('phrase').innerHTML.split(' ');
  var justesPoint = pcd[pc.iData+1][0].replace(/'/,"' ").replace(/-/,"- ").replace(/&apos;/, "'");
  justes = justesPoint.split(' ');

  if (mots.length != justes.length) {
    //console.log(mots.length + " != " + justes.length);
  //console.log(document.getElementById('phrase').innerHTML);
    rejouer();
    return;
  }
  if (n >= justes.length) {
    if (gNbMotsKo == 0) {
      if (gNbErrors == 0 && gNbRejoues < 2) {
        parent.ba.document.getElementById(id).style.backgroundColor = "#00ff00";
        gNbPhrasesOk += 1;
      }
      else {
        parent.ba.document.getElementById(id).style.backgroundColor = "#ff0000";
        gNbRate += 1;
        gNbPhrasesOk = 0;
      }
      setTimeout(auSuivant,300);
      return;
    } else {
      parent.ba.document.getElementById(id).style.backgroundColor = "#ff0000";
      gNbMotsKo = 0;
      return;
    }
  }
  if (mots[n] != justes[n]) {
    //console.log(mots[n] + "!= " + justes[n]);
    gNbMotsKo += 1;
    gNbErrors += 1;
    //console.log(mots[n] + " != " + justes[n]);
    //var obj =document.getElementById('s' + n);
    if (mots[n]) {
      var phraseTxt = '';
      for (var j=0; j<mots.length; j++)  {
        if (j == pcd[pc.iData][2] - 1) phraseTxt += "<span id='s"+j+"' style='background-color:"+gGrise+";' >"+ mots[j]+ "</span>";
        else phraseTxt += "<span id='s"+j+"' >"+ mots[j]+ "</span>";
        if (j < mots.length - 1) phraseTxt += ' ';
      }
      gsavedPhrase = document.getElementById('phrase').innerHTML;
      document.getElementById('phrase').innerHTML = phraseTxt;
      var obj =document.getElementById('s' + n);
      n += 1
      var cmd = "document.getElementById('phrase').innerHTML=gsavedPhrase;valider(" + n + ")";
      if (obj) cligne(obj,3,cmd);
    }
  } else valider(n+1);
  //console.log("valider gNbMotsKo " + parent.og.gNbMotsKo.toString());
  ////console.log("valider nmots " + pcd[pc.iData].length.toString());
  //if (gNbMotsOk ==  pcd[parent.ranData(pc.iData)].length - 4 && gNbMotsKo == 0) {
  //console.log("verbe " + gVerbe);
  //console.log("span " + document.getElementById('verbe').innerHTML);
  
}


function rejouer() {
  //console.log("rejouer 25");
  var pc = parent.corpus;
  pc.jData = 0;
  //console.log("gNbMotsOk " + parent.og.gNbMotsOk.toString());
  
  gNbRejoues += 1;
 
//  if (gNbMotsOk > 0) {
    //document.getElementById('verbe').contentEditable = false;
    //setTimeout(prepareRetype,800);
    //document.getElementById('verbe').innerHTML = "&nbsp;";
    //document.getElementById('verbe').focus();
//    $("#verbe").remove();
//    montrePhrase();
//  } else {
    gNbMotsOk = 0;
    gNbMotsKo = 0;
    diffusePhrase();
    //document.getElementById('phrase').innerHTML = "";
//  }

  //document.getElementById('Brecommencer').style.visibility='hidden';
}
