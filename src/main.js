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
var f = 2.0; 

// step 1 anime 
function startBacAnim1() {
  // component object params: color, x, y, width, height, type, canvas
    plas1  = new component("graphics/plasmid.png", 10 * f, 10 * f, 20 * f, 20 * f,"image", "bactArea1");
    bact1 = new component("graphics/bact-orig.png", 50 * f, 30 * f, 140 * f, 60 * f, "image", "bactArea1");
    bactArea1.start();
}

var bactArea1 = {
    canvas : document.getElementById('step-1-anime'),
    start : function() {
        step1count = 0; 
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
    plas2 = new component("graphics/plasmid.png", 10 * f, 40 * f, 20 * f, 20 * f,"image", "bactArea2");
    bact2 = new component("graphics/bact-perm.png", 50 * f, 30 * f, 140 * f, 60 * f, "image", "bactArea2");
    bactArea2.start();
}

var bactArea2 = {
    canvas : document.getElementById('step-2-anime'),
    start : function() {
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
    plas3a = new component("graphics/plasmid.png", 70 * f, 40 * f, 20 * f, 20 * f,"image", "bactArea3");
    plas3b = new component("graphics/plasmid.png", 70 * f, 40 * f, 20 * f, 20 * f,"image", "bactArea3");
    plas3c = new component("graphics/plasmid.png", 70 * f, 40 * f, 20 * f, 20 * f,"image", "bactArea3");
    plas3d = new component("graphics/plasmid.png", 70 * f, 40 * f, 20 * f, 20 * f,"image", "bactArea3");
    bact3 = new component("graphics/bact-orig.png", 50 * f, 30 * f, 140 * f, 60 * f, "image", "bactArea3");
    bactArea3.start();
}

var bactArea3 = {
    canvas : document.getElementById('step-3-anime'),
    start : function() {
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


//////////////// CUVETTE ANIMATION #1 //////////////////////
var cuv1, cuvWa1;
var ctx1 = document.getElementById('cuv-anim-1').getContext('2d'); 

// draw start image
var cuvImage1 = new Image();
var cuvWatImage1 = new Image();
cuvImage1.src="graphics/cuvette.png";
cuvWatImage1.src= "graphics/cuvette-water.png";
cuvImage1.onload = function() {
  ctx1.drawImage(cuvWatImage1, 100 * f, 70 * f, 140 * f, 120 * f);
  ctx1.drawImage(cuvImage1, 0 * f,30 * f, 48 * f, 120 * f);
};

function startCuv1() {
    cuv1 = new component("graphics/cuvette.png", 0 * f, 30 * f, 48 * f, 120 * f,"image", "areaCuv1");
    cuvWa1 = new component("graphics/cuvette-water.png", 100 * f, 70 * f, 140 * f, 120 * f, "image", "areaCuv1");
    areaCuv1.start();
}

var areaCuv1 = {
    canvas : document.getElementById('cuv-anim-1'),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateAreaCuv1, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateAreaCuv1() {
    areaCuv1.clear();
    cuv1.x += 2;
    cuv1.update();
    cuvWa1.update(); 
}

function cuvStep1() {
  document.getElementById('cuv-timer-1').innerHTML =
  03 + ":" + 01;
  startTimer1();
}

function startTimer1() {
  var presentTime = document.getElementById('cuv-timer-1').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  // if(m<0){alert('timer completed')}
  // if (m < 0) {
  //   document.getElementById('cuv-timer-1').innerHTML = "done!!!!! no";
  // } else {
  document.getElementById('cuv-timer-1').innerHTML = m + ":" + s;
  // }
  
  setTimeout(startTimer1, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

//////////////// CUVETTE ANIMATION #2 //////////////////////
// description: heat shock. cuvette heat up must be represented 
var cuv2, cuvWa2, hotWa2, thermReg, thermHot;
var thermAlpha = 0.0; 
var ctx2 = document.getElementById('cuv-anim-2').getContext('2d'); 

// draw start image
var cuvImage2 = new Image();
var cuvWatImage2 = new Image();
var hotWatImage2 = new Image();
var thermImage2 = new Image(); 
var thermHotImage2 = new Image(); 
cuvImage2.src="graphics/cuvette.png";
cuvWatImage2.src= "graphics/cuvette-water.png";
hotWatImage2.src = "graphics/hot-water.png";
thermImage2.src = "graphics/therm.png";
thermHotImage2.src = "graphics/hot-therm.png"
cuvImage2.onload = function() {
  ctx2.drawImage(cuvImage2, 140 * f,30 * f, 48 * f, 120 * f);
  ctx2.drawImage(cuvWatImage2, 100 * f, 70 * f, 140 * f, 120 * f);
  ctx2.drawImage(hotWatImage2, 105 * f, 75 * f, 140 * f, 120 * f);
  ctx2.drawImage(thermImage2, 10 * f, 10 * f, 20 * f, 50 * f); 
  // ctx2.globalAlpha = 0.4; 
  // ctx2.drawImage(thermHotImage2, 15* f, 15 * f, 20 * f, 50 * f); 
  // ctx2.globalAlpha = 1.0;
};

function startCuv2() {
    cuv2 = new component("graphics/cuvette.png", 140 * f, 30 * f, 48 * f, 120 * f,"image", "areaCuv2");
    cuvWa2 = new component("graphics/cuvette-water.png", 100 * f, 70 * f, 140 * f, 120 * f, "image", "areaCuv2");
    hotWa2 = new component("graphics/hot-water.png", 105 * f, 75 * f, 140 * f, 120 * f, "image", "areaCuv2");
    thermReg = new component("graphics/therm.png", 10 * f, 10 * f, 20 * f, 50 * f, "image", "areaCuv2");
    thermHot = new component("graphics/hot-therm.png", 15 * f, 15 * f, 20 * f, 50 * f, "image", "areaCuv2");
    areaCuv2.start();
}

var areaCuv2 = {
    canvas : document.getElementById('cuv-anim-2'),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateAreaCuv2, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateAreaCuv2() {
    areaCuv2.clear();
    cuv2.update();
    cuvWa2.update(); 
    hotWa2.update();
    thermReg.update();
    thermHot.update();
}

function cuvStep2() {
  document.getElementById('cuv-timer-2').innerHTML =
  03 + ":" + 01;
  startTimer2();
}

function startTimer2() {
  var presentTime = document.getElementById('cuv-timer-2').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  document.getElementById('cuv-timer-2').innerHTML = m + ":" + s;
  setTimeout(startTimer2, 1000);
}

//////////////// CUVETTE ANIMATION #3 //////////////////////
var cuv3, cuvWa3;
var ctx3 = document.getElementById('cuv-anim-3').getContext('2d'); 

// draw start image
var cuvImage3 = new Image();
var cuvWatImage3 = new Image();
cuvImage3.src="graphics/cuvette.png";
cuvWatImage3.src= "graphics/cuvette-water.png";
cuvImage3.onload = function() {
  ctx3.drawImage(cuvImage3, 50 * f,30 * f, 48 * f, 120 * f);
  ctx3.drawImage(cuvWatImage3, 10 * f, 70 * f, 140 * f, 120 * f);
};

function startCuv3() {
    cuv3 = new component("graphics/cuvette.png", 50 * f, 30 * f, 48 * f, 120 * f,"image", "areaCuv3");
    cuvWa3 = new component("graphics/cuvette-water.png", 10 * f, 70 * f, 140 * f, 120 * f, "image", "areaCuv3");
    areaCuv3.start();
}

var areaCuv3 = {
    canvas : document.getElementById('cuv-anim-3'),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateAreaCuv3, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateAreaCuv3() {
    areaCuv3.clear();
    cuv3.x += 2;
    cuv3.update();
    cuvWa3.update(); 
}

///////////// COMPONENT OBJECT USED FOR ANIMATON /////////////////
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
          if (this == cuv1) {
            if (this.x > 140 * f) {this.x = 140 * f; }
          }
          else if (this == cuv2) {
          //   if (this.x > 140 * f) {this.x = 140 * f; }
          }
          else if (this == cuv3) {
            if (this.x > 170 * f) {this.x = 170 * f; }
          }
          else if (this == plas2) {
            if (this.x > 70 * f) { this.x = 70 * f; }
          } 
          else if (this == plas3b) {
            if (this.x < 100 * f) { this.x += 1 * f; }
            if (this.y > 35 * f) {this.y -= 1 * f; }
          } 
          else if (this == plas3c) {
            if (this.x > 60 * f) { this.x -= 1 * f; }
            if (this.y < 65 * f) { this.y += 1 * f; }
          } 
          else if (this == plas3d) {
            if (this.x < 90 * f) { this.x += 1 * f; }
            if (this.y < 60 * f) { this.y += 1 * f; }
          } 
          else if (this == bact1) {
            if (step1count > 100) {
              bact1 = new component("graphics/bact-perm.png", 50 * f, 30 * f, 140 * f, 60 * f, "image", "bactArea1");
            } else if (step1count > 70) {
              bact1 = new component("graphics/bact-orig.png", 50 * f, 30 * f, 140 * f, 60 * f, "image", "bactArea1");
            } else if (step1count > 40) {
              bact1 = new component("graphics/bact-perm.png", 50 * f, 30 * f, 140 * f, 60 * f, "image", "bactArea1");
            }
          }
          else if (this == hotWa2) {
            thermAlpha += .01; 
            ctx2.globalAlpha = thermAlpha; 
          }
        } 
        else {
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
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
   imgBase.src= "graphics/final-graphics/base-color.png";
   imgBase.onload = function() {
    ctx.globalAlpha = 1.0; 
      ctx.drawImage(imgBase, 0, 0, 1000, 1000);
   };

  var clear1 = new Image();
  clear1.src="graphics/final-graphics/clear1.png";
  clear1.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear1, 476, 130, 70, 280);
  };

  var clear2 = new Image();
  clear2.src="graphics/final-graphics/clear2.png";
  clear2.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear2, 604,464, 274, 70);
  };

  var clear3 = new Image();
  clear3.src="graphics/final-graphics/clear3.png";
  clear3.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear3, 486, 586, 70, 280);
  };

  var clear4 = new Image();
  clear4.src="graphics/final-graphics/clear4.png";
  clear4.onload = function() {
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(clear4, 134, 472, 274, 70);
  };

  var color1 = new Image();
  color1.src="graphics/final-graphics/" + color + "1.png";
  color1.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color1, 476, 130, 70, 280);
  };

  var color2 = new Image();
  color2.src="graphics/final-graphics/" + color + "2.png";
  color2.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color2, 604,464, 274, 70);
  };

  var color3 = new Image();
  color3.src="graphics/final-graphics/" + color + "3.png";
  color3.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color3, 486, 586, 70, 280);
  };

  var color4 = new Image();
  color4.src="graphics/final-graphics/" + color + "4.png";
  color4.onload = function() {
    ctx.globalAlpha = 0.0;
    ctx.drawImage(color4, 134, 472, 274, 70);
  };  


  s1 = color1; s2 = color2; s3 = color3; s4 = color4;   
}

