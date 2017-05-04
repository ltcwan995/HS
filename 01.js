window.onload = function() {
  var canvas = document.createElement("canvas"),
    c = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);

  var boxes = [];
  var fallinterval = 50;

  var random = function(min, max) {
    'use strict';
    return min + Math.random() * (max - min);
  }

  function BParticle(x, y) {
    this.posX = x,
      this.posY = y,
      this.vx = 5,
      this.vy = 5,
      this.gravity = 0.05;
    this.h = 10;
    this.w = 10;
    this.fragments = [];
    this.bouncefactorx = 0.5;
    this.bouncefactory = 0.5;
    this.color = "rgb(" + Math.floor(random(0, 255)) + "," + Math.floor(random(0, 255)) + "," + Math.floor(random(0, 255)) + ")";

    this.update = function() {
      this.posY += this.vy;

      if (this.posY > canvas.height - this.h) {
        this.color = "rgba(0,0,0,0)";
        this.vy *= -this.bouncefactory;
        this.posY = canvas.height - this.h;

        if (this.fragments.length == 0) {
          for (var i = 0; i < random(5, 10); i++) {
            var p = new BParticle(this.posX, this.posY);
            var s = random(2, 8);
            p.w = s;
            p.h = s;
            p.bouncefactory = random(-0.5, 0.5) * 1.5;
            p.bouncefactorx = -1;

            this.fragments.push(p)
          }

          for (var i = 0; i < random(5, 10); i++) {
            var p = new BParticle(this.posX, this.posY);
            p.w = 5;
            p.h = 5;
            p.bouncefactory = random(-0.5, 0.5) * 1.5;
            p.bouncefactorx = 0.5;

            this.fragments.push(p)
          }
        }
      }
      this.vy += this.gravity;

      for (var i = 0; i < this.fragments.length; i++) {

        this.fragments[i].posY += this.fragments[i].vy;

        if (this.fragments[i].posY > canvas.height - this.fragments[i].h) {

          this.fragments[i].vy *= this.fragments[i].bouncefactory;
          this.fragments[i].vx *= this.fragments[i].bouncefactorx;
          this.fragments[i].posY = canvas.height - this.fragments[i].h;

        }
        this.fragments[i].posX += this.fragments[i].vx;
        this.fragments[i].vy += this.fragments[i].gravity;

      }

    };

    this.draw = function() {
      c.fillStyle = this.color;
      c.fillRect(this.posX, this.posY, this.w, this.h);
      for (var i = 0; i < this.fragments.length; i++) {
        this.fragments[i].draw();
      }
    };

  }

  boxes.push(new BParticle(Math.random() * canvas.width, 0));

  c.fillStyle = "#000";
  c.fillRect(0, 0, canvas.width, canvas.height);

  var frame = 0;

  var draw = function() {
    c.fillStyle = "rgba(0,0,0,0.05)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < boxes.length; i++) {
      boxes[i].update();
      boxes[i].draw();
      if (boxes.length > 10) {
        if (frame % 1000 == 0) {
          boxes.shift();
        }

      }
    }

    if (frame % fallinterval == 0) {
      boxes.push(new BParticle(Math.random() * canvas.width, 0));
    }

    frame++;
    requestAnimationFrame(draw);
  }

  draw();
}