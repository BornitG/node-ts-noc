# NOC Project

NOC project created using clean arquitecture with TypeScript

# dev
1. Clone the .env.template to .env
2. Configure the enviroment variables.
3. Execute the command ```npm install```
4. Get Database running with the command
    ```
    docker compose up -d
    ```
5. Execute the command
    ```
    npx prisma migrate dev
    ```
6. Execute ```npm run dev```
