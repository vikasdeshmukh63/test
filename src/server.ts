import app from './app'
import config from './config/config'
import logger from './utils/logger';

const server = app.listen(config.PORT)

// to do operation before starting a server we have to do it in following way
;(() => {
    try {
        // databse connection
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
