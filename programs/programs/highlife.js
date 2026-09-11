const highlife = () => {

// B36/S23
// very similar variation on conway

  title("Highlife")

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      const alive = get(x, y);
      const neighbors = countNeighbors(x, y);

      if (alive) {
        // Survive with 2 or 3 neighbors
        set(x, y, (neighbors===2 || neighbors=== 3) ? 1 : 0);
      } else {
        // Be born with 3 or 6 neighbors
        set(x, y, (neighbors===3 || neighbors=== 6) ? 1 : 0);
  } } }
}


// Most simple patterns behave the same as in Conway's Life.
// There is a simple replicator in Highlife:

// ...OOO.
// ..O..O.
// .O...O.
// .O..O..
// .OOO...

