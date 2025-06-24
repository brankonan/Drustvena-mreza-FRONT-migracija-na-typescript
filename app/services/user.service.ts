import {User} from "../models/user.model.js";

export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:18407/api/users/paged"
    }

    getAll(): Promise<User[]> {
        return fetch(this.apiUrl)
        .then(response => {
            if(!response.ok) {
                return response.text()
                .then(text => {
                    throw new Error(`Greska ${response.status}: ${text}`);
                });
            }
            return response.json();
        })
        .then (json => {
            console.log("Dohvaceni korisinci:", json)
            return json.data as User[]
        })
        .catch (error => {
            console.error("Greska prilikom dohvatanja korisnika", error.message);
            throw error
        });
    }
}