import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class criacaoColunaUsuarioObjetivoFinanceiro1615337161339 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("objetivos_financeiros", new TableColumn({
            name: "usuario_id",
            type: "int",
            isNullable: false
        }));

        await queryRunner.createForeignKey("objetivos_financeiros", new TableForeignKey({
            columnNames: ["usuario_id"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["id"],
            onDelete: "cascade",
            onUpdate: "cascade"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("objetivos_financeiros", "usuario_id");
    }

}
