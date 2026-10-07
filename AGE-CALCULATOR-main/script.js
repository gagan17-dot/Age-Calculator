const button = document.getElementById("btn");
const birthdayInput = document.getElementById("birthday");
const result = document.getElementById("result");

// Prevent picking a date in the future.
birthdayInput.max = new Date().toISOString().split("T")[0];

/**
 * Show a message in the result area.
 * @param {string} text
 * @param {boolean} isError
 */
function showMessage(text, isError = false) {
  result.textContent = text;
  result.classList.toggle("error", isError);
}

/**
 * Calculate the number of full years between a birth date and today.
 * @param {string} birthdayValue - Date string in YYYY-MM-DD format.
 * @returns {number}
 */
function getAge(birthdayValue) {
  const today = new Date();
  const [year, month, day] = birthdayValue.split("-").map(Number);

  let age = today.getFullYear() - year;
  const monthDifference = today.getMonth() + 1 - month;

  // Birthday has not happened yet this year.
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < day)) {
    age--;
  }

  return age;
}

/** Read the input, validate it, and display the age. */
function calculateAge() {
  const birthdayValue = birthdayInput.value;

  if (!birthdayValue) {
    showMessage("Please enter your date of birth.", true);
    return;
  }

  const age = getAge(birthdayValue);

  if (age < 0) {
    showMessage("Date of birth cannot be in the future.", true);
    return;
  }

  const unit = age === 1 ? "year" : "years";
  showMessage(`You are ${age} ${unit} old`);
}

button.addEventListener("click", calculateAge);
