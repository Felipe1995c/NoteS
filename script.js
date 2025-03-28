// Select elements
const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesList = document.getElementById('notes-list');

// Load notes from local storage when the app starts
document.addEventListener('DOMContentLoaded', loadNotes);

// Add note event
addNoteBtn.addEventListener('click', function () {
    if (noteInput.value.trim() !== "") {
        addNoteToList(noteInput.value);
        saveNoteToStorage(noteInput.value);
        noteInput.value = ""; // Clear the input
    }
});

// Function to add a note to the list
function addNoteToList(note) {
    const listItem = document.createElement('li');
    const noteText = document.createElement('span');
    noteText.textContent = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    // Delete functionality
    deleteBtn.addEventListener('click', function () {
        notesList.removeChild(listItem);
        deleteNoteFromStorage(note);
    });

    listItem.appendChild(noteText);
    listItem.appendChild(deleteBtn);
    notesList.appendChild(listItem);
}

// Save a new note to local storage
function saveNoteToStorage(note) {
    const notes = getNotesFromStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from local storage
function loadNotes() {
    const notes = getNotesFromStorage();
    notes.forEach(note => addNoteToList(note));
}

// Get notes from local storage
function getNotesFromStorage() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Delete a note from local storage
function deleteNoteFromStorage(note) {
    const notes = getNotesFromStorage();
    const updatedNotes = notes.filter(n => n !== note);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}
const myButton = document.querySelector('#my-button');

if (myButton) { // only try to add the event if the element exists.
  myButton.addEventListener('click', function() {
    myButton.classList.toggle('clicked');
  });
}
const themeToggle = document.getElementById('theme-toggle');

// Takes the "click" sound and causes any class that is lightmode and changes it to dark mode...or otherway around
themeToggle.addEventListener('click', () => {
  const body = document.body;
  const container = document.querySelector('.container');
  const headerTitle = document.querySelector('header h1');
  const notes = document.querySelectorAll('textarea, li, button');

  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  container.classList.toggle('dark-mode');
  container.classList.toggle('light-mode');
  headerTitle.classList.toggle('dark-mode');
  headerTitle.classList.toggle('light-mode');

  if(notes.length > 0) {
    notes.forEach(note => {
        // Check if the element has a classList property.
        if ('classList' in note) {
          note.classList.toggle('dark-mode');
          note.classList.toggle('light-mode');
        }
      });
  }

  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = 'Switch to Light Mode';
  } else {
    themeToggle.textContent = 'Switch to Dark Mode';
  }
});

// Set default theme to Light Mode
// Adds class list of light mode to create a baseline light mode
document.addEventListener('DOMContentLoaded', function() {
  // Set default theme to Light Mode
  document.body.classList.add('light-mode');
  const container = document.querySelector('.container');
  if (container) {
      container.classList.add('light-mode');
  }
  const headerTitle = document.querySelector('header h1');
  if (headerTitle) {
      headerTitle.classList.add('light-mode');
  }
});