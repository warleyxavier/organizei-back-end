import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class criacaoTabelaMovimentacoesObjetivos1615508189046 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movimentacoes_objetivos",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isNullable: false,
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "tipo",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "valor",
                    type: "numeric(10,2)",
                    default: 0,
                    isNullable: false
                },
                {
                    name: "data",
                    type: "date",
                    isNullable: false,
                },
                {
                    name: "objetivo_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "categoria_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "conta_id",
                    "type": "int"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["objetivo_id"],
                    referencedTableName: "objetivos_financeiros",
                    referencedColumnNames: ["id"],
                    onDelete: "cascade",
                    onUpdate: "cascade"
                },
                {
                    columnNames: ["categoria_id"],
                    referencedTableName: "categorias",
                    referencedColumnNames: ["id"],
                    onUpdate: "cascade"                   
                },
                {
                    columnNames: ["conta_id"],
                    referencedTableName: "contas",
                    referencedColumnNames: ["id"],
                    onUpdate: "cascade"                   
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movimentacoes_objetivos");
    }

}
