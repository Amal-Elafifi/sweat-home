// welcome
const  welcome = document.querySelector(".welcome");
const  welcomeSignUpBtn = document.querySelector(".signUp");
const  welcomeSignInBtn = document.querySelector(".signIn");
// signup form
const  signUpFormContainer = document.querySelector(".signUpForm");
const  signupForm = document.querySelector(".signUpForm .signupForm");
const signUpInputs = document.querySelectorAll(".signupForm input");
const signupName = document.querySelector(".signUpForm .signupForm .signUpName");
const signupPass = document.querySelector(".signUpForm .signupForm .signUpPass");
const signupEmail = document.querySelector(".signUpForm .signupForm .signUpEmail");
const registerBtn = document.querySelector(".signUpForm .signupForm .signup");
const signupEmailMsg = document.querySelector(".signUpForm .emailMsg");
const signupPassMsg = document.querySelector(".signUpForm .passMsg");
const selectBox = document.querySelector(".signupForm select");

// signin form
const signInFormContainer = document.querySelector(".signInForm");
const signInForm = document.querySelector(".signInForm form");
const signInEmail = document.querySelector(".signInForm .signInEmail")
const signInPass = document.querySelector(".signInForm .signInPass");
const signInBtn = document.querySelector(".signInForm .signin");
const signInEmailMsg = document.querySelector(".signUpForm .emailMsg");
const signInPassMsg = document.querySelector(".signUpForm .passMsg")

// user profile
const profile = document.querySelector(".profile");
const userName = document.querySelector(".profile .name");
const image = document.querySelector(".profile .img-holder img");
const logoutBtn = document.querySelector(".logout");


function navigateToSignupForm () {
    welcome.style.display= "none";
    signUpFormContainer.style.display= "flex";
}

function navigateToSigninForm () {
    welcome.style.display= "none";
    signInFormContainer.style.display= "flex"
}

// signin validation
function signinValidation (e) {
    e.preventDefault();
    // check empty fields
    if(signInEmail.value === "" || signInPass.value === ""){
        alert("Please Fill Empty Fields");
        return;
    }
    // validate email and password
    const existingUsers = JSON.parse(localStorage.getItem("userInfo")) || [];
    const targetUser = existingUsers.find(user => user.email === signInEmail.value && user.password === signInPass.value );

    if(targetUser){
        signInFormContainer.style.display="none";
        profile.style.display="flex"
        userName.innerHTML = targetUser.name;
    }else {
        alert("Invalid Email or Password")
    }

      // adjust profile img
    if(targetUser.gender === "male") {
        image.attributes.src.nodeValue="./img/user/male.avif";
    }else {
        image.attributes.src.nodeValue="./img/user/5.jpg";
    }

    // clear inputs
    signInEmail.value = "";
    signInPass.value = "";

}


// signup validations
function storeUserInfo (e) {

    e.preventDefault();
    welcome.style.display= "none";
    
    // vaidate pssword
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d).+$/;

    if(signupPass.value !== "" && !regex.test(signupPass.value)) {
        signupPassMsg.innerHTML = "Password must have at least one capital letter, one special character and one digit"
    return;
    }

    // validate email
    const existingUsers = JSON.parse(localStorage.getItem("userInfo")) || [];
    const emailExist = existingUsers.some(user =>  user.email === signupEmail.value) ;
    if(emailExist) {
        signupEmailMsg.innerHTML = "Email is already used";
        return;
    }
    // check if inputs are not empty
    if(signupName.value === "" ||  signupEmail.value === "" || signupPass.value === "") {
        alert("Please fill empty fields");
        return;
    }
    
    const user = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPass.value,
        gender: selectBox.value
    }

    // store user information in local storage
    existingUsers.push(user);
    localStorage.setItem("userInfo", JSON.stringify(existingUsers));

    // adjust user name
    userName.innerHTML = user.name;

    // adjust profile img
    if(user.gender === "male") {
        image.attributes.src.nodeValue="./img/user/male.avif";
    }else {
        image.attributes.src.nodeValue="./img/user/5.jpg";
    }
    
    // move to profile
    navigateToProfile()
    
    // clear inputs 
    signupName.value = "";
    signupEmail.value = "";
    signupPass.value = "";
  
}
function navigateToProfile () {
    signUpFormContainer.style.display= "none";
    profile.style.display="flex"
}

function navigateToWelcome () {
    profile.style.display= "none";
    welcome.style.display= "flex";

}



// event listeners
welcomeSignUpBtn.addEventListener("click", navigateToSignupForm);
welcomeSignInBtn.addEventListener("click", navigateToSigninForm)
signInBtn.addEventListener("click", signinValidation)
registerBtn.addEventListener("click", storeUserInfo)
logoutBtn.addEventListener("click", navigateToWelcome)