import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs"



describe('send-email-logs.ts SendEmailLogs Use case', () => {

    const mockRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockRepository,
    );

    const to = 'bornit00@gmail.com';

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should return true if email is sent', async() => { 

        const wasExecuted = await sendEmailLogs.execute( to );

        expect( wasExecuted ).toBe( true );
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledWith( to );
        expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts",
        });

    });

    test('should return false if email was not sent', async() => { 

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

        const wasExecuted = await sendEmailLogs.execute('');

        expect( wasExecuted ).toBe( false );
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalled();
        expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-email-logs.ts",
        });

    });    



})