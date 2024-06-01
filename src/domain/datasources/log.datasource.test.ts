import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource"



describe('log.datasource.ts LogDataSource', () => { 

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-messsage',
        level: LogSeverityLevel.low
    })

    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should test the abstract class', async() => { 

        const mockLogDataSource = new MockLogDatasource();

        expect( mockLogDataSource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDataSource.saveLog ).toBe( 'function' );
        expect( typeof mockLogDataSource.getLogs ).toBe( 'function' );

        await mockLogDataSource.saveLog( newLog );
        const logs = await mockLogDataSource.getLogs( LogSeverityLevel.high );
        expect( logs ).toHaveLength(1);
        expect( logs[0] ).toBeInstanceOf( LogEntity );

    })


})