// Ref's
let app = document.querySelector('.app');
let formWrap = document.querySelector('.task-form');
let form = document.querySelector('.task-form-add');
let input = document.querySelector('.task-input');
let submit = document.querySelector('.task-button');
let listWrap = document.querySelector('.list-wrap');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(input.value);
  addData();
});

let data = [];

let addData = () => {
  // {id:number, task:string, completed:boolean}
  data.push({ task: input.value });
  console.log(data);
};
