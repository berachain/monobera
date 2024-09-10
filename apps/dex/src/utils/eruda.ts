export const initEruda = () => {
  // Check if the window object exists and if it's in a development environment
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    const eruda = require("eruda");
    eruda.init();
  }
};
