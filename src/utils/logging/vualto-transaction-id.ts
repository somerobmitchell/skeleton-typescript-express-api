import * as uuid from "uuid";
import { Request, Response, NextFunction } from "express";
import { createNamespace, getNamespace } from "continuation-local-storage";
import { VualtoTransactionId } from "./constants";
import { resolve } from "path";

export function setVualtoTransactionId(request: Request, response: Response, next: NextFunction) {
    let namespace = createNamespace(VualtoTransactionId.NAMESPACE);
    namespace.bindEmitter(request);
    namespace.bindEmitter(response);

    namespace.run(function () {
        let id = namespace.set(VualtoTransactionId.NAMESPACE, uuid["v4"]());
        response.setHeader(VualtoTransactionId.KEY, id);
        next();
    });
}

export function getVualtoTransactionId(): Promise<string> {
    let namespace = getNamespace(VualtoTransactionId.NAMESPACE);
    let promise = new Promise<string>((resolve: (string) => void, reject: (error: Error) => void) => {
        namespace.run(function () {
            try {
                let key = namespace.get(VualtoTransactionId.KEY);
                resolve(key);
            } catch (error) {
                reject(new Error(error));
            }            
        });
    });

    return promise;
}