function redrawSyringe() {
  ctx.globalAlpha = ctx.globalAlpha + 0.1;
  console.log(ctx.globalAlpha);
  if (ctx.globalAlpha > 0.99) {
    console.log("opaque");
  }
  ctx.drawImage(s1, 238 * 2.0, 65 * 2.0,35 * 2.0,140 * 2.0); // just a factor of 2 
  ctx.drawImage(s2, 302 * 2.0,232 * 2.0, 137 * 2.0, 35 * 2.0);
  ctx.drawImage(s3, 243 * 2.0, 293 * 2.0, 35 * 2.0, 140 * 2.0);
  ctx.drawImage(s4, 67 * 2.0, 236 * 2.0, 137 * 2.0, 35 * 2.0);
} 

///////////////////// GRAPHS /////////////////////////
var chart1 = new CanvasJS.Chart("vis-1", { 
  backgroundColor: "#dee3ed",
  height: 300,
  title: {
    text: "OD HISTORY CURVE: SYRINGE 1",
    fontFamily: "Josefin Sans",
    fontColor: "#98A1AD",
    fontSize: 17
  },
  axisX:{
      title:"TIME (sec)",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#98A1AD",
      minimum: 0,
      maximum: 60
  },
  axisY:{
      title: "OPTICAL DENSITY",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#98A1AD",
      minimum: 0,
      maximum: 60
  },
  data: [
  {
    color: "#98A1AD",
    type: "line",
    dataPoints: [
      { x: 0, y: 0 }, 
    ]
  }
  ]
});

