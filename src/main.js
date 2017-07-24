 // global vars 
 var timer;         // global timer
 var seconds = 0;   // seconds passed 
 var ctx;           // canvas context
 var s1;            // colored syringe 1 
 var s2;            // colored syringe 2
 var s3;            // colored syringe 3
 var s4;            // colored syringe 4
 var currChart = 0; // chart displayed in analysis


//////////////// BACTERIA ANIMATION //////////////////////
var plas1, bact1; 
var plas2, bact2;
var plas3a, plas3b, plas3c, plas3d, bact3; 
var step1count = 0; 

// step 1 anime 
function startBacAnim1() {
    plas1  = new component("graphics/step2b.png", 30, 70, 30, 30,"image", "bactArea1");
    bact1 = new component("graphics/bact1a.png", 100, 70, 140, 120, "image", "bactArea1");
    // bact1b = new component("graphics/step2a.png", 100, 0, 140, 120, "image", "bactArea1");
    bactArea1.start();
}

var bactArea1 = {
    canvas : document.getElementById('step-1-anime'),
    start : function() {
        step1count = 0; 
        this.canvas.width = 250;
        this.canvas.height = 200;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateBactArea1, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateBactArea1() {
    bactArea1.clear();
    plas1.update(); 
    bact1.update();
    // bact1b.update(); 
    step1count += 1; 
}

// step 2 anime 
function startBacAnim2() {
    plas2 = new component("graphics/step2b.png", 30, 100, 30, 30,"image", "bactArea2");
    bact2 = new component("graphics/step2a.png", 100, 70, 140, 120, "image", "bactArea2");
    bactArea2.start();
}

var bactArea2 = {
    canvas : document.getElementById('step-2-anime'),
    start : function() {
        this.canvas.width = 250;
        this.canvas.height = 200;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateBactArea2, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateBactArea2() {
    bactArea2.clear();
    plas2.x += 1;
    plas2.update(); 
    bact2.update();
}

// step 3 anime 
function startBacAnim3() {
    plas3a = new component("graphics/step2b.png", 120, 100, 30, 30,"image", "bactArea3");
    plas3b = new component("graphics/step2b.png", 120, 100, 30, 30,"image", "bactArea3");
    plas3c = new component("graphics/step2b.png", 120, 100, 30, 30,"image", "bactArea3");
    plas3d = new component("graphics/step2b.png", 120, 100, 30, 30,"image", "bactArea3");
    bact3 = new component("graphics/bact1a.png", 100, 70, 140, 120, "image", "bactArea3");
    bactArea3.start();
}

var bactArea3 = {
    canvas : document.getElementById('step-3-anime'),
    start : function() {
        this.canvas.width = 250;
        this.canvas.height = 200;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateBactArea3, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateBactArea3() {
    bactArea3.clear();
    plas3a.update(); 
    plas3b.update(); 
    plas3c.update(); 
    plas3d.update(); 
    bact3.update();
}

function loop() {
    
    /// increase alpha with delta value
    alpha += delta;
    
    //// if delta <=0 or >=1 then reverse
    if (alpha <= 0 || alpha >= 1) delta = -delta;
    
    /// clear canvas
    ctx.clearRect(0, 0, demo.width, demo.height);
    
    /// set global alpha
    ctx.globalAlpha = alpha;
    
    /// re-draw image
    ctx.drawImage(img, 0, 0);
    
    /// loop using rAF
    requestAnimationFrame(loop);
}


//////////////// CUVETTE ANIMATION //////////////////////
var cuvette, cuvetteWater;

function startGame() {
    cuvette = new component("graphics/cuvette.png", 0, 30, 48, 120,"image", "myGameArea");
    cuvetteWater = new component("graphics/cuvette-water.png", 100, 70, 140, 120, "image", "myGameArea");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.getElementById('cuvette-image'),
    start : function() {
        this.canvas.width = 250;
        this.canvas.height = 200;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(color, x, y, width, height, type, canvas) {
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function(){
        var ctx = eval(canvas + ".context");
        if (type == "image") {
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          // unique animation for each context
          if (this == cuvette) {
            if (this.x > 140) { this.x = 140; }
          } else if (this == plas2) {
            if (this.x > 120) { this.x = 120; }
          } else if (this == plas3b) {
            if (this.x < 165) { this.x += 1; }
            if (this.y > 80 ) {this.y -= 1; }
             
          } else if (this == plas3c) {
            if (this.y < 135) { this.y += 1; }
            if (this.x > 110) { this.x -= 1; }
          } else if (this == plas3d) {
            if (this.x < 145) { this.x += 1; }
            if (this.y < 155) { this.y += 1; }
          } else if (this == bact1) {
            if (step1count > 100) {
              bact1 = new component("graphics/step2a.png", 100, 70, 140, 120, "image", "bactArea1");
            } else if (step1count > 70) {
              bact1 = new component("graphics/bact1a.png", 100, 70, 140, 120, "image", "bactArea1");
            } else if (step1count > 40) {
              bact1 = new component("graphics/step2a.png", 100, 70, 140, 120, "image", "bactArea1");
            }
          }
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    cuvette.x += 2;
    cuvetteWater.update(); 
    cuvette.update();
}

//////////////// DRAWING THE CUVETTE //////////////////////
ctx = document.getElementById('cuvette-image').getContext('2d'); 
ctx.canvas.width = 250;
ctx.canvas.height = 200;

  // draw image based on the color of the project  
   var imgBase = new Image();
   imgBase.src= "graphics/cuvette-water.png";
   imgBase.onload = function() {
    ctx.globalAlpha = 1.0; 
      ctx.drawImage(imgBase, 100, 70, 140, 120);
   };

  var clear1 = new Image();
  clear1.src="graphics/cuvette.png";
  clear1.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear1, 0,30, 48, 120)
  };

// TODO: function that moves the cuvette into the water
function transferCuvette() {
  // move it dynamically 
  console.log("TODO: animate cuvette"); 

  // TRIGGER COUNTDOWN 
  var countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (seconds.toString().length < 2) {
      seconds = "0" + seconds; 
    }
    // Display the result in the element with id="demo"
    document.getElementById("cuv-count").innerHTML =  seconds + " S";

    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

//////////////// DRAWING THE INCUBATOR //////////////////////
function drawInc(index) { // options are 1, 2, or 3 
  var color; 
  if (index == 1) {
    color = "yel"; 
  } else if (index == 2) {
    color = "green";
  } else {
    color = "pink"; 
  }
  
  ctx = document.getElementById('incubator-image').getContext('2d');

  // draw image based on the color of the project  
   var imgBase = new Image();
   imgBase.src= "graphics/final-graphics/base.png";
   imgBase.onload = function() {
    ctx.globalAlpha = 1.0; 
      ctx.drawImage(imgBase, 0, 0, 500, 500);
   };

  var clear1 = new Image();
  clear1.src="graphics/final-graphics/clear1.png";
  clear1.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear1, 238,65, 35, 140)
  };

  var clear2 = new Image();
  clear2.src="graphics/final-graphics/clear2.png";
  clear2.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear2, 302,232, 137, 35)
  };

  var clear3 = new Image();
  clear3.src="graphics/final-graphics/clear3.png";
  clear3.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear3, 243, 293, 35, 140);
  };

  var clear4 = new Image();
  clear4.src="graphics/final-graphics/clear4.png";
  clear4.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear4, 67, 236, 137, 35);
  };

  var color1 = new Image();
  color1.src="graphics/final-graphics/" + color + "1.png";
  color1.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color1, 238,65, 35, 140)
  };

  var color2 = new Image();
  color2.src="graphics/final-graphics/" + color + "2.png";
  color2.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color2, 302,232, 137, 35)
  };

  var color3 = new Image();
  color3.src="graphics/final-graphics/" + color + "3.png";
  color3.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color3, 243, 293, 35, 140);
  };

  var color4 = new Image();
  color4.src="graphics/final-graphics/" + color + "4.png";
  color4.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color4, 67, 236, 137, 35);
  };  


  s1 = color1; s2 = color2; s3 = color3; s4 = color4;   
}

