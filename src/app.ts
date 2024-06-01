import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";
import { Server } from "./presentation/server";




(async() => {
    await main();  
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'LOW',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // })

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'LOW'
    //     }
    // });
    // console.log( logs )

    Server.start();
}