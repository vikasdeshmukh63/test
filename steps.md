A. install husky iwth lint-staged
        1. npm i husky lint-staged -D
        2. npx husky init
        3. we will get pre-commit file where we will write what we need to do precommit it has a text npm test
        4. now if we will commit anything on git then first the npm test will run

B. setup Typescript
        1. npm i typescript -D
        2. we have to add typescript config with npx tsc --init
        3. make following setup in tsconfig.json
                target:es2016
                module:commonjs
                rootDir:"./src",
                outDir:"./dist" or "./build"
                removeComments:true
                esModuleInterop:true
                forConsistantcasingiffileNames:true
                strict:true
                noImplicitAny:true
                stictFunctionTypes:true
                strictPropertyInitialization:true
                alwaysStrict:true
                noUnusedLocals:true
                noUnusedParameters:true
                noImplecitReturns:true
        4. npm i -D @types/node
        5. npm i ts-node -D (ts-node is a TypeScript execution engine for Node.js. It allows you to run TypeScript code directly without having to compile it to JavaScript first.)

C. setup nodemon and change scripts
        npm i nodemon -D

D. setup build script
        dist":"npx tsc" (it will compile ts and create a js files)

E. folder structure

        (IN SRC folder)
        --config >
                  config.ts
        --constants >
                     application.ts
                     responseMessage.ts 
        --controller >
                      apiController.ts
        --model > 
                 model.ts
        --router >
                  router.ts
        --services >
        --types > 
                 types.ts
        --utils >
                 quicker.ts(for most used utils)
                 errorObject.ts
                 httpError.ts
                 httpResponse.ts
        --middleware >
                      globalErrorHandler.ts
        --view >

        (OUTSIDE SRC FOLDER AT ROOT LEVEL)
        --script > 
        --nginx >
                 http.conf
                 https.conf 
        --logs >
        --public >
        --test >
        --docker >
                  Dockerfile
        .env.development
        .env.production
        .env.example
        README.md
        nodemon.json (for development)
        ecosystem.config.js (for deployemt in production)

F. Commit lint (used for validation for commit msg)
        1. npm i @commitlint/cli @commitlint/config-conventional -D

        2. create commit-msg file of shell scripting in .husky/commit-msg and add following rule init
                ```#!/user/bin/env sh
                . "$(dirname -- "$0")/_/husky.sh"
                npx --no-install commitlint --edit "$1"```

        3. create a commitlint.config.js file in root dir and add following rules
                ```module.exports = {
                                        extends: ["@commitlint/cli", "@commitlint/config-conventional"],
                                         rules: {
                                                "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]],
                                                "subject-case": [2, "always", "sentence-case"],
                                                },
                                    };```

G. eslint setup
        1.npm install --save-dev eslint @eslint/js typescript typescript-eslint
        2. create in root eslint.config.js (create eslint.config.mjs to use commonjs modules)
        3. put the following in the eslint.config.js
                ```// @ts-check

                        import eslint from '@eslint/js';
                        import tseslint from 'typescript-eslint';

                        export default tseslint.config(
                        eslint.configs.recommended,
                        tseslint.configs.recommended,
                        );```
        4. to make eslint work in commonjs module we have to enter following
                ```// @ts-check

                        import eslint from '@eslint/js';
                        import tseslint from 'typescript-eslint';

                        export default tseslint.config({
                                languageOptions:{
                                        parserOptions:{
                                                project:true,
                                                tsconfigRootDir:import.meta.dirname
                                        }
                                },
                                files:["**/*.ts"],
                                extends:[
                                        eslint.configs.recommended,
                                        ...tseslint.configs.recommendedTypeChecked,
                                        ],
                                rules:{
                                        "no-console":"error", // to show error if there are any console.logs in the code
                                        quotes:["error","single",{allowTemplateLiterals:true}]
                                }
                                })```
        5. now run npx eslint . you will see the eslint error in the terminal
        6. add the following scripts in the package.json
                "lint": "eslint", (for linting)
                "lint:fix":"eslint --fix", (for possible fixes for lint errors)

