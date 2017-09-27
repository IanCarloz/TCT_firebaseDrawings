var database;
var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup() {
  canvas = createCanvas(200, 200);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

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

  var ref = database.ref('drawings');
  ref.on('value', gotData, errData);

}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background(0);

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }
  stroke(255);
  strokeWeight(4);
  noFill();

  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name: "Ian",
    drawing: drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status) {
    console.log(status);
  }
}

function gotData(data) {

  // clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // console.log(key);
    var li = createElement('li', ' ');
    li.class('listing');
    var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing() {
  var key = this.html();
  var ref = database.ref('drawings/'+key);

  ref.on('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbDrawing = data.val();
    drawing = dbDrawing.drawing
    // console.log(drawing);
  }
}

function clearDrawing() {
  drawing = [];
}
