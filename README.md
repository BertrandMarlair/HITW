# MyBeCodeV2

Meteor and React to control the Application. 


## Instription

- inscrition pour le staff sur **[MyBeCode](https://my.becode.org)**. Il vous faudra d'abord vous register sur l'application. Une fois fait, contacté bertrand@becode.org pour vous passer en mode admin. Lors d'une nouvelle inscription, il faudra créer une nouvelle promo (Reservé au "GodMod" => contact bertrand@becode.org).

- inscrition pour student sur **[MyBeCode](https://my.becode.org)**. **Attention** quand ils s'enregistrent, ils ne doivent pas avoir de forumlaire à compléter (réservé au formateur ou staff). Si ils tombent sur le formulaire, vérifiez l'étape précédente. Un fois inscrit, envoient l'id de leur profile (page profile) à complèter dans le [Deformathor](https://docs.google.com/spreadsheets/d/13ZgAltYnegCp4bePMzp8jGbOdv6-2A-zgAdLM4pprIU/edit?usp=sharing) dans la collone "mybecodeid".

## Starting up my becode on local

First, you need to install:

- Meteor   [https://www.meteor.com/install](https://www.meteor.com/install)
- NodeJS [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- NPM (Installed with NodeJS)

Second, you have to clone the project on your computer :

Go to the forlder and install dependences && start the server : 
````
cd MyBeCodeV2
meteor npm install
meteor
````

## Connecting to MongoDB (MongoDB compass Beta) : 
#### to the local Mongo DB 
settings : 
![setting](./readmeImage/local.png)

#### to the production Mongo DB
use ssh key file from ssh_key forlder
settings : 
![setting](./readmeImage/prod.png)

### SSH
From the "MyBeCodeV2" folder.
```bash
cd ssh_keys
chmod 400 bertrand.pem
ssh -i "bertrand.pem" ubuntu@ec2-3-94-232-64.compute-1.amazonaws.com
```

### Build to prod
install MUP from npm
````
npm install -g mup
````

From the "MyBeCodeV2" folder.
```bash
cd deployProd
mup setup
mup deploy
```

referer to the documentation : [http://meteor-up.com/](http://meteor-up.com/)

### Build to staging
install MUP from npm
````
npm install -g mup
````

From the "MyBeCodeV2" folder.
```bash
cd deployStaging
mup setup
mup deploy
```

referer to the documentation : [http://meteor-up.com/](http://meteor-up.com/)

### How it's work

The AWS server got a NGINX server. There is 3 dockers (MyBeCode) (Talent) (Mongo Database). Two application works with the same databse for get the same real time. For the reason, when you deploy somethings, take care about the databse: mybecode mup config manage the database and Talent, just connect to them.

### BACKUP

Every day at midnight, a cron tab create a backup stored at AWS S3 called backup.mybecode. Each backup as name BecodeProfileManager + date. if you want to restore the database, please follow thos instruction.

First: Connect with SSH to the server.
Second : 
````
docker exec -t mongodb restore ...
// this command (docker exec -t mongodb) connect to the MongoDB Docker and the next it's the normal command to execute
````
For the restore, please follow the instruction [https://docs.mongodb.com/manual/reference/program/mongorestore/#examples](https://docs.mongodb.com/manual/reference/program/mongorestore/#examples).

#### Edit the backup

For the backup cron tab, follow this: 

See action list

Code BASH :
````
crontab -l
````

Remove all actions

````
crontab -r
````

Edit action

````
crontab -e
````

The backup command sh file is 
````
cd /bin
nano backup.sh
````

````
export CONTAINER_NAME="mongodb"
export DATABASE_NAME="BecodeProfileManager"
export BACKUP_LOCATION="/home/mybecode/backups"

export TIMESTAMP=$(date +'%Y%m%d%H%M%S')
echo "Starting Backup..."
docker exec -t ${CONTAINER_NAME} mongodump --out /data/${DATABASE_NAME}-backup-${TIMESTAMP} --db ${DATABASE_NAME}
docker cp ${CONTAINER_NAME}:/data/${DATABASE_NAME}-backup-${TIMESTAMP} ${BACKUP_LOCATION}
mv ${BACKUP_LOCATION}/${DATABASE_NAME} ${BACKUP_LOCATION}/${DATABASE_NAME}${TIMESTAMP}
s3cmd put /home/mybecode/backups/${DATABASE_NAME}${TIMESTAMP} s3://backup.mybecode/ --recursive
find ${BACKUP_LOCATION} -mtime +7 -exec rm {} \;
rm -rf ${BACKUP_LOCATION}
echo "DONE"
````

## Migration
Follow the instsctions [https://github.com/becodeorg/MyBeCodeV2/blob/master/migration.md](https://github.com/becodeorg/MyBeCodeV2/blob/master/migration.md)

## Forlder structure : 

    .meteor
    ________________________________________________________
    * Folder like node_modules for meteor 
        * on the packages file, there is all of the packages only for meteor. Edit    this forlder for add or remove some packages.
        * Don't touch the rest.


    .vscode
    ________________________________________________________
    * Folder contained settings for vscode (useless)

    client
    ________________________________________________________
    * Folder for init client params (load react for exemple) placed on /import/startup/client
        * main.html is the basic html file for ReactJS. He is not contain html tags (it's normal, use by meteor too and it created automaticly).
        * main.js -> import all from startup folder

    DeployProd
    ________________________________________________________
    * Forlder contain deployement production settings
        * mup.js (main settings)
        * settings.json (env variables (not used))
    
    DeployStaging
    ________________________________________________________
    * Forlder contain deployement staging settings
        * mup.js (main settings)
        * settings.json (env variables (not used))

    node_modules
    ________________________________________________________
    * if you don't know what is it, please don't touch before learn a bir node js ;) 

    public
    ________________________________________________________
    * contain file accessing via the url. Normaly with react you can't access to the file just with typing the route on the url exept if it is on the public forlder. ("/assets/background/becode.png")

    readmeimage
    ________________________________________________________
    * only for the readme ^^

    server
    ________________________________________________________
    * Folder for init server params placed on /import/startup/server
        * main.js -> import all from startup folder

    server
    ________________________________________________________
    * Folder for init server params placed on /import/startup/server
        * main.js -> import all from startup folder

    ssh_keys
    ________________________________________________________
    * Folder contain ssh key for connect to the server

    
# access

### install Talent

install node, npm and meteor

````
git clone https://github.com/becodeorg/Talent.git
npm install 
meteor
````

la base de donnée démarre toujours sur le même port que le serveur (+1)
ex: server 3000, DB: 3001

Si vous voulez démarrer Talent avec les information de my.becode en temps réel:

````
cd myBeCodeV2
meteor
cd ..
cd Talent
export MONGO_URL=mongodb://localhost:3001/meteor
meteor --port 3002
````

### For accessing to the server:

install [MUP](http://meteor-up.com/) globaly

````
cd deployStaging
mup help
````
mup ssh -> for enter directly on the server via ssh

see the command bellow.

The ssh key os on the ssh_key folder

### For accessing to the databse. You have to connect to mongoDB

the database is the same for my.becode and Talent

- Hostname: 127.0.0.1
- Port: 27017
- SSH Tunne: Use identity file
- SSH Hostname: my.becode.org
- SSH Tunnel Port: 22
- SSH Username: ubuntu
- SSh Identity file: target ssh file
- SSH Passphrase:  

### deploying

````
cd deployStaging
mup deploy
````

### Firebase

alexandre@becode.org avec access to the firebase account as admin

### role
there is different role for Talent

the is on the database on the profile information

- role:"student" // for juniors
- role:"enterprise" // for extrenal recruteur 
- role:"admin" // for coach or student coordinator
- role:"superadmin" // for the dev
- godmod: true //only for my.becode -> access to all information

### connection

- Juniors connect to Talent with there my becode account -> the need to already be registered
- Recrutor have to create there account via Talent
- Coach and admin have to create an account via my.becode