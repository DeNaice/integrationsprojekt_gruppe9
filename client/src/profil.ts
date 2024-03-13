let workshopBttn: HTMLElement;
let userMail: string;
let deleteBttn: HTMLElement;
let editPageBttn: HTMLElement;


document.addEventListener("DOMContentLoaded", () => {
    whoAmI();
    deleteBttn = document.getElementById("deleteMyselfBttn") as HTMLElement;
    deleteBttn.addEventListener("click", deleteUser);
    editPageBttn = document.getElementById("editPageBttn") as HTMLElement;
    editPageBttn.addEventListener("click", viewEditPage);
    workshopBttn = document.getElementById("wp") as HTMLElement;
    workshopBttn.addEventListener("click", viewDetailseite);

});


function viewEditPage() {
    window.location = "/editPage";
}

// Read: Diese Funktion fordert den Vor- und Nachnamen an und stellt diese auf dem Profil dar.
function whoAmI() {
    axios.get("/userNames").then((res: AxiosResponse) => {
        document.getElementById("uNameProfil").innerText = res.data.Vorname + " " + res.data.Nachname;
        renderBio();
    }).catch((err: AxiosError) => {
        document.getElementById("uNameProfil").innerText = "Anfrage Fehlgeschlagen";
        console.log(err);
    });


    function renderProfileName() {

        axios.get("/sessionName").then((res: AxiosResponse) => {
            userMail = res.data.Email;
            console.log("Seite wird gerendert")
            document.getElementById("uNameProfil").innerText = userMail;
        }).catch((err: AxiosError) => {

            document.getElementById("uNameProfil").innerText = "Konnte nicht gefunden werden";
        });
    }
}

//Delete: Löscht den eingelogten User Account
function deleteUser() {
    axios.delete("/deleteUser").then((res: AxiosResponse) => {
        logout();
    }).catch((reason: AxiosError) => {
        window.alert("Bitte löschen Sie erst Ihre Workshops")
        console.log(reason.response.statusText)
    })
}

//loggt einen User aus
function logout() {
    axios.post("/logout")
        .then(() => {
            window.location = "/";
        });
}

//Read: Rendert die Bio des Profils
function renderBio() {
    axios.get("/renderBio").then((res: AxiosResponse) => {
        document.getElementById("text").innerText = res.data.Bio;
    }).catch((err: AxiosError) => {
        document.getElementById("text").innerText = "Anfrage Fehlgeschlagen";
        console.log(err);
    })
}

function viewDetailseite() {
    window.location = "/myWorkshopListRender"
}

