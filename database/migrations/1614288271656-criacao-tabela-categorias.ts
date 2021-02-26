import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class criacaoTabelaCategorias1614288271656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "categorias",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "nome",
                    type: "varchar(100)",
                    isNullable: false
                },
                {
                    name: "valor_previsto",
                    type: "numeric(10,2)",
                    isNullable: false,
                    default: 0
                },
                {
                    name: "tipo",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "eh_inativo",
                    type: "boolean",
                    isNullable: false,
                    default: false
                },
                {
                    name: "usuario_id",
                    type: "int",
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["usuario_id"],
                    referencedTableName: "usuarios",
                    referencedColumnNames: ["id"],
                    onUpdate: "cascade",
                    onDelete: "cascade"                   
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categorias");
    }

}
