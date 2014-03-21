

function init() {
  //console.log("init boutons");
  

  
  document.getElementById('Bvalider').style.visibility='hidden';
  document.getElementById('Brejouer').style.visibility='hidden';
  document.getElementById('Breecouter').style.visibility='hidden';
  document.getElementById('displayMenu').style.visibility='hidden';
  parent.document.getElementById('verbe6').style.visibility='hidden';

  
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

  parent.og.location = 'menu.html?version=44';
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
  parent.og.rejouer();
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