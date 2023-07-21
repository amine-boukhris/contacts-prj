const contactsList = document.getElementById("contacts-list");
const contactsItems = contactsList.querySelectorAll("li");
const getAllBtn = document.getElementById("get-all");

getAllBtn.addEventListener("click", async () => {
    await fetch("http://localhost:5001/api/contacts/", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // for loop to add every contact to page dynamically
        });
});

contactsItems.forEach((contactItem) => {
    const callBtn = contactItem.querySelector("#call"); // won't add functionality at this level
    const sendEmailBtn = contactItem.querySelector("#send-email");
    const editBtn = contactItem.querySelector("#edit");
    const deleteBtn = contactItem.querySelector("#delete");

    const token = localStorage.getItem("token");

    editBtn.addEventListener("click", () => {
        const editSection = document.createElement("div");
        editSection.className = "input-group mb-3";
        editSection.innerHTML = `
        <span class="input-group-text" id="basic-addon1">@</span>
        <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            id="name-input"
            value="${contactItem.querySelector("#contact-name").innerHTML}"
        />
        <span class="input-group-text" id="basic-addon1">@</span>
        <input
            type="email"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            id="email-input"
            value="${contactItem.querySelector("#contact-email").innerHTML}"
        />
        <span class="input-group-text" id="basic-addon1">@</span>
        <input
            type="text"
            class="form-control"
            placeholder="Number"
            aria-label="Number"
            aria-describedby="basic-addon1"
            id="number-input"
            value="${contactItem.querySelector("#contact-number").innerHTML}"
        />
        <button class="btn btn-outline-secondary px-3" id="cancel">cancel</button>
        <button class="btn btn-primary px-3" id="save">save</button>
        `;
        contactItem.insertAdjacentElement("afterend", editSection);

        const saveBtn = editSection.querySelector('#save');
        const cancelBtn = editSection.querySelector('#cancel');
        saveBtn.addEventListener('click', async () => {
            // make put request and remove edit section
        })
        cancelBtn.addEventListener('click', () => {
            // remove edit section
            // no other handling required
        })
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
