import * as express from "express";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const isDirectory = (path) => { return statSync(path).isDirectory() };

export const getDirectories = (rootPath): string[] => {
    return readdirSync(rootPath)
        .reduce((prev: string[], currentFolderName: string): string[] => { 
            if(isDirectory(join(rootPath, currentFolderName))){
                prev.push(currentFolderName);
            }
            return prev;
        }, []);
}

export const initControllers = (app: express.Application): void => {
    let controllersRootPath = "./dist/controllers";
    getDirectories(controllersRootPath)
    .forEach((controllerName): void => {
        let currentRouterPath = `./${controllerName}/${controllerName}-router`;
        import controlerName from currentRouterPath;
        let currentRouter = require(currentRouterPath);
        app.use("/" + controllerName, currentRouter);
    });
}