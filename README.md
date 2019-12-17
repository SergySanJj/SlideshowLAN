# Slideshow Streaming
Slideshow photo and video streaming

## How to run and use
You need to have installed ``node-js`` on your machine and also ``npm``
To check that use 
```node --v```

and 
```npm --v```

If something like version prints out you can go to the next step, else install node and npm

Go to the folder with cloned repo and run

```npm i```

This command will download all dependencies for Slideshow Streaming module

Then go to the ```constants.js``` file and change absolute path to folder which will be streamed

Then run
```npm run start```

This command starts server on port 3000, go to ```localhost:3000/``` to check,
If something gone wrong probably there is another program using this port, stop this programm or change default port in  ```constants.js``` file

Now you should have slideshow in your browser with media files from selected folder
