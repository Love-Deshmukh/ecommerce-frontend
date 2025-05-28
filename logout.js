document.getElementById("logoutButton").addEventListener("click", function() {
  auth.signOut()
    .then(() => {
      console.log("User signed out.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error signing out: " + error.message);
      console.error("Logout error:", error);
    });
});
