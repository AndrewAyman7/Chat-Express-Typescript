import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTablesNames1742678769039 implements MigrationInterface {
    name = 'UpdateTablesNames1742678769039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mssgs" RENAME TO "message"`);
        await queryRunner.query(`ALTER TABLE "room_members" RENAME TO "room-member"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);
        await queryRunner.query(`ALTER TABLE "rooms" RENAME TO "room"`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME TO "mssgs"`);
        await queryRunner.query(`ALTER TABLE "room-member" RENAME TO "room_members"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);
        await queryRunner.query(`ALTER TABLE "room" RENAME TO "rooms"`);
    }

}