H. setting up lint-staged
        1. after liscence add following in the package.json
                "lint-staged":{
                                "*.ts":[
                                        "npm run lint:fix"
                                        ]
                                },
        2. add following into .husky/pre-commit
                ```#!/usr/bin/env sh
                . "${dirname -- "$0"}/_/husky.sh"

                npx lint-staged```
        3. now if you try to commit without following the eslint rules you will get errors in console

I. setting up prettier
        1. npm install --save-dev --save-exact prettier
        2. create file .prettierrc in root
        3. add prettier rules in this file

J. binding eslint and prettier together so they can work together
        1. npm install --save-dev eslint-config-prettier
        2. go to eslint.config.mjs
                import eslintConfigPrettier from 'eslint-config-prettier'
                now add the eslintConfigPrettier in the extend array 
        3. now eslint and prettier will work together
        4. create scripts in package.json
                 "format:check":"prettier . --check",
                 "format:fix":"prettier . --fix",
        5. add  "npm run format:fix" in lint-staged script in package.json
        6. now prettier will check and format the code before pushing to github

K. project enviornment setup
        1. we will use dotenv-flow package for it npm i dotenv-flow
        2. we wil use cross-env pacakge for to detect and set NODE_ENV variable npm i cross-env
        3. now make change in dev script and make sure that you have .env.development file
                        "dev": "cross-env NODE_ENV=development nodemon src/server.ts",
        4. now make change in the start script and make sure that you have .env.production file
                        "start": "cross-env NODE_ENV=production node dist/server.js",
        5. now add the required variables in the all the .env files
                        ```# general
                        ENV=production
                        PORT=3000
                        SERVER_URL=http://localhost:3000

                        # database
                        DATABASE_URL=postgres://localhost:5432/your_database```
        6. go to /config/config.ts and add following 
                import dotenvFlow from 'dotenv-flow'

                dotenvFlow.config()

                export default {
                        // general
                        ENV: process.env.ENV,
                        PORT: process.env.PORT,
                        SERVER_URL: process.env.SERVER_URL,

                        // database
                        DATABASE: process.env.DATABASE_URL
                }

L. setup nodemon config
        1. go to nodemon.json file and add some configuration
                ```{
                        "ext":".ts",
                        "ignore":["dist","node_modules"]
                }```

M. setup express.js
        1. npm i express
        2. npm i @types/express -D
        3. go in app.ts and add following
                ```import express, { Application } from "express";

                const app:Application = express()

                export default app```
        4. go to server.ts and then add following
                ```import app from './app'
                import config from './config/config'

                const server = app.listen(config.PORT)

                // to do operation before starting a server we have to do it in following way
                ;(() => {
                    try {
                        // databse connection
                        console.info(`APPLICATION STARTED`, {
                            meta: {
                                PORT: config.PORT,
                                SERVER_URL: config.SERVER_URL
                            }
                        })
                    } catch (err) {
                        console.error(`APPLICATION ERROR`, {
                            meta: {
                                err
                           }
                       })

                       // closing the server and handeling error if there is any
                    server.close((error)=>{
                           if(error){
                             console.error(`APPLICATION ERROR`,{meta:error})
                           }

                           process.exit(1)
                       })
                   }
                })()```
        5. there will be more setup we can refer code for that

N. setup response and request structure
        1. go to /types/types.ts and add like following example 
                export type THttpResponse = {
                        success:boolean
                        statusCode:number
                        request:{
                                ip?:string | null
                                method:string
                                url:string
                        },
                        message:string
                        data:unknown
                        }
        2. go to /utils/httpResponse.ts and create a structured response using a function
        3. go to /utils/errorObject.ts and add some structured respones in case of error using a function
        3. go to /utils/httpError.ts to create a structured error response using a function as we are using next in the httpError we are passing the flow to next controller but we dont have any controller to handle the error hence here comes the concept of the global error handler


O. Define constants
        1. go to /constants/application.ts and add required constants
                ```export enum EApplicationEnvironment {
                        DEVELOPMENT = 'development',
                        PRODUCTION = 'production',
                }```
        2. go to /constants/responseMessage.ts
                

P. global error handler
        1. go to /middleware/globalErrorHandler.ts and add a error handler function
        2. go to app.ts and use the global error handler

Q. 404 error handler
        1. go to app.ts and add 404 handler

