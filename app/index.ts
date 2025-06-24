import { User } from "./models/user.model";
import { UserService } from "./services/user.service.js";

const userService = new UserService();

function loadUsers(): void {
  userService
    .getAll()
    .then((users: User[]) => {
      const tbody = document.querySelector("#usersBody");
      if (!tbody) return;

      tbody.innerHTML = "";

      users.forEach((user) => {
        console.log(user);

        console.log("Datum tip:", typeof user.datum);
        console.log("Vrednost:", user.datum);
        console.log("Parsed:", new Date(user.datum));

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user.korisnickoIme}</td>
            <td>${user.ime}</td>
            <td>${user.prezime}</td>
            <td>${new Date(user.datum).toLocaleDateString("sr-RS")}</td>
            `;

        if (tbody) {
          tbody.appendChild(tr);
        }

        const actionTd = document.createElement("td");
        const actionContainer = document.createElement("div");
        actionContainer.classList.add("action-buttons");

        const editButton = document.createElement("button");
        editButton.textContent = "Izmeni";
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => {
          window.location.href = `./usersForm/usersForm.html?id=${user.id}`;
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Obriši";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
          if (
            confirm(
              `Da li sigurno želite da obrišete korisnika ${user.korisnickoIme}?`
            )
          ) {
            userService
              .deleteById(user.id)
              .then(() => {
                loadUsers();
              })
              .catch((error) => {
                console.error(
                  "Greška prilikom brisanja korisnika:",
                  error.message
                );
              });
          }
        });

        actionContainer.appendChild(editButton);
        actionContainer.appendChild(deleteButton);
        actionTd.appendChild(actionContainer);
        tr.appendChild(actionTd);
      });
    })
    .catch((error) => {
      console.error("Neuspesno ucitavanje korisnika:", error.message);
    });
  if (!document.querySelector("#addUserButton")) {
    const addButton = document.createElement("button");
    addButton.textContent = "Dodaj korisnika";
    addButton.id = "addUserButton";
    addButton.addEventListener("click", () => {
      window.location.href = "./usersForm/usersForm.html";
    });

    const container = document.querySelector("body");

    if (container) {
      container.appendChild(addButton);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
