# NFTicket

### Introduction to NFTicket

NFTicket is a plaform to purchase and store tickets securely on your phone. It improves upon the old ticket vendor model by implementing blockchain technology for the security and accessibility of your tickets. Our users spend less time managing their tickets and more time enjoying their events!

## Usage

#### Run Locally 

To run this project on your computer you will need a phone and your computer. 

- Go to your project's root folder and run `npm install`.
- Run `npm start` to start your server!
- Download Expo Go app from your phone
- Scan the QR Code using your Expo Go app

### Open Publish App (Android)

If you are using an Android phone you can just simply scan this QR Code from your Expo Go app. 

<img src="static/NFTicket.png">


## Folder structure

This template follows a very simple project structure:
- `navigators`: This folder contains all the routing and the screen structure.
- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store fonts.
  - `components`: Folder to store any common component (such as generic button).
    - `buttons`: Folder that contains a custom Action Button.
    - `cards`: Folder that contains custom Cards.
    - `icons`: Folder that contains all Icons. 
    - `tickets`: Folder that contains all Tickets.
  - `redux`: Folder that contains stuff related to Redux.
    - `actions`: Folder that contains all functions that calls on the backend.
    - `reducers`: Folder that contains data containers.
    - `types`: Folder that contains static types used as a redux action.
  - `screens`: Folder that contains all your application screens/features.
  - `App.js`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.
