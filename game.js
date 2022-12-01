//Select canvas
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//Load images
const vulture = new Image();
const bg = new Image();
const fg = new Image();
const obstTop = new Image();
const obstDown = new Image();

vulture.src = "./images/vulture.png";
bg.src = "./images/bg.png";
fg.src = "./images/ground.png";
obstTop.src = "./images/top.png";
obstDown.src = "./images/down.png";

//Variables
const gap = 160;
let constant;

let bX = 50;
let bY = 250;

const gravity = 1;

let score = 0;
let gameOver = false;

//Audio files
const fly = new Audio();
const scor = new Audio();

fly.src = "./sounds/sounds_fly.mp3";
scor.src = "./sounds/sounds_score.mp3";

//On key down
document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 25;
  fly.play();
}

//Obstacles
let obst = [];
obst[0] = {
  x: cvs.width,
  y: 0,
  width: 120,
  height: 200,
};

obst[1] = {
  x: cvs.width,
  y: cvs.height - 200,
  width: 120,
  height: 200,
};

function isCollide(a, b) {
  return !(
    ((a.y + a.height) < (b.y)) ||
    (a.y > (b.y + b.height)) ||
    ((a.x + a.width) < b.x) ||
    (a.x > (b.x + b.width))
  );
}

//Draw images
function draw() {
  if (gameOver === true) {
    alert("Game Over!! : " + score);
    location.reload();
    return;
  }

  ctx.drawImage(bg, 0, 0);

  let vultureObj = { x: bX, y: bY, width: 100, height: 75 };

  for (let i = 0; i < obst.length; i++) {
    if (isCollide(vultureObj, obst[i]) === true) {
      gameOver = true;
    }
  }

  if (vultureObj.y > cvs.height - 100)
    //game over in the floor
    gameOver = true;

  if (vultureObj.y < 0)
    //game over in the top canvas height
    gameOver = true;

  for (let i = 0; i < obst.length; i++) {
    //constant = obstTop.height + gap;
    if (obst[i].y < 200 ) {
    ctx.drawImage(obstTop, obst[i].x, obst[i].y, obst[i].width, obst[i].height);
    }else{
   ctx.drawImage(obstDown, obst[i].x, obst[i].y, obst[i].width, obst[i].height + 300);
    }
     obst[i].x--;

let topHeight = (Math.random()*100)+20

    if (obst[i].x === 150) {
      if (i % 2) {
        obst.push({
          //push one element in the final array
          x: cvs.width, //set a x coordinate od the new obstacle according to our canvas width
          y: 0,
          width: 120,
          height:200
        });
      } else {
        obst.push({
          //push one element in the final array
          x: cvs.width,
          y: cvs.height - topHeight - gap,
          width: 120,
          height: 300,
        });
      }
    }

    if (obst[i].x == 5) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(fg, 0, 500, 800, 100); //drawn the "floor" image
  ctx.drawImage(vulture, bX, bY, 100, 75); //drawn the vulture image
  bY += gravity; //put the gravity

  ctx.fillStyle = "black";
  ctx.font = "25px Impact";
  ctx.fillText("Score : " + score, 10, cvs.height - 550);

  requestAnimationFrame(draw);
}

let buttonStart = document.getElementById("start-button");
console.log(buttonStart);
buttonStart.addEventListener("click", () => {
  draw();
});
