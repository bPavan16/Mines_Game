const gameGrid = document.getElementById("mines-game");
const bet = document.getElementById("bet");
const auto = document.getElementById("auto");
const minesCount = document.getElementById("mines-count");
const cashbox = document.getElementById("cash");
const walletAmount = document.getElementById("wallet-amount");
const Amount = document.getElementById("Amount");

let betvalue=0;

let eneble = false;

let arr = new Array(25);

for (let i = 0; i < 25; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  gameGrid.appendChild(cell);
}

let cash = 0;
let cashTemp =0;
const ShowAll = () => {
  for (let i = 0; i < 25; i++) {
    gameGrid.children[i].classList.add("opac");

    if (arr[i] == 1) {
      gameGrid.children[i].classList.add("bomb");
    } else {
      gameGrid.children[i].classList.add("diamond");
    }
  }
};

// auto.addEventListener("click", ShowAll);

bet.addEventListener("click", () => {
  betvalue = parseInt(Amount.value);


  // console.log(walletAmount.value);
  cash = 0;

  if (betvalue == 0) {
    alert("Please Enter the Bet Amount");
    return;
  } else if (betvalue > parseInt(walletAmount.value)) {
    alert("Insufficient Balance");
    return;
  }

  walletAmount.value = parseInt(walletAmount.value) - parseInt(Amount.value);
  Amount.value = 0;

  if (true) {
    for (let i = 0; i < 25; i++) {
      gameGrid.removeChild(gameGrid.children[0]);
    }
  }

  let minesNumber = minesCount.value;
  console.log(minesCount.value);
  let multiplier = minesNumber;

  for (let i = 0; i < 25; i++) {
    let RandomNumber = Math.floor(Math.random() * 2);

    if (RandomNumber == 1) {
      if (minesNumber > 0) {
        arr[i] = 1;
        minesNumber--;
      } else {
        arr[i] = 0;
      }
    } else {
      arr[i] = 0;
    }
  }

  while (minesNumber > 0) {
    let randomIndex = Math.floor(Math.random() * 25);

    if (arr[randomIndex] === 0) {
      arr[randomIndex] = 1;
      minesNumber--;
    }
  }

  // Generate a 5x5 grid
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Add click event listener to each cell
    cell.addEventListener("click", function () {
      if (arr[i] == 1) {
        ShowAll();
      } else {
        this.classList.add("diamond");
        cash +=( betvalue * multiplier / 40);
      }
    });

    gameGrid.appendChild(cell);
  }
});

cashbox.addEventListener("click", () => {
  ShowAll();
  if(cash==0)
  walletAmount.value = parseInt(walletAmount.value) + 0;
  else
  walletAmount.value = parseInt(walletAmount.value) + cash+betvalue+betvalue;

    
});
