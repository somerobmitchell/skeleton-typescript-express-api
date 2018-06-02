import * as express from "express";
import * as bodyParser from "body-parser";
import * as winston from "winston";
import * as http from "http";
import "winston-loggly-bulk";
import * as expressLogging from "express-logging";
import { createNamespace } from "continuation-local-storage";

import pingRouter from "./routes/ping-router";

import { setVualtoTransactionId } from "./utils/logging/vualto-transaction-id";
import { LogLevel, VualtoTransactionId } from "./utils/logging/constants";
import { expressLoggingLogger } from "./utils/logging/logger";
import { initControllers } from "./controllers/controller-initializer";



class App {
	public express: express.Application;

	private _httpServer: http.Server;
	private _logger: any = null;

	constructor() {
		this.express = express();
		createNamespace(VualtoTransactionId.KEY);
		this._configureLogging();
		this._httpServer = http.createServer(this.express);
		this._httpServer.listen(process.env.PORT)
		winston.info("app started", { "port": process.env.PORT });

		this._middleware();
		this._routes();
	}

	private _middleware(): void {
		this.express.use(setVualtoTransactionId);
		this.express.use(expressLogging(expressLoggingLogger, {policy: "params"}));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

	private _routes(): void {	
		this.express.use("/ping", pingRouter);
		initControllers(this.express);
	}

	private _configureLogging(): void {
		if (process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production") {
			winston.add(winston.transports.Loggly, {
				inputToken: process.env.LOGGLY_TOKEN,
				subdomain: process.env.LOGGLY_SUBDOMAIN,
				tags: [process.env.LOGGLY_TAGS],
				json: true,
				level: process.env.LOGGLY_LEVEL
			});
		} else {
			winston.remove(winston.transports.Console);
			winston.add(winston.transports.Console, {
				timestamp: true,
				level: LogLevel.DEBUG,
				colorize: true
			});
		}
	}
}

export default new App().express;