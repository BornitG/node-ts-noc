import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prisma = new PrismaClient();

const severityLevelMatch = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,

}

export class PostgresLogDatasource implements LogDatasource {


    async saveLog(log: LogEntity): Promise<void> {

        const level = severityLevelMatch[ log.level ];

        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level,
            }
        })
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityLevel.toUpperCase();
        const dbLogs = await prisma.logModel.findMany({
            where: {
                level: SeverityLevel[level as keyof typeof SeverityLevel]
            }
        })

        return dbLogs.map(LogEntity.fromObject);

    }

}