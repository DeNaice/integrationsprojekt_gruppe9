//import axios, {AxiosError, AxiosResponse} from "axios";


let login: HTMLFormElement;
document.addEventListener("DOMContentLoaded", () => {
    login = document.getElementById("login") as HTMLFormElement;
    const loginInput: HTMLFormElement = document.getElementById("login") as HTMLFormElement;
//Zuteilen von Funktion
    loginInput.addEventListener("submit", loginUser);
});
//Meldet den User an
function loginUser(event: Event) {
    event.preventDefault();
    const data: FormData = new FormData(login);

    const email_register: string = data.get("emailRegister").toString().trim();
    const password_register: string = data.get("pswRegister").toString().trim();
    // Post request
    axios.post("/login", {
        loginMail: email_register,
        loginPasswort: password_register
    }).then(() =>{

        console.log("Anmeldung erfolgreich!");
        window.location = "/";
        login.reset();

    }).catch((err : AxiosError) => {
            if(err.response.status == 404) {
                window.alert("E-Mail oder Passwort inkorrekt");
            } else {
                window.alert("Fehler in der Anmeldung");
            }
        });

}