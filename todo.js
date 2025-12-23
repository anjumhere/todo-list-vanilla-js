const input = document.getElementById("todo-input");
const btn = document.getElementById("todo-btn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoNode(todo, index) {
  // creating elements
  const li = document.createElement("li");
  li.classList.add("li", "todo-bubble");

  // creating checkbox

  const checkbox = document.createElement("input");
  checkbox.classList.add("todo-checkbox");

  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodos();
  });

  // creating textspans

  const textSpan = document.createElement("span");
  textSpan.classList.add("textSpan");
  textSpan.textContent = todo.text;
  textSpan.style.margin = " 0 9px";

  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
    saveTodos();
  }

  // creaing dblclick functinality
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit Todo", todo.text);
    // newText.classList.add("newText");
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
    }
  });
  // creaing delete button

  const delBtn = document.createElement("button");
  delBtn.classList.add("delt");
  delBtn.type = "checkbox";
  delBtn.textContent = "delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  });
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}

function render() {
  // rendering everything
  list.innerHTML = "";

  // recreating every element

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  // starting adding todo by button
  const text = input.value.trim();
  if (!text) {
    return;
  }

  // push to the list
  todos.push({ text, completed: false });
  input.value = "";
  render();
  saveTodos();
}
btn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
render();
