import { User } from "../models/user.model";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#usersForm") as HTMLFormElement;
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    userService
      .getById(parseInt(id))
      .then((user) => {
        (document.querySelector("#korisnickoIme") as HTMLInputElement).value =
          user.korisnickoIme;
        (document.querySelector("#ime") as HTMLInputElement).value = user.ime;
        (document.querySelector("#prezime") as HTMLInputElement).value =
          user.prezime;
        (document.querySelector("#datum") as HTMLInputElement).value =
          user.Datum.substring(0, 10);
      })
      .catch((error) => {
        console.error("Greska pri dohvatanju korisnika:", error.message);
      });
  }

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
      id: id ? parseInt(id) : 0,
      korisnickoIme,
      ime,
      prezime,
      Datum: datum,
    };

    const akcija = id
      ? userService.update(noviKorisnik)
      : userService.create(noviKorisnik);

    akcija
      .then(() => {
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Greska pri cuvanju korisnika: ", error.message);
      });

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
