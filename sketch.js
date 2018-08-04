/****************
*   CONSTANTS
****************/
const WIDTH = 30;
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const DRAWING = 0;
const FINDING = 1;

/***********************
*   GLOBAL VARIABLES
************************/
let cols, rows; // number of rows and cols
let grid = [];  // grid
let current;  // current node during creation of maze
let status; // current status of program, drawing maze or finding path
let stack = []; // stack for drawing maze
let start;  // starting point for A* pathfinding algorithm
let end;  // ending point for A* pathfinding algorithm
let path = [];
let openSet = [];
let closedSet = [];
let minNode;

/***************
*   DRAW CODE
****************/
function setup() {
  createCanvas(600, 600);

  // set status of board to be DRAWING
  status = DRAWING;

  //setup maze
  setupMaze();

  start = grid[0];  // starting point in A* pathfinding
  end = grid[rows*cols - 1];  // ending point in A* pathfinding

  minNode = start;
  openSet.push(start);  // initialising openSet with start node
  start.opened = true;  // indicate that start is in the openSet now
}

function draw() {
  background(51);

  // draw the maze or finds the path
  if(status === DRAWING) {
    drawMaze();

    if(current === grid[0]) {
      status = FINDING;
    }
  }else if(status === FINDING){
    drawMaze();
    findPath();

    path = []
    let temp = minNode;
    path.push(temp);
    while(temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

    for(let i = 1; i < path.length; i++) {
      let prev = path[i-1];
      let yeh = path[i];

      strokeWeight(4);
      stroke(color(0, 255, 0));
      line(prev.j*WIDTH + WIDTH/2, prev.i*WIDTH + WIDTH/2, yeh.j*WIDTH + WIDTH/2, yeh.i*WIDTH + WIDTH/2);
      strokeWeight(1);
    }

    if(minNode === end) {
      console.log("DONE");
      noLoop();
    }
  }
}
