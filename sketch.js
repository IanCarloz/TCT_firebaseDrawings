var database;
var drawing = [];

function setup() {
  canvas = createCanvas(200, 200);

  var config = {
    apiKey: "AIzaSyAmyuals0m159WWRgl7YbsDStId6z7aG7g",
    authDomain: "tct-drawingdb.firebaseapp.com",
    databaseURL: "https://tct-drawingdb.firebaseio.com",
    projectId: "tct-drawingdb",
    storageBucket: "",
    messagingSenderId: "571550653960"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  console.log(database);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    var point = {
      x: mouseX,
      y: mouseY
    }
    drawing.push(point);
  }
  beginShape();
  stroke(255);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    vertex(drawing[i].x, drawing[i].y);
  }
}
