const tipCalculate = (total, percentage = 0.3) => total + total * percentage;

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8;
};

const celsiusToFahrenheit = (temp) => {
  return temp * 1.8 + 32;
};

module.exports = {
  tipCalculate,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
};
