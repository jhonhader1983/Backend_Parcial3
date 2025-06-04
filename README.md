el proyecto se basa es un spa donde en este debemos crear roles para despues darles una pequeña descripcion la cual se verá en la base de datos, seguido podemos crear usuarios, en los cuales debemos de llenar la informacion del mismo, 
como por ejemplo identificacion, nombre, apellido, correo electronico, y para finalizar agregarle un rol a este mismo usuario, rol que hemos creado previamente. En el siguiente recuadro tenemos una visualizacion de los roles creados y
los usuarios creados con su respectivo rol. toda esta informacion la podremos visualizar en su respectiva base de datos (Sqlite) 


para abrir el backend debemos de ejecutar una serie de comandos 
-creamos la carpeta package.jason escribiendo en la terminal del proyecto/// 
npm init -y
-agregamos las dependencias con///
nmp install express sqlite3 cors 
-para ejecutar el proyecto y que el backend se ejecute en el puerto 3000 de nuestro host debemos poner 
node server.js
