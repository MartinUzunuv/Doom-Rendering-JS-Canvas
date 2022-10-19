size = 16;
drawsize = 10;
arr = [];
myx = 2;
myy = 2;
speed = 0.01;
mya = Math.PI / 2;
dqual = 36;
nqual = 58;
dqual = 120;
nnn = 3.1;
for (i = 0; i < size; i++) {
  arr.push([]);
  for (j = 0; j < size; j++) {
    arr[i].push(0);
    if (i == 0 || i == size - 1) {
      arr[i][j] = 1;
    }
    if (j == 0 || j == size - 1) {
      arr[i][j] = 1;
    }
  }
}
function point(x, y, a, n) {
  let color = false;
  let far = 0;
  for (d = 0; d < dqual; d++) {
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr.length; j++) {
        if (areColliding(x, y, 0.1, 0.1, i, j, 1, 1) && arr[i][j] == 1) {
          if (!color) {
            context.fillStyle = `rgb(${255 - ((dqual - d) * 255) / dqual},${
              255 - ((dqual - d) * 255) / dqual
            }, ${255 - ((dqual - d) * 255) / dqual})`;
            far = d;
            color = true;
            console.log(d);
          }
          context.fillRect(
            (n * window.innerWidth) / dqual,
            (far / (dqual * 2)) * window.innerHeight,
            (window.innerWidth / dqual) * nnn,
            window.innerHeight - (far / dqual) * window.innerHeight
          );
        }
      }
    }
    x += Math.cos(a) / (dqual / 18);
    y += Math.sin(a) / (dqual / 18);
  }
}
function draw() {
  context.fillStyle = "green";
  context.fillRect(
    0,
    window.innerHeight / 2,
    window.innerWidth,
    window.innerHeight
  );
  let nn = 0;
  for (a = mya - Math.PI / 3; a <= mya + Math.PI / 3; a += Math.PI / nqual) {
    point(myx, myy, a, nn * nnn);
    nn++;
  }
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (arr[i][j] == 1) {
        context.fillStyle = "black";
      } else {
        context.fillStyle = "grey";
      }
      context.fillRect(i * drawsize, j * drawsize, drawsize, drawsize);
    }
  }
  for (a = mya - Math.PI / 3; a <= mya + Math.PI / 3; a += Math.PI / 12) {
    drawLine(
      myx * drawsize,
      myy * drawsize,
      (myx + Math.cos(a) * 2) * drawsize,
      (myy + Math.sin(a) * 2) * drawsize
    );
  }
  context.fillStyle = "red";
  context.fillRect(myx * drawsize, myy * drawsize, drawsize / 2, drawsize / 2);
}
function update() {
  if (isKeyPressed[32]) {
    arr[Math.floor(mouseX / drawsize)][Math.floor(mouseY / drawsize)] = 1;
  }
  if (isKeyPressed[69]) {
    mya = Math.atan2(mouseY - myy * drawsize, mouseX - myx * drawsize);
  }
  if (isKeyPressed[65]) {
    mya -= 0.01;
  }
  if (isKeyPressed[68]) {
    mya += 0.01;
  }
  if (isKeyPressed[87]) {
    myx += Math.cos(mya) * speed;
    myy += Math.sin(mya) * speed;
  }
  if (isKeyPressed[83]) {
    myx -= Math.cos(mya) * speed;
    myy -= Math.sin(mya) * speed;
  }
}