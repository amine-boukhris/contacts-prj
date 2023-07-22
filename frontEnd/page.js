let contactsList = document.getElementById("contacts-list");
let contactsItems = contactsList.querySelectorAll("li");
const getAllBtn = document.getElementById("get-all");
const addContactBtn = document.getElementById("add-contact");

addContactBtn.addEventListener("click", async () => {
    const name = DOMPurify.sanitize(document.getElementById("add-name-input").value);
    const email = DOMPurify.sanitize(document.getElementById("add-email-input").value);
    const number = DOMPurify.sanitize(document.getElementById("add-number-input").value);

    if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(number)) {
        throw new Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email format is incorrect");
    }

    const jsonObj = {
        name: name,
        email: email,
        phone: number,
    };

    await fetch("http://localhost:5001/api/contacts/", {
        method: "POST",
        body: JSON.stringify(jsonObj),
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
});

getAllBtn.addEventListener("click", async () => {
    contactsList.innerHTML = "";
    await fetch("http://localhost:5001/api/contacts/", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((contact) => {
                const contactListItem = document.createElement("li");
                contactListItem.className = "list-group-item d-flex justify-content-between align-items-center";
                contactListItem.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold" data-id="${contact._id}" id="contact-name">${contact.name}</div>
                    <div id="contact-number">${contact.phone}</div>
                    <div id="contact-email">${contact.email}</div>
                </div>
                <button id="call" type="button" class="btn btn-primary mx-2 px-4">Call Contact</button>
                <button id="send-email" type="button" class="btn btn-outline-primary mx-2">Send email</button>
                <button id="edit" type="button" class="btn btn-outline-warning mx-2">Edit</button>
                <button id="delete" type="button" class="btn btn-outline-danger mx-2">Delete</button>
                `;
                contactsList.appendChild(contactListItem);
            });
        });
    contactsList = document.getElementById("contacts-list");
    contactsItems = contactsList.querySelectorAll("li");
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

            const saveBtn = editSection.querySelector("#save");
            const cancelBtn = editSection.querySelector("#cancel");
            saveBtn.addEventListener("click", async () => {
                const nameInput = document.getElementById("name-input");
                const name = DOMPurify.sanitize(nameInput.value);
                const email = DOMPurify.sanitize(document.getElementById("email-input").value);
                const number = DOMPurify.sanitize(document.getElementById("number-input").value);
                const id = contactItem.querySelector("#contact-name").dataset.id;
                const jsonObj = {
                    name: name,
                    email: email,
                    phone: number,
                    user_id: localStorage.getItem("currentUserId"),
                };
                console.log("save button was clicked");
                console.log(name, email, number, id, jsonObj);
                await fetch(`http://localhost:5001/api/contacts/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(jsonObj),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        // change current list item from data info
                        contactItem.querySelector("#contact-name").innerHTML = data.name
                        contactItem.querySelector("#contact-email").innerHTML = data.email
                        contactItem.querySelector("#contact-number").innerHTML = data.email
                    });
            });
            cancelBtn.addEventListener("click", () => {
                editSection.remove();
            });
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
});
