
var menuLevel = 0;
function init() {
  //console.log("init boutons");
  

   if (menuLevel == 0) parent.disableBouton('displayMenu','menuD.gif');
   else parent.enableBouton('displayMenu','menuC.gif');
  

  
  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 8) {   // backspace
     
      e.preventDefault();
      return false;
    }
  });
 
}
function showMenu() {
  //console.log("showMenu");
  init();
  //parent.ba.location.reload();

  parent.ba.hideCarres();

  parent.og.location = 'menu.html?version=45';
}

function displayResume() {
  var myFrames = parent.og.window.frames;
//$('p',myFrames['Resume2'].document).before('<div class="hidden">');
 //$('p',myFrames['Resume2'].document).after('</div>');
 //$('p',myFrames['Resume2'].document).addClass('hidden');
 //$('font font',myFrames['Resume2'].document).wrapInner('<span class="hidden" style="display:line"></span>');
 //$('font font',myFrames['Resume2'].document).append('</span>');
 $('.hidden',myFrames['Resume2'].document).hide();
 //parent.og.continuer();
 parent.og.document.getElementById("Resume").style.visibility='visible';
 myFrames['Resume2'].window.scrollTo(0,3000); //

  parent.ba.location.reload();
}



// valider ne peut pas bien être commun -> transfer à og
function valider() {
  parent.og.valider();
}


function rejouer() {
  //parent.og.rejouer();
}

function consigne () {
  var dp = "" + parent.ba.program;
  var da = "" + parent.ba.activity;
  //while (da.length < 2) {da = "0" + da;}
  
  var dirn = "consP" + dp;
  var fname = dirn + "/" + parent.audioType + "/" + "A" + da;
  if (parent.ba.activity == 3 || parent.ba.activity == 5) fname += '-' + parent.gPhase;
  if (parent.ba.activity == 7 && parent.ba.serie == 1) fname += '-A';
  if (parent.ba.activity == 7 && parent.ba.serie == 2) fname += '-B';
  var myFrames = parent.og.window.frames;
  if (myFrames['Resume2']) fname =  dirn + "/" + parent.audioType + "/" + "Res";
  
  //console.log(fname);
  parent.play_sound(fname);
}

function reecouter() {
  //console.log("Réécouter");
  setTimeout(parent.og.rediffusePhrase,200);
  if (parent.og.frames[0]) parent.og.frames[0].focus();
  if (parent.ba.program == 4 && parent.ba.activity == 3){
  //console.log(parent.og.gIndAdjectif);
    parent.og.prepareRetype(parent.og.gIndAdjectif);
  }
}