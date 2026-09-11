const conway = (set) => {
  title("Conway's Game of Life")

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      const alive = get(x, y);
      const neighbors = countNeighbors(x, y);

      if (alive) {
        // Survive with 2 or 3 neighbors
        set(x, y, (neighbors===2 || neighbors=== 3) ? 1 : 0);
      } else {
        // Be born with 3 neighbors
        set(x, y, neighbors===3 ? 1 : 0);
  } } }

}