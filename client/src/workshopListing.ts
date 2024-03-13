// hier soll eine Funktion zum erstellen einer liste zu einzelseiten von workshops eines Users entstehen
//verbunden mit myWorkshopsListing.html
let myWorkshops: HTMLElement;


document.addEventListener("DOMContentLoaded", () => {
    whatTheWorkshop()
    myWorkshops = document.getElementById("myWorkshops");
    //hier werden den gerenderten Workshopeinträgen, beim click, links zugeordnet
    myWorkshops.addEventListener("click", (event: Event) => {
        let target: HTMLElement = event.target as HTMLElement;
        console.log(target.dataset.id_workshop);
        let Id_Workshop = target.dataset.id_workshop;

        window.location = "/workshop/?Id_Workshop=" + Id_Workshop;
    });
});

/**
 function getWorkshop() {
    axios.get("/workshopData").then((res: AxiosResponse)=>{
        document.getElementById("texti").innerText=res.data.Titel;
    }).catch((err: AxiosError) => {
        document.getElementById("texti").innerText= "Anfrage Fehlgeschlagen";
        console.log(err);
    })
}
 */
//diese Funktion rendert eine Liste der eigenen Workshops
function whatTheWorkshop() {

    axios.get("/myWorkshopList").then((res: AxiosResponse) => {
        for (let u of res.data) {
            const tr: HTMLElement = document.createElement("tr");
            tr.innerHTML = `
             <td type="click" role="button" data-id_workshop="${u.Id_workshop}"> ${u.Titel} </td>
        `;
            myWorkshops.append(tr);
        }
    }).catch((reason: AxiosError) => {
        console.log(reason.message);
    });

}

