let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const value = document.querySelector("#inp").value.trim();
  if (value) {
    todos.push({ title: value });
    document.querySelector("#inp").value = ""; 
    saveTodos();
    render();
  } else {
    alert("Please enter a task!"); 
  }
}

function deleteTodo(index) {
  todos.splice(index, 1); 
  saveTodos();
  render();
}

function enableEdit(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const todoText = todoItem.querySelector("h3");
  const currentTitle = todos[index].title;

  todoText.innerHTML = `
    <input type="text" id="edit-input-${index}" value="${currentTitle}" />
    <button onclick="saveEdit(${index})">Save</button>
  `;
}

function saveEdit(index) {
  const newTitle = document.getElementById(`edit-input-${index}`).value.trim();
  if (newTitle) {
    todos[index].title = newTitle; 
    saveTodos();
    render();
  }
}

function createTodoComponent(todo, index) {
  const div = document.createElement("div");
  div.className = "todo-item";
  div.id = `todo-${index}`; 
  div.innerHTML = `
    <h3>${index + 1}. ${todo.title}</h3>
    <button onclick="enableEdit(${index})">Edit</button>
    <button onclick="deleteTodo(${index})">Delete</button>
  `;
  return div;
}

function render() {
  const todosContainer = document.querySelector("#todos");
  todosContainer.innerHTML = ""; 
  todos.forEach((todo, index) => {
    const element = createTodoComponent(todo, index);
    todosContainer.appendChild(element);
  });
}
render();
