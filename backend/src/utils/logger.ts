const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const getTimestamp = (): string => {
  return new Date().toISOString();
};

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`${colors.cyan}[INFO]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
  },

  success: (message: string, ...args: any[]) => {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
  },

  warn: (message: string, ...args: any[]) => {
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
  },

  error: (message: string, ...args: any[]) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
  },

  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`${colors.blue}[DEBUG]${colors.reset} ${getTimestamp()} - ${message}`, ...args);
    }
  },
};
