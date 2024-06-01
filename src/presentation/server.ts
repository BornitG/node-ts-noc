import { ChecksService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email-service';


const fileSystemLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
);

const emailService = new EmailService();


export class Server {
    

    public static start() {

        console.log('Server started...');

        //? Send Email
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository,
        ).execute(['bornit00@gmail.com', 'alghenny@hotmail.com']);
        // emailService.sendEmailWithFileSystemLogs(['bornit00@gmail.com', 'alghenny@hotmail.com']);

        // Check Service Status
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com'
                new ChecksService( 
                    fileSystemLogRepository,
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.error( error ),
                 ).execute( url );
                // new ChecksService().execute( 'http://localhost:3000' );

            }
        );

    }

}