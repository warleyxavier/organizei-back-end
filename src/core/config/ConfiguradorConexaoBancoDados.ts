import { createConnection } from "typeorm";

const conectorBancoDados = async () => {
    await createConnection({
        name: "default",
        type: "postgres",
        host: process.env.BANCO_DADOS_HOST,
        database: process.env.BANCO_DADOS_BANCO,
        port: parseInt(process.env.BANCO_DADOS_PORTA),
        username: process.env.BANCO_DADOS_USUARIO,
        password: process.env.BANCO_DADOS_SENHA,
        entities: [__dirname + "/../../modulos/**/entity/**/impl/*{.ts,.js}"],
        dropSchema: false,
        synchronize: false,
        logging: "all"
    });
}

export default conectorBancoDados;