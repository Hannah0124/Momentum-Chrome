const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';


let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== JSON.parse(li.id);
  });

  toDos = cleanToDos

  // Save the updated data in LS
  saveToDos();
};

// Save to do list in local storage
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
};

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1; // =>  0 + 1
  
  delBtn.innerText = "❌";
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;

  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text,
    id: newId 
  }

  toDos.push(toDoObj);

  // Save data in LS
  saveToDos();
};

// Add a submit event
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  // Make the input box as empty
  toDoInput.value = "";
}

// Load To Do list
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  } 
};

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();