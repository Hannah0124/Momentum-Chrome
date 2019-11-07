const form = document.querySelector('.js-form'),
      input = form.querySelector('input'),
      greeting = document.querySelector('.js-greetings');

const USER_LS = "currentUser",
      SHOWING_CN = "showing";

// Save a name in local storage
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

// Add an event when submitting
function handleSubmit(event) {
  event.preventDefault();

  // Get the input value
  const currentValue = input.value;

  // Display the greeting
  paintGreeting(currentValue);

  // Save a name in LS
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
  // Hide form
  form.classList.remove(SHOWING_CN);
  // Display greeting
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Howdy ${text}!`
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if(currentUser  === null) {
    // she is not 
    askForName();

  } else {
    // she is
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();