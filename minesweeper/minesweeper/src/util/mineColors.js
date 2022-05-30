// This function randomises the color of the bombs
export const mineColor = () => {
  let colors = ["orange", "darkred", "red", "maroon", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};
