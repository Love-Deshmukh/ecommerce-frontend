auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user);
    // Update UI or redirect if needed
  } else {
    console.log("No user is signed in.");
    // Redirect to login page if needed
    // window.location.href = "login.html";
  }
});
