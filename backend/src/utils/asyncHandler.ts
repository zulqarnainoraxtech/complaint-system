import { Request, Response, NextFunction } from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
    // return (req: Request, res: Response, next: NextFunction) => {
  
    // fn(req, res, next)
    //   .then(() => {
    //     // success - do nothing
    //   })
    //   .catch((err) => {
    //     next(err); // send error to middleware
    //   });
  // };
};
