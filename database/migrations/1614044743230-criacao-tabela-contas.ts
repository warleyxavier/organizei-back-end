import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class criacaoTabelaContas1614044743230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contas",
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
                    type: "varchar(70)",
                    isNullable: false
                },
                {
                    name: "saldo",
                    type: "numeric(10,2)",
                    default: 0
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
        await queryRunner.dropTable("contas");
    }

}
