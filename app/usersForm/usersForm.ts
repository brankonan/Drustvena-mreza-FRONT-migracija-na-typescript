import { User } from "../models/user.model";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#usersForm") as HTMLFormElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const korisnickoIme = (
      document.querySelector("#korisnickoIme") as HTMLInputElement
    ).value;
    const ime = (document.querySelector("#ime") as HTMLInputElement).value;
    const prezime = (document.querySelector("#prezime") as HTMLInputElement)
      .value;
    const datum = (document.querySelector("#datum") as HTMLInputElement).value;

    const noviKorisnik: User = {
      id: 0,
      korisnickoIme,
      ime,
      prezime,
      Datum: datum,
    };

    userService
      .create(noviKorisnik)
      .then(() => {
        console.log("Uspesno sacuvan korisnik");

        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Greska prilikom kreiranja korisnika:", error.message);
      });
  });
});
