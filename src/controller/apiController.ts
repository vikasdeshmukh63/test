import { NextFunction, Request, Response } from 'express';
import responseMessage from '../constants/responseMessage';
import httpError from '../utils/httpError';
import httpResponse from '../utils/httpResponse';
import quicker from '../utils/quicker';

export default {
    self: (req:Request, res:Response,next:NextFunction) => {
        try {
            throw new Error('erroorrr')
            httpResponse(req,res,200,responseMessage.SUCCESS)
        } catch (err) {
            httpError(next,err,req,500)
        }
    },
    health: (req:Request, res:Response,next:NextFunction) => {
        try {
            const healthData = {
                application:quicker.getApplicationHealth(),
                system:quicker.getSystemHealth(),
                timestamp:Date.now()
            }
            httpResponse(req,res,200,responseMessage.SUCCESS,healthData)
        } catch (err) {
            httpError(next,err,req,500)
        }
    }
}