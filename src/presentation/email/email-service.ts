import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';


export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[]
}

export interface Attachement {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter =  nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    })

    constructor() {}

    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options

        try {
            
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            })

            // console.log( sendInformation );

            return true;
        } catch (error) {

            return false;
        }

    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor'
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>{"message":"Service https://google.com working","level":"low","createdAt":"2024-05-31T21:29:00.564Z"}</p>
        <p>Ver logs adjuntos</p>
        `;

        const attachements: Attachement[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
        ]

        return this.sendEmail({
            to, subject, attachements, htmlBody
        });


    }



}
