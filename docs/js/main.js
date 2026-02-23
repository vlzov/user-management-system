import { apiRequest, API_BASE } from "./api.js";

const table = document.getElementById("users-table");
const form = document.getElementById("user-form");

function showAlert(message, type = "success") {
    document.getElementById("alert-container").innerHTML =
        `<div class="alert alert-${type}">${message}</div>`;
}

function appendUserRow(user) {
    const row = document.createElement("tr");
    row.dataset.id = user.id;

    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td class="text-end">
            <button class="btn btn-sm btn-danger delete-btn">
                Delete
            </button>
        </td>
    `;

    table.appendChild(row);
}

async function loadUsers() {
    try {
        const users = await apiRequest(API_BASE + "/");
        table.innerHTML = "";
        users.forEach(appendUserRow);
    } catch (e) {
        console.error(e);
        showAlert(e.message, "danger");
    }
}

table.addEventListener("click", async (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    try {
        const user = await apiRequest(`${API_BASE}/${row.dataset.id}`);
        document.getElementById("modal-body").innerHTML =
            `<p><strong>ID:</strong> ${user.id}</p>
             <p><strong>Name:</strong> ${user.name}</p>
             <p><strong>Email:</strong> ${user.email}</p>`;

        new bootstrap.Modal(document.getElementById("userModal")).show();
    } catch (e) {
        console.error(e);
        showAlert(e.message, "danger");
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        showAlert("All fields required", "danger");
        return;
    }

    try {
        const newUser = await apiRequest(API_BASE + "/", {
            method: "POST",
            body: JSON.stringify({ name, email })
        });

        appendUserRow(newUser);   // ← мгновенно добавляем строку
        showAlert("User created successfully");
        form.reset();

    } catch (e) {
        console.error(e);
        showAlert(e.message, "danger");
    }
});

document.addEventListener("DOMContentLoaded", loadUsers);

table.addEventListener("click", async (e) => {

    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
        const row = deleteBtn.closest("tr");
        const id = row.dataset.id;

        if (!confirm("Delete user?")) return;

        try {
            await apiRequest(`${API_BASE}/${id}`, {
                method: "DELETE"
            });

            row.remove();
            showAlert("User deleted");
        } catch (err) {
            console.error(err);
            showAlert(err.message, "danger");
        }

        return;
    }

});

const editBtn = document.getElementById("edit-btn");
const editSelect = document.getElementById("edit-user-select");

editBtn.addEventListener("click", async () => {
    const users = await apiRequest(API_BASE + "/");
    editSelect.innerHTML = users
        .map(u => `<option value="${u.id}">
                    ${u.id} - ${u.name}
                  </option>`)
        .join("");

    new bootstrap.Modal(document.getElementById("editModal")).show();
});


document.getElementById("open-edit-form")
    .addEventListener("click", async () => {

    const id = editSelect.value;

    const user = await apiRequest(`${API_BASE}/${id}`);

    document.getElementById("edit-name").value = user.name;
    document.getElementById("edit-email").value = user.email;

    document.getElementById("save-edit").dataset.id = id;

    bootstrap.Modal.getInstance(
        document.getElementById("editModal")
    ).hide();

    new bootstrap.Modal(
        document.getElementById("editFormModal")
    ).show();
});


document.getElementById("save-edit")
    .addEventListener("click", async function () {

    const id = this.dataset.id;
    const name = document.getElementById("edit-name").value.trim();
    const email = document.getElementById("edit-email").value.trim();

    try {
        const updatedUser = await apiRequest(
            `${API_BASE}/${id}`,
            {
                method: "PUT",
                body: JSON.stringify({ name, email })
            }
        );

        await loadUsers();

        bootstrap.Modal.getInstance(
            document.getElementById("editFormModal")
        ).hide();

        showAlert("User updated");

    } catch (err) {
        console.error(err);
        showAlert(err.message, "danger");
    }
});