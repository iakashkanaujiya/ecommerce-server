import server from './app.js';
import logger from './services/log/winston.js';
import serverConfig from "./config/server.js";

/**
 * @description: Database connection
*/
import connectDB from './services/database/index.js';
connectDB();

/**
 * @description: Server
 * @param: port
*/
const port =  serverConfig.port || 8000;

server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});