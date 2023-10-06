# AI Colour Generator / Picker Tool

## Description

An OpenAI powered colour picking utility built using Vite, React and TypeScript.

The App constructs a suitable prompt using the users input that then returns a JSON object with the requested colour information.

Results can be copied to local clipboard as JSON data and pasted into a code editor for use.

### NOTE: This is a demo project only. Never put Open AI API keys inside a production frontend client application. Instead create a backend API to contact Open AI and relay the response back to the client app using any required authorisation method

![intro view](images/intro.png) ![loading view](images/loading.png)  
![response view1](images/response.png) ![response view1](images/response2.png)

## Set-up

Clone the project and install all dependencies using npm install.

Create an Open API API key from your Open API account.

Copy the example.env file to .env in the project root and paste the API key value in.

From the command line run  

```
 npm run dev
```

This will start up up the VITE dev server and serve the app from localhost:5173

## TO DO

- Add option to connect to local dockerized Node.js backend service to contact Open AI and remove need for OpenAI API key in the App. See <https://github.com/piyook/open-ai-backend>
