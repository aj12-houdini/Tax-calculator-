const btn = document.querySelectorAll(".btn");

const bill = document.querySelector(".bill-input");

const number = document.querySelector(".number-input");

const tip = document.querySelector(".tip-amount-value");

const total = document.querySelector(".total-amount-value");

const custom = document.querySelector(".custom");

const error = document.querySelector(".number h4");

const form = document.querySelector(".form");

const reset = document.querySelector(".btn-reset");

const errorMessage = document.createElement("span");

function getBill() {
  let billAmt = bill.value;
  return billAmt;
}

function customValue() {
  return custom.value;
}

function removeActiveBtn() {
  btn.forEach((b) => {
    b.classList.remove("active");
  });
}
function addActiveBtn() {
  btn.forEach((b) => [
    b.addEventListener("click", function (e) {
      e.preventDefault();
      removeActiveBtn();
      b.classList.toggle("active");
      checkActiveBtn();
    }),
  ]);
}

addActiveBtn();

function checkActiveBtn() {
  btn.forEach((b) => {
    if (b.classList.contains("active")) {
      disabledCustomBtn();
    }
  });
}

function numberOfPeople() {
  return number.value;
}

function calcTax(percentage, bill, numberPeople) {
  let tipAmt = (bill * percentage) / numberPeople;
  tip.innerHTML = `$${(+tipAmt).toFixed(2)}`;
  let totalAmt = (bill * (1 + percentage)) / numberPeople;
  total.innerHTML = `$${(+totalAmt).toFixed(2)}`;
}

function disabledCustomBtn() {
  custom.disabled = true;
  custom.style.cursor = "not-allowed";
  custom.style.opacity = 0.5;
  custom.classList.add("hover-class");
  custom.value = "";
}

function activateCustomBtn() {
  custom.disabled = false;
  custom.style.cursor = "pointer";
  custom.classList.remove("hover-class");
  custom.style.opacity = 1;
}

function clearFields() {
  bill.value = "";
  number.value = "";
  tip.innerHTML = `$0.00`;
  total.innerHTML = `$0.00`;
  custom.value = "";
}

function addErrorMessage() {
  number.classList.add("wrong");
  error.appendChild(errorMessage);
  errorMessage.innerText = "Can't be zero";
  errorMessage.style.color = "rgba(255, 0, 0, 0.561)";
  errorMessage.style.position = "absolute";
  errorMessage.style.right = 0;
}

function removeClasses() {
  number.classList.remove("wrong");
  btn.forEach((b) => {
    b.classList.remove("active");
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let numberPeople = numberOfPeople();
  console.log(numberPeople);
  let bill = getBill();
  let percentage = 0;

  if (+numberPeople <= 0 && +numberPeople !== "") addErrorMessage();
  else {
    if (customValue() == "") {
      btn.forEach((b) => {
        if (b.classList.contains("active")) {
          percentage = b.innerHTML.substring(0, b.innerHTML.length - 1) / 100;
          calcTax(percentage, bill, numberPeople);
        }
      });
    } else {
      percentage = customValue() / 100;
      calcTax(percentage, bill, numberPeople);
    }
  }
});

reset.addEventListener("click", function (e) {
  clearFields();

  try {
    error.removeChild(errorMessage);
  } catch (error) {}

  removeClasses();
  bill.focus();
  activateCustomBtn();
});
