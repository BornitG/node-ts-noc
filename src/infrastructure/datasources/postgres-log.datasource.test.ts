import { PrismaClient } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDatasource } from "./postgres-log.datasource"



describe('postgres-log.datasource.ts PostgresLogDatasource', () => { 

    const prisma = new PrismaClient();

    const postgresLogDatasource = new PostgresLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    })


    test('should create a log', async () => { 

        await postgresLogDatasource.saveLog( log );

    })

    test('should get logs', async () => {

        const logs = await postgresLogDatasource.getLogs( LogSeverityLevel.low );

        expect.arrayContaining( logs )

    })



})