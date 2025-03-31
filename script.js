// Select elements
const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesList = document.getElementById('notes-list');
const themeToggle = document.getElementById('theme-toggle');

// Load notes from local storage when the app starts
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    document.body.classList.add('light-mode'); // Set default theme
    document.querySelectorAll('.container, header h1').forEach(el => el.classList.add('light-mode'));
});

// Add note event
addNoteBtn.addEventListener('click', () => {
    const note = noteInput.value.trim();
    if (note) {
        addNoteToList(note);
        saveNoteToStorage(note);
        noteInput.value = ""; // Clear the input
    }
});

// Add a note to the list
function addNoteToList(note) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${note}</span>
        <button class="delete-btn">Delete</button>
    `;

    // This is the action that is triggered when the delete button is clicked
    listItem.querySelector('.delete-btn').addEventListener('click', () => {
        listItem.remove();
        deleteNoteFromStorage(note);
    });

    notesList.appendChild(listItem);
}

// Save a note to local storage
function saveNoteToStorage(note) {
    const notes = getNotesFromStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from local storage
function loadNotes() {
    getNotesFromStorage().forEach(note => addNoteToList(note));
}

// Get notes from local storage
function getNotesFromStorage() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

// Delete a note from local storage
function deleteNoteFromStorage(note) {
    const notes = getNotesFromStorage().filter(n => n !== note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Theme toggle event
themeToggle.addEventListener('click', () => toggleTheme());



// Toggle between light and dark mode
function toggleTheme() {
  const elementsToToggle = document.querySelectorAll('body, .container, header h1, textarea, li, button');
  elementsToToggle.forEach(el => el.classList.toggle('dark-mode') && el.classList.toggle('light-mode'));

  // Update button text and icon dynamically
  const icon = themeToggle.querySelector('.theme-toggle');
  if (document.body.classList.contains('dark-mode')) {
      themeToggle.textContent = ' Switch to Light Mode';
      icon.textContent = '🌙'; // Moon icon for dark mode
      themeToggle.prepend(icon);
  } else {
      themeToggle.textContent = ' Switch to Dark Mode';
      icon.textContent = '🌞'; // Sun icon for light mode
      themeToggle.prepend(icon);
  }
}
// work on keeping icons when the toggle is pressed 
// create rules to have the first letter of each note automatically capitalize for looks
// upload to github
