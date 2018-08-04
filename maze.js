// setups the initial variable of the maze
function setupMaze() {
  cols = floor(width / WIDTH);
  rows = floor(height / WIDTH);

  // intializing grid array
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // initialising current box
  current = grid[0];
}

function drawMaze() {
  // show grid
  for(let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // STEP 1
  current.visited = true;
  current.highlight();
  let next = current.checkNeighbours();

  if(next !== undefined) {
    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  }else if(stack.length > 0){
    current = stack.pop();
  }
}

// function to remove walls
function removeWalls(a, b) {
  let x = a.j - b.j;
  if(x === 1) {
    a.walls[LEFT] = false;
    b.walls[RIGHT] = false;
  }else if(x === -1) {
    a.walls[RIGHT] = false;
    b.walls[LEFT] = false;
  }

  let y = a.i - b.i;
  if(y === 1) {
    a.walls[TOP] = false;
    b.walls[BOTTOM] = false;
  }else if(y === -1) {
    a.walls[BOTTOM] = false;
    b.walls[TOP] = false;
  }
}
