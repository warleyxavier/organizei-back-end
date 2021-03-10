import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class criacaoColunaPrazoObjetivoFinanceiro1615339094175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("objetivos_financeiros", new TableColumn({
            name: "prazo",
            type: "date",
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
