import { log } from "winston"; 
import { getVualtoTransactionId } from "./vualto-transaction-id";
import { LogLevel, VualtoTransactionId } from "./constants";

export async function logger (level: string, message: string, args?: any) {
    try {
        let transactionId = await getVualtoTransactionId();
        log(level, message, { [VualtoTransactionId.KEY]: transactionId }, args);
    } catch (error) {
        log(LogLevel.ERROR, "cannot log properly! this has been throw while trying to log!", error);
    }    
}

export var expressLoggingLogger = {
    info: async function (...args: any[]) {
        await logger(LogLevel.DEBUG, "expresslogging", args);
    }
}