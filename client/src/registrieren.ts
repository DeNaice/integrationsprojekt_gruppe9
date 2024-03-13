//import axios, {AxiosError, AxiosResponse} from "axios";

let registernowBttn: HTMLElement;


// Eventlistener
document.addEventListener("DOMContentLoaded", () => {
    registernowBttn = document.getElementById("registerBttn");
    registernowBttn.addEventListener("click", registerUser)
    const registerInput: HTMLFormElement = document.getElementById("register") as HTMLFormElement;
//Zuteilen von Funktion
    //registerInput.addEventListener("submit", registerUser);
    registerInput.addEventListener("submit", registerUser);
});

// Event + Verhindern des Neuladens der Seite + Form in Variable data speichern
function registerUser(event: Event): void {
    event.preventDefault();
    //Deklarieren von Variableln
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const data: FormData = new FormData(form);

    const fName: string = data.get("vorname").toString().trim();
    const lName: string = data.get("nachname").toString().trim();
    const email_register: string = data.get("email_register").toString().trim();
    let password_register: string = data.get("psw_register").toString().trim();
    let password_repeat: string = data.get("psw_repeat").toString().trim();
    const consumercheck = (document.getElementById("consumercheck") as HTMLInputElement).checked;
    const producercheck = (document.getElementById("producercheck") as HTMLInputElement).checked;
    const manncheck = (document.getElementById("manncheck") as HTMLInputElement).checked;
    const fraucheck = (document.getElementById("fraucheck") as HTMLInputElement).checked;
    let passwort_check: boolean;
    let rolle: number = 0;
    let geschlecht: string;
    console.log("register check 1");
// Check für Passwort, Geschlecht und Art des Accounts
    if (password_register === password_repeat) {
        passwort_check = true
    } else {
        passwort_check = false
    }

    if (manncheck === true) {
        geschlecht = "männlich";
    }
    if (fraucheck === true) {
        geschlecht = "weiblich";
    }


    if (consumercheck === true) {
        rolle = 1;
        console.log("Du bist ein Consumer 1")
    }
    if (producercheck === true) {
        rolle = 2;
        console.log("Du bist ein Producer 2")
    }

        console.log("Passwort Check " + passwort_check);
    // Überprüft ob alles konform ist und speichert die Daten der Formen
    if (fName.length === 0 || lName.length === 0 || email_register.length === 0 || password_register.length === 0 || password_repeat.length === 0 || rolle == undefined || geschlecht == undefined || passwort_check == false) {
        console.log("register check 2");
        console.log(fName.length + " " + lName.length + " " + email_register.length + " " + password_register.length + " " + password_repeat.length + " " + rolle + geschlecht);
        console.log(fName + lName + email_register + password_register + password_repeat + rolle);
        (form.elements.namedItem("vorname") as HTMLInputElement).value = fName;
        (form.elements.namedItem("nachname") as HTMLInputElement).value = lName;
        (form.elements.namedItem("email_register") as HTMLInputElement).value = email_register;
        (form.elements.namedItem("psw_register") as HTMLInputElement).value = password_register;
        (form.elements.namedItem("psw_repeat") as HTMLInputElement).value = password_repeat;
        window.alert("Nicht alle Informationen gegeben");
        form.reportValidity();
    } else {
        console.log("register check 3");
        //AXIOS
        axios.post("/register", {
            Geschlecht: geschlecht,
            Vorname: fName,
            Nachname: lName,
            Email: email_register,
            Passwort: password_register,
            Id_Rolle: rolle

        }).then((res: AxiosResponse) => {
            // Erfolgreiches Registriereen und Posten in die Datenbank
            window.location = "/";

            // Wenn nicht erfolgreich
        }).catch((reason: AxiosError) => {
            window.alert("Error, bitte versuchen sie es erneut")
            console.log(reason.message);
        });
    }
}