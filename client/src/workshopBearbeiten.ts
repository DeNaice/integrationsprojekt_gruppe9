//import axios, {AxiosError, AxiosResponse} from "axios";

let workEdit: HTMLFormElement;
let workeditBttn: HTMLElement;
let workshopBttn: HTMLElement;
document.addEventListener("DOMContentLoaded", () => {
    workEdit = document.getElementById("workshopBearbeiten") as HTMLFormElement;
    workeditBttn = document.getElementById("editWorkshop") as HTMLElement;
    workeditBttn.addEventListener("submit", editWorkshop);
    workEdit.addEventListener("submit", editWorkshop);

});

//liest einen Parameter in der URL aus
function getParam(parameterName) {
    const parameter = new URLSearchParams(window.location.search);
    console.log(parameter.get(parameterName));
    return parameter.get(parameterName);

}

//Update: schickt die eingetragenen Daten an den Server, der diese wiederum in die Datenbank einfügt
function editWorkshop(event: Event) {
    event.preventDefault();
    const data: FormData = new FormData(workEdit);
    const Id_Workshop: string = getParam("Id_Workshop");
    const title: string = data.get("title").toString().trim();
    const art: string = data.get("art").toString().trim();
    const preis: string = data.get("preis").toString().trim();
    const termin: string = data.get("termin").toString().trim();
    const dauer: string = data.get("dauer").toString().trim();
    const ort: string = data.get("ort").toString().trim();
    const uberCreator: string = data.get("ubercreator").toString().trim();
    const geeignet: string = data.get("geeignet").toString().trim();
    const beschreibung: string = data.get("beschreibung").toString().trim();


    if (title.length === 0 || art.length === 0 || preis === undefined || termin.length === 0 || uberCreator.length === 0 || geeignet.length === 0 || beschreibung.length === 0) {
        data.set("title", title);
        data.set("art", art);
        //data.set("preis", preis)
        data.set("termin", termin);
        data.set("dauer", dauer);
        data.set("ort", ort);
        data.set("ubercreator", uberCreator);
        data.set("geeignet", geeignet);
        data.set("beschreibung", beschreibung);
        workEdit.reportValidity();
    }
    // wenn erfolgreich mach =>
    axios.put("/editWorkshop/" + Id_Workshop, {
        title: title,
        art: art,
        preis: preis,
        termin: termin,
        dauer: dauer,
        ort: ort,
        uberCreator: uberCreator,
        geeignet: geeignet,
        beschreibung: beschreibung
    }).then((res: AxiosResponse) => {

        window.alert("Workshop wurde bearbeitet!")
        workEdit.reset();
        getParam(Id_Workshop);
        window.location = "/workshop/?Id_Workshop=" + Id_Workshop;
    }).catch((reason: AxiosError) => {
        (reason.response.statusText)
    });


}



/*
function renderBio() {
    axios.get("/renderBio").then((res: AxiosResponse)=>{
        document.getElementById("text").innerText=res.data.Bio;
    }).catch((err: AxiosError) => {
        document.getElementById("text").innerText= "Anfrage Fehlgeschlagen";
        console.log(err);
    })
}
*/
