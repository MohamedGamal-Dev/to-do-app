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
  let newTask = { id: uId(), task: input.value, completed: false };
  data.push(newTask);

  renderTask();

  localStorage.setItem('data', JSON.stringify(data));

  console.log(data);
};

let renderTask = () => {
  tasks.innerHTML = '';
  data.map((taskItem) => {
    tasks.innerHTML += `
    <div class='task-item'>
    <span class='task-item--text'>${taskItem.task}</span>
    <span class='task-item--options'>
    <i class="fa-solid fa-pen-to-square"></i>
    <i class="fa-solid fa-trash"></i>
    </span>
    </div>
    `;

    input.value = '';
  });
};

(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  console.log(data);
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
