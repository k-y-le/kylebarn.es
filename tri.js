var w, h;
var t1, t2, t3, t4;
var dt;
var rnd1, rnd2, rnd3, rnd4, wrnd, hrnd, crnd, crndPrev, crndPalette;
var coolors;
var numtri;


function setup()
{
  // first = background, second = fill
  coolors = [["#0D1821", "#344966", "#5C946E", "#C9B1BD", "#D5DFE5"], ["#fae3e3","#f7d4bc","#cfa5b4","#c98bb9","#846b8a"], ["#4c6085","#39a0ed","#36f1cd","#13c4a3","#32322c"], ["#a2a79e","#a27e8e","#a77464","#88292f","#2e1e0f"], ["#e89005","#ec7505","#d84a05","#f42b03","#e70e02"], ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#e85d04","#f48c06","#faa307","#ffba08"], ["#004b23","#006400","#007200","#008000","#38b000","#70e000","#9ef01a","#ccff33"], ["#565264","#706677","#a6808c","#ccb7ae","#d6cfcb"], ["#1c1c1c","#daddd8","#ecebe4","#eef0f2","#fafaff"]];
  crndPalette = int(random(0, coolors.length));
  crnd = int(random(0, coolors[crndPalette].length));
  crndPrev = int(random(0, coolors[crndPalette].length));
  while (crndPrev === crnd) {
    crnd = int(random(0, coolors[crndPalette].length));
  }
  numtri = int(random(3, 21));
  t1 = 0;
  t2 = 0;
  t3 = 0;
  t4 = 0;
  dt = random(0.01, 0.001);
  rnd1 = random(10, 80);
  rnd2 = random(10, 80);
  rnd3 = random(10, 80);
  rnd4 = random(10, 80);
  w = windowWidth;
  h = windowHeight;
  wrnd = random(0, w);
  hrnd = random(0, h);
  createCanvas(w,h);
  // saveButton = createButton('save');
  // saveButton.mouseClicked(saveScreen);
};


function draw(){
  clear();
  background(coolors[crndPalette][crndPrev]);

  // draw new ones
  if(frameCount%120==0){
    crndPrev = crnd;
    rnd1 = random(10, 80);
    rnd2 = random(10, 80);
    rnd3 = random(10, 80);
    rnd4 = random(10, 80);
    wrnd = random(0, w);
    hrnd = random(0, h);
    while (crndPrev === crnd) {
      crnd = int(random(0, coolors[crndPalette].length));
    }
  }

  for(let i=1; i<numtri; i++){
    triangle(
      wrnd, hrnd,
      abs(cos(t1+i*rnd1))*w,
      abs(sin(t2+i*rnd2))*h,
      abs(cos(t3+i*rnd3))*w,
      abs(sin(t4+i*rnd4))*h
    );
    // fill(coolors[int((i*coolors.length) / numtri)]);
    var fillcol = color(coolors[crndPalette][crnd]);
    fillcol.setAlpha(200);
    fill(fillcol);
    stroke(coolors[crndPalette][crndPrev]);
  }
  t1 += dt;
  t2 += dt;
  t3 += dt;
  t4 += dt;
}

function saveScreen() {
  saveCanvas('tri', '.png');
}
