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
2. Create Aurelia SPA
3. Merge Client with Server
4. Customize gulp web server processing
5. Add Member model in the loopback server app
6. Add basic CRUD in Aurelia SPA

### Step 1. Create loopback server app with Yeoman.

'''
npm install -g strongloop
'''


## FAQs

### What is Open-Austin?

### What is a CMS?

### How can I help?

## Contact

- email: projects@marcopineda.com

- twitter: @marcoapineda13
