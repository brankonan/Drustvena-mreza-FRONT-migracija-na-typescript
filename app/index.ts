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
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user.korisnickoIme}</td>
            <td>${user.ime}</td>
            <td>${user.prezime}</td>
            <td>${new Date(user.Datum).toLocaleDateString("sr-RS")}</td>
            `;

        if (tbody) {
          tbody.appendChild(tr);
        }

        const editButton = document.createElement("button");
        editButton.textContent = "Izmeni";
        editButton.addEventListener("click", () => {
          window.location.href = `./usersForm/usersForm.html?id=${user.id}`;
        });
        tr.appendChild(editButton);
      });
    })
    .catch((error) => {
      console.error("Neuspesno ucitavanje korisnika:", error.message);
    });

  const addButton = document.createElement("button");
  addButton.textContent = "Dodaj korisnika";
  addButton.addEventListener("click", () => {
    window.location.href = "./usersForm/usersForm.html";
  });

  const container = document.querySelector("body");

  if (container) {
    container.appendChild(addButton);
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
