import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// @payloadcms/storage-s3 3.92 adds a `_objectKey` field to upload collections.
// The users.reset_password_requested_at column was already added in 20261023_182038.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}
