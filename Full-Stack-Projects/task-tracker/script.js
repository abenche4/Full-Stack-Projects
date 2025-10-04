// script.js

// Section 1: TODOs
// TODO: Register submissions from the user on the form.
// TODO: Determine the value of the data submitted and add it to a JavaScript array called tasks
// TODO: Call the render function to update the table with the new tasks.

// Section 2: App State Variables
let tasks = [];

// Section 3: Cached Element References
// Your Turn: Use document.getElementById to get the form and table elements
const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");

// Section 4: Functions and Event Listeners

// Function to handle form submissions
function handleSubmission(event) {
  event.preventDefault(); // this function stops our form from reloading the page

  // TODO: Get form input values
  const taskName = document.getElementById('taskName').value;
  const taskDescription = document.getElementById('taskDescription').value;
  const taskDeadline = document.getElementById('taskDeadline').value;

  // TODO: Validate input fields
  if (!taskName || !taskDeadline) {
    alert('Task name and deadline are required!');
    return;
  }

  // TODO: Update the tasks array
  tasks.push({ name: taskName, description: taskDescription, deadline: taskDeadline, completed: false });

  // Clear the form for UX
  taskForm.reset();

  // TODO: Call the render function
  render();
}

// Function to render tasks in the table
function render() {
  // TODO: Use array methods to create a new table row of data for each item in the array
  taskTable.innerHTML = tasks.map(task => `
    <tr${task.completed ? ' class="completed"' : ''}>
      <td>${escapeHTML(task.name)}</td>
      <td>${escapeHTML(task.description)}</td>
      <td>${escapeHTML(task.deadline)}</td>
      <td><button onclick="markTaskComplete(this)">Complete</button></td>
      <td><button onclick="removeTask(this)">Remove</button></td>
    </tr>
  `).join('');
}

// Function to initialize the table
function init() {
  taskTable.innerHTML = ''; // Clear the table
  tasks = []; // Reset the tasks array
  render(); // Call the render function
}

// Button helpers referenced in render()
function markTaskComplete(btn) {
  const row = btn.closest('tr');
  const rows = Array.from(taskTable.querySelectorAll('tr'));
  const index = rows.indexOf(row);
  if (index > -1 && tasks[index]) {
    tasks[index].completed = !tasks[index].completed;
    render();
  }
}

function removeTask(btn) {
  const row = btn.closest('tr');
  const rows = Array.from(taskTable.querySelectorAll('tr'));
  const index = rows.indexOf(row);
  if (index > -1) {
    tasks.splice(index, 1);
    render();
  }
}

// Small helper to safely render text
function escapeHTML(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Event listener for form submission
taskForm.addEventListener('submit', handleSubmission);

// Call the init function to set up the initial state of the app
init();
