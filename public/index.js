const authButtons = document.getElementsByClassName("nav-item");
const [loginButton, registerButton] = authButtons;

const authContainer = document.getElementsByClassName("auth-container")[0];
console.log(authContainer);
const authTitle = document.getElementsByClassName("auth-title")[0];
const authSubmitButton =
  document.getElementsByClassName("auth-submit-button")[0];

const inputs = document.getElementsByClassName("auth-input");
const [nameInput, emailInput, passwordInput] = inputs;
const navbar = document.getElementsByClassName("navbar")[0];

// on clicking login buttn on header
loginButton.addEventListener("click", () => {
  authContainer.style.display = "flex";
  authTitle.textContent = "Login";
  nameInput.style.display = "none";
  authSubmitButton.innerHTML = "sign in";
  nameInput.value = "";
});
// on clicking register button on header
registerButton.addEventListener("click", () => {
  authContainer.style.display = "flex";
  authTitle.textContent = "Register";
  nameInput.style.display = "inline";
  authSubmitButton.innerHTML = "sign up";
});

// on click of submit button
let email = "";
let password = "";
let userName = "";

for (const input of inputs) {
  input.addEventListener("input", () => {
    email = emailInput.value;
    password = passwordInput.value;
    userName = nameInput.value;
  });
}

const login = async () => {
  try {
    console.log("login clicked");
    if (!email || !password) {
      alert("Please enter all the fields.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Login successful");
      navbar.style.display = "none";
      authContainer.style.display = "none";
    } else {
      const data = await response.json();
      if (data.message === "Wrong password.") {
        alert("Wrong password, please try again");
        return;
      } else if (data.message === "Email doesn't exist. Kindly register.") {
        alert("Email doesn't exist. Kindly register.");
        return;
        console.log(`Login failed: ${data.message}`);
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

const register = async () => {
  console.log("register clicked");
  if (!email || !password || !userName) {
    alert("Please enter all the fields.");
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name: userName }),
    });
    if (response.ok) {
      console.log("registered successfully");
      authContainer.style.display = "none";
      navbar.style.display = "none";
    } else {
      const data = await response.json();
      if (data.message === "Email already registered.") {
        alert("email already registered");
        return;
      }
      console.log(`Registration failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

authSubmitButton.addEventListener("click", () => {
  if (authSubmitButton.innerHTML === "sign in") {
    login();
  } else {
    register();
  }
});
// auth section end here
const noteHeaderTitle =
  document.getElementsByClassName("notes-header-title")[0];
// checking if the user is already login or not
const accessToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("access_token="));

if (accessToken) {
  console.log("User is logged in");
  navbar.style.display = "none";
} else {
  console.log("User is not logged in");
}

// notes section starts here

const [deleteAllButton, createNoteButton] =
  document.getElementsByClassName("tooltip");

const modal = document.getElementsByClassName("modal")[0];
const span = document.getElementsByClassName("close")[0];
const noteCreationButton =
  document.getElementsByClassName("note-submit-button")[0];
createNoteButton.addEventListener("click", () => {
  modal.style.display = "block";
});

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});
// inputs
const headingInput = document.getElementsByClassName("note-heading-input")[0];
const noteTextInput = document.getElementsByClassName("note-text-input")[0];
let heading, paragraph;
headingInput.addEventListener("input", () => {
  updateInputValues();
});
noteTextInput.addEventListener("input", () => {
  updateInputValues();
});

function updateInputValues() {
  heading = headingInput.value;
  paragraph = noteTextInput.value;
}
// CREATION OF NEW NOTE
const createNote = async () => {
  if (!headingInput || !noteTextInput) {
    alert("Please provide all the fields.");
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/api/v1/note/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ heading, paragraph }),
      credentials: "include",
    });
    if (response.ok) {
      console.log("note Created");
      modal.style.display = "none";
      alert("note created");
    } else {
      const data = response.json();
      console.log("note creation failed:", data.message);
    }
  } catch (error) {
    console.error("Error during creation of note.", error);
  }
  console.log(heading, paragraph);
};
noteCreationButton.addEventListener("click", () => {
  createNote();
});

// deletion of all noted
const deleteAllNotes = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/note/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      alert("all notes of this user has been deleted.");
    } else {
      const data = response.json();
      console.log("error in deletion.");
    }
  } catch (error) {
    console.error("Error in deleting all the notes.", error);
  }
};
deleteAllButton.addEventListener("click", () => {
  deleteAllNotes();
});

// get all notes of a user
const getAllNotes = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/note/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = response.json();
      console.log(data);
      return data;
    } else {
      console.log(response.json().message);
      return [];
    }
  } catch (error) {
    console.error("Error during getting all notes of user", error);
  }
};
let notes;
const fetchNotes = async () => {
  try {
    const data = await getAllNotes();
    console.log("notes", data.notes);
    notes = data.notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};
fetchNotes();
const notesContainer = document.getElementsByClassName("notes-container")[0];
const renderNotes = (notes) => {
    console.log("rendering notes");
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    console.log(note);
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";

    const heading = document.createElement("h3");
    heading.textContent = note.heading;

    const paragraph = document.createElement("p");
    paragraph.textContent = note.paragraph;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteNote(note._id));

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openEditModal(note));

    noteCard.appendChild(heading);
    noteCard.appendChild(paragraph);
    noteCard.appendChild(deleteButton);
    noteCard.appendChild(editButton);

    notesContainer.appendChild(noteCard);
  });
};
renderNotes();
// // delete a note
// const deleteNote = async (noteId) => {
//   try {
//     const response = await fetch(`http://localhost:3000/api/v1/note/${noteId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     });

//     if (response.ok) {
//       getAllNotes();
//     } else {
//       const data = await response.json();
//       console.log(`Delete note failed: ${data.message}`);
//     }
//   } catch (error) {
//     console.error('Error during note deletion', error);
//   }
// };

// const openEditModal = (note) => {
//   console.log('Edit note:', note);
// };
