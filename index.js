const os = require('os')
const ip = require('ip')
const path = require('path')
const jsdom = require('jsdom')
const fs = require('fs')
const express = require('express')
const app = express()


// Redefine constants.js with your data
let folder = require('./constants').folder
console.log("Reading media from ", folder)

const port = process.env.PORT || 3000;
let FilePath = "./app/index.html"
var htmlString = fs.readFileSync(FilePath);
var parsedHTML = new jsdom.JSDOM(htmlString)
let contentScript = parsedHTML.window.document.getElementById('content')

const readDirR = require('./syncwalk').readDirFilesTreeSync


function renderHTML() {
    let content = []
    let recursiveFiles = readDirR(folder)
    console.log("Total filenumber detected", recursiveFiles.length)

    for (let file of recursiveFiles) {
        let newP = path.relative(folder,file)
        if (path.extname(newP).match(`.(jpg|png|gif)`))
            content.push({ type: "img", src: newP })
        else
            if (path.extname(newP).match(`.(avi|mp4|webm)`))
                content.push({ type: "vid", src: newP })
    }
    console.log('Total supported content files', content.length)

    contentScript.innerHTML = `let content = ${JSON.stringify(content)}`
}

renderHTML()

app.get("/", (request, response) => {
    let htmlRes = `${parsedHTML.serialize()}`
    response.send(htmlRes)
});

app.get("/admin", (request, response) => {
    console.log("Admin panel request from ", request.ip)

    if (`::ffff:127.0.0.1` === request.ip) {
        console.log("Access confirmed.. Passing control..")
        response.send("You have access")
    } else {
        response.send("You are not an admin")
    }
});

// Supported media content
app.get("/*.(jpg|jpeg|png|webm|gif|mp4|avi)", (request, response) => {
    try {
        // Support of utf-8 pathes (cyrillic as an example)
        let encoded = decodeURI(request.url)
        response.sendFile(path.join(folder, encoded))
    }
    catch (e) {
        console.log("access to unexisting file from user ", request.ip)
        response.send("No such file")
    }
});

app.get("/*.css", (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' })
    cssText = fs.readFileSync(path.join(__dirname, "app", path.basename(request.url)), 'utf8')
    response.write(cssText)
    response.end()
});

app.get("/*.js", (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/javascript' })
    jsText = fs.readFileSync(path.join(__dirname, "app", path.basename(request.url)), 'utf8')
    response.write(jsText)
    response.end()
});


app.listen(port, function () {
    console.log(`Server running on port ${port}`);
    console.log("Server global adress", ip.address(), ":", port)
});