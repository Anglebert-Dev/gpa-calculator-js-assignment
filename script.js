// Store assignments in an array
let assignments = [];

// Load data from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
    const savedAssignments = localStorage.getItem('gpaAssignments');
    if (savedAssignments) {
        assignments = JSON.parse(savedAssignments);
        updateUI();
    }
});

// Get DOM elements
const assignmentForm = document.getElementById('assignmentForm');
const assignmentNameInput = document.getElementById('assignmentName');
const gradeInput = document.getElementById('grade');
const gpaDisplay = document.getElementById('gpaDisplay');
const assignmentsList = document.getElementById('assignmentsList');

// Add event listeners
assignmentForm.addEventListener('submit', handleFormSubmit);
document.addEventListener('keydown', handleKeyPress);

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = assignmentNameInput.value.trim();
    const grade = parseFloat(gradeInput.value);
    
    if (name && !isNaN(grade) && grade >= 0 && grade <= 5) {
        addAssignment(name, grade);
        assignmentForm.reset();
        assignmentNameInput.focus();
    }
}

// Add new assignment
function addAssignment(name, grade) {
    assignments.push({ name, grade });
    saveToLocalStorage();
    updateUI();
}

// Calculate GPA
function calculateGPA() {
    if (assignments.length === 0) return 0;
    
    const sum = assignments.reduce((total, assignment) => total + assignment.grade, 0);
    return sum / assignments.length;
}

// Update UI
function updateUI() {
    // Update GPA display
const gpa = calculateGPA();
gpaDisplay.textContent = gpa.toFixed(2);

// Update assignment count
document.getElementById('assignmentCount').textContent = assignments.length;

// Update assignments list
assignmentsList.innerHTML = assignments.map((assignment, index) => `
    <div class="assignment-item">
        <span>${assignment.name}</span>
        <span>${assignment.grade.toFixed(1)}/5.0</span>
    </div>
`).join('');
}

// Handle keyboard events
function handleKeyPress(e) {
    if (e.key.toLowerCase() === 's') {
        console.log('Current Assignments:', assignments);
        console.log('Current GPA:', calculateGPA().toFixed(2));
    }
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('gpaAssignments', JSON.stringify(assignments));
}

// Input validation
gradeInput.addEventListener('input', (e) => {
    let value = parseFloat(e.target.value);
    if (value > 5) e.target.value = 5;
    if (value < 0) e.target.value = 0;
}); 