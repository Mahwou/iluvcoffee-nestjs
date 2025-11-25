import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1764099403518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("ALTER TABLE flavor RENAME COLUMN name TO names");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("ALTER TABLE flavor RENAME COLUMN names TO name");
    }

}
