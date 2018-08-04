// Constructor function for Cell
function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  // Variables for A* Pathfinding
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.previous = undefined;  // previous is used to trace back the final path

  // showing cell on the board
  this.show = function(color) {
    let x = this.j * WIDTH;
    let y = this.i * WIDTH;

    stroke(255);
    if(this.walls[TOP])
      line(x, y, x + WIDTH, y);
    if(this.walls[RIGHT])
      line(x + WIDTH, y, x + WIDTH, y + WIDTH);
    if(this.walls[BOTTOM])
      line(x + WIDTH, y + WIDTH, x, y + WIDTH);
    if(this.walls[LEFT])
      line(x, y + WIDTH, x, y);
    if(this.visited) {
      noStroke();
      if(color) fill(color);
      else fill(255, 0, 255, 100);
      rect(x, y, WIDTH, WIDTH);
    }
  }

  // getNeighbours
  this.getNeighbours = function() {
    let neighbours = [];

    let top    = grid[index(i-1, j)];
    let right  = grid[index(i, j+1)];
    let bottom = grid[index(i+1, j)];
    let left   = grid[index(i, j-1)];

    if(top !== undefined && this.walls[TOP] === false)    neighbours.push(top);
    if(right !== undefined && this.walls[RIGHT] === false)  neighbours.push(right);
    if(bottom !== undefined && this.walls[BOTTOM] === false) neighbours.push(bottom);
    if(left !== undefined && this.walls[LEFT] === false)   neighbours.push(left);

    return neighbours;
  }

  this.checkNeighbours = function() {
    // create neighbours arrays
    let neighbours = [];

    let top    = grid[index(i-1, j)];
    let right  = grid[index(i, j+1)];
    let bottom = grid[index(i+1, j)];
    let left   = grid[index(i, j-1)];

    if(top && !top.visited)
      neighbours.push(top);

    if(right && !right.visited)
      neighbours.push(right);

    if(bottom && !bottom.visited)
      neighbours.push(bottom);

    if(left && !left.visited)
      neighbours.push(left);

    if(neighbours.length > 0) {
      let r = floor(random(0, neighbours.length));
      return neighbours[r];
    }else {
      return undefined;
    }
  }

  this.highlight = function() {
    let x = this.j * WIDTH;
    let y = this.i * WIDTH;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, WIDTH, WIDTH);
  }
}

// converts index in 2D array to index in 1D array
function index(i, j) {
  if(i < 0 || j < 0 || i >= rows || j >= cols)  return -1;
  return (i*cols + j);
}
