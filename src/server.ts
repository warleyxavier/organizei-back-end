require("dotenv").config();

import "reflect-metadata";

import app from "./core/config/ServidorHTTP";
import conectorBancoDados from "./core/config/ConfiguradorConexaoBancoDados";

async function bootstrap() {
    await conectorBancoDados();
    require("./core/config/InjectImports");

    console.log("Conexão estabelecida com o banco de dados <3 ...")

    const PORTA_PADRAO: number = 3000;
    app.listen(process.env.PORT || PORTA_PADRAO, console.log(`Servidor executando na porta ${process.env.PORT || PORTA_PADRAO} <3 ...`))
}

bootstrap();