function redrawSyringe() {
  ctx.globalAlpha = ctx.globalAlpha + 0.1;
  console.log(ctx.globalAlpha);
  if (ctx.globalAlpha > 0.99) {
    console.log("opaque");
  }
  ctx.drawImage(s1, 238, 65,35,140); 
  ctx.drawImage(s2, 302,232, 137, 35);
  ctx.drawImage(s3, 243, 293, 35, 140);
  ctx.drawImage(s4, 67, 236, 137, 35);
} 

///////////////////// GRAPHS /////////////////////////
var chart1 = new CanvasJS.Chart("vis-1", { 
  title: {
    text: "Syringe 1 OD History Curve"
  },
  data: [
  {
    type: "line",
    dataPoints: [
      { x: 0, y: 0 }, 
    ]
  }
  ]
});

var chart2 = new CanvasJS.Chart("vis-2", { 
  title: {
    text: "Syringe 2 OD History Curve"
  },
  data: [
  {
    type: "line",
    dataPoints: [
      { x: 0, y: 0 }, 
    ]
  }
  ]
});

var chart3 = new CanvasJS.Chart("vis-3", { 
  title: {
    text: "Syringe 3 OD History Curve"
  },
  data: [
  {
    type: "line",
    dataPoints: [
      { x: 0, y: 0 }, 
    ]
  }
  ]
});

