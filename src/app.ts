import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constants/responseMessage'
import httpError from './utils/httpError'
import helmet from 'helmet'

const app: Application = express()

// to secure the app by setting various http headers
app.use(helmet())
// middleware to get the req body in json format
app.use(express.json())
// to make public folder accessible
app.use(express.static(path.join(__dirname, '../', 'public')))

// routes
app.use('/api/v1',router)

// 404 error handler
app.use((req:Request,_:Response,next:NextFunction)=>{
    try {
        throw new Error(responseMessage.NOT_FOUND('Route'))
    } catch (err) {
        httpError(next,err,req,404)
    }
})

// global error handler
app.use(globalErrorHandler)

export default app
