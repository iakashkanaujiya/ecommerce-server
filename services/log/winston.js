import winston from "winston";

const logger = new winston.createLogger({
    level: "http",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({filename: "logs/error.log", level: "error"}),
        new winston.transports.File({filename: "logs/http.log", level: "http"}),
        new winston.transports.File({ filename: "logs/combined.log"}),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
};

export default logger;