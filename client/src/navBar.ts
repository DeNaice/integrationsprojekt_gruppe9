let registerBttn: HTMLElement;

let anmeldenBttn: HTMLElement;

let profilIcon: HTMLElement;

let warenkorbIcon: HTMLElement;

let homeBttn: HTMLElement;

let workshopBttn: HTMLElement;

let erstellenBttn: HTMLElement;

let logo: HTMLElement;


// Eventlistener für die Buttons
document.addEventListener("DOMContentLoaded", () => {


    loggedInView(); //Diese Funktion checkt nach dem Laden des DOM, ob der User eingeloggt ist und stellt die Navbar entsprechend dar.
    logo = document.getElementById("logo");
    logo.addEventListener("click", viewIndex);

    registerBttn = document.getElementById("registerBttn");
    registerBttn.addEventListener("click", viewRegistrierung);

    anmeldenBttn = document.getElementById("anmeldenBttn");
    anmeldenBttn.addEventListener("click", viewLogin);

    profilIcon = document.getElementById("profilIcon");
    profilIcon.addEventListener("click", checkrolle);

    warenkorbIcon = document.getElementById("warenkorbIcon");
    warenkorbIcon.addEventListener("click", viewWarenkorb);

    //homeBttn= document.getElementById("homeBttn");
    //homeBttn.addEventListener("click",viewIndex);

    workshopBttn = document.getElementById("workshopBttn");
    workshopBttn.addEventListener("click", viewErgebnisseite);

    erstellenBttn = document.getElementById("erstellenBttn");
    erstellenBttn.addEventListener("click", viewWorkshopErstellen);
})

//Linkfunktionen der Navbar
function viewErgebnisseite() {
    window.location = "/workshopSuchen";
}

function viewWorkshopErstellen() {
    window.location = "/workshopErstellen";
}

function viewIndex() {
    window.location = "/";
}


function viewRegistrierung() {
    window.location = "/registrierung";

}

function viewLogin() {
    window.location = "/anmeldung";

}

function viewProfil() {
    window.location = "/ProfilCreator";
}

function viewWarenkorb() {
    window.location = "/warenkorb";
}

//Diese Funktion checkt nach dem Laden des DOM, ob der User eingeloggt ist und stellt die Navbar entsprechend dar.
function loggedInView() {
    axios.post("/checkLogin").then((res: AxiosResponse) => {
        console.log("logged in")
        document.getElementById("anmeldenBttn").style.setProperty("display", "none");
        document.getElementById("registerBttn").style.setProperty("display", "none");
        document.getElementById("erstellenBttn").style.removeProperty("display");
        document.getElementById("profilIcon").style.removeProperty("display");
        document.getElementById("abmeldenBttn").style.removeProperty("display");
        showName();
    }).catch((err: AxiosError) => {
        document.getElementById("erstellenBttn").style.setProperty("display", "none");
        document.getElementById("profilIcon").style.setProperty("display", "none");
        document.getElementById("abmeldenBttn").style.setProperty("display", "none");
        console.log("not logged in")
    });
    axios.get("/checkRolle").then((res: AxiosResponse) => {
        let Id_Rolle = res.data.Id_Rolle;
        if (Id_Rolle == 1) {
            document.getElementById("erstellenBttn").style.setProperty("display", "none");
        }
    })

}

//Read: Diese Funktion zeigt den Namen des Users nach dem einloggen in der Navbar an
function showName() {

    axios.get("/userNames").then((res: AxiosResponse) => {
        let vorname = res.data.Vorname;
        let nachname = res.data.Nachname;

        document.getElementById("profilname").innerText = vorname + " " + nachname;

    }).catch((err: AxioError) => {

        console.log("Fehler beim anzeigen des Namens" + err)

    })

}

//Read: Diese Funktion fragt die Rolle des Users an und verweist je nach Rolle auf ein User oder Creator Profil
function checkrolle() {

    axios.get("/checkRolle").then((res: AxiosResponse) => {

        let Id_Rolle = res.data.Id_Rolle;
        console.log("ID ROLLE= " + Id_Rolle);
        if (Id_Rolle == 1) {

            window.location = "/ProfilUser";

        } else if (Id_Rolle == 2) {

            window.location = "/ProfilCreator";


        } else {
            alert("es gab einen Fehler");
        }
    })
}