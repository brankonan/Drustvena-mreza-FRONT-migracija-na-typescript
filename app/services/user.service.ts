import { User } from "../models/user.model.js";

export class UserService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://localhost:18407/api/users";
  }

  getAll(): Promise<User[]> {
    return fetch(`${this.apiUrl}/paged`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Greska ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then((json) => {
        console.log("Dohvaceni korisinci:", json);
        return json.data as User[];
      })
      .catch((error) => {
        console.error("Greska prilikom dohvatanja korisnika", error.message);
        throw error;
      });
  }
  public create(user: User): Promise<void> {
    console.log("Saljem korisnika:", user);

    return fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Greska ${response.status}: ${text}`);
          });
        }
      })
      .catch((error) => {
        console.log("Greska prilikom kreiranja korisnika", error.message);
        throw error;
      });
  }

  public getById(id: number): Promise<User> {
    return fetch(`${this.apiUrl}/${id}`).then((response) => {
      if (!response.ok) throw new Error("Greska pri dohvatanju korisnika");
      return response.json();
    });
  }

  public update(user: User): Promise<void> {
    return fetch(`${this.apiUrl}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => {
      if (!response.ok) throw new Error("Greska " + response.status);
    });
  }
}
