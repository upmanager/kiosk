## install

>composer install

change .env.example to .env
 .env

FCM_SENDER_ID=     // firebase cloud message sender id

FCM_SERVER_KEY=   // firebase cloud message server key


MAIL_MAILER=smtp                   // send email

MAIL_HOST=smtp.gmail.com

MAIL_PORT=587

MAIL_USERNAME=

MAIL_PASSWORD=

MAIL_ENCRYPTION=tls


login with google account what send email to users.

and then open next link.

https://accounts.google.com/b/0/displayunlockcaptcha

https://www.google.com/settings/security/lesssecureapps

https://g.co/allowaccess


>php artisan migrate

>php artisan db:seed

>php artisan passport:install

>php artisan serve


run with [http://localhost:8000](http://localhost:8000)

## Test
super admin

user name: 	admin@material.com

password: 	****