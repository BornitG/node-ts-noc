import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRepositoryImpl } from "./log.repository.imp"



describe('log.repository.imp.ts LogRepositoryImpl', () => {

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepositoryImpl = new LogRepositoryImpl(
        mockLogDataSource
    )

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with arguments', async () => {

        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'log.repository.imp.test.ts'
        })
        await logRepositoryImpl.saveLog( log );
        expect( mockLogDataSource.saveLog ).toHaveBeenCalledWith( log );

    })

    test('getLogs should call the datasource with arguments', async () => {

        const severityLevel = LogSeverityLevel.low
        await logRepositoryImpl.getLogs( severityLevel );
        expect( mockLogDataSource.getLogs ).toHaveBeenCalledWith( severityLevel );

    })



})