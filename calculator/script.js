const buttons = document.querySelectorAll(".btn");
const result = document.getElementById("result");
const history = document.getElementById("history");
const themeToggle = document.getElementById("theme-toggle");

let expression = "";
let darkMode = false;

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "CE") {
      expression = "";
      result.textContent = "";
      history.textContent = "";
    } else if (value === "⌫") {
      expression = expression.slice(0, -1);
      result.textContent = expression;
    } else if (value === "=") {
      try {
        const evalResult = eval(expression);
        history.textContent = expression;
        result.textContent = evalResult;
        expression = evalResult.toString();
      } catch {
        result.textContent = "Error";
      }
    } else if (value === "+/-") {
      if (expression) {
        if (expression.startsWith("-")) expression = expression.slice(1);
        else expression = "-" + expression;
        result.textContent = expression;
      }
    } else {
      expression += value;
      result.textContent = expression;
    }

    adjustFontSize();
  });
});

// Adjust font size automatically
function adjustFontSize() {
  const maxFontSize = 2.5;
  const minFontSize = 1.2;
  const maxLength = 10;

  let currentLength = result.textContent.length;
  let newSize = maxFontSize;

  if (currentLength > maxLength) {
    newSize = Math.max(minFontSize, maxFontSize - (currentLength - maxLength) * 0.15);
  }

  result.style.fontSize = newSize + "rem";
}

// Toggle Dark Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkMode = !darkMode;
  themeToggle.textContent = darkMode ? "🌙" : "☀️";
});