R. setup logging
        1. npm i winston
        2. go to utils and create a file logger.ts
        
S. source map setup       
        1. npm i source-map-support
        2. npm i @types/source-map-support -D
        3. go to /utils/logger.ts and add following
                ```import * as sourceMapSupport from 'source-map-support'

                // linking trace support
                sourceMapSupport.install()```
T. colorful terminal
        1. npm i colorette

U. database setup(mongodb)
        1. put a connection url in the .env files
        2. npm i mongoose
        3. go to /src/services/databaseService.ts and create connection
        4. go to server.ts file and invoke the database connection function

V. database logger
        1. npm i winston-mongodb
        2. now go to /utils/logger.ts and create a new mongodb transport and add it with other transport in the transports array

X. database migration setup
        1. npm i ts-migrate-mongoose
        2. create a folder at root level called /migrations
        3. create a file /script/migration.js and paster a special script
        4. go to script and then add these scripts
                "migrate:dev":"cross-env MIGRATE_MODE=development node script/migration.js",
                "migrate:prod":"cross-env MIGRATE_MODE=production node script/migration.js"
        5. now if you run the script you have to run it like 
                npm run migrate:dev create nameofmigration
        6. it will create a migration file under /migrations folder also create a new collection in the database called migrations
        7. now the migration state is at start is down and in the file we have two function called up and down
        8. up funciton is something where we write what change we want to do like we want to convert name to first_name and last_name
        9. down function is something where we write the inverse of the up function like to convert first_name and last_name to name
        10. if there is some problem then we will rollback to the previous version of migration
        11. to change the state of migraton we can do it as follows 
                npm run migrate:dev up nameofmigration
        12. to see the listing of our migration
                npm run migrate:dev list
        13. suppose if we delete the migration file from migration folder then if we run prune comman then that perticular migration will get deleted from db as well
                npm run migrate:dev prune

Y. health endpoint
        1. go to /utils/quicker.ts and add following 
                ```import os from 'os'
                import config from '../config/config'

                export default {
                getSystemHealth: () => {
                        return {
                           cpuUsage: os.loadavg(),
                           totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
                          freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
                       }
                    },
                    getApplicationHealth: () => {
                        return {
                            enviornment: config.ENV,
                            uptime: `${process.uptime().toFixed(2)} Second`,
                            memoryUsage: {
                                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
                            }
                        }
                    }
                }```

        2. then simply create a route to 

Z. helmet js
        1. this package is use to do some security settings of server 
        2. npm i helmet
        3. go to app.ts and add following
                // to secure the app by setting various http headers
                app.use(helmet())

ZA. cors setup
        1. npm i cors
        2. npm i @types/cors -D
        3. go to app.ts and add following
                app.use(cors())

ZB. rate limiting setup
        1. npm i rate-limiter-flexible
        2. go to file /config/rate-limiter.ts and add following 
                ```import { Connection } from "mongoose";
                import { RateLimiterMongo } from "rate-limiter-flexible";

                export let rateLimiterMongo: null | RateLimiterMongo = null;

                const DURATION = 60
                const POINTS = 10

                export const initRateLimiter = (mongooseConnection:Connection) => {
                rateLimiterMongo = new RateLimiterMongo({
                        storeClient: mongooseConnection as any,
                        points:POINTS,
                        duration:DURATION
                   })
                }```
        3. now go to server.ts and add following after database connection

                ```initRateLimiter(connection)
                logger.info(`RATE LIMITER INITIALIZED`)```
        4. now create a new middleware for rate limiting
                ```import { NextFunction, Request, Response } from 'express'
                import config from '../config/config'
                import { EApplicationEnvironment } from '../constants/application'
                import { rateLimiterMongo } from '../config/rateLimiter'
                import httpError from '../utils/httpError'
                import responseMessage from '../constants/responseMessage'

                export default (req: Request, _: Response, next: NextFunction) => {
                    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
                        next()
                    }

                    if (rateLimiterMongo) {
                        rateLimiterMongo
                            .consume(req.ip as string, 1)
                            .then(() => {
                               next()
                          })
                       .catch(() => {
                         httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429)
                     })
                }
                }```