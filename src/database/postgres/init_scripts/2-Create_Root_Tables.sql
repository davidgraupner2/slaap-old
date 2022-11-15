/**************************************************************/
/* Create the base table, which all other tables inherit from */
/**************************************************************/
-- Table: root.base

-- DROP TABLE IF EXISTS root.base;

CREATE TABLE IF NOT EXISTS root.base
(
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS root.base
    OWNER to postgres;

COMMENT ON TABLE root.base
    IS 'The base table for all platform tables.';

COMMENT ON COLUMN root.base.created
    IS 'Indicates the date/time the record was created';

COMMENT ON COLUMN root.base.updated
    IS 'Indicates the date/time the record was last updated';

/***********************************************/
/* Create the User Table as a subtable of base */
/* inheriting all fields from the base table   */
/***********************************************/

-- Table: root.User

-- DROP TABLE IF EXISTS root."user";

CREATE TABLE IF NOT EXISTS root."user"
(
    -- Inherited from table root.base: created timestamp with time zone NOT NULL DEFAULT now(),
    -- Inherited from table root.base: updated timestamp with time zone NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    first_name character varying(50) COLLATE pg_catalog."default" NULL,
    last_name character varying(100) COLLATE pg_catalog."default" NULL,
    email_address character varying(250) COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
)
    INHERITS (root.base)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS root."user"
    OWNER to postgres;

COMMENT ON INDEX root.user.email_address;
    IS 'Unique index on the email address (username). All email address must be unique.';

COMMENT ON COLUMN root.user.password_hash
    IS 'Users password stored as a hash';

COMMENT ON COLUMN root.user.id;
    IS 'Uniquely identifies the user on the platform';


CREATE UNIQUE INDEX IF NOT EXISTS email_address
    ON root."user" USING btree
    (email_address COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

