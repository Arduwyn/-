import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_buttons_style" AS ENUM('primary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_industry_tiles_items_icon" AS ENUM('none', 'finance', 'healthcare');
  CREATE TYPE "public"."enum_pages_blocks_numbered_timeline_panel_style" AS ENUM('boxed', 'bare');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_stat_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_numbered_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_labeled_rows_layout" AS ENUM('grid', 'stack');
  CREATE TYPE "public"."enum_pages_blocks_tag_groups_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_terminal_lines_style" AS ENUM('command', 'output', 'success');
  CREATE TYPE "public"."enum_pages_blocks_tool_stages_stages_columns" AS ENUM('1', '2');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_ctas_style" AS ENUM('primary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_buttons_style" AS ENUM('primary', 'ghost');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"style" "enum_pages_blocks_hero_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"body" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_industry_tiles_items_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"muted" boolean
  );
  
  CREATE TABLE "pages_blocks_industry_tiles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_industry_tiles_items_icon" DEFAULT 'none',
  	"title" varchar NOT NULL,
  	"lede" varchar,
  	"link_label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_industry_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_callouts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_platform_tags_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"placeholder" boolean
  );
  
  CREATE TABLE "pages_blocks_platform_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"intro" varchar,
  	"note_tag" varchar,
  	"note_body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"tag" varchar DEFAULT 'Placeholder — to be written',
  	"body" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"meta" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"panel_style" "enum_pages_blocks_numbered_timeline_panel_style" DEFAULT 'boxed',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"number" varchar,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_pages_blocks_feature_cards_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_callout_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar NOT NULL,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"term" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_pages_blocks_stat_grid_columns" DEFAULT '4',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_cards_items_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"title" varchar NOT NULL,
  	"lede" varchar
  );
  
  CREATE TABLE "pages_blocks_product_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_numbered_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"count" varchar,
  	"intro" varchar,
  	"columns" "enum_pages_blocks_numbered_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_labeled_rows_items_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_labeled_rows_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_labeled_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum_pages_blocks_labeled_rows_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tag_groups_groups_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tag_groups_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_tag_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_pages_blocks_tag_groups_columns" DEFAULT '2',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_terminal_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"style" "enum_pages_blocks_terminal_lines_style" DEFAULT 'output'
  );
  
  CREATE TABLE "pages_blocks_terminal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tool_stages_stages_tools_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tool_stages_stages_tools_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tool_stages_stages_tools_guard_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tool_stages_stages_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mod_path" varchar,
  	"title" varchar NOT NULL,
  	"lede" varchar,
  	"wide" boolean,
  	"guard_title" varchar
  );
  
  CREATE TABLE "pages_blocks_tool_stages_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar NOT NULL,
  	"blurb" varchar,
  	"columns" "enum_pages_blocks_tool_stages_stages_columns" DEFAULT '2'
  );
  
  CREATE TABLE "pages_blocks_tool_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"style" "enum_pages_blocks_home_hero_ctas_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"sub" varchar,
  	"show_diagram" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_split_groups_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_split_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_about_split_differentiators" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_about_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"story" varchar,
  	"focus_label" varchar,
  	"focus" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_outcomes_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards_items_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_case_studies_items_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_case_studies_items_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_case_studies_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"vertical" varchar,
  	"title" varchar NOT NULL,
  	"summary" varchar,
  	"cta_label" varchar DEFAULT 'View Case Study',
  	"lede" varchar,
  	"situation" varchar,
  	"outcome" varchar
  );
  
  CREATE TABLE "pages_blocks_case_studies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brief_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"summary" varchar
  );
  
  CREATE TABLE "pages_blocks_brief_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lane_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"for_text" varchar,
  	"receive_label" varchar DEFAULT 'You receive',
  	"receive" varchar,
  	"duration" varchar
  );
  
  CREATE TABLE "pages_blocks_lane_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'FAQ',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"style" "enum_pages_blocks_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Engage',
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lede" ADD CONSTRAINT "pages_blocks_lede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industry_tiles_items_bullets" ADD CONSTRAINT "pages_blocks_industry_tiles_items_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industry_tiles_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industry_tiles_items" ADD CONSTRAINT "pages_blocks_industry_tiles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industry_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industry_tiles" ADD CONSTRAINT "pages_blocks_industry_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_callouts_items" ADD CONSTRAINT "pages_blocks_callouts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_callouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_callouts" ADD CONSTRAINT "pages_blocks_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_platform_tags_tags" ADD CONSTRAINT "pages_blocks_platform_tags_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_platform_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_platform_tags" ADD CONSTRAINT "pages_blocks_platform_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_placeholder" ADD CONSTRAINT "pages_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_timeline_steps" ADD CONSTRAINT "pages_blocks_numbered_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbered_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_timeline" ADD CONSTRAINT "pages_blocks_numbered_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_items" ADD CONSTRAINT "pages_blocks_feature_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards" ADD CONSTRAINT "pages_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_callout_bar" ADD CONSTRAINT "pages_blocks_callout_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_grid_items" ADD CONSTRAINT "pages_blocks_stat_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_grid" ADD CONSTRAINT "pages_blocks_stat_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_cards_items_bullets" ADD CONSTRAINT "pages_blocks_product_cards_items_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_cards_items" ADD CONSTRAINT "pages_blocks_product_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_cards" ADD CONSTRAINT "pages_blocks_product_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_grid_items" ADD CONSTRAINT "pages_blocks_numbered_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbered_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_grid" ADD CONSTRAINT "pages_blocks_numbered_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_labeled_rows_items_tags" ADD CONSTRAINT "pages_blocks_labeled_rows_items_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_labeled_rows_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_labeled_rows_items" ADD CONSTRAINT "pages_blocks_labeled_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_labeled_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_labeled_rows" ADD CONSTRAINT "pages_blocks_labeled_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tag_groups_groups_tags" ADD CONSTRAINT "pages_blocks_tag_groups_groups_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tag_groups_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tag_groups_groups" ADD CONSTRAINT "pages_blocks_tag_groups_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tag_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tag_groups" ADD CONSTRAINT "pages_blocks_tag_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_terminal_lines" ADD CONSTRAINT "pages_blocks_terminal_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_terminal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_terminal" ADD CONSTRAINT "pages_blocks_terminal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tool_stages_stages_tools_bullets" ADD CONSTRAINT "pages_blocks_tool_stages_stages_tools_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tool_stages_stages_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tool_stages_stages_tools_tags" ADD CONSTRAINT "pages_blocks_tool_stages_stages_tools_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tool_stages_stages_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tool_stages_stages_tools_guard_bullets" ADD CONSTRAINT "pages_blocks_tool_stages_stages_tools_guard_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tool_stages_stages_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tool_stages_stages_tools" ADD CONSTRAINT "pages_blocks_tool_stages_stages_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tool_stages_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tool_stages_stages" ADD CONSTRAINT "pages_blocks_tool_stages_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tool_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tool_stages" ADD CONSTRAINT "pages_blocks_tool_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_ctas" ADD CONSTRAINT "pages_blocks_home_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_split_groups_tags" ADD CONSTRAINT "pages_blocks_about_split_groups_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_split_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_split_groups" ADD CONSTRAINT "pages_blocks_about_split_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_split_differentiators" ADD CONSTRAINT "pages_blocks_about_split_differentiators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_split" ADD CONSTRAINT "pages_blocks_about_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_items" ADD CONSTRAINT "pages_blocks_outcomes_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes" ADD CONSTRAINT "pages_blocks_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_items_bullets" ADD CONSTRAINT "pages_blocks_service_cards_items_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_items" ADD CONSTRAINT "pages_blocks_service_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards" ADD CONSTRAINT "pages_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_studies_items_stats" ADD CONSTRAINT "pages_blocks_case_studies_items_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_case_studies_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_studies_items_approach" ADD CONSTRAINT "pages_blocks_case_studies_items_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_case_studies_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_studies_items" ADD CONSTRAINT "pages_blocks_case_studies_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_studies_items" ADD CONSTRAINT "pages_blocks_case_studies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_studies" ADD CONSTRAINT "pages_blocks_case_studies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brief_cards_items" ADD CONSTRAINT "pages_blocks_brief_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brief_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brief_cards" ADD CONSTRAINT "pages_blocks_brief_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lane_cards_items" ADD CONSTRAINT "pages_blocks_lane_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lane_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lane_cards" ADD CONSTRAINT "pages_blocks_lane_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_page_hero_order_idx" ON "pages_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_parent_id_idx" ON "pages_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_path_idx" ON "pages_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_lede_order_idx" ON "pages_blocks_lede" USING btree ("_order");
  CREATE INDEX "pages_blocks_lede_parent_id_idx" ON "pages_blocks_lede" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lede_path_idx" ON "pages_blocks_lede" USING btree ("_path");
  CREATE INDEX "pages_blocks_industry_tiles_items_bullets_order_idx" ON "pages_blocks_industry_tiles_items_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_industry_tiles_items_bullets_parent_id_idx" ON "pages_blocks_industry_tiles_items_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industry_tiles_items_order_idx" ON "pages_blocks_industry_tiles_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_industry_tiles_items_parent_id_idx" ON "pages_blocks_industry_tiles_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industry_tiles_order_idx" ON "pages_blocks_industry_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_industry_tiles_parent_id_idx" ON "pages_blocks_industry_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industry_tiles_path_idx" ON "pages_blocks_industry_tiles" USING btree ("_path");
  CREATE INDEX "pages_blocks_callouts_items_order_idx" ON "pages_blocks_callouts_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_callouts_items_parent_id_idx" ON "pages_blocks_callouts_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callouts_order_idx" ON "pages_blocks_callouts" USING btree ("_order");
  CREATE INDEX "pages_blocks_callouts_parent_id_idx" ON "pages_blocks_callouts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callouts_path_idx" ON "pages_blocks_callouts" USING btree ("_path");
  CREATE INDEX "pages_blocks_platform_tags_tags_order_idx" ON "pages_blocks_platform_tags_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_platform_tags_tags_parent_id_idx" ON "pages_blocks_platform_tags_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_platform_tags_order_idx" ON "pages_blocks_platform_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_platform_tags_parent_id_idx" ON "pages_blocks_platform_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_platform_tags_path_idx" ON "pages_blocks_platform_tags" USING btree ("_path");
  CREATE INDEX "pages_blocks_placeholder_order_idx" ON "pages_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "pages_blocks_placeholder_parent_id_idx" ON "pages_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_placeholder_path_idx" ON "pages_blocks_placeholder" USING btree ("_path");
  CREATE INDEX "pages_blocks_numbered_timeline_steps_order_idx" ON "pages_blocks_numbered_timeline_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_timeline_steps_parent_id_idx" ON "pages_blocks_numbered_timeline_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_timeline_order_idx" ON "pages_blocks_numbered_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_timeline_parent_id_idx" ON "pages_blocks_numbered_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_timeline_path_idx" ON "pages_blocks_numbered_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_cards_items_order_idx" ON "pages_blocks_feature_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_items_parent_id_idx" ON "pages_blocks_feature_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_order_idx" ON "pages_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_parent_id_idx" ON "pages_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_path_idx" ON "pages_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_callout_bar_order_idx" ON "pages_blocks_callout_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_callout_bar_parent_id_idx" ON "pages_blocks_callout_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callout_bar_path_idx" ON "pages_blocks_callout_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_stat_grid_items_order_idx" ON "pages_blocks_stat_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_grid_items_parent_id_idx" ON "pages_blocks_stat_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_grid_order_idx" ON "pages_blocks_stat_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_grid_parent_id_idx" ON "pages_blocks_stat_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_grid_path_idx" ON "pages_blocks_stat_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_cards_items_bullets_order_idx" ON "pages_blocks_product_cards_items_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_cards_items_bullets_parent_id_idx" ON "pages_blocks_product_cards_items_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_cards_items_order_idx" ON "pages_blocks_product_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_cards_items_parent_id_idx" ON "pages_blocks_product_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_cards_order_idx" ON "pages_blocks_product_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_cards_parent_id_idx" ON "pages_blocks_product_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_cards_path_idx" ON "pages_blocks_product_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_numbered_grid_items_order_idx" ON "pages_blocks_numbered_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_grid_items_parent_id_idx" ON "pages_blocks_numbered_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_grid_order_idx" ON "pages_blocks_numbered_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_grid_parent_id_idx" ON "pages_blocks_numbered_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_grid_path_idx" ON "pages_blocks_numbered_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_labeled_rows_items_tags_order_idx" ON "pages_blocks_labeled_rows_items_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_labeled_rows_items_tags_parent_id_idx" ON "pages_blocks_labeled_rows_items_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_labeled_rows_items_order_idx" ON "pages_blocks_labeled_rows_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_labeled_rows_items_parent_id_idx" ON "pages_blocks_labeled_rows_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_labeled_rows_order_idx" ON "pages_blocks_labeled_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_labeled_rows_parent_id_idx" ON "pages_blocks_labeled_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_labeled_rows_path_idx" ON "pages_blocks_labeled_rows" USING btree ("_path");
  CREATE INDEX "pages_blocks_tag_groups_groups_tags_order_idx" ON "pages_blocks_tag_groups_groups_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_tag_groups_groups_tags_parent_id_idx" ON "pages_blocks_tag_groups_groups_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tag_groups_groups_order_idx" ON "pages_blocks_tag_groups_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_tag_groups_groups_parent_id_idx" ON "pages_blocks_tag_groups_groups" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tag_groups_order_idx" ON "pages_blocks_tag_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_tag_groups_parent_id_idx" ON "pages_blocks_tag_groups" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tag_groups_path_idx" ON "pages_blocks_tag_groups" USING btree ("_path");
  CREATE INDEX "pages_blocks_terminal_lines_order_idx" ON "pages_blocks_terminal_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_terminal_lines_parent_id_idx" ON "pages_blocks_terminal_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_terminal_order_idx" ON "pages_blocks_terminal" USING btree ("_order");
  CREATE INDEX "pages_blocks_terminal_parent_id_idx" ON "pages_blocks_terminal" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_terminal_path_idx" ON "pages_blocks_terminal" USING btree ("_path");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_bullets_order_idx" ON "pages_blocks_tool_stages_stages_tools_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_bullets_parent_id_idx" ON "pages_blocks_tool_stages_stages_tools_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_tags_order_idx" ON "pages_blocks_tool_stages_stages_tools_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_tags_parent_id_idx" ON "pages_blocks_tool_stages_stages_tools_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_guard_bullets_order_idx" ON "pages_blocks_tool_stages_stages_tools_guard_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_guard_bullets_parent_id_idx" ON "pages_blocks_tool_stages_stages_tools_guard_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_order_idx" ON "pages_blocks_tool_stages_stages_tools" USING btree ("_order");
  CREATE INDEX "pages_blocks_tool_stages_stages_tools_parent_id_idx" ON "pages_blocks_tool_stages_stages_tools" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tool_stages_stages_order_idx" ON "pages_blocks_tool_stages_stages" USING btree ("_order");
  CREATE INDEX "pages_blocks_tool_stages_stages_parent_id_idx" ON "pages_blocks_tool_stages_stages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tool_stages_order_idx" ON "pages_blocks_tool_stages" USING btree ("_order");
  CREATE INDEX "pages_blocks_tool_stages_parent_id_idx" ON "pages_blocks_tool_stages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tool_stages_path_idx" ON "pages_blocks_tool_stages" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_ctas_order_idx" ON "pages_blocks_home_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_ctas_parent_id_idx" ON "pages_blocks_home_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_split_groups_tags_order_idx" ON "pages_blocks_about_split_groups_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_split_groups_tags_parent_id_idx" ON "pages_blocks_about_split_groups_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_split_groups_order_idx" ON "pages_blocks_about_split_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_split_groups_parent_id_idx" ON "pages_blocks_about_split_groups" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_split_differentiators_order_idx" ON "pages_blocks_about_split_differentiators" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_split_differentiators_parent_id_idx" ON "pages_blocks_about_split_differentiators" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_split_order_idx" ON "pages_blocks_about_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_split_parent_id_idx" ON "pages_blocks_about_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_split_path_idx" ON "pages_blocks_about_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_outcomes_items_order_idx" ON "pages_blocks_outcomes_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcomes_items_parent_id_idx" ON "pages_blocks_outcomes_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcomes_order_idx" ON "pages_blocks_outcomes" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcomes_parent_id_idx" ON "pages_blocks_outcomes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcomes_path_idx" ON "pages_blocks_outcomes" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_cards_items_bullets_order_idx" ON "pages_blocks_service_cards_items_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_items_bullets_parent_id_idx" ON "pages_blocks_service_cards_items_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_items_order_idx" ON "pages_blocks_service_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_items_parent_id_idx" ON "pages_blocks_service_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_order_idx" ON "pages_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_parent_id_idx" ON "pages_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_path_idx" ON "pages_blocks_service_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_studies_items_stats_order_idx" ON "pages_blocks_case_studies_items_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_studies_items_stats_parent_id_idx" ON "pages_blocks_case_studies_items_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_studies_items_approach_order_idx" ON "pages_blocks_case_studies_items_approach" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_studies_items_approach_parent_id_idx" ON "pages_blocks_case_studies_items_approach" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_studies_items_order_idx" ON "pages_blocks_case_studies_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_studies_items_parent_id_idx" ON "pages_blocks_case_studies_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_studies_items_image_idx" ON "pages_blocks_case_studies_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_case_studies_order_idx" ON "pages_blocks_case_studies" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_studies_parent_id_idx" ON "pages_blocks_case_studies" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_studies_path_idx" ON "pages_blocks_case_studies" USING btree ("_path");
  CREATE INDEX "pages_blocks_brief_cards_items_order_idx" ON "pages_blocks_brief_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_brief_cards_items_parent_id_idx" ON "pages_blocks_brief_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brief_cards_order_idx" ON "pages_blocks_brief_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_brief_cards_parent_id_idx" ON "pages_blocks_brief_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brief_cards_path_idx" ON "pages_blocks_brief_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_lane_cards_items_order_idx" ON "pages_blocks_lane_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lane_cards_items_parent_id_idx" ON "pages_blocks_lane_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lane_cards_order_idx" ON "pages_blocks_lane_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_lane_cards_parent_id_idx" ON "pages_blocks_lane_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lane_cards_path_idx" ON "pages_blocks_lane_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_buttons_order_idx" ON "pages_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_buttons_parent_id_idx" ON "pages_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_page_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_lede" CASCADE;
  DROP TABLE "pages_blocks_industry_tiles_items_bullets" CASCADE;
  DROP TABLE "pages_blocks_industry_tiles_items" CASCADE;
  DROP TABLE "pages_blocks_industry_tiles" CASCADE;
  DROP TABLE "pages_blocks_callouts_items" CASCADE;
  DROP TABLE "pages_blocks_callouts" CASCADE;
  DROP TABLE "pages_blocks_platform_tags_tags" CASCADE;
  DROP TABLE "pages_blocks_platform_tags" CASCADE;
  DROP TABLE "pages_blocks_placeholder" CASCADE;
  DROP TABLE "pages_blocks_numbered_timeline_steps" CASCADE;
  DROP TABLE "pages_blocks_numbered_timeline" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_items" CASCADE;
  DROP TABLE "pages_blocks_feature_cards" CASCADE;
  DROP TABLE "pages_blocks_callout_bar" CASCADE;
  DROP TABLE "pages_blocks_stat_grid_items" CASCADE;
  DROP TABLE "pages_blocks_stat_grid" CASCADE;
  DROP TABLE "pages_blocks_product_cards_items_bullets" CASCADE;
  DROP TABLE "pages_blocks_product_cards_items" CASCADE;
  DROP TABLE "pages_blocks_product_cards" CASCADE;
  DROP TABLE "pages_blocks_numbered_grid_items" CASCADE;
  DROP TABLE "pages_blocks_numbered_grid" CASCADE;
  DROP TABLE "pages_blocks_labeled_rows_items_tags" CASCADE;
  DROP TABLE "pages_blocks_labeled_rows_items" CASCADE;
  DROP TABLE "pages_blocks_labeled_rows" CASCADE;
  DROP TABLE "pages_blocks_tag_groups_groups_tags" CASCADE;
  DROP TABLE "pages_blocks_tag_groups_groups" CASCADE;
  DROP TABLE "pages_blocks_tag_groups" CASCADE;
  DROP TABLE "pages_blocks_terminal_lines" CASCADE;
  DROP TABLE "pages_blocks_terminal" CASCADE;
  DROP TABLE "pages_blocks_tool_stages_stages_tools_bullets" CASCADE;
  DROP TABLE "pages_blocks_tool_stages_stages_tools_tags" CASCADE;
  DROP TABLE "pages_blocks_tool_stages_stages_tools_guard_bullets" CASCADE;
  DROP TABLE "pages_blocks_tool_stages_stages_tools" CASCADE;
  DROP TABLE "pages_blocks_tool_stages_stages" CASCADE;
  DROP TABLE "pages_blocks_tool_stages" CASCADE;
  DROP TABLE "pages_blocks_home_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_about_split_groups_tags" CASCADE;
  DROP TABLE "pages_blocks_about_split_groups" CASCADE;
  DROP TABLE "pages_blocks_about_split_differentiators" CASCADE;
  DROP TABLE "pages_blocks_about_split" CASCADE;
  DROP TABLE "pages_blocks_outcomes_items" CASCADE;
  DROP TABLE "pages_blocks_outcomes" CASCADE;
  DROP TABLE "pages_blocks_service_cards_items_bullets" CASCADE;
  DROP TABLE "pages_blocks_service_cards_items" CASCADE;
  DROP TABLE "pages_blocks_service_cards" CASCADE;
  DROP TABLE "pages_blocks_case_studies_items_stats" CASCADE;
  DROP TABLE "pages_blocks_case_studies_items_approach" CASCADE;
  DROP TABLE "pages_blocks_case_studies_items" CASCADE;
  DROP TABLE "pages_blocks_case_studies" CASCADE;
  DROP TABLE "pages_blocks_brief_cards_items" CASCADE;
  DROP TABLE "pages_blocks_brief_cards" CASCADE;
  DROP TABLE "pages_blocks_lane_cards_items" CASCADE;
  DROP TABLE "pages_blocks_lane_cards" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_industry_tiles_items_icon";
  DROP TYPE "public"."enum_pages_blocks_numbered_timeline_panel_style";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_stat_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_numbered_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_labeled_rows_layout";
  DROP TYPE "public"."enum_pages_blocks_tag_groups_columns";
  DROP TYPE "public"."enum_pages_blocks_terminal_lines_style";
  DROP TYPE "public"."enum_pages_blocks_tool_stages_stages_columns";
  DROP TYPE "public"."enum_pages_blocks_home_hero_ctas_style";
  DROP TYPE "public"."enum_pages_blocks_cta_buttons_style";`)
}
