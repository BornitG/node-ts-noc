import { ChecksService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
 )




export class Server {
    

    public static start() {

        console.log('Server started...');

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