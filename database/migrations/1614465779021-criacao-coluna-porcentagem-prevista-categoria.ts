import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class criacaoColunaPorcentagemPrevistaCategoria1614465779021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("categorias", new TableColumn({
            name: "porcentagem_prevista",
            type: "numeric(5,2)",
            isNullable: false,
            default: 0 
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("categorias", "porcentagem_prevista");
    }

}
