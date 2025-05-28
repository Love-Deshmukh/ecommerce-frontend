document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.querySelector("#loginForm input[type='email']").value;
  const password = document.querySelector("#loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      if (!user.emailVerified) {
        alert("Please verify your email before continuing.");
        auth.signOut();
        return;
      }
      // Redirect to dashboard or homepage
      window.location.href = "index.html"; 
    })
    .catch((error) => {
      const errorMessage = parseFirebaseError(error);
      alert(errorMessage);
      console.error("Login error:", error);
    });
});
