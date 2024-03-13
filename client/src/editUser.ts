//import axios, {AxiosError, AxiosResponse} from "axios";
let profilIcon: HTMLElement;
let textbio: HTMLFormElement;
let editBttn: HTMLElement;
document.addEventListener("DOMContentLoaded", () => {
  //  renderPlaceholder();
    textbio = document.getElementById("consumerProfile") as HTMLFormElement;
    editBttn = document.getElementById("edit") as HTMLElement;
    editBttn.addEventListener("submit", editUser);
    textbio.addEventListener("submit", editUser);
    profilIcon=document.getElementById("profilIcon");
    profilIcon.addEventListener("click",checkrolle);
});

//function renderPlaceholder(){
  //  axios.get("/userNames").then((res:AxiosResponse) => {
   //     document.getElementById("firstname").style.setProperty("placeholder", res.data.Nachname);
    //    document.getElementById("lastname").style.setProperty("placeholder", res.data.Vorname);
   // }).catch((reason: AxiosError) => {
  //      (reason.response.statusText)
 //   });

//}


function editUser(event: Event) {
    event.preventDefault();
    const data: FormData = new FormData(textbio);


    const textfeld: string = data.get("text").toString().trim()
    const fName: string = data.get("firstname").toString().trim();
    const lName: string = data.get("lastname").toString().trim();



        if (textfeld.length === 0 || fName.length === 0 || lName.length === 0 ) {
            data.set("firstname", fName);
            data.set("lastname", lName);
            data.set("text", textfeld)
            textbio.reportValidity();
        } else {
            // wenn erfolgreich mach =>
            axios.put("/editUser", { firstname: fName, lastname: lName, text: textfeld}).then((res:AxiosResponse) => {
                renderBio();
                profilIcon.click();
                textbio.reset();
            }).catch((reason: AxiosError) => {
                (reason.response.statusText)
            });


        }
    }

function renderBio() {
    axios.get("/renderBio").then((res: AxiosResponse)=>{
        document.getElementById("text").innerText=res.data.Bio;
    }).catch((err: AxiosError) => {
        document.getElementById("text").innerText= "Anfrage Fehlgeschlagen";
        console.log(err);
    })
}
function checkrolle() {

    axios.get("/checkRolle").then((res: AxiosResponse) => {

        let Id_Rolle = res.data.Id_Rolle;
        console.log("ID ROLLE= " + Id_Rolle);
        if (Id_Rolle == 1) {

            window.location = "/ProfilUser";

        }
        else if (Id_Rolle == 2) {

            window.location = "/ProfilCreator";


        }
        else{
            console.log("Fehler")
        }
    })
}