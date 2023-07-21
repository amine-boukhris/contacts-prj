const form = document.forms[0];

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = DOMPurify.sanitize(form.querySelector("#email").value);
    const password = DOMPurify.sanitize(form.querySelector("#password").value);
    // validate input
    if (validator.isEmpty(password) || validator.isEmpty(email)) {
        throw new Error("all fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email format is incorrect");
    }
    const jsonObj = {
        email,
        password,
    };

    try {
        const response = await fetch(
            "http://localhost:5001/api/users/login",
            {
                method: "POST",
                body: JSON.stringify(jsonObj),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        console.log(JSON.stringify(data));
        // window.location.href = "http://127.0.0.1:5500/frontEnd/page.html";
    } catch (error) {
        console.error("Error:", error.message);
    }
});