var chart2 = new CanvasJS.Chart("vis-2", { 
  backgroundColor: "#dee3ed",
  height: 300,
  title: {
    text: "OD HISTORY CURVE: SYRINGE 2",
    fontFamily: "Josefin Sans",
    fontColor: "#6c8b98",
    fontSize: 17
  },
  axisX:{
      title:"TIME (sec)",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#6c8b98",
      minimum: 0,
      maximum: 60
  },
  axisY:{
      title: "OPTICAL DENSITY",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#6c8b98",
      minimum: 0,
      maximum: 60
  },
  data: [
  {
    color: "#6c8b98",
    type: "line",
    dataPoints: [
      { x: 0, y: 0 }, 
    ]
  }
  ]
});

var chart3 = new CanvasJS.Chart("vis-3", { 
  backgroundColor: "#dee3ed",
  height: 300,
  title: {
    text: "OD HISTORY CURVE: SYRINGE 3",
    fontFamily: "Josefin Sans",
    fontColor: "#E4AF9A",
    fontSize: 17
  },
  axisX:{
      title:"TIME (sec)",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#E4AF9A",
      minimum: 0,
      maximum: 60
  },
  axisY:{
      title: "OPTICAL DENSITY",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#E4AF9A",
      minimum: 0,
      maximum: 60
  },
  data: [
  {
    color: "#E4AF9A",
    type: "line",
    dataPoints: [
      { x: 0, y: 0 }, 
    ]
  }
  ]
});

