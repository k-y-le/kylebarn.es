var particleNumber = 2750;
var particleSize = between(1.5, 3.5);
var outlineSize = between(0.008, 0.035);

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 20);
        };
})();
// requesting the keyframes

var c = document.getElementById('c');
var ctx = c.getContext('2d');
//context and id of canvas

var w = window.innerWidth;
var h = window.innerHeight;
//width and height of canvas

c.width = w;
c.height = h;
//setting the width and height for canvas

function between(min, max) {
  return Math.random() * (max - min) + min;
}

var particles = [];
// the particles storage

for(i = 0; i < particleNumber; i++) {
  setTimeout(function(){
    particles.push(new createParticle);
  }, i * 12);
  // add a particle (not all at once - setTimeout(); )
}
// adding 55 particles

function createParticle() {
  this.x = c.width / 2;
  this.y = c.height / 2;

  this.angle = between(3, 10);
  this.speed = c.width / 450;

  this.size = particleSize;

  this.nearMouse = false;

  var y = '#e6c229';
  var w = '#e7ecef';
  var r = '#ff4242';
  var g = '#88ab75';
  var b = '#3f88c5';
  var array = [y, w, r, g, b];
	this.color = array[Math.floor(Math.random() * 5)];
}

window.addEventListener("mousemove", function(e) {
  var pos = getMousePos(e);
  var posx = pos.x;
  var posy = pos.y;

  // ctx.clearRect(posx,posy,100,100)
  for (t = 0; t < particles.length; t++) {
    var p = particles[t];
    var dist = Math.hypot(p.x-posx, p.y-posy);

    if (dist < 75) {
      p.nearMouse = true;
    }
    else {
      p.nearMouse = false;
    }
  }
});

window.addEventListener("keypress", function(e) {
  window.location.reload(false);
});

function getMousePos(e) {
    var rect = c.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

function draw(e) {
  requestAnimFrame(draw);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.075)';
  ctx.fillRect(0, 0, c.width, c.height);

  var pos = getMousePos(e);
  var posx = pos.x;
  var posy = pos.y;

  for(t = 0; t < particles.length; t++) {
    var p = particles[t];

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.size, Math.PI * 2, false);
    ctx.fill();

    if (p.nearMouse === false) {
      p.x += Math.cos((Math.PI * 1) + (p.angle) ) * p.speed;
      p.y += Math.sin((Math.PI * 1) + (p.angle) ) * p.speed;
    }
    else {
      p.y += 100000;
    }
    // between .01 and .05
    p.angle += outlineSize;
  }
}

draw();
