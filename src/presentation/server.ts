import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const FileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource);
const emailService = new EmailService();

export class Server {

    public static start(){
        
        console.log('Server started...');


        new SendEmailLogs(
            emailService,
            FileSystemLogRepository
        ).execute([
            'juandavid0819@gmail.com',
            'juan.martinezn@uniagustiniana.edu.co'
        ]);

        // const emailService = new EmailService(FileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs([
        //     'juandavid0819@gmail.com',
        //     'juan.martinezn@uniagustiniana.edu.co'
        // ])

        // CronService.createJob(
        //     '*/5 * * * * *', 
        //     () => {
        //         const url = 'http://localhost:3000';

        //         new CheckService(
        //             FileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //             ).execute(url);
        //     }
        // )
    }


}