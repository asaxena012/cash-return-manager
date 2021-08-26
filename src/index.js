const billAmountElement = document.querySelector("#bill-input");
const nextBtn = document.querySelector("#next-button");
const paidInputContainer = document.querySelector("#paid-input-container");
const paidInputElement = document.querySelector("#paid-input");
const calcBtn = document.querySelector("#calculate-button");
const outputCells = document.querySelectorAll(".output-cell");
const errorMessageElement = document.querySelector("#error-message");
const errorImage = document.querySelector("#error-image");

const displayNext = () => {
  paidInputContainer.style.display = "flex";
  nextBtn.style.display = "none";
};

const displayError = (err) => {
  errorMessageElement.style.display = "block";
  errorMessageElement.textContent = err;
};

const displayErrImage = (src) => {
  errorImage.src = src;
  errorImage.style.display = "block";
};

const hideError = () => {
  errorMessageElement.style.display = "none";
  errorImage.style.display = "none";
};

// Check valid bill amount and display next on next-button
nextBtn.addEventListener("click", () => {
  const billAmount = billAmountElement.value;

  try {
    if (billAmount <= 0) {
      const err = { message: "Bill amount has to be greater than 0" };
      throw err;
    }

    hideError();
    displayNext();
  } catch (err) {
    displayError(err.message);
    displayErrImage("/src/images/disappointed.jpg");
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

    hideError();
    calculateAndDisplayChange(returnAmount);
  } catch (err) {
    displayError(err.message);
    displayErrImage("/src/images/washingPlates.jpg");
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

    if (curDenoCount > 0) {
      outputCells[i].style.color = "#007f5f";
      outputCells[i].style.fontWeight = "bold";
    }
  }
}
