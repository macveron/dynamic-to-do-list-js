// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    const addTask = () => {
        // Get the value from the input field
        const taskText = taskInput.value.trim();
        
        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Optionally, add a class to the new task
        li.classList.add('task-item'); // Adding a class for styling purposes

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add an event listener to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item and the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    };

    // Event listener for the Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