var chart4 = new CanvasJS.Chart("vis-4", { 
  backgroundColor: "#dee3ed",
  height: 300,
  title: {
    text: "OD HISTORY CURVE: SYRINGE 4",
    fontFamily: "Josefin Sans",
    fontColor: "#AD9A98",
    fontSize: 17
  },
  axisX:{
      title:"TIME (sec)",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#AD9A98",
      minimum: 0,
      maximum: 60
  },
  axisY:{
      title: "OPTICAL DENSITY",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      titleFontColor: "#AD9A98",
      minimum: 0,
      maximum: 60
  },
  data: [
  {
    color: "#AD9A98",
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
    document.getElementById("updateDataOD").style.backgroundColor = "#98A1AD";
  if (document.getElementById("vis-1")) {
    $("#vis-2").insertBefore("#vis-1")
    $("#vis-3").insertBefore("#vis-1")
    $("#vis-4").insertBefore("#vis-1")
  };
    chart1.render(); 
  } else if (index == 2) {
    document.getElementById("updateDataOD").style.backgroundColor = "#6c8b98";
    if (document.getElementById("vis-2")) {
    $("#vis-1").insertBefore("#vis-2")
    $("#vis-3").insertBefore("#vis-2")
    $("#vis-4").insertBefore("#vis-2")
  };
    chart2.render(); 
  } else if (index == 3) {
    document.getElementById("updateDataOD").style.backgroundColor = "#E4AF9A";
    if (document.getElementById("vis-3")) {
    $("#vis-1").insertBefore("#vis-3")
    $("#vis-2").insertBefore("#vis-3")
    $("#vis-4").insertBefore("#vis-3")
  };
    chart3.render(); 
  } else {
    document.getElementById("updateDataOD").style.backgroundColor = "#AD9A98";
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
    theme: "theme1",
    title:{
      text: "RAW SPECTRUM READING",
      fontFamily: "Josefin Sans",
      fontSize: 20            
    },
    animationEnabled: true,
    axisX:{
      title:"WAVELENGTH (nm)",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
      minimum: 0,
      maximum: 800
    },
    axisY:{
      title: "RAW A/D COUNTS",
      titleFontFamily: "Josefin Sans",
      titleFontSize: 15,
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
    document.getElementById('od-1').innerHTML = "<br>" + pseudoVal;
    setTimeout(function() {
    disRealTimeOD(1);
  }, 1000)
  } else if (sIndex == 2) {
    document.getElementById('od-2').innerHTML = "<br>" + pseudoVal;
    setTimeout(function() {
    disRealTimeOD(2);
  }, 1000)
  } else if (sIndex == 3) {
    document.getElementById('od-3').innerHTML = "<br>" + pseudoVal;
    setTimeout(function() {
    disRealTimeOD(3);
  }, 1000)
  } else {
    document.getElementById('od-4').innerHTML = "<br>" + pseudoVal; 
    setTimeout(function() {
    disRealTimeOD(4);
  }, 1000)
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
