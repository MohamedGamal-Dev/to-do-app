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
  tasks.append(taskItem);

  let taskTextSpan = document.createElement('span');
  taskTextSpan.classList.add('task-item--text');
  taskItem.prepend(taskTextSpan);
  taskTextSpan.innerHTML += `${task.text}`;

  let taskTextOptions = document.createElement('span');
  taskTextOptions.classList.add('task-item--options');
  taskItem.append(taskTextOptions);

  let editIcon = document.createElement('i');
  editIcon.classList.add('fa-solid');
  editIcon.classList.add('fa-pen-to-square');
  taskTextOptions.prepend(editIcon);
  editIcon.addEventListener('click', (e) => {
    console.log(e, 'edit');
  });

  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid');
  deleteIcon.classList.add('fa-trash');
  deleteIcon.classList.add('icon-pointer');
  taskTextOptions.append(deleteIcon);
  deleteIcon.addEventListener('click', (e) => {
    console.log(e, 'delete');
  });
};

let deleteTask = (e) => {
  console.log(e, 'delete');
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
