import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class criacaoColunaPadraoCategoria1614643860491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("categorias", new TableColumn({
            name: "eh_padrao",
            type: "boolean",
            isNullable: false,
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("categorias", "eh_padrao");
    }

}
