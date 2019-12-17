if (content.length === 0) {
    console.error("Content list is empty")
}

let contentContainer = document.getElementsByClassName('disp-box')

const leftContent = document.getElementById('leftBlock')
const centerContent = document.getElementById('centerBlock')
const rightContent = document.getElementById('rightBlock')


let prev = Math.floor(Math.random() * content.length);
let currentShow = Math.floor(Math.random() * content.length);
let next = Math.floor(Math.random() * content.length);

function step() {
    prev = currentShow
    currentShow = next
    next = Math.floor(Math.random() * content.length);


    let leftVal = content[prev]
    let centerVal = content[currentShow]
    let rightVal = content[next]

    assignContent(leftContent, leftVal)
    assignContent(centerContent, centerVal)
    assignContent(rightContent, rightVal)
}

function assignContent(element, contentVal) {
    if (contentVal.type === "img")
        element.innerHTML = `<img src="${contentVal.src}">`
    // to autoplay video in Chrome we need to mute it
    else if (contentVal.type === "vid")
        element.innerHTML = `<video laysinline autoplay muted loop><source src="${contentVal.src}"></video>`
}

let timeout;

window.onkeypress = (e) => {
    console.log(e.keyCode)
    // W key - forward slideshow
    if (e.keyCode == '100') {
        if (timeout) {
            console.log("next")
            clearTimeout(timeout)
        }
        run()
    }
    // Spacebar key - stop slideshow
    if (e.keyCode == '32') {
        if (timeout) {
            console.log("stop")
            clearTimeout(timeout)
        }
    }
}


function run() {
    step()
    let stepper = () => {
        let time
        if (content[next].type === 'vid') {
            time = rightContent.getElementsByTagName('video')[0].duration * 1000
            console.log(time)
        }
        else
            time = 3000
        step()

        timeout = setTimeout(stepper, time)
    }
    timeout = setTimeout(stepper, 3000)

}

run()




