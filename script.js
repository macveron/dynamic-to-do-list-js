// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a task
    const addTask = (taskText, save = true) => {
        // If taskText is not provided, get it from the input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }
        
        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add a class for styling purposes
        li.classList.add('task-item');

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add an event listener to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the list item and the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";

        // Save the task to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    };

    // Function to save a task to Local Storage
    const saveTaskToLocalStorage = (taskText) => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    // Function to remove a task from Local Storage
    const removeTaskFromLocalStorage = (taskText) => {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
    };

    // Event listener for the Add Task button
    addButton.addEventListener('click', () => addTask());

    // Event listener for the Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
