# OA_CMS
OA_CMS is a CMS tool developed for Open-Austin

## Tech Used

Client side we are using [Aurelia](http://aurelia.io/), a front-end framework.

Server side we are using [Loopback]("http://loopback.io/"), an ExpressJS solution for REST APIs.

Also using [Yeoman]("http://yeoman.io/"), a scaffolding tool that will help us setup a basic structure for the application while helping us extend the application to various administrative scenarios.

## Overview

The Process in a nutshell:

- create the server side project (the Loopback NodeJs express app) with yeoman
- create the client side Aurelia SPA project (in a seperate folder apart from the server project)
- copy the aurelia app in the client folder of the server project
- do a small tweak on the Gulp webserver processing
- add a model (in our case a customer model) in the loopback app
- add a corresponding basic crud scenario in the aurelia app
- start the server and gulp watch the client and enjoy.

## Getting Started

1. Create loopback server with Yeoman
2. Create Aurelia Single Page Application (SPA)
3. Merge Client with Server
4. Customize gulp web server processing
5. Add Member model in the loopback server app
6. Add basic CRUD in Aurelia SPA

### Step 1. Create loopback server app with Yeoman.

*Make sure you have npm and nodeJS installed*

Install loopback via strongloop:
```
npm install -g strongloop
```
Install Yeoman using npm:
```
npm install -g yo
```
Install Yeoman loopback generator:
```
npm install -g generator-loopback
```
Run the Yeoman scaffolding tool for generating the app:
```
yo loopback
```

*Test your app by starting the app*
```
node server/server.js
```

### Step 2. Create the Aurelia SPA
*Caution!*
We will use yeoman again for setting up the SPA's base structure, however it's important that we do this in a folder completely separate from the previous step.

Ultimately, we will move the Aurelia spa in the client folder of the loopback app, however we can not generate the application in this folder.

*Note: make sure the following has been installed for this step; yeoman Aurelia generator, gulp and jspm*

```
 mkdir new-folder
```
cd into new-folder, make sure you have the yeoman aurelia generator installed and run:
```
yo aurelia
```
*Test the app by running:*

```
gulp watch
```
*navigate to localhost://9000 to view your app*

### Step 3. Merge Client with Server
Copy the doc folder from your aureilia-app to the client folder in loopback app


## FAQs

### What is Open-Austin?

### What is a CMS?

### How can I help?

## Contact

- email: projects@marcopineda.com

- twitter: @marcoapineda13
