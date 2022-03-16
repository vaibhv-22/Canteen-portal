<!-- # Backend has been hosted at
https://venom14-foodapp.herokuapp.com/
# Frontend has been hosted at
venom14.surge.sh -->




## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

* To create a new React app:
```
create-react-app name_of_app
```

* To run the app, cd into the directory and do:
```
npm start
```

## Running the boilerplate

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

* If you use the dockerised mern app or the hosted site , the the commands are:
  - ``` sudo docker-compose up --build``` in the parent directory
  - Then open new terminal and write the command 
  - ``` hostname -I ```
  - paste the Address in the browser followed by ```:3050```
