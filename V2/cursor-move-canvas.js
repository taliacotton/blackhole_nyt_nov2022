document.addEventListener("mousemove", function(e){
    document.getElementById("canvas").style.left = map(e.clientX, 0, window.innerWidth, 2, -2) + "px";
    document.getElementById("canvas").style.top = map(e.clientY, 0, window.innerHeight, 2, -2) + "px";
})