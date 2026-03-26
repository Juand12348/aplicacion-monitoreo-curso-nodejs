import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSorce } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource
    // new MongoLogDataSorce(),
    //new PostgresLogDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSorce()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)


const logsDatasource = [fsLogRepository, mongoLogRepository, postgresLogRepository];

const emailService = new EmailService();

export class Server {

    public static start(){
        
        console.log('Server started...');


        // new SendEmailLogs(
        //     emailService,
        //     FileSystemLogRepository
        // ).execute([
        //     'juandavid0819@gmail.com',
        //     'juan.martinezn@uniagustiniana.edu.co'
        // ]);

        // const emailService = new EmailService(FileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs([
        //     'juandavid0819@gmail.com',
        //     'juan.martinezn@uniagustiniana.edu.co'
        // ])

        CronService.createJob(
             '*/5 * * * * *', 
              () => {
                  const url = 'https://google.com';

                  new CheckServiceMultiple(
                      logsDatasource,
                      () => console.log(`${url} is ok`),
                      (error) => console.log(error)
                      ).execute(url);
              }
         ) 
    }


}