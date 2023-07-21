const contactsList = document.getElementById("contacts-list");
const contactsItems = contactsList.querySelectorAll("li");

contactsItems.forEach((contactItem) => {
    const callBtn = contactItem.querySelector("#call");
    const sendEmailBtn = contactItem.querySelector("#send-email");
    const editBtn = contactItem.querySelector("#edit");
    const deleteBtn = contactItem.querySelector("#delete");

    const token = localStorage.getItem("token");

    callBtn.addEventListener("click", async () => {
        await fetch("http://localhost:5001/api/contacts/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    deleteBtn.addEventListener("click", async () => {
        try {
            const name = contactItem.querySelector("#contact-name");
            const id = name.dataset.id;
            const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
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
