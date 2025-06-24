import { User } from "./models/user.model";
import { UserService } from "./services/user.service.js";

const userService = new UserService();

function loadUsers(): void {
    userService.getAll()
    .then((users: User[]) => {
        const tbody = document.querySelector("#usersBody");
        if (!tbody) return;

        tbody.innerHTML = "";

        users.forEach(user => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
            <td>${user.korisnickoIme}</td>
            <td>${user.ime}</td>
            <td>${user.prezime}</td>
            <td>${user.datumRodjenja}</td>
            `;

            tbody?.appendChild(tr);
        })
    })
    .catch(error => {
        console.error("Neuspesno ucitavanje korisnika:", error.message);
    })
}

document.addEventListener("DOMContentLoaded", loadUsers);