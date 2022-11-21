-- Insert the Root User into the Users Table
INSERT INTO public."user"(username, password) 
    VALUES ('root@localhost','$argon2id$v=19$m=65536,t=3,p=4$hdC3gp/MFc6qIA6JujZqJA$KllHlfOoeZ+hnuiSblYvYALD8AiHyILFSEDbJHUC4ro');

-- Insert the Root Application inot the Application Table
INSERT INTO public.application(created_by, updated_by, name)
    VALUES ((select id from public."user" where username='root@localhost'), (select id from public."user" where username='root@localhost'), 'Root');