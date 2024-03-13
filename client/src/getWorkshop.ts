//import axios, {AxiosError, AxiosResponse} from "axios";

document.addEventListener("DOMContentLoaded", () => {
    getWorkshop();
});

function getParam(parameterName) {
    const parameter = new URLSearchParams(window.location.search);
    console.log(parameter.get(parameterName));
    return parameter.get(parameterName);

}

//Read: Diese Funktion fordert Daten vom Server an, um spezifische Detailseiten zu rendern
function getWorkshop() {
    let Id_Workshop = getParam("Id_Workshop");
    axios.get("/workshopData/" + Id_Workshop, {}).then((res: AxiosResponse) => {
        document.getElementById("wsTitel").innerText = res.data.Titel;
        document.getElementById("wsBeschreibung").innerText = res.data.Beschreibung;
        document.getElementById("wsTermin").innerText = "Termin: " + res.data.Termin;
        document.getElementById("preis").innerText = "Preis: " + res.data.Preis;
        document.getElementById("art").innerText = "Art: " + res.data.Art;
        document.getElementById("wsOrt").innerText = res.data.Ort;
        document.getElementById("wsWorkshop_Dauer").innerText =  "Dauer: " +res.data.Workshop_Dauer;
        document.getElementById("UberCreator").innerText = res.data.UberCreator;
        document.getElementById("wsGeeignetF").innerText = res.data.Geeignet;
    }).catch((err: AxiosError) => {
        document.getElementById("wsTitel").innerText = "Anfrage Fehlgeschlagen";
        console.log(err);
    })
}