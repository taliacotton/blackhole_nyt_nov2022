let container = document.getElementById("container");
let input = document.getElementById("feelings-input");
let output = document.getElementById("feelings-output");
let btnSubmit = document.getElementById("submit");
let header = document.getElementById("header");
let blackHole = document.getElementById("black-hole");
// let canvas = document.getElementById("canvas");

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


// function resizeContainer(){
//     let container_bounds = container.getBoundingClientRect()
// }

// document.addEventListener("keydown", function(e){
//     input.value+=e.key;
//     output.innerHTML = '';
//     for (let char of input.value){
//         output.innerHTML += char;
//     }
// })

//TO DO: Select input when scroll to it
setInterval(function(){
    output.focus();
},50)

// function convertToSpans(textElem){
//     let text = textElem.innerHTML;
// }

// convertToSpans(output);

input.addEventListener("touchstart", function(){
    output.style.border = "3px solid red";
    output.focus();
})

//move the text from the input element into the output element
output.addEventListener("input", function(){
    // output.innerHTML = input.value;
    
    blackHole.classList.add("ready");
    
    if (output.innerHTML == ''){
        output.classList.remove("hasText")
        // output.innerHTML = emptyTextPlaceholder;
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
        console.log("launch triggered");
        if (input.value != ''){
            triggerLaunch();
        }
    }
})


function triggerLaunch(){
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
        console.log(node_y);
        node.style.width = node.offsetWidth + "px";

        // save start positions for animation later
        node.setAttribute("data-start-x", node_x);
        node.setAttribute("data-start-y", node_y);

        // effect for subtle hover, will be activated once "absolute" class is added 
        node.style.animationDuration = Math.random() * 20 + 20 + "s";
        // node.style.transformOrigin = Math.random() * 100 - 50 + "px";


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
        // setTimeout(function(){
            // char.style.animationDuration = '';
            // char.style.transformOrigin = '';
            let startX = parseFloat(char.getAttribute("data-start-x"))
            let startY = parseFloat(char.getAttribute("data-start-y"))
            let charAnimationDelay = map(startX, 0, outputWidth, 1200, 100) + (Math.random()*100 - 50);

            console.log(startX);

            setTimeout(function(){
                animate({
                    duration: 1000,
                    timing: function(timeFraction) {
                        return Math.pow(timeFraction, 5);
                    },
                    draw: function(progress) {
                        // char.style.left = `${(startX + prep_x + prep_x_random)+(window.innerWidth + dest_x_random)*progress}px`;
                        char.style.left = startX + progress * (window.innerWidth / 2 - startX) + `px`;
                        // char.style.top = startY + progress * (outputHeight/10 - startY) + `px`;
                        console.log(startY);
                        let boundsY = char.getBoundingClientRect().y;
                        let destY = window.innerHeight/2;
                        let bounds_dest_dist = destY - boundsY;
                        
                        char.style.top = startY + progress * bounds_dest_dist + `px`;
                        // console.log(progress);
                        char.style.opacity = 1 - progress ;
                    }
                });
            }, charAnimationDelay)
            
        // },600)
    }
}

// function launch_old(char, startX, startY, parWidth, parHeight){
    function launch_old(char){

    // let prep_y = map(startY, 0, parHeight, -100, 100);
    // prep_y *= map(startY, 0, parWidth, 0.6, 0);

    // let prep_x = map(startX, 0, parWidth, -100, -50);
    // let prep_x_random = (Math.random() * 30 - 15);
    // let dest_x_random = (Math.random() * 400);
    
    // let dest_y = map(startY, 0, parHeight, 100, -100);
    // let prep_y_random = (Math.random() * 30 - 15);
    // let dest_y_random = (Math.random() * 80 - 40);

    // animate({
    //     duration: 800,
    //     timing: function back(x, timeFraction) {
    //       return Math.pow(timeFraction, 3) * ((x + 1) * timeFraction - x)
    //     }.bind(null, 2),
    //     draw: function(progress) {
    //     char.style.left = `${startX+(window.innerWidth+dest_x_random)*progress}px`;
    //     }
    // });

    // animate({
    //     duration: 600,
    //     timing: function(timeFraction) {
    //       return Math.pow(timeFraction, 1);
    //     },
    //     draw: function(progress) {
    //     //   char.style.left = startX + (prep_x + prep_x_random) * progress + 'px';
    //     char.style.left = '50vw';
    //     }
    // });
    // setTimeout(function(){
       
    // }, 600)

    // animate({
    //     duration: 400,
    //     timing: function(timeFraction) {
    //       return Math.pow(timeFraction, 1);
    //     },
    //     draw: function(progress) {
    //       char.style.top = startY + (prep_y + prep_y_random) * progress + 'px';
    //     }
    // });
    // setTimeout(function(){
    //     console.log("started");
    //     animate({
    //         duration: 600,
    //         timing: function(timeFraction) {
    //           return Math.pow(timeFraction, 1);
    //         },
    //         draw: function(progress2) {
    //             char.style.top = `${(startY + prep_y + prep_y_random)+(dest_y + dest_y_random)*progress2}px`;
    //         }
    //     });
    // }, 400)

}

// function prepare_old(char){
//     let par = char.parentElement;
//     let parHeight = par.offsetHeight;
//     let parWidth = par.offsetWidth;
//     let currentTop = char.offsetTop;
//     let currentLeft = char.offsetLeft;
//     let prepDest_y = map(currentTop, 0, parHeight, -100, 100);
    
//     prepDest_y *= map(currentLeft, 0, parWidth, 0.6, 0);

//     let prepDest_x = map(currentLeft, 0, parWidth, -100, -10);

//     // char.style.left = prepDest_x + "px";
//     // char.style.top = prepDest_y + "px";

//     animate({
//       duration: 500,
//       timing: function(timeFraction) {
//         return Math.pow(timeFraction, 5);
//       },
//       draw: function(progress) {
//         char.style.left = prepDest_x * progress + 'px';
//         char.style.top = prepDest_y * progress + 'px';
//       }
//     });

//     let dest_y = map(currentTop, 0, parHeight, 100, -100);
//     let dest_x_random = (Math.random() * 400);
//     animate({
//         duration: 1000,
//         timing: function back(x, timeFraction) {
//           return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
//         }.bind(null, 1.5),
//         draw: function(progress) {
//         //   char.style.left = `calc(${100*progress}vw + ${dest_x_random}px)`;
 
//         char.style.left = `${(window.innerWidth+dest_x_random)*progress}px`;
          
//         //   100 * progress + 'vw';
//           char.style.top = dest_y * progress + 'px';
//         }
//     });

// }




function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
  }

  function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      }
    }
  }

  function back(x, timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
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