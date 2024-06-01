
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}


export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    //"{ "level": "high", "message": "Hello World", "createdAt": "12346548945665", origin: "log.entity.js" }"
    static fromJson = ( json: string): LogEntity => {
        json = ( json === '' ) ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });

        return log;

    };

    static fromObject = ( object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });
        return log;
    }

}
