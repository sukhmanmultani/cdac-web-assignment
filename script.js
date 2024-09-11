document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let isValid = true;

    // Validate email
    if (!validateUsername(username)) {
      alert("Invalid username");
    }

    // Validate password
    if (password.length < 6) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters long";
      isValid = false;
    }

    if (isValid) {
      try {
        // Call the open login API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert("Login successful! : " + data.username);
        } else {
          const errorData = await response.json();
          document.getElementById("apiErrorMessage").textContent =
            errorData.error;
        }
      } catch (error) {
        document.getElementById("apiErrorMessage").textContent =
          "An error occurred. Please try again later.";
      }
    }
  });

// username validation function
function validateUsername(username) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(username).toLowerCase());
}
