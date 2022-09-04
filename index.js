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
  // {id:number, task:string, completed:boolean}
  let newTask = { id: null, task: input.value, completed: false };
  data.push(newTask);
  renderTask();
  console.log(data);
};

let renderTask = () => {
  tasks.innerHTML = '';
  data.map((taskItem) => {
    tasks.innerHTML += `
    <div>
    <span>${taskItem.task}</span>
    </div>
    `;
    input.value = '';
  });
};
