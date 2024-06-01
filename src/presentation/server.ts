import { LogSeverityLevel } from "../domain/entities/log.entity";
import { ChecksService } from "../domain/use-cases/checks/check-service";
import { ChecksServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email-service';


const fsLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl( 
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl( 
    new PostgresLogDatasource(),
);

const emailService = new EmailService();


export class Server {
    

    public static async start() {

        console.log('Server started...');

        //? Send Email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(['bornit00@gmail.com', 'alghenny@hotmail.com']);
        // emailService.sendEmailWithFileSystemLogs(['bornit00@gmail.com', 'alghenny@hotmail.com']);

        // const logs = await LogRepository.getLogs(LogSeverityLevel.high);
        // console.log( logs )

        // Check Service Status
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new ChecksServiceMultiple( 
        //             [ fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log( `${ url } is ok` ),
        //             ( error ) => console.error( error ),
        //          ).execute( url );
        //         // new ChecksService().execute( 'http://localhost:3000' );

        //     }
        // );

    }

}