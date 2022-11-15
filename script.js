let container = document.getElementById("container");
let input = document.getElementById("feelings-input");
let output = document.getElementById("feelings-output");
let btnSubmit = document.getElementById("submit");
let header = document.getElementById("header");
let blackHole = document.getElementById("black-hole");

let chars;
let cursorOrigin = {};

let mouseIsDown = false;
let submitted = false;
let smallScreen = false;

let emptyTextPlaceholder = `<span id="blinkingCursor"></span><span id="placeholder">I’m feeling sad...</span>`

let outputHeight, outputWidth;

if (window.innerWidth < 740){
    smallScreen = true;
}

output.focus();

//TO DO: Select input when scroll to it
// setInterval(function(){
//     output.focus();
// },50)

// function convertToSpans(textElem){
//     let text = textElem.innerHTML;
// }

// convertToSpans(output);

input.addEventListener("touchstart", function(){
    // output.style.border = "3px solid red";
    output.focus();
})

// output.addEventListener("focus", function(){
//     console.log("focusing");
// })

// output.addEventListener("focusout", function(){
//     console.log("unfocusing");
// })

document.addEventListener("touchstart", function(e){
    console.log(e.target);
})

//move the text from the input element into the output element
output.addEventListener("input", function(e){
    if (e.key == "Enter"){
        e.preventDefault();
        console.log("prevent default")
    }

    blackHole.classList.add("ready");
    
    if (output.innerHTML == ''){
        output.classList.remove("hasText")
        header.classList.remove("invisible");
        btnSubmit.classList.add("invisible");
    } else {
        output.classList.add("hasText")
        header.classList.add("invisible");
        btnSubmit.classList.remove("invisible");
    }
})

window.addEventListener("keydown", function(e){
    if (e.key == "Enter"){
        if (output.innerHTML.length >= 1){
            triggerLaunch();
        }
    }
})


function triggerLaunch(){
    if (output.innerHTML !== ''){
        outputHeight = output.offsetHeight;
        outputWidth = output.offsetWidth;
        btnSubmit.style.display="none";
        charsToSpans();
        addPositions(chars, makePosAbsolute);
        launch(chars);
        setTimeout(function(){
            // blackHole.style.transition = "width 500ms ease-in, height 500ms ease-in";
            blackHole.classList.remove("ready");
            blackHole.classList.add("done");
            // blackHole.style.width = '130vmax'
            // blackHole.style.height = '130vmax'
        }, 2100)
        setTimeout(function(){
            // container.classList.add("done");
            
            container.classList.add("gone");
        },2600)
    }
    // setTimeout(function(){
    // },3500)
}

function charsToSpans(){
    new Letterize({targets: output, wrapper: "span", className: "char"});
    chars = document.querySelectorAll('.char')
}

function makePosAbsolute(nodes){
    for (let node of nodes){
        node.classList.add("absolute")
    }
}

function addPositions(nodes, callback){
    // let parent = nodes[0].parentElement;
    for (let node of nodes){
        let node_x = node.offsetLeft;
        let node_y;
        if (!smallScreen){
            node_y = node.offsetTop - outputHeight/2;
        } else {
            node_y = node.offsetTop;
        }
        
        //necessary for positioning 
        node.style.left = node_x + "px";
        node.style.top = node_y + "px";
        node.style.width = node.offsetWidth + "px";

        // save start positions for animation later
        node.setAttribute("data-start-x", node_x);
        node.setAttribute("data-start-y", node_y);

        // effect for subtle hover, will be activated once "absolute" class is added 
        node.style.animationDuration = Math.random() * 20 + 20 + "s";

        let newTransformOrigin = map(node_y, 0, outputHeight, 8, -8) * map(node_x, 0, outputWidth, 10, 1) + Math.random()*20 - 10;
        node.style.transformOrigin = newTransformOrigin + "px"

        if (Math.random()< 0.4){node.style.animationDirection = "reverse";}
    }
    callback(nodes);
}


function setPrepDestinations(nodes){    
    for (let node of nodes){
        let startY = node.offsetTop;
        let startX = node.offsetLeft;
        node.setAttribute("data-start-x", startX);
        node.setAttribute("data-start-y", startY);
    }
}


function launch(chars){

    for (let char of chars){
            let startX = parseFloat(char.getAttribute("data-start-x"))
            let startY = parseFloat(char.getAttribute("data-start-y"))
            let charAnimationDelay = map(startX, 0, outputWidth, 1200, 100) + (Math.random()*100 - 50);

            setTimeout(function(){
                animate({
                    duration: 1000,
                    timing: function(timeFraction) {
                        return Math.pow(timeFraction, 5);
                    },
                    draw: function(progress) {
                        char.style.left = startX + progress * (window.innerWidth / 2 - startX) + `px`;
                        let boundsY = char.getBoundingClientRect().y;
                        let destY = window.innerHeight/2;
                        let bounds_dest_dist = destY - boundsY;
                        
                        char.style.top = startY + progress * bounds_dest_dist + `px`;
                        char.style.opacity = 1 - progress ;
                    }
                });
            }, charAnimationDelay)
    }
}


// animate.js
function animate(options) {

    var start = performance.now();
  
    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;
    
        var progress = options.timing(timeFraction)
        
        options.draw(progress);
    
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
  
    });
}


function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}