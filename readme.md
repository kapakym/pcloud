# pCloud - cloud file storage
pCloud - The application is designed for deployment on a home server, cloud file storage

This application is designed for deploying home cloud storage. 
It consists of a server and client part. This application does not store 
information about files in a database, but works with the file system directly, 
which allows you to add files to the storage not only using the client, 
but in any way convenient for you, for example, through the Samba protocol. 
The application allows you to share links with the ability to set the lifetime 
of the link and set a PIN code to access the data.

## Application architecture

### ./client - web interface for interacting with the storage.
    Functionality: 
        - authorization 
        - registration 
        - downloading files 
        - uploading files 
        - deleting files 
        - viewing files

    Stack: 
        - React 
        - Zustand 
        - Tailwind CSS 
        - TypeScript
        - Axios

### ./server - application for interacting with the database and file system of the server
    Functionality: 
        - upload files
         - download files
        - delete files
        - add user in database

    Stack: 
        - Express JS
        - Sequlize JS
        - Node JS

### postgres - database for storing user accounts

### RUN on homeserver
    - To launch the application you will need docker and docker-compose https://docs.docker.com/compose/install/
    - clone repository - git clone https://github.com/kapakym/pcloud.git
    - create folder ./share - cloud storage
    - sudo docker-compose build
    - sudo docker-compose up -d
    - use app in 4000 port
    - first run, go to registration and create first user
    - back login and enter login and password first user
    - the first user does not require confirmation when registering

![pCloud - application](./screen.png)
![pCloud - application](./screen2.png)
