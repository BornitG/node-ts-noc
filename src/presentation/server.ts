import { ChecksService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {
    

    public static start() {

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com'
                new ChecksService( 
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.error( error ),
                 ).execute( url );
                // new ChecksService().execute( 'http://localhost:3000' );

            }
        );

    }

}