import app from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start Express server
    app.listen(ENV.PORT, () => {
      logger.success(`Server is running on http://localhost:${ENV.PORT}`);
      logger.info(`Environment: ${ENV.NODE_ENV}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
