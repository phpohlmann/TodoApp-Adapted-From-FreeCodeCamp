// Primeiro Segmento de Código.
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const taskInfoInput = document.getElementById("taskInfo-input");
const descriptionInput = document.getElementById("description-input");

// Segundo Segmento de Código.
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

// Terceiro Segmento de Código.
const findDataIndex = (buttonEl) =>
  buttonEl
    ? taskData.findIndex(({ id }) => id === buttonEl.parentElement.id)
    : taskData.findIndex((item) => item.id === currentTask.id);

// Quarto Segmento de Código.
const addOrUpdateTask = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";

  const taskDataArrIndex = findDataIndex();

  const currentDate = new Date();
  const creationDate = currentDate.toUTCString();

  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    description: descriptionInput.value,
    taskInfo: taskInfoInput.value,
    creationDate: creationDate,
  };

  if (taskDataArrIndex === -1) {
    taskData.unshift(taskObj);
    taskObj.editDate = "Not edited yet";
  } else {
    taskObj.editDate = currentDate.toUTCString();
    taskObj.creationDate = currentTask.creationDate;
    taskData[taskDataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

// Quinto Segmento de Código.
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, title, description, taskInfo, creationDate, editDate }) => {
      tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Task Info:</strong> ${taskInfo}</p>
          <p><strong>Created in:</strong> ${creationDate}</p>
          <p><strong>Last Edited:</strong> ${editDate}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `;
    }
  );
};

// Sexto Segmento de Código.
const deleteTask = (buttonEl) => {
  const taskDataArrIndex = findDataIndex(buttonEl);
  buttonEl.parentElement.remove();
  taskData.splice(taskDataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
};

// Sétimo Segmento de Código.
const editTask = (buttonEl) => {
  const taskDataArrIndex = findDataIndex(buttonEl);

  currentTask = taskData[taskDataArrIndex];

  titleInput.value = currentTask.title;
  descriptionInput.value = currentTask.description;
  taskInfoInput.value = currentTask.taskInfo;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");
};

// Oitavo Segmento de Código.
const reset = () => {
  titleInput.value = "";
  descriptionInput.value = "";
  taskInfoInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

// Nono Segmento de Código.
if (taskData.length) {
  updateTaskContainer();
}

// Décimo Segmento de Código.
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// Décimo Primeiro Segmento de Código.
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || taskInfoInput.value || descriptionInput.value;
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    taskInfoInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

// Décimo Segundo Segmento de Código.
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Décimo Terceiro Segmento de Código.
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

// Décimo Quarto Segmento de Código.
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});
