const billAmountElement = document.querySelector("#bill-input");
const nextBtn = document.querySelector("#next-button");
const paidInputContainer = document.querySelector("#paid-input-container");
const paidInputElement = document.querySelector("#paid-input");
const calcBtn = document.querySelector("#calculate-button");
const outputCells = document.querySelectorAll(".output-cell");

// Check valid bill amount and display next on next-button
nextBtn.addEventListener("click", () => {
  const billAmount = billAmountElement.value;

  try {
    if (billAmount <= 0) {
      const err = { message: "Bill amount has to be greater than 0" };
      throw err;
    }

    // Bill amount is fine, display the next part
    paidInputContainer.style.display = "flex";
  } catch (err) {
    console.log(err.message);
    // TODO : Display the error
  }
});

calcBtn.addEventListener("click", () => {
  const paidAmount = paidInputElement.value;
  const returnAmount = paidAmount - billAmountElement.value;
  try {
    if (returnAmount < 0) {
      const err = { message: "Do you want to wash plates?" };
      throw err;
    }

    calculateAndDisplayChange(returnAmount);
  } catch (err) {
    console.log(err.message);
    // TODO : Display the error
  }
});

// Calculation logic
const denominations = [2000, 500, 100, 20, 10, 5, 1];

function calculateAndDisplayChange(returnAmount) {
  let amount = returnAmount;

  for (let i = 0; i < denominations.length; i++) {
    const curDenoCount = Math.trunc(amount / denominations[i]);
    amount %= denominations[i];

    outputCells[i].innerText = curDenoCount;
  }
}
