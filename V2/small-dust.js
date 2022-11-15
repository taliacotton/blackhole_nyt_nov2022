
 
   
   var canvas = document.getElementById("canvas");
   var context = canvas.getContext('2d');


   setTimeout(function(){
    canvas.width = Math.max(window.innerWidth, window.innerHeight)*1.15;
     canvas.height = Math.max(window.innerWidth, window.innerHeight)*1.15;
   }, 100)

  
   
   function Dot() {
     this.alive = true;
     this.x = Math.round(Math.random() * canvas.width);
     this.y = Math.round(Math.random() * canvas.height);
     let prob = Math.random();
     if (prob < 0.996){
        this.type = "small"
        this.diameter = Math.min(Math.random() * 3, Math.random() * 3, Math.random() * 3, Math.random() * 3, Math.random() * 1);
        this.velocity = {x: Math.round(Math.random() < 0.2 ? -1 : 1) * Math.random() * 0.1, y: Math.round(Math.random() < 0.1 ? -1 : 1) * Math.random() * 0.1};
        this.alpha = 0.8;
        this.colorIndex = Math.round(Math.random() * 3);
      } else if (prob < 0.9995){
        this.type="medium"
        this.diameter = Math.min(Math.random() * 30, Math.random() * 30, Math.random() * 30);
        this.velocity = {x: Math.round(Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.3, y: Math.round(Math.random() < 0.2 ? -1 : 1) * Math.random() * 0.3};
        this.alpha = 0.9;
        this.colorIndex = 0;
      } else {
        this.type="large"
        this.diameter = Math.random() * 60;
        this.velocity = {x: Math.round(Math.random() < 0.6 ? -1 : 1) * Math.random() * 0.4, y: Math.round(Math.random() < 0.3 ? -1 : 1) * Math.random() * 0.5};
        this.alpha = 0.98;
        this.colorIndex = 0;
      }

      this.colorArray = ['rgba(255,255,255,', 'rgba(255,255,255,', 'rgba(255,255,255,', 'rgba(219, 57, 42,', 'rgba(169,169,169,', 'rgba(104, 232, 228,', 'rgba(104, 232, 228,'];
     this.color = this.colorArray[this.colorIndex] + this.alpha + ')';
   
     
   }
   
   Dot.prototype = {
     Draw: function() {

      if (this.type =="small"){
          context.fillStyle = this.color;
          context.beginPath();
          context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
          context.fill();
      } else if (this.type=="medium" || this.type=="large") {
          // Radii of the white glow.
          innerRadius = this.diameter/8,
          outerRadius = this.diameter/2,
          // Radius of the entire circle.
          radius = this.diameter/2;

          //define the outer transparent edge of the circle based on the original color
          var oldColor = this.color,
              newAlpha = '0',
              newColor = oldColor.replace(/[^,]+(?=\))/, newAlpha);

          var gradient = context.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(0.3, this.color);
          // console.log(this.color);
          gradient.addColorStop(0.8, newColor);
          gradient.addColorStop(1, newColor);

          // ctx.arc(x, y, radius, 0, 2 * Math.PI);
          context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);

          context.fillStyle = gradient;
          context.fill();
      }


     },
   
     Update: function() {
      if (this.type == "small"){
        if(this.alpha < 0.6) {
          this.alpha += 0.01;
          this.color = this.colorArray[this.colorIndex] + this.alpha + ')';
        }
      }
       
       
       this.x += this.velocity.x;
       this.y += this.velocity.y;

      //  if (this.type == "small" && Math.random() < 0.05){
      //   this.alpha = 0;
      //  } 
   
       if(this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
         this.alive = false;
       }
     }
   };
   
   var EntityArray = [];
   
   function Initialize() {
     canvas.width = Math.max(window.innerWidth, window.innerHeight)*1.15;
     canvas.height = Math.max(window.innerWidth, window.innerHeight)*1.15;
   
    //  for(var x = 0; x < 90000; x++) {
     for(var x = 0; x < 10000; x++) {
      // for(var x = 0; x < 100; x++) {
       EntityArray.push(new Dot());
     }
   
     Update();
   }
   
   function Update() {
     if(EntityArray.length < 100) {
       for(var x = EntityArray.length; x < 100; x++) {
         EntityArray.push(new Dot());
       }
     }
   
     EntityArray.forEach(function(dot) {
       dot.Update();
     });
   
     EntityArray = EntityArray.filter(function(dot) {
       return dot.alive;
     });
   
     Draw();
   
     requestAnimationFrame(Update);
   }
   
   function Draw() {
     context.clearRect(0, 0, canvas.width, canvas.height);
     EntityArray.forEach(function(dot) {
       dot.Draw();
     });
   }
   
   window.addEventListener("resize", function(){
    EntityArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   })

   Initialize();
   

  