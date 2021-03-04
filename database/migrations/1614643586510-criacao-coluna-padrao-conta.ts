import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class criacaoColunaPadraoConta1614643586510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("contas", new TableColumn({
            name: "eh_padrao",
            type: "boolean",
            isNullable: false,
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("contas", "eh_padrao");
    }

}
