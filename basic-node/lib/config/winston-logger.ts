const winston = require('winston');
const appRoot = require('app-root-path');

export class WinstonLogger {

	public static winstonLoggerObject: any = null;
	
	constructor() {
		if (!WinstonLogger.winstonLoggerObject) {
			WinstonLogger.CreateLogger();
		}
	}

	public static CreateLogger() {
		if (!this.winstonLoggerObject) {
			let _options = {
			  file: {
			    level: 'info',
			    filename: `${appRoot}/lib/utils/logs/error.log`,
			    handleExceptions: true,
			    json: true,
			    maxsize: 5242880, // 5MB
			    maxFiles: 5,
			    colorize: false,
			  },
			  console: {
			    level: 'debug',
			    handleExceptions: true,
			    json: false,
			    colorize: true,
			  },
			};
			this.winstonLoggerObject = new winston.createLogger({
    			level: 'info',
    			transports : [
    				new winston.transports.File(_options.file),
    				new winston.transports.Console(_options.console)
    			],
    			exitOnError: false
		    });
            this.winstonLoggerObject.stream = {
                write: (message, encoding) => {
                    this.winstonLoggerObject.info(message);
                    }
            } 
    }
		return this.winstonLoggerObject;
	}
}