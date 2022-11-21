-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(1024) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;

COMMENT ON TABLE public."user"
    IS 'Main User Table';

-- Table: public.root

-- DROP TABLE IF EXISTS public.root;

CREATE TABLE IF NOT EXISTS public.root
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone NOT NULL DEFAULT now(),
    created_by bigint NOT NULL,
    updated_by bigint NOT NULL,
    CONSTRAINT root_pkey PRIMARY KEY (id),
    CONSTRAINT created_by FOREIGN KEY (created_by)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT updated_by FOREIGN KEY (updated_by)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.root
    OWNER to postgres;

COMMENT ON TABLE public.root
    IS 'The top level table that all other tables inherit from.';

COMMENT ON COLUMN public.root.created
    IS 'The date/time the record was first created';

COMMENT ON COLUMN public.root.updated
    IS 'The date/time the record was last updated';

COMMENT ON COLUMN public.root.created_by
    IS 'The user that created the record';

COMMENT ON COLUMN public.root.updated_by
    IS 'The user that updated the record last';

-- Table: public.application

-- DROP TABLE IF EXISTS public.application;

CREATE TABLE IF NOT EXISTS public.application
(
    -- Inherited from table public.root: id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    -- Inherited from table public.root: created timestamp with time zone NOT NULL DEFAULT now(),
    -- Inherited from table public.root: updated timestamp with time zone NOT NULL DEFAULT now(),
    -- Inherited from table public.root: created_by bigint,
    -- Inherited from table public.root: updated_by bigint,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT application_pkey PRIMARY KEY (id),
    CONSTRAINT name UNIQUE (name)
        INCLUDE(name)
)
    INHERITS (public.root)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.application
    OWNER to postgres;

-- Make sure ID is a identity column
ALTER TABLE public.application ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 );

COMMENT ON TABLE public.application
    IS 'Stores all application registered on the platform';

COMMENT ON CONSTRAINT name ON public.application
    IS 'Application Names must be unique';