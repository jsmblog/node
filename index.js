
import express from 'express';
import cors from "cors";
import { PORT } from './src/config/config.js';
import  { RouterUsuer } from './src/router/userRouter.js';
import { aiRouter } from './src/router/airouter.js';
import { sequelize } from "./src/db/conexion.js";

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', RouterUsuer);
app.use('/api',aiRouter);
const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false })
        app.listen(_PORT,'0.0.0.0', () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

