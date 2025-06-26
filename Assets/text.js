const editor = document.getElementById("editArea");
const undoText = [];
const redoText = [];
let lastContent = "";

editor.addEventListener("input", () => {
  undoText.push(lastContent);
  lastContent = editor.value;
  console.log(lastContent);

  redoText.length = 0;
});

function undo() {
  if (undoText.length !== 0) {
    redoText.push(lastContent);
    const prev = undoText.pop();
    console.log("prev " + prev);

    editor.value = prev;
    lastContent = prev;
  } else {
    errMsg("Nothing to be undo!🙄");
  }
}
function errMsg(message) {
  let err = document.createElement("div");
  err.setAttribute("id", "error");
  err.innerHTML = message;

  err.style =
    "padding:10px; border:2px solid rgb(255, 0, 128); background-color: red; color:white; border-radius:2rem; display:flex; align-items:center; justify-content:center; width:80%; max-width: 250px; margin: 1rem auto 0 auto; text-align:center; box-shadow: 0 5px 15px rgba(255, 0, 0, 0.5);";

  const textarea = document.getElementById("editArea");
  textarea.insertAdjacentElement("afterend", err);

  setTimeout(() => err.remove(), 2000);
}

function redo() {
  if (redoText.length !== 0) {
    undoText.push(lastContent);
    const next = redoText.pop();
    console.log("next " + next);
    editor.value = next;
    lastContent = next;
  } else {
    errMsg("Nothing to be redo!🙄");
  }
}
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
function color() {
  let edit = document.getElementById("editArea");
  let col = getRandomColor();
  edit.style.color = col;
}
const size = [15, 20, 25, 30, 35, 40, 45, 50];
let i = 0;
function fsize() {
  const font = document.getElementById("editArea");
  font.style.fontSize = size[i] + "px";
  i = (i + 1) % size.length;
}
function saveNote() {
  const content = document.getElementById("editArea").value;
  const title = prompt("Enter title for your note:");

  if (title && content.trim() !== "") {
    localStorage.setItem(title, content);
    alert("Note saved!");
    renderSavedNotes();
  } else {
    alert("Title or content is empty!");
  }
}

function renderSavedNotes() {
  const savedContainer = document.getElementById("savedNotes");
  savedContainer.innerHTML = "";

  if (localStorage.length === 0) {
    savedContainer.innerHTML = "<p class='text-muted'>No saved notes.</p>";
    return;
  }

  for (let i = 0; i < localStorage.length; i++) {
    const title = localStorage.key(i);
    console.log(title);

    const noteItem = document.createElement("div");
    noteItem.className =
      "border rounded p-2 mb-2 bg-light shadow-sm d-flex justify-content-between align-items-center";

    const titleEl = document.createElement("span");
    titleEl.textContent = title;
    titleEl.className = "fw-bold text-primary";
    titleEl.style.cursor = "pointer";
    titleEl.onclick = () => {
      document.getElementById("editArea").value = localStorage.getItem(title);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger delete-btn";
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash trash-icon"></i>`;

    deleteBtn.onclick = () => {
      localStorage.removeItem(title);
      renderSavedNotes();
    };

    noteItem.appendChild(titleEl);
    noteItem.appendChild(deleteBtn);
    savedContainer.appendChild(noteItem);
  }
}

window.onload = renderSavedNotes;
