mysql -u root -p [abdelkhalek] mysql -e "update user set authentication_string=password(''), 
plugin='mysql_native_password' where user='root';"

