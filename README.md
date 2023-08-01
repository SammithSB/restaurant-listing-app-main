### Steps to run the project locally

- Install `pnpm` locally using [this](https://pnpm.io/installation)
- Clone the project
- `cd` into the client folder
- create `.env` file and create a variable called `VITE_FOURSQUARE_API_KEY` and add the api key that you have set up in the foursquare dashboard.
- run `pnpm install`
- run `pnpm run dev`
- `cd` into server folder
- create `.env` file and create a variable called `mongo_uri` and add the mongo connection uri from the mongo db atlas.
- run `pnpm run start` to start the backend service.

Once you do both, open the client side link and you will be able to use the web app.


The project tries to demonstrate how we can leverage apis to get a list of restaurants nearby and plot them on a map. To ensure usage of free apis to do all this I have use foursquare api to get a list of restaurants near the user location and react leaflet has been used to plot those restaurants on map. React leaflet is an open source module that allows us to show location on maps. To show the last 10 locations accesed by users, the idea was to use local storage but the issue would be, it would be stored only on the browser from where app was accesed once deployed, so instead I have used mongoDB to store the previous 10 locations. Finally the application has been deployed on vercel.
