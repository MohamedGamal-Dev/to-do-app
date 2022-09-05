// Ref's
let app = document.querySelector('.app');
let formWrap = document.querySelector('.task-form');
let form = document.querySelector('.task-form-add');
let input = document.querySelector('.task-input');
let submit = document.querySelector('.task-button');
let listWrap = document.querySelector('.list-wrap');
let tasks = document.querySelector('.tasks-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  createData();
});

let data = [];

let createData = () => {
  // {id:string, task:string, completed:boolean}
  let newTask = { id: uId(), text: input.value, completed: false };
  data.push(newTask);

  renderTask();

  localStorage.setItem('data', JSON.stringify(data));

  console.log(data, 'create');
};

let renderTask = () => {
  tasks.innerHTML = '';
  data.map((task) => {
    createTaskItem(task);
    input.value = '';
  });
};

let createTaskItem = (task) => {
  // Task-Item Container
  let taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.setAttribute('id', `${task.id}`);
  tasks.append(taskItem);

  // Task--TEXT--
  let taskTextSpan = document.createElement('span');
  taskTextSpan.classList.add('task-item--text');
  taskItem.prepend(taskTextSpan);
  taskTextSpan.innerHTML += `${task.text}`;

  // Task-OPTIONS
  let taskTextOptions = document.createElement('span');
  taskTextOptions.classList.add('task-item--options');
  taskItem.append(taskTextOptions);

  // Task--EDIT
  let editWrap = document.createElement('span');
  editWrap.classList.add('edit-wrap');
  taskTextOptions.prepend(editWrap);
  editWrap.addEventListener('click', editTask);

  let editIcon = document.createElement('button');
  // editIcon.classList.add('fa-solid');
  // editIcon.classList.add('fa-pen-to-square');
  editIcon.innerHTML = 'edit';
  editWrap.prepend(editIcon);

  // Task--EDIT--SAVE
  let editUpdate = document.createElement('span');
  editUpdate.classList.add('edit-update');
  taskTextOptions.appendChild(editUpdate);
  editUpdate.style.display = 'none';
  editUpdate.addEventListener('click', updateTask);

  let saveBtn = document.createElement('button');
  // saveBtn.classList.add('fa-solid');
  // saveBtn.classList.add('fa-pen-to-square');
  saveBtn.innerHTML = 'Save';
  editUpdate.prepend(saveBtn);

  // Task--DELETE
  let deleteWrap = document.createElement('span');
  deleteWrap.classList.add('delete-wrap');
  taskTextOptions.append(deleteWrap);
  deleteWrap.addEventListener('click', deleteTask);

  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid');
  deleteIcon.classList.add('fa-trash');
  deleteWrap.append(deleteIcon);
};

let deleteTask = (e) => {
  let targetTask =
    e.target.parentElement.parentElement.parentElement.parentElement;

  // console.log(targetTask.id, 'delete-targetID');

  targetTask.remove();
  data.splice(targetTask.id, 1);

  localStorage.setItem('data', JSON.stringify(data));

  console.log(data, 'delete-update');
};

// Prototypes

let editTask = (e) => {
  let targetText = e.target.parentElement.parentElement.parentElement;

  // console.dir(targetText);

  let targetEditUpdate = e.target.parentElement.parentElement.childNodes[1];
  let targetEditWrap = e.target.parentElement;

  // console.dir(targetEditUpdate, 'edit-update');
  // console.dir(targetEditWrap, 'edit-wrap');
  // targetEditUpdate.nodeName "#comment"
  // font awesome Error

  targetEditUpdate.style.display = 'inline-block';
  targetEditWrap.style.display = 'none';

  targetText.setAttribute('contentEditable', true);
};

let updateTask = (e) => {
  let targetText =
    e.target.parentElement.parentElement.parentElement.childNodes[0];
  let targetEditWrap = e.target.parentElement.parentElement.childNodes[0];
  let targetEditUpdate = e.target.parentElement;

  let targetTask = e.target.parentElement.parentElement.parentElement;

  // console.dir(targetEditUpdate);
  // console.dir(targetEditWrap);
  // console.dir(targetTask);

  targetEditUpdate.style.display = 'none';
  targetEditWrap.style.display = 'inline-block';

  targetText.setAttribute('contentEditable', false);

  let updatedTaskText =
    e.target.parentElement.parentElement.parentElement.childNodes[0]
      .textContent;
  // console.dir(saveBtn, 'edit');
  // console.dir(targetText, 'save');
  // console.log(updatedTaskText, 'save');

  data.find((t) => {
    t && t.id === String(targetTask.id);
    {
      return (t.text = updatedTaskText);
    }
  });

  localStorage.setItem('data', JSON.stringify(data));

  console.log(data, 'updated-data');
};

(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  console.log(data, 'initialization');
  renderTask();
})();

// Helpers:
let uId = () => {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
};
