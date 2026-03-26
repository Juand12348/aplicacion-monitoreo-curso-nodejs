import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallback = (error: string) => void;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback : SuccessCallBack,
        private readonly errorCallback : ErrorCallback
    ){}


    private callLogs (log: LogEntity){
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log);
        })
    }

    async execute(url: string): Promise <boolean>{


        try{
            const logE = {
                message: `Service ${url}`,
                level: LogSeverityLevel.low, 
                origin: "check-service.ts"
            }
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity(logE);
            this.callLogs(log);
            this.successCallback();
          
            return true;

        }catch(error){
            console.log(`${error}`);
            const logE = {
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: "check-service.ts"
            }
            const log = new LogEntity(logE);
            this.callLogs(log);

            this.errorCallback(`${error}`);
            return false;
        }


    }

}