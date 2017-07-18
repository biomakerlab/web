// anime({ 
//  targets: ['#base'],
//  rotate: '.125turn',
//  loop: true
// });


$('.project-button').on('click', function(){
    $('.project-button').removeClass('selected');
    $(this).addClass('selected');
});

// global variables 
var timer; 
var seconds = 0; 

// timing events (OD readings) 
function startTime() {
  var today = new Date();
  timer = today; 
  var s = today.getSeconds();
  document.getElementById('realTimeOD').innerHTML = "CURRENT TIME: " + s;
  var t = setTimeout(startTime, 500);
}

// TODO: change
function getTime() {
  return timer.getSeconds(); 
}

// TODO: convert OD to meaningful values  
function getODRead(sIndex) {
    if (sIndex == 1) {
      return getTime() + (Math.random() * 1.50); 
  } else if (sIndex == 2) {
    return getTime() + (Math.random() * 1.50); 
  } else if (sIndex == 3) {
    return getTime() + (Math.random() * 1.50); 
  } else {
    return getTime() + (Math.random() * 1.50); 
  }
}


function disRealTimeOD(sIndex) {
  var pseudoVal = getODRead(sIndex);  
  pseudoVal = pseudoVal.toFixed(2);

  if (sIndex == 1) {
    document.getElementById('od-1').innerHTML = "<br><br> SYRINGE 1: <br>" + pseudoVal;
    setTimeout(function() {
    disRealTimeOD(1);
  }, 500)
  } else if (sIndex == 2) {
    document.getElementById('od-2').innerHTML = "<br><br> SYRINGE 2: <br>" + pseudoVal;
    setTimeout(function() {
    disRealTimeOD(2);
  }, 500)
  } else if (sIndex == 3) {
    document.getElementById('od-3').innerHTML = "<br><br> SYRINGE 3: <br>" + pseudoVal;
    setTimeout(function() {
    disRealTimeOD(3);
  }, 500)
  } else {
    document.getElementById('od-4').innerHTML = "<br><br> SYRINGE 4: <br>" + pseudoVal; 
    setTimeout(function() {
    disRealTimeOD(4);
  }, 500)
  }

}


// animating e.coli color using opacity 
// for (var i = 1; i <= 10; i++) {
  $("#color4setTemp").animate({ opacity: 0}, 4000); 
  $("#scream").animate({ opacity: 1}, 4000); 
// }

// buttons
function beginButton() {
  // if (ws.readyState == 1) { window.alert("STARTING UP MACHINE");}
  // else { window.alert("ERROR CONNECTING: connect to BoosterWifi");}
  // // send message to machine to begin
  // sendMachineMessage('@bml:START;');

  // send message to MQTT Broker 
  var message = new Paho.MQTT.Message("@bml:START;");
  message.destinationName = "machine1/state"; 
  client.send(message); 
}

function stopButton() {
  // window.alert("STOP GROWTH");
  // sendMachineMessage('@bml:STOP;');
  if (window.confirm("You about to halt the incubation process. Do you want to continue?")) {
      // send message to MQTT Broker 
      var message = new Paho.MQTT.Message("@bml:STOP;");
      message.destinationName = "machine1/state"; 
      client.send(message); 
    } 
}

function setTemp() {
  console.log("set temperature button clicked");
}

function numCycles() {
  console.log("num cycles: " + cycleCount); 
  // sendMachineMessage('@spec1:SHOW;');
}

function updateSyringeReads() {
  console.log("update readings button clicked"); 
}

// GO TO EXTERNAL LINK
function changePage(event) {
    if($(event.target).hasClass('external')) {
        window.location.href = $(event.target).attr('href');
        return;
    }
}

$(function () {
    $('.nav li').click( changePage );
});

// SMOOTH SCROLLING FOR THE PAGE 
$(document).ready(function(){
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 500, function(){
      window.location.hash = hash;
      });
    } 
  });
})

$(document).on('click', 'a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});