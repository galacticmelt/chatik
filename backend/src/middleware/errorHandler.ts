import { NextFunction, Request, Response } from "express"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err){
    res.status(500).json({error: err.message})
  }
}
