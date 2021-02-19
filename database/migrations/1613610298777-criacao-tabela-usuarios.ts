import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class criacaoTabelaUsuarios1613610298777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: "usuarios",
            columns:[
                {
                    name: "id",
                    type: "int",
                    isNullable: false,
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "nome_completo",
                    type: "varchar(100)",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar(50)",
                    isNullable: false,
                },
                {
                    name: "senha",
                    type: "varchar(200)",
                    isNullable: false,
                },
                {
                    name: "data_registro",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("usuarios");
    }

}
