// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  // creating todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // add to local storage
  saveLocalTodos(todoInput.value);
  // check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  // Edit button
  const EditButton = document.createElement('button');
  EditButton.innerHTML = '<i class="fas fa-pencil"></i>';
  EditButton.classList.add('edit-btn');
  todoDiv.appendChild(EditButton);


  // append to the list (ul)
  todoList.appendChild(todoDiv);
  // clear todoInput value
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  console.log(item)
  // delete todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;

    // animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    })
  }

  // check mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    // editButton.setAttribute("disabled", "disabled");
  }

  if (item.classList[0] === 'edit-btn') {
    console.log('edit c')
    const parent = item.parentElement;
    const txt = item.parentElement.children[0];
    todoInput.value = txt.innerText;

    removeLocalTodos(parent);
    txt.parentElement.remove(parent);
  }

  if (item.parentElement.classList[0] === 'edit-btn') {
    console.log('edit c')
    const parent = item.parentElement.parentElement;
    const txt = item.parentElement.parentElement.children[0];
    todoInput.value = txt.innerText;

    removeLocalTodos(parent);
    txt.parentElement.remove(parent);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';

        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  })

}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    const EditButton = document.createElement('button');
    EditButton.innerHTML = '<i class="fas fa-pencil"></i>';
    EditButton.classList.add('edit-btn');
    todoDiv.appendChild(EditButton);

    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
