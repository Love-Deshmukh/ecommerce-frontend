document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.querySelector("#signupForm input[type='email']").value;
  const password = document.querySelector("#signupPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      alert("Signup successful! Please verify your email before logging in.");
      // Optionally send email verification
      user.sendEmailVerification();
      // Redirect or update UI here
    })
    .catch((error) => {
      const errorMessage = parseFirebaseError(error);
      alert(errorMessage);
      console.error("Signup error:", error);
    });
});
