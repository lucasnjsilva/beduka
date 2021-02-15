import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateContactAddress1607194421570
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'address',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'number',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'contact_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ContactAddress',
                        columnNames: ['contact_id'],
                        referencedTableName: 'contacts',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('address');
    }
}
