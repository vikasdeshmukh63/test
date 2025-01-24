import app from './app'
import config from './config/config'
import databaseServices from './services/databaseServices';
import logger from './utils/logger';

const server = app.listen(config.PORT)

// to do operation before starting a server we have to do it in following way
// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async() => {
    try {
        // database connection
      const connection = await databaseServices.connect();
        logger.info(`DATABASE CONNECTED`, {
            meta:{
                CONNECTION_NAME:connection.name,
            }
        })

        logger.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error(`APPLICATION ERROR`, {
            meta: {
                err
            }
        })

        // closing the server and handeling error if there is any
        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION ERROR`, { meta: error })
            }

            process.exit(1)
        })
    }
})()
