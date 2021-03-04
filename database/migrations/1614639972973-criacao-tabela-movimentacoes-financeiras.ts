import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class criacaoTabelaMovimentacoesFinanceiras1614639972973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movimentacoes", 
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false
                },
                {
                    name: "descricao",
                    type: "varchar(300)",
                    isNullable: false
                },
                {
                    name: "valor",
                    type: "numeric(10,2)",
                    isNullable: false,
                    default: 0
                },
                {
                    name: "data",
                    type: "timestamp",
                    isNullable: false,
                },
                {
                    name: "ordem",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "categoria_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "conta_id",
                    type: "int",
                    isNullable: false
                },
            ],
            foreignKeys: [
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
                    onUpdate: "cascade",
                    onDelete: "cascade"                     
                }
            ],
            uniques: [
                {
                    columnNames: ["conta_id", "ordem"]
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movimentacoes");
    }

}
