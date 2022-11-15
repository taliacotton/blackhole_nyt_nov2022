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

let emptyTextPlaceholder = `<span id="blinkingCursor"></span><span id="placeholder">I’m feeling sad...</span>`


let outputHeight, outputWidth;


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
    input.focus();
},50)

function convertToSpans(textElem){
    let text = textElem.innerHTML;
}

convertToSpans(output);

//move the text from the input element into the output element
input.addEventListener("input", function(){
    output.innerHTML = input.value;
    blackHole.classList.add("ready");
    
    if (input.value == ''){
        output.innerHTML = emptyTextPlaceholder;
        header.classList.remove("invisible");
        btnSubmit.classList.add("invisible");
    } else {
        header.classList.add("invisible");
        btnSubmit.classList.remove("invisible");
    }
})




container.addEventListener("mousedown", function(e){
    mouseIsDown = true;
    outputHeight = output.offsetHeight;
    outputWidth = output.offsetWidth;
    cursorOrigin = {x: e.clientX, y: e.clientY}
    charsToSpans();
    addPositions(chars, makePosAbsolute);
    setPrepDestinations(chars);
    // makeDisappear();
})

container.addEventListener("mouseup", function(){
    mouseIsDown = false;
    document.body.style.cursor = "inherit";
    for (let char of chars){
        launch_old(char);
    }
})

container.addEventListener("mousemove", function(e){
    if (mouseIsDown){
        let distance = dist(e.clientX, cursorOrigin.x, e.clientY, cursorOrigin.y);
        document.body.style.cursor = "grabbing";
        console.log(distance)
        for (let c of chars){
            let x1 = parseFloat(c.getAttribute("data-start-x"));
            let y1 = parseFloat(c.getAttribute("data-start-y"));
            let x2 = parseFloat(c.getAttribute("data-prep-x"));
            let y2 = parseFloat(c.getAttribute("data-prep-y"));
            // console.log(x1, y1, x2, y2);
            c.style.left = map(distance, 0, window.innerWidth, x1, x2) + "px";
            // c.style.left = x2 + "px";
            c.style.top = map(distance, 0, window.innerWidth, y1, y2) + "px";
        }
    }
})

function dist(x1, x2, y1, y2){
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt( a*a + b*b )
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
        //necessary for positioning 
        node.style.left = node.offsetLeft + "px";
        node.style.top = node.offsetTop - outputHeight/2 - 4 + "px";
        node.style.width = node.offsetWidth + "px";

        // effect for subtle hover, will be activated once "absolute" class is added 
        node.style.animationDuration = Math.random() * 10 + 40 + "s";
        node.style.transformOrigin = Math.random() * 10 - 5 + "px";
        if (Math.random()< 0.4){node.style.animationDirection = "reverse";}
    }
    callback(nodes);
}


function setPrepDestinations(nodes){
    let parent = nodes[0].parentElement;
    
    for (let node of nodes){
        let startY = node.offsetTop;
        let startX = node.offsetLeft;
        let prep_x = map(startX, 0, outputWidth, -100, 0);
        console.log(startX, outputWidth);
        let prep_x_random = (Math.random() * 50 - 15);
        
        let prep_y = map(startY, 0, outputHeight, -100, 150);
        // prep_y *= map(startY, 0, outputWidth, 0.6, 0);
        let prep_y_random = (Math.random() * 50 - 15);
        // console.log(prep_y);
        node.setAttribute("data-start-x", startX);
        node.setAttribute("data-start-y", startY);
        node.setAttribute("data-prep-x", prep_x + prep_x_random);
        node.setAttribute("data-prep-y", prep_y + prep_y_random);
    }
    //     let prep_y = map(startY, 0, parHeight, -100, 100);
    //     prep_y *= map(startY, 0, parWidth, 0.6, 0);

    // let prep_x = map(startX, 0, parWidth, -100, -50);
    // let prep_x_random = (Math.random() * 30 - 15);
    // let dest_x_random = (Math.random() * 400);
    
    // let dest_y = map(startY, 0, parHeight, 100, -100);
    // let prep_y_random = (Math.random() * 30 - 15);
    // let dest_y_random = (Math.random() * 80 - 40);
    // }
}







function makeDisappear(){
    

    if (!submitted){

        // use a library to wrap each character with a span.
        const example = new Letterize({targets: output, wrapper: "span", className: "char"});
        chars = document.querySelectorAll(".char");
        for (let char of chars){
            // let bounds = char.getBoundingClientRect();
            // char.style.left = bounds.x;
            // char.style.top = bounds.y;

            // console.log(bounds.y)
            console.log(char.offsetTop, char.parentElement.offsetHeight)

            let par = char.parentElement;
            let parHeight = par.offsetHeight;
            let parWidth = par.offsetWidth;
            let currentTop = char.offsetTop;
            let currentLeft = char.offsetLeft;

            char.style.left = currentLeft + "px";
            char.style.top = currentTop - 4 + "px";
            char.style.width = char.offsetWidth + "px";
            char.style.animationDuration = Math.random() * 10 + 40 + "s";
            char.style.transformOrigin = Math.random() * 10 - 5 + "px";
            if (Math.random()< 0.4){
                char.style.animationDirection = "reverse";
            }


            setTimeout(function(){
                char.style.position = 'absolute';
                // console.log(currentLeft, currentTop)
                // prepare(char);
            
            }, 500)

            setTimeout(function(){
                
                launch(char, currentLeft, currentTop, parWidth, parHeight);
            },1000)
        }
    }

    // set a boolean that disables button after one click
    submitted = true;

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
        animate({
            duration: 400,
            timing: function(timeFraction) {
              return Math.pow(timeFraction, 1);
            },
            draw: function(progress) {
                // char.style.left = `${(startX + prep_x + prep_x_random)+(window.innerWidth + dest_x_random)*progress}px`;
                char.style.left = `50vw`;
                char.style.opacity = '0';
            }
        });
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