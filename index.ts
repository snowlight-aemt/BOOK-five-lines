
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

interface Input {
  handle(): void;
}

class Right implements Input {
  handle() {
    moveHorizontal(1);
  }
}
class Left implements Input {
  handle() {
    moveHorizontal(-1);
  }
}
class Up implements Input {
  handle() {
    moveVertical(1);
  }
}
class Down implements Input {
  handle() {
    moveVertical(-1);
  }
}

let playerx = 1;
let playery = 1;
let map: Tile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let inputs: Input[] = [];

function remove(tile: Tile) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === tile) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  if (map[playery][playerx + dx] === new Flux()
    || map[playery][playerx + dx] === new Air()) {
    moveToTile(playerx + dx, playery);
  } else if ((map[playery][playerx + dx] === new Stone()
    || map[playery][playerx + dx] === new Box())
    && map[playery][playerx + dx + dx] === new Air()
    && map[playery + 1][playerx + dx] !== new Air()) {
    map[playery][playerx + dx + dx] = map[playery][playerx + dx];
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === new Key1()) {
    remove(new Lock1());
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === new Key2()) {
    remove(new Lock1());
    moveToTile(playerx + dx, playery);
  }
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx] === new Flux()
    || map[playery + dy][playerx] === new Air()) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === new Key1()) {
    remove(new Lock1);
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === new Key2()) {
    remove(new Lock2);
    moveToTile(playerx, playery + dy);
  }
}

function update() {
  handleInputs();
  updateMap();
}

function handleInputs() {
  while (inputs.length > 0) {
    let input = inputs.pop();
    input.handle()
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(x, y);
    }
  }
}

function updateTile(x: number, y: number) {
  if ((map[y][x] === new Stone() || map[y][x] === new FallingStone())
      && map[y + 1][x] === new Air()) {
    map[y + 1][x] = new FallingStone()
    map[y][x] = new Air();
  } else if ((map[y][x] === new Box() || map[y][x] === new FallingBox())
      && map[y + 1][x] === new Air()) {
    map[y + 1][x] = new FallingBox();
    map[y][x] = new Air();
  } else if (map[y][x] === new FallingStone()) {
    map[y][x] = new Stone();
  } else if (map[y][x] === new FallingBox()) {
    map[y][x] = new Box()
  }
}

function draw() {
  let g = createGraphics();
  drawMap(g);
  drawPlayer(g)
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");
  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      colorOrTile(g, x, y)

      if (map[y][x] !== new Air() && map[y][x] !== new Player())
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}


interface Tile2 {
  isAir(): boolean,
  isFlux(): boolean,
  isUnbreakable(): boolean,
  isPlayer(): boolean,
  isStone(): boolean,
  isFallingStone(): boolean,
  isBox(): boolean,
  isFallingBox(): boolean,
  isKey1(): boolean,
  isLock1(): boolean,
  isKey2(): boolean,
  isLock2(): boolean,
}

class Air implements Tile2 {
  isAir(): boolean {return true}
  isFlux(): boolean { return false }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Flux implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return true; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Unbreakable implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return true; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Player implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return true }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Stone implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return true; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class FallingStone implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return true; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Box implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return true; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class FallingBox implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return true; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Key1 implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return true; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Lock1 implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return true; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return false; }
}

class Key2 implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return true; }
  isLock2(): boolean  { return false; }
}

class Lock2 implements Tile2 {
  isAir(): boolean {return false}
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean  { return true; }
}

function colorOrTile(g: CanvasRenderingContext2D, x: number, y: number) {
  if (map[y][x] === new Flux())
    g.fillStyle = "#ccffcc";
  else if (map[y][x] === new Unbreakable())
    g.fillStyle = "#999999";
  else if (map[y][x] === new Stone() || map[y][x] === new FallingStone())
    g.fillStyle = "#0000cc";
  else if (map[y][x] === new Box() || map[y][x] === new FallingBox())
    g.fillStyle = "#8b4513";
  else if (map[y][x] === new Key1() || map[y][x] === new Lock1())
    g.fillStyle = "#ffcc00";
  else if (map[y][x] === new Key2() || map[y][x] === new Lock2())
    g.fillStyle = "#00ccff";
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});

