const editableParagraph = document.querySelector(".note_area");
const mainContainer = document.querySelector(".container");
const addBtn = document.querySelector("button");

// Initialize an array to store notes
const notesArray = [];

// Load existing notes from local storage (if any)
const savedNotes = localStorage.getItem("notes");
if (savedNotes) {
  const parsedNotes = JSON.parse(savedNotes);
  parsedNotes.forEach((noteText) => {
    createNoteElement(noteText);
  });
}

addBtn.addEventListener("click", () => {
  const newParagraph = createNoteElement(""); // Create an empty note
  mainContainer.appendChild(newParagraph);
  notesArray.push(newParagraph);

  // Save updated notes to local storage
  saveNotesToLocalStorage();
});

function createNoteElement(initialText) {
  const newParagraph = document.createElement("p");
  newParagraph.contentEditable = true;
  newParagraph.classList.add("note_area");

  // Create an <img> element for the delete icon
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "asset/delete.png"; // Set the correct image source
  deleteIcon.alt = "Delete"; // Add an alt text for accessibility

  // Add a click event listener to the delete icon
  deleteIcon.addEventListener("click", () => {
    // Remove the entire note (paragraph) when the delete icon is clicked
    mainContainer.removeChild(newParagraph);
    // Update the notesArray (remove the deleted note)
    const index = notesArray.indexOf(newParagraph);
    if (index !== -1) {
      notesArray.splice(index, 1);
      // Save updated notes to local storage
      saveNotesToLocalStorage();
    }
  });

  // Set initial text (if provided)
  newParagraph.innerText = initialText;

  // Append the delete icon to the <p>
  newParagraph.appendChild(deleteIcon);

  // Append the new <p> to the main container
  mainContainer.appendChild(newParagraph);

  // Add an event listener to track changes in the paragraph's content
  newParagraph.addEventListener("input", () => {
    saveNotesToLocalStorage();
  });

  return newParagraph;
}

function saveNotesToLocalStorage() {
  const noteTexts = notesArray.map((note) => note.innerText);
  localStorage.setItem("notes", JSON.stringify(noteTexts));
}