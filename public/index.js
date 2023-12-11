const authButtons = document.getElementsByClassName("nav-item");
const [loginButton, registerButton] = authButtons;

const authContainer = document.getElementsByClassName("auth-container")[0];
console.log(authContainer);
const authTitle = document.getElementsByClassName('auth-title')[0];
const authSubmitButton = document.getElementsByClassName('auth-submit-button')[0];

const inputs = document.getElementsByClassName('auth-input');
const [nameInput, emailInput, passwordInput ] = inputs;
const navbar = document.getElementsByClassName('navbar')[0];

// on clicking login buttn on header
loginButton.addEventListener("click", () => {
  authContainer.style.display = "flex";
  authTitle.textContent = "Login";
  nameInput.style.display = "none";
  authSubmitButton.innerHTML = "sign in"
  nameInput.value = "";
});
// on clicking register button on header
registerButton.addEventListener('click',()=>{
    authContainer.style.display = "flex";
    authTitle.textContent = "Register";
    nameInput.style.display = "inline";
    authSubmitButton.innerHTML = "sign up"
})

// on click of submit button 
let email = emailInput.value;
let password = passwordInput.value;
let userName = nameInput.value;

for (const input of inputs) {
    input.addEventListener('input', () => {
        updateInputValues();
    });
}

function updateInputValues() {
    email = emailInput.value;
    password = passwordInput.value;
    userName = nameInput.value;
}


const login = async () => {
    try {
        console.log("login clicked");
        if (!email || !password) {
            alert("Please enter all the fields.");
            return;
        }

        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            console.log("Login successful");
            navbar.style.display = "none";
            authContainer.style.display = "none";
        } else {
            const data = await response.json();
            if(data.message === "Wrong password."){
                alert("Wrong password, please try again");
                return;
            }
            else if( data.message === "Email doesn't exist. Kindly register."){
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
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name: userName }),
        });
        if (response.ok) {
            console.log("registered successfully");
            authContainer.style.display = "none";
            navbar.style.display = "none";
        } else {
            const data = await response.json();
            if(data.message ==="Email already registered."){
                alert("email already registered");
                return;
            }
            console.log(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
};

authSubmitButton.addEventListener('click', () => {
    if (authSubmitButton.innerHTML === "sign in") {
        login();
    } else {
        register();
    }
});
// auth section end here

// notes section starts here 

const [deleteAllButton, createNoteButton] = document.getElementsByClassName('tooltip');
const modal = document.getElementsByClassName('modal')[0];
const span = document.getElementsByClassName("close")[0];
const noteCreationButton = document.getElementsByClassName('note-submit-button')[0];
createNoteButton.addEventListener('click',()=>{
        modal.style.display = "block";
})

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
});
// inputs 
const headingInput = document.getElementsByClassName('note-heading');
const noteTextInput = document.getElementsByClassName('note-text-input');
noteCreationButton.addEventListener('click', async () =>{
    if(!headingInput || !noteTextInput){
        alert('Please provide all the fields.');
        return ;
    }
    try {
        const response = await fetch('https://local')
    } catch (error) {
        
    }
})
