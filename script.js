const form = document.querySelector('.create__todo');
const inputBox = document.querySelector('#input__box');
const todoList = document.querySelector('.todo__list');

const alertMessages = [
    "Damn, I'm gonna kick your ass, what a stupid marmot!",
    "Your opinion is not accepted.",
    "You need drink more coffee!",
    "I think this guy is a genius."
];

form.addEventListener('submit', e => {
    e.preventDefault();
    addNewTodo();
});

todoList.addEventListener('click', e => {
    const targetEle = e.target;
    const selectedTodoEle = targetEle.closest('li');

    if (targetEle.type === "checkbox") {
        const textInput = selectedTodoEle.querySelector('.todo__content input');
        if (targetEle.checked) {
            textInput.style.color = 'var(--mouse)';
            textInput.style.textDecoration = 'line-through';
            selectedTodoEle.querySelector('.bubble').classList.add("checked");
            todoList.removeChild(selectedTodoEle);
            todoList.appendChild(selectedTodoEle);
        } else {
            textInput.style.color = ''; 
            textInput.style.textDecoration = '';
            selectedTodoEle.querySelector('.bubble').classList.remove("checked");
            todoList.removeChild(selectedTodoEle);
            todoList.insertBefore(selectedTodoEle, todoList.firstChild);
        }
    } else if (targetEle.innerHTML.toLowerCase() === "delete") {
        selectedTodoEle.remove();
    } else if (targetEle.classList.contains('buttons') && (targetEle.innerHTML.toLowerCase() === "edit" || targetEle.innerHTML.toLowerCase() === "save")) {
        const textInput = selectedTodoEle.querySelector('.todo__content input');
        if (targetEle.innerHTML.toLowerCase() === "edit") {
            textInput.removeAttribute("readonly");
            textInput.focus();

            // Position the cursor at the end of the input text.
            const value = textInput.value;
            textInput.value = '';
            textInput.value = value;

            targetEle.innerHTML = "save";
        } else {
            textInput.setAttribute("readonly", "true");
            targetEle.innerHTML = "edit";
            saveData(); 
        }
    }

    saveData();
});

function addNewTodo() {
    if(inputBox.value === '') {
        alert(randomAlert());
        return;
    } else {
        const newTodo = createNewTodo(inputBox.value);
        todoList.insertBefore(newTodo, todoList.firstChild);
    }

    inputBox.value = "";
    saveData();
}

function createNewTodo(text) {

    const li = document.createElement("li");
    li.classList.add('todo__item');

    const label = document.createElement("label");

    const checkBox = document.createElement("input");
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('todo__checkbox');
    checkBox.id = `checkbox-${Date.now()}`; 

    const bubble = document.createElement("span");
    bubble.classList.add('bubble');

    label.appendChild(checkBox);
    label.appendChild(bubble);

    const todoContent = document.createElement("div");
    todoContent.classList.add('todo__content');

    const textInput = document.createElement("input");
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('value', text);  
    textInput.setAttribute('readonly', 'true');  

    todoContent.appendChild(textInput);

    const todoActions = document.createElement("div");
    todoActions.classList.add('todo__actions');

    const editBtn = document.createElement("button");
    editBtn.classList.add('buttons');
    editBtn.setAttribute('id', 'todoedit');
    editBtn.innerHTML = "edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('buttons');
    deleteBtn.setAttribute('id', 'delete');
    deleteBtn.innerHTML = "delete";

    todoActions.appendChild(editBtn);
    todoActions.appendChild(deleteBtn);

    li.appendChild(label);
    li.appendChild(todoContent);
    li.appendChild(todoActions);

    return li;
}

function randomAlert() {
    const randomIndex = Math.floor(Math.random() * alertMessages.length);
    return alertMessages[randomIndex];
}

function saveData() {
    localStorage.setItem("data", todoList.innerHTML);
}

function showTodoList() {
    todoList.innerHTML = localStorage.getItem("data");
}

showTodoList();

/* localStorage.clear(); */