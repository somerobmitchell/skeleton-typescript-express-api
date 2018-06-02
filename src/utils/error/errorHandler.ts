import { Request, Response, NextFunction} from "express";

export let notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    var err: any = new Error("Not Found");
    err.status = 404;
    next(err);
};

export let errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let responseBody = {
        message: err.message,
        error: {}
    };

    if (process.env.NODE_ENV !== "production") {
        responseBody.error = err;
    }

    res.status(err.status || 500);
    res.json(responseBody);
};
