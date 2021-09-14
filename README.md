## **reactnd-project-myreads-starter Project** ##

## project intro:

A webApp that connects to BookAPI to display its books in categorized shelves, search books within the server and be able to add them to the shelves.

## project Components:

1. APP : handles the display of the home page and the search page.
2. BooksList : contains the list of names that are displayed in home page as categorzied shelfs
3. Book : holds a single book item and handles its change , display in the home page.

##External Libraries used:

- axios:
	used to make HTTP requests from node js, offers easier handling fot the async get and post requests and has wide browser support.

- react-router-dom:
	handles the routing between home and search pages.

## How to run?

1. In the terminal , go the correct starting directory in 'reactnd-project-myreads-starter':

2. in the terminal , run the following command to install the node modules required by the app, Assuming you have node js installed:
	*$ npm install

3. in the terminal , run the following command for the developement server to run and for the app to start:
	*$ npm start