import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallback = (error: string) => void;


export class CheckService implements CheckService{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback : SuccessCallBack,
        private readonly errorCallback : ErrorCallback
    ){}


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
            this.logRepository.saveLog(log);
            this.successCallback();
          
            return true;

        }catch(error){
            console.log(`${error}`);
            const logE = {
                message: `${error}`,
                level: LogSeverityLevel.low,
                origin: "check-service.ts"
            }
            const log = new LogEntity(logE);
            this.logRepository.saveLog(log);

            this.errorCallback(`${error}`);
            return false;
        }


    }

}