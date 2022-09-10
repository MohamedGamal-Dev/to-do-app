//  === General Refs ===
let app = document.querySelector('.app');
let formWrap = document.querySelector('.task-form');
let form = document.querySelector('#task-form-add');
let input = document.querySelector('#task-form-add--input');
let submit = document.querySelector('#task-form-add--button');
let listWrap = document.querySelector('.tasks-list-wrap');
let tasks = document.querySelector('.tasks-list');
let alertMsg = document.querySelector('.alert-msg');

// ===* CREATE APP DATA *===
let data = [];

let createData = () => {
  // {id:string, text:string, completed:boolean}
  let newTask = { id: uId(), text: input.value, completed: false };
  data = [...data, newTask];

  renderTask();
  resetInputValidation();

  localStorage.setItem('data', JSON.stringify(data));
  console.log(data, '**DATA--CREATE**');
};

// ===*- VALIDATION -*===
let inputValidation = (condition, createInputFunction) => {
  if (condition) {
    alertMsg.classList.remove('hidden');
    alertMsg.innerHTML = "Task details can't be empty";
  } else {
    createInputFunction();
  }
};

let resetInputValidation = () => {
  alertMsg.innerHTML = '';
  alertMsg.classList.add('hidden');
};

// ===*- ADD TASK -*===
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let inputCheck = input.value === '';
  inputValidation(inputCheck, createData);
});

// ===* READ APP DATA *===
let renderTask = () => {
  tasks.innerHTML = '';
  data.map((task) => {
    createTaskItem(task);
    input.value = '';
  });
};

// ===*- Build Task -*===
let createTaskItem = (task) => {
  let taskItem = document.createElement('div');
  let taskItemText = document.createElement('div');
  let taskItemTextInner = document.createTextNode(`${task.text}`);
  let taskItemEditInput = document.createElement('input');
  let taskItemEditInputMsg = document.createElement('div');
  let taskItemEditInputBreak = document.createElement('div');

  let taskOptions = document.createElement('div');
  let taskOptionsEdit = document.createElement('div');
  let taskOptionsEditBtn = document.createElement('button');
  let taskOptionsEditBtnInner = document.createTextNode('Edit');
  let taskOptionsEditSave = document.createElement('div');
  let taskOptionsEditSaveBtn = document.createElement('button');
  let taskOptionsEditSaveBtnInner = document.createTextNode('Save');
  let taskOptionsDelete = document.createElement('div');
  let taskOptionsDeleteBtn = document.createElement('button');
  let taskOptionsDeleteBtnInner = document.createTextNode('Delete');

  taskItemEditInput.value = task.text;

  taskItem.classList.add('task-item');
  taskItem.setAttribute('id', `${task.id}`);
  taskItemText.classList.add('task-item--text');
  taskItemEditInput.classList.add('task-item--text__input');
  taskItemEditInput.setAttribute('id', `${task.id}`);
  taskItemEditInput.setAttribute('type', 'text');
  taskItemEditInputMsg.classList.add('task-item--options__alert-msg');
  taskItemEditInputBreak.classList.add('flex-break');

  taskOptions.classList.add('task-item--options');
  taskOptions.classList.add('task-item--options__divider');
  taskOptionsEdit.classList.add('task-item--options__edit');
  taskOptionsEditSave.classList.add('task-item--options__save');
  taskOptionsDelete.classList.add('task-item--options__delete');

  taskItemEditInput.classList.add('hidden');
  taskOptionsEditSave.classList.add('hidden');
  taskItemEditInputMsg.classList.add('hidden');

  tasks.append(taskItem);

  taskItem.append(
    taskItemText,
    taskItemEditInput,
    taskOptions,
    taskItemEditInputBreak,
    taskItemEditInputMsg
  );

  taskItemText.appendChild(taskItemTextInner);

  taskOptions.append(taskOptionsEdit, taskOptionsEditSave, taskOptionsDelete);
  taskOptionsEdit.appendChild(taskOptionsEditBtn);
  taskOptionsEditBtn.appendChild(taskOptionsEditBtnInner);
  taskOptionsEditSave.appendChild(taskOptionsEditSaveBtn);
  taskOptionsEditSaveBtn.appendChild(taskOptionsEditSaveBtnInner);
  taskOptionsDelete.appendChild(taskOptionsDeleteBtn);
  taskOptionsDeleteBtn.appendChild(taskOptionsDeleteBtnInner);

  let taskItemId = String(taskItem.getAttribute('id'));

  // ===* UPDATE TASK *===
  taskOptionsEdit.addEventListener('click', function () {
    taskItemEditInput.classList.toggle('hidden');
    taskOptionsEditSave.classList.toggle('hidden');
    taskItemText.classList.toggle('hidden');
    taskOptionsEdit.classList.toggle('hidden');
    taskItem.classList.toggle('highlight-input');
    taskOptions.classList.toggle('task-item--options__divider');
    taskItemEditInput.focus();
  });

  taskOptionsEditSave.addEventListener('click', function (e) {
    taskOptions.classList.toggle('task-item--options__divider');

    if (taskItemEditInput.value === '') {
      taskItemEditInputMsg.classList.remove('hidden');
      taskItemEditInputMsg.innerHTML = "Task details can't be empty";
      taskItemEditInput.value = taskItemText.innerText;
      taskItemEditInput.focus();
    } else {
      taskItemEditInputMsg.innerHTML = '';
      taskItemEditInputMsg.classList.add('hidden');
      taskItem.classList.toggle('highlight-input');

      taskItemEditInput.classList.toggle('hidden');
      taskOptionsEditSave.classList.toggle('hidden');
      taskItemText.classList.toggle('hidden');
      taskOptionsEdit.classList.toggle('hidden');

      taskItemText.innerHTML = taskItemEditInput.value;

      data.map((task) => {
        task.id === taskItemId ? (task.text = taskItemEditInput.value) : task;
      });

      localStorage.setItem('data', JSON.stringify(data));
      console.log(data, '**DATA--UPDATED**');
    }
  });

  // ===*- TOGGLE COMPLETED -*===
  taskItemText.addEventListener('click', function () {
    data.find((task) => {
      if (task.id === taskItemId) {
        taskItemText.classList.toggle('completed');
        task.completed = !task.completed;
        task.completed
          ? taskOptionsEditBtn.setAttribute('disabled', '')
          : taskOptionsEditBtn.removeAttribute('disabled', '');
      }
    });

    localStorage.setItem('data', JSON.stringify(data));
    console.log(data, '**DATA--TOGGLE-COMPLETED**');
  });
  task.completed && taskItemText.classList.toggle('completed');
  task.completed
    ? taskOptionsEditBtn.setAttribute('disabled', '')
    : taskOptionsEditBtn.removeAttribute('disabled', '');

  // ===* DELETE TASK *===
  taskOptionsDelete.addEventListener('click', function (e) {
    let filteredData = data.filter((task) => {
      return task.id !== taskItemId;
    });

    data = filteredData;

    localStorage.setItem('data', JSON.stringify(data));
    console.log(data, '**DATA--DELETE**');

    renderTask();
  });
};

// === Initialization ===
(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  renderTask();
  console.log(data, '**INITIALIZATION**');
})();

// === HELPERS (>=>
let uId = () => {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
};
