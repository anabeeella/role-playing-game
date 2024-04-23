let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const storyContainer = document.querySelector("#story-container");
const locationName = document.querySelector("#locationName");
const locationImage = document.querySelector("#locationImage");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
  },
  {
    name: "Fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "Dragon",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "⚔️ Fight"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You find yourself in the bustling town square. Citizens go about their business, and the aroma of freshly baked bread wafts from a nearby bakery. Where would you like to go next?",
    img: "./images/town.png",
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 💰)",
      "Buy weapon (30 💰)",
      "Back to town",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Welcome to the store. Shelves are lined with potions and weapons. What do you want to buy?",
    img: "./images/store.png",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Back to town"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You cautiously step into the dark cave, the sound of dripping water echoing off the walls. Will you dare to challenge one of the creatures lurking within to win some gold?",
    img: "./images/cave.png",
  },
  {
    name: "fight!",
    "button text": ["Attack", "Dodge", "Escape"],
    "button functions": [attack, dodge, goTown],
    text: "You are locked in combat with a fearsome creature! Every move could be your last.",
    img: "./images/fight.png",
  },
  {
    name: "You've killed it!",
    "button text": [
      "Back to town square",
      "Back to town square",
      "Back to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: "With a final blow, the monster collapses at your feet. You catch your breath, victorious, amidst the stench of battle and the glitter of gold.",
    img: "./images/win.png",
  },
  {
    name: "You lose",
    "button text": ["restart", "restart", "restart"],
    "button functions": [restart, restart, restart],
    text: "Your vision fades as darkness consumes you. You have met your end...",
    img: "./images/lose.png",
  },
  {
    name: "You win!",
    "button text": ["restart", "restart", "restart"],
    "button functions": [restart, restart, restart],
    text: "The dragon's roar is silenced as it falls before you. You have saved the kingdom! YOU WIN THE GAME! &#x1F389;",
    img: "./images/win.png",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "exit"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You stumble upon a hidden alcove, where a mysterious game awaits. Choose a number, and fortune may favor you. If you win, you'll get 20 gold, but if you lose, 10 health will be deducted. You can bet as many times as you want.",
    img: "./images/egg.png",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.style.display = "flex";
  button2.style.display = "flex";
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  locationName.innerText = location.name;
  locationImage.innerHTML = `<img class="location-image" src="${location.img}" alt="Imagen de ${location.name}">`;
}

function goTown() {
  update(locations[0]);
  storyContainer.style.background = "#312522";
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  locationImage.innerHTML = `<img class="location-image" src="./images/slime.png" alt="Imagen">`;
}

function fightBeast() {
  fighting = 1;
  goFight();
  locationImage.innerHTML = `<img class="location-image" src="./images/beast.png" alt="Imagen">`;
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "flex";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  button1.style.display = "none";
  button2.style.display = "none";
  storyContainer.style.background = "#12311a";
}

function lose() {
  update(locations[5]);
  button1.style.display = "none";
  button2.style.display = "none";
  storyContainer.style.background = "#5e0d00";
}

function winGame() {
  update(locations[6]);
  button1.style.display = "none";
  button2.style.display = "none";
  storyContainer.style.background = "#12311a";
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  storyContainer.style.background = "#312522";
  goTown();
}

function easterEgg() {
  storyContainer.style.background = "#372e18";
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += " -" + numbers[i];
  }
  if (numbers.includes(guess)) {
    text.innerText += ". Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += ". Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
