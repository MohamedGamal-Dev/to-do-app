//  === General Refs ===
let app = document.querySelector('.app');
let formWrap = document.querySelector('.task-form');
let form = document.querySelector('#task-form-add');
let input = document.querySelector('#task-form-add--input');
let submit = document.querySelector('#task-form-add--button');
let listWrap = document.querySelector('.tasks-list-wrap');
let tasks = document.querySelector('.tasks-list');

// ===* CREATE APP DATA *===
let data = [];

let createData = () => {
  // {id:string, task:string, completed:boolean}
  let newTask = { id: uId(), text: input.value, completed: false };
  data.push(newTask);

  renderTask();

  localStorage.setItem('data', JSON.stringify(data));
  console.log(data, '**CREATE**');
};

// ===*- ADD TASK -*===
form.addEventListener('submit', (e) => {
  e.preventDefault();
  createData();
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

  taskItem.classList.add('task-item');
  taskItem.setAttribute('id', `${task.id}`);
  taskItemText.classList.add('task-item');
  taskItemEditInput.classList.add('hidden');

  taskOptions.classList.add('task-item--options');
  taskOptionsEdit.classList.add('task-options--edit');
  taskOptionsEditSave.classList.add('task-options--edit__save');
  taskOptionsEditSave.classList.add('hidden');
  taskOptionsDelete.classList.add('task-options--delete');

  // taskItemText.addEventListener('click', toggleCompleted);
  // taskOptionsEdit.addEventListener('click', editTask);
  // taskOptionsEditSave.addEventListener('click', updateTask);
  // taskOptionsDelete.addEventListener('click', deleteTask);

  tasks.append(taskItem);
  taskItem.append(taskItemText, taskOptions);
  taskItemText.appendChild(taskItemTextInner);
  taskOptions.append(taskOptionsEdit, taskOptionsEditSave, taskOptionsDelete);
  taskOptionsEdit.appendChild(taskOptionsEditBtn);
  taskOptionsEditBtn.appendChild(taskOptionsEditBtnInner);
  taskOptionsEditSave.appendChild(taskOptionsEditSaveBtn);
  taskOptionsEditSaveBtn.appendChild(taskOptionsEditSaveBtnInner);
  taskOptionsDelete.appendChild(taskOptionsDeleteBtn);
  taskOptionsDeleteBtn.appendChild(taskOptionsDeleteBtnInner);
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
