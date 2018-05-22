import * as express from "express";

export let setErrorHandling = (express: express.Application) => {
    express.use((req: express.Request, res: express.Response, next: Function) => {
        var err: any = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    express.use((err: any, req: express.Request, res: express.Response, next: Function) => {
        let responseBody = {
            message: err.message,
            error: {}
        };

        if (process.env.NODE_ENV !== "production") {
            responseBody.error = err;
        }

        res.status(err.status || 500);
        res.json(responseBody);
    });
};
