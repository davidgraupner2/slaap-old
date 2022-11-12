/* Create the base table, which all other tables inherit from */
CREATE TABLE root.base
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    created timestamp with time zone NOT NULL DEFAULT Now(),
    updated timestamp with time zone NOT NULL,
    PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS root.base
    OWNER to postgres;

COMMENT ON TABLE root.base
    IS 'The base table for all platform tables.';

COMMENT ON COLUMN root.base.id
    IS 'Uniquely identifies any record in the platform';

COMMENT ON COLUMN root.base.created
    IS 'Indicates the date/time the record was created';

COMMENT ON COLUMN root.base.updated
    IS 'Indicates the date/time the record was last updated';