require("dotenv").config();

import "reflect-metadata";

import "./core/config/InjectImports";

import app from "./core/config/ServidorHTTP";
import conectorBancoDados from "./core/config/ConfiguradorConexaoBancoDados";

async function bootstrap() {
    await conectorBancoDados();
    console.log("Conexão estabelecida com o banco de dados <3 ...")

    const PORTA_PADRAO: number = 3000;
    app.listen(process.env.PORTA || PORTA_PADRAO, console.log(`Servidor executando na porta ${process.env.PORTA || PORTA_PADRAO} <3 ...`))
}

bootstrap();