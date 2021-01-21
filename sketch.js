let dino;
let dImg;
let cImg;
let bImg;
let cactus = [];
let soundClassifier;

function preload() {
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  dImg = loadImage('dino.png');
  cImg = loadImage('cactus.png');
  bImg = loadImage('desert.jpg');
}

function mousePressed() {
  cactus.push(new Cactus());
}

function setup() {
  createCanvas(800, 450);
  dino = new Dino();
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == 'up') {
    dino.jump();
  }
}

function keyPressed() {
  if (key == ' ') {
    dino.jump();
  }
}

function draw() {
  if (random(1) < 0.005) {
    cactus.push(new Cactus());
  }

  background(bImg);
  for (let c of cactus) {
    c.move();
    c.show();
    if (dino.hits(c)) {
      console.log('game over');
      noLoop();
    }
  }

  dino.show();
  dino.move();
}