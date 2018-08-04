// Finds Paths in Given Maze
function findPath() {
  if(openSet.length > 0) {
    // pop cell with minimimum f-value and push it in closedSet
    minNode = openSet[0];
    for(let i = 0; i < openSet.length; i++) {
      if(minNode.f > openSet[i].f) {
        minNode = openSet[i];
      }
    }

    // traverse through the minNode's getNeighbours
    let neighbours = minNode.getNeighbours();
    console.log(neighbours.length);
    for(let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if(closedSet.includes(neighbour) === false) {
        if(openSet.includes(neighbour) === true) {
          if(neighbour.g > minNode.g + 1) {
            neighbour.g = minNode.g + 1;
            neighbour.previous = minNode;
            neighbour.h = heuristic(neighbour, end);
            neighbour.f = neighbour.g + neighbour.h;
          }
        }else {
          console.log(neighbour);
          neighbour.g = minNode.g + 1;
          neighbour.previous = minNode;
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          console.log("PUSHED");
          openSet.push(neighbour);
        }
      }
    }
    console.log(openSet);
    removeFromArray(openSet, minNode);
    closedSet.push(minNode);
    console.log("AFTER REMOVING");
    console.log(openSet);
  }else {
    console.log(minNode);
    noLoop();
  }
}

// Predicts a heuristic distance between points A and B
function heuristic(a, b) {
  return abs(a.i - b.i) + abs(a.j - b.j);
}

// removes node from arrays
function removeFromArray(list, node) {
  for(let i = list.length-1; i >= 0; i--){
    if(list[i] === node)  list.splice(i, 1);
  }
}
