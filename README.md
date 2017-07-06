# gym-friend
Install https://github.com/isaacs/nave
Then go to the project folder and run `nave auto` to use nave enviroment. The command will install nodejs into the enviroment folder. To leave the enviroment, which is a sub-shell, run `exit`. Remember to use the enviroment before running the following command. To check you are inside the enviroment, run `which node`, it should be inside the `gym-friend-6.11.0` folder.

Run this to install npm packages:
```
npm install
npm install -g aglio@2.3.0
npm install -g dredd@4.1.1
npm install -g express-generator@4.15.0
npm install -g nodemon@1.11.0
```

Then start the server with:
```
node app.js
```

Open `http://localhost:3000/` in browser or run `curl -X GET http://localhost:3000/` in terminaal and you should see the Hello World message.


See app.js and api-description.apib for the API details.
You can use [Atom](https://atom.io/) with [API Blueprint Preview](https://atom.io/packages/api-blueprint-preview) to view api-description.apib.