var chart4 = new CanvasJS.Chart("vis-4", { 
  title: {
    text: "Syringe 4 OD History Curve"
  },
  data: [
  {
    type: "line",
    dataPoints: [
      { x: 0, y: 0 }, 
    ]
  }
  ]
});

function chooseGraph(index) {
  currChart = index; 
  if (index == 1) {
  if (document.getElementById("vis-1")) {
    $("#vis-2").insertBefore("#vis-1")
    $("#vis-3").insertBefore("#vis-1")
    $("#vis-4").insertBefore("#vis-1")
  };
    chart1.render(); 
  } else if (index == 2) {
    if (document.getElementById("vis-2")) {
    $("#vis-1").insertBefore("#vis-2")
    $("#vis-3").insertBefore("#vis-2")
    $("#vis-4").insertBefore("#vis-2")
  };
    chart2.render(); 
  } else if (index == 3) {
    if (document.getElementById("vis-3")) {
    $("#vis-1").insertBefore("#vis-3")
    $("#vis-2").insertBefore("#vis-3")
    $("#vis-4").insertBefore("#vis-3")
  };
    chart3.render(); 
  } else {
    if (document.getElementById("vis-4")) {
    $("#vis-1").insertBefore("#vis-4")
    $("#vis-2").insertBefore("#vis-4")
    $("#vis-3").insertBefore("#vis-4")
  };
    chart4.render(); 
  }
}

$("#updateDataOD").click(function () {
  if (currChart == 1) {
    var length = chart1.options.data[0].dataPoints.length;
    // chart1.options.title.text = "New DataPoint Added at the end";
    chart1.options.data[0].dataPoints.push({x: getTime(), y: getODRead(1)});
    chart1.render();
  } else if (currChart == 2) {
    var length = chart2.options.data[0].dataPoints.length;
    // chart2.options.title.text = "New DataPoint Added at the end";
    chart2.options.data[0].dataPoints.push({x: getTime(), y: getODRead(2)});
    chart2.render();
  } else if (currChart == 3) {
    var length = chart3.options.data[0].dataPoints.length;
    // chart3.options.title.text = "New DataPoint Added at the end";
    chart3.options.data[0].dataPoints.push({x: getTime(), y: getODRead(3)});
    chart3.render();
  } else if (currChart == 4) {
    var length = chart4.options.data[0].dataPoints.length;
    // chart4.options.title.text = "New DataPoint Added at the end";
    chart4.options.data[0].dataPoints.push({x: getTime(), y: getODRead(4)});
    chart4.render();
  }

});

// RAW SPECTRUM GRAPH - default graph
chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme2", //theme1
    backgroundColor: "#bcc4d1",
    title:{
      text: "Raw Spectrum Readings"              
    },
    // animationEnabled: false,   // change to true
    axisX:{
      title:"Wavelength (nm)",
      minimum: 0,
      maximum: 800
    },
    axisY:{
      title: "Raw A/D Counts",
      minimum: 0,
      maximum: 40000
    },
    data: [              
    {
      type: "line",
    }
    ]
});
chart.render();

 
//////////////// TIMING EVENTS (OD readings) //////////////////////
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
  }, 1)
  }
}

// display temperature of incubator (based on dummy value) 
function disTemp() {
  var pseudoVal = getODRead(1); // dummy value
  pseudoVal = pseudoVal.toFixed(2); 
  document.getElementById('display-temp').innerHTML = "" +pseudoVal + "<br>degrees F";
    setTimeout(function() {
    disTemp();
  }, 1000)
}

///////////////////////// BUTTONS //////////////////////////////
function beginButton() {
  // send message to MQTT Broker 
  var message = new Paho.MQTT.Message("@bml:START;");
  message.destinationName = "machine1/state"; 
  client.send(message); 
}

function stopButton() {
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

/////////////// PAGE NAVIGATION (transitions) ////////////////////
// external link
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