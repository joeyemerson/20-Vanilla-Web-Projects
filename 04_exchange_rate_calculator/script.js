const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountsEl_one = document.getElementById('amount-one');
const amountsEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function trueRound(value, digits) {
  return (Math.round((value * Math.pow(10, digits)).toFixed(digits - 1)) / Math.pow(10, digits)).toFixed(digits);
}

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // prettier-ignore-start
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      // prettier-ignore-end

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountsEl_two.value = trueRound(amountsEl_one.value * rate, 2);
    });
}

calculate();

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountsEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
currencyEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});
