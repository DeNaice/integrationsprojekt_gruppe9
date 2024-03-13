//import axios, {AxiosError, AxiosResponse} from "axios";

let erstellennowBtn: HTMLElement;
let erstellenbio: HTMLFormElement;


// Eventlistener
document.addEventListener("DOMContentLoaded", () => {
    erstellenbio = document.getElementById("erstellen") as HTMLFormElement;
    erstellennowBtn = document.getElementById("workshopErstellen") as HTMLElement;
    erstellennowBtn.addEventListener("click", addWorkshop)
    erstellenbio.addEventListener("submit", addWorkshop)
    const workshoperstellenInput: HTMLFormElement = document.getElementById("erstellen") as HTMLFormElement;
    workshoperstellenInput.addEventListener("submit", addWorkshop);
});

// Event + Verhindern des Neuladens der Seite + Form in Variable data speichern
function addWorkshop(event: Event): void {
    event.preventDefault();
    //Deklarieren von Variableln
//Kleine Fehler
    const data: FormData = new FormData(erstellenbio);

    const title: string = data.get("title").toString().trim();
    const art: string = data.get("art").toString().trim();
    const preis: string = data.get("preis").toString().trim();
    const termin: string = data.get("termin").toString().trim();
    const Workshop_Dauer: string = data.get("dauer").toString().trim();
    const ort: string = data.get("ort").toString().trim();
    const uberCreator: string = data.get("ubercreator").toString().trim();
    const geeignet: string = data.get("geeignet").toString().trim();
    const beschreibung: string = data.get("beschreibung").toString().trim();


    // Überprüft ob alles konform ist und speichert die Daten der Formen
    if (title.length === 0 || art.length === 0 || preis === undefined || termin.length === 0 || Workshop_Dauer === undefined || uberCreator.length === 0 || geeignet.length === 0 || beschreibung.length === 0) {
        console.log("erstellen check 2");
        console.log(title.length + " " + art.length + " " + preis + " " + termin.length + " " + Workshop_Dauer + "" + uberCreator.length + " " + geeignet.length + "" + beschreibung.length);
        (form.elements.namedItem("title") as HTMLInputElement).value = title;
        (form.elements.namedItem("art") as HTMLInputElement).value = art;
       // (form.elements.namedItem("preis") as HTMLInputElement).value = preis;
        (form.elements.namedItem("termin") as HTMLInputElement).value = termin;
        (form.elements.namedItem("dauer") as HTMLInputElement).value = Workshop_Dauer;
        (form.elements.namedItem("ort") as HTMLInputElement).value = ort;
        (form.elements.namedItem("ubercreator") as HTMLInputElement).value = uberCreator;
        (form.elements.namedItem("geeignet") as HTMLInputElement).value = geeignet;
        (form.elements.namedItem("beschreibung") as HTMLInputElement).value = beschreibung;
        window.alert("Nicht alle Informationen gegeben");
        form.reportValidity();
    } else {
        console.log("erstellen check 3");
        console.log(title, art, preis, termin, Workshop_Dauer, uberCreator, geeignet, beschreibung);

        //AXIOS
        axios.post("/erstellenn", {
            title: title,
            art: art,
            preis: preis,
            termin: termin,
            Workshop_Dauer: Workshop_Dauer,
            ort: ort,
            uberCreator: uberCreator,
            geeignet: geeignet,
            beschreibung: beschreibung

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
