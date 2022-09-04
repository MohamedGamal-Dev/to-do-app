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
  let taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.setAttribute('id', `${task.id}`);
  tasks.append(taskItem);

  let taskTextSpan = document.createElement('span');
  taskTextSpan.classList.add('task-item--text');
  taskItem.prepend(taskTextSpan);
  taskTextSpan.innerHTML += `${task.text}`;

  let taskTextOptions = document.createElement('span');
  taskTextOptions.classList.add('task-item--options');
  taskItem.append(taskTextOptions);

  let editWrap = document.createElement('span');
  editWrap.classList.add('delete-wrap');
  taskTextOptions.prepend(editWrap);
  editWrap.addEventListener('click', (e) => {
    console.log(e, 'edit');
  });

  let editIcon = document.createElement('i');
  editIcon.classList.add('fa-solid');
  editIcon.classList.add('fa-pen-to-square');
  editWrap.prepend(editIcon);

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
