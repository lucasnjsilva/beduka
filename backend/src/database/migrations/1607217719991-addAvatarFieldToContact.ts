import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addAvatarFieldToContact1607217719991
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'contacts',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('contacts', 'avatar');
    }
}
