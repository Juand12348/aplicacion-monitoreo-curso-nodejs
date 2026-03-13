import { error } from "node:console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { url } from "node:inspector";


export class Server {

    public static start(){
        
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *', 
            () => {
                const url = 'http://localhost:3000';

                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                    ).execute(url);
            }
        )
    }


}