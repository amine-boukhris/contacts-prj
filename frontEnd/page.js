const contactsList = document.getElementById("contacts-list");
const contactsItems = contactsList.querySelectorAll("li");

contactsItems.forEach((contactItem) => {
    const callBtn = contactItem.querySelector("#call");
    const sendEmailBtn = contactItem.querySelector("#send-email");
    const editBtn = contactItem.querySelector("#edit");
    const deleteBtn = contactItem.querySelector("#delete");

    const token = localStorage.getItem("token");

    deleteBtn.addEventListener("click", async () => {
        try {
            const name = contactItem.querySelector("#contact-name");
            const id = name.dataset.id;
            const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
                method: "DELETE",
                headers: {
                    Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZHVja3liYWthIiwiZW1haWwiOiJkdWNrQG1haWwuY29tIiwiaWQiOiI2NGJhNjBkNmJmYmI2YWY5ZTk4Zjk2NzMifSwiaWF0IjoxNjg5OTU2MDQ3LCJleHAiOjE2ODk5NTY5NDd9.Ejav0mb7B1xCjWRP-RUPyqpGWeQPehUB0Q5JI4ztr7o",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            if (contactItem) {
                contactItem.remove();
            }

            alert("Contact deleted successfully!");
        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to delete contact. Please try again later.");
        }
    });
});
