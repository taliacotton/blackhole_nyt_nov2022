let container = document.getElementById("container");
let input = document.getElementById("feelings-input");
let output = document.getElementById("feelings-output");
let btnSubmit = document.getElementById("submit");
let header = document.getElementById("header");

let submitted = false;

let emptyTextPlaceholder = `<span id="blinkingCursor"></span><span id="placeholder">I’m feeling sad...</span>`

let placeholderTexts = ["I'm feeling sad...", "I'm feeling angry...", "I'm feeling defeated...", "When will it stop?"]


// function resizeContainer(){
//     let container_bounds = container.getBoundingClientRect()
// }

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
    console.log("oninput");
    if (input.value == ''){
        output.innerHTML = emptyTextPlaceholder;
        header.classList.remove("invisible");
        btnSubmit.classList.add("invisible");
    } else {
        header.classList.add("invisible");
        btnSubmit.classList.remove("invisible");
        console.log(btnSubmit);
    }
})

//





function makeDisappear(){
    
    if (!submitted){

        // use a library to wrap each character with a span.
        const example = new Letterize({targets: output, wrapper: "span", className: "char"});
        let chars = document.querySelectorAll(".char");
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



function launch(char, startX, startY, parWidth, parHeight){

    let prep_y = map(startY, 0, parHeight, -100, 100);
    prep_y *= map(startY, 0, parWidth, 0.6, 0);

    let prep_x = map(startX, 0, parWidth, -100, -50);
    let prep_x_random = (Math.random() * 30 - 15);
    let dest_x_random = (Math.random() * 400);
    
    let dest_y = map(startY, 0, parHeight, 100, -100);
    let prep_y_random = (Math.random() * 30 - 15);
    let dest_y_random = (Math.random() * 80 - 40);
    // animate({
    //     duration: 800,
    //     timing: function back(x, timeFraction) {
    //       return Math.pow(timeFraction, 3) * ((x + 1) * timeFraction - x)
    //     }.bind(null, 2),
    //     draw: function(progress) {
    //     char.style.left = `${startX+(window.innerWidth+dest_x_random)*progress}px`;
    //     }
    // });

    animate({
        duration: 600,
        timing: function(timeFraction) {
          return Math.pow(timeFraction, 1);
        },
        draw: function(progress) {
          char.style.left = startX + (prep_x + prep_x_random) * progress + 'px';
        }
    });
    setTimeout(function(){
        animate({
            duration: 400,
            timing: function(timeFraction) {
              return Math.pow(timeFraction, 1);
            },
            draw: function(progress) {
                char.style.left = `${(startX + prep_x + prep_x_random)+(window.innerWidth + dest_x_random)*progress}px`;
            }
        });
    }, 600)

    animate({
        duration: 400,
        timing: function(timeFraction) {
          return Math.pow(timeFraction, 1);
        },
        draw: function(progress) {
          char.style.top = startY + (prep_y + prep_y_random) * progress + 'px';
        }
    });
    setTimeout(function(){
        console.log("started");
        animate({
            duration: 600,
            timing: function(timeFraction) {
              return Math.pow(timeFraction, 1);
            },
            draw: function(progress2) {
                char.style.top = `${(startY + prep_y + prep_y_random)+(dest_y + dest_y_random)*progress2}px`;
            }
        });
    }, 400)

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