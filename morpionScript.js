let horizontales = [[0,0,0], [0,0,0], [0,0,0]];
let verticales = [[0,0,0], [0,0,0], [0,0,0]];
let diagonales = [[0,0,0], [0,0,0]];
let gameOver = false;

let player1 = {
  value: 1,
  type : "1",
  img: "url(croix.png)",
  score: 0,
  add: function() {
    this.score = this.score + 1;
  }
};

let player2 = {
  value: 2,
  type : "2",
  img: "url(rond.png)",
  score: 0,
  add: function() {
    this.score = this.score + 1;
  }
};

let players = [player1, player2];
let player = players[0];

let HisOk = [false];
let VisOk = [false];
let DisOk = [false];

let index = [0,0];

let message1 = "Cette case est déjà utilisée...";
let message2 = "La partie est terminée...";

function cocher(cellule) {
  index = cellule.split('');
  gameOver === true ? info(message2) : isAlreadyUsed(cellule) ? info(message1) : run(cellule);
}

function run(cellule){
  affichageDuScore();
  remplissage(cellule,player);
  rechercheVictoire(player);
  changementDeJoueur();
}

function affichageDuScore(){
  player.add();
  document.getElementById("score".concat(player.value)).innerText= player.score;
}

function remplissage(cellule,player){
  horizontales[index[1]][index[2]] = player.value;
  document.getElementById(cellule).style.backgroundImage = player.img;
}

function rechercheVictoire(player) {
  const isOK = (value) =>  value === player.value;
  const isWin = (value) =>  value === true;

  transpositiondDesVerticales();
  transpositiondDesDiagonales();

  HisOk = horizontales.flatMap(p => p.every(isOK));
  VisOk = verticales.flatMap(p => p.every(isOK));
  DisOk = diagonales.flatMap(p => p.every(isOK));

  if (HisOk.find(isWin) || VisOk.find(isWin) || DisOk.find(isWin)) {
    setTimeout(()=> openModal("Le joueur " + player.type +" a gagné en ".concat(player.score).concat(" coups")), 300);
    gameOver = true;
  }
}

function openModal(message){
  document.getElementById('messageModal').innerText = message;
  $('#myModal').modal();
}

function transpositiondDesVerticales(){
  //Récupération de la 1er verticale
  verticales[0][0] = horizontales [0][0];
  verticales[0][1] = horizontales [1][0];
  verticales[0][2] = horizontales [2][0];

  //Récupération de la 2éme verticale
  verticales[1][0] = horizontales [0][1];
  verticales[1][1] = horizontales [1][1];
  verticales[1][2] = horizontales [2][1];

  //Récupération de la 3éme verticale
  verticales[2][0] = horizontales [0][2];
  verticales[2][1] = horizontales [1][2];
  verticales[2][2] = horizontales [2][2];
}

function transpositiondDesDiagonales(){
  //Récupération de la 1er diagonale
  diagonales[0][0] = horizontales [0][0];
  diagonales[0][1] = horizontales [1][1];
  diagonales[0][2] = horizontales [2][2];

  //Récupération de la 2éme diagonale
  diagonales[1][0] = horizontales [0][2];
  diagonales[1][1] = horizontales [1][1];
  diagonales[1][2] = horizontales [2][0];
}

function changementDeJoueur(){
  player = player.value === 1 ? players[1] : players[0]
}

function isAlreadyUsed(cellule){
  return horizontales[index[1]][index[2]] != 0 ? true : false;
}

function info(message){
  document.getElementById("info").style.visibility = "visible";
  document.getElementById("info").innerText = message;
  setTimeout(function(){ document.getElementById("info").style.visibility = "hidden"; }, 1000);
}
