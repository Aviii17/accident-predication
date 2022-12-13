import { Request, Response, NextFunction } from 'express'
import { IN_PROD } from '../config/app'
/**
 * Not found Middleware
 * @param _req Request
 * @param _res Response
 * @param next NextFunction
 */
const notFound = async (_req: Request, _res: Response, next: NextFunction) => {
  const error: any = new Error('Not Found')
  error.status = 404
  next(error)
}
/**
 * Error handling Middleware
 * @param err ResponseError
 * @param _req Request
 * @param res Response
 * @param _next NextFunction
 * @returns  error: {
      status: number,
      message: string,
      data: any,
      stack: string | null,
    },
 */
const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status || 500)
  console.log(err)
  return res.send({
    error: {
      status: err.status || 500,
      message: err.message || 'Something went wrong',
      data: err.data || '',
      stack: !IN_PROD ? err.stack : null,
    },
  })
}

export { notFound, errorHandler }
