import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class criacaoTabelaObjetivosFinanceiros1615247876721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "objetivos_financeiros",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isNullable: false,
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "descricao",
                    type: "varchar(200)",
                    isNullable: false
                },
                {
                    name: "valor_da_meta",
                    type: "numeric(10,2)",
                    isNullable: false,
                    default: 0
                },
                {
                    name: "saldo",
                    type: "numeric(10,2)",
                    isNullable: false,
                    default: 0
                },
                {
                    name: "arquivado",
                    type: "boolean",
                    isNullable: false,
                    default: false
                },
                {
                    name: "categoria_resgate_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "categoria_deposito_id",
                    type: "int",
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["categoria_resgate_id"],
                    referencedTableName: "categorias",
                    referencedColumnNames: ["id"],
                    onUpdate: "cascade"                       
                },
                {
                    columnNames: ["categoria_deposito_id"],
                    referencedTableName: "categorias",
                    referencedColumnNames: ["id"],
                    onUpdate: "cascade"                       
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("objetivos_financeiros");
    }

}
