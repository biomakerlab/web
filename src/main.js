// anime({ 
//  targets: ['#base'],
//  rotate: '.125turn',
//  loop: true
// });

// animating e.coli color using opacity 
for (var i = 0; i < 10; i++) {
  $("#syringe-test-3").animate({ opacity: 0}, 4000); 
  $("#syringe-test-3").animate({ opacity: 1}, 4000); 

  for (var j = 1; j <= 4; j++) {
    $("#e" + i).animate({opacity: 0}, 1000); 
    $("#e" + i).animate({opacity: 1}, 1000); 
  }
}

// console.log(anime.easings); 

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
  window.alert("TEMPERATURE HAS BEEN SET");
}

function numCycles() {
  console.log("num cycles: " + cycleCount); 
  // sendMachineMessage('@spec1:SHOW;');
}

function updateSyringeReads() {
  window.alert("Update Readings Button Clicked"); 
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