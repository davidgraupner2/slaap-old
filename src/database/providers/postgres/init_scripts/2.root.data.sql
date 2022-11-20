-- Insert the Root User into the Users Table
INSERT INTO public."user"(username, password) 
    VALUES ('root@localhost','r00tP@ssword1#@!');

-- Insert the Root Application inot the Application Table
INSERT INTO public.application(created_by, updated_by, name)
    VALUES ((select id from public."user" where username='root@localhost'), (select id from public."user" where username='root@localhost'), 'Root');