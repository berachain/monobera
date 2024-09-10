export const initEruda = () => {
  // Check if the window object exists and if it's in a development environment
  if (typeof window !== "undefined") {
    const eruda = require("eruda");
    eruda.init();
  }
};
