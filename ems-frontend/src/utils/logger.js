const isDevelopment =
  import.meta.env.DEV;

export const logger = {
  info: (...args) => {
    if (isDevelopment) {
      console.log("[INFO]", ...args);
    }
  },

  warn: (...args) => {
    if (isDevelopment) {
      console.warn("[WARN]", ...args);
    }
  },

  error: (...args) => {
    if (isDevelopment) {
      console.error("[ERROR]", ...args);
    }
  },
};