export enum LogSeverityLevel{
    low= "low",
    medium = 'medium',
    high = 'hing',
}

export interface LogEntityOptions{
    level: LogSeverityLevel;
    message: string;
    createAt?: Date;
    origin: string;
}


export class LogEntity{

    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions){
        const { level, message, createAt, origin  } = options;
        this.message = message;
        this.level = level;
        this.createAt = new Date();
        this.origin = origin;
    }
 
    static fromJson = (json: string): LogEntity => {
        const { message, level, createAt , origin} = JSON.parse(json);

        const log = new LogEntity({message, level, createAt, origin});
        log.createAt = new Date(createAt);
        return log;
    }

}