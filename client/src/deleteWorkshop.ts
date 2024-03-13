//import axios, {AxiosError, AxiosResponse} from "axios";
let profilIcon : HTMLElement;
let deleteWorkshopBttn : HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
    deleteWorkshopBttn = document.getElementById("workshopDeleteBttn") as HTMLElement;
    deleteWorkshopBttn.addEventListener("click", deleteWorkshop);
    profilIcon = document.getElementById("profilIcon") as HTMLElement;

    //Delete: Löscht den workshop auf dessen Detailseite man sich befindet
    function deleteWorkshop() {
        const Id_Workshop:string=getParam("Id_Workshop");
        axios.delete("/deleteWorkshop/"+ Id_Workshop).then((res: AxiosResponse) => {
            profilIcon.click();
        }).catch((reason: AxiosError) => {
            console.log(reason.response.statusText)
        })
    }
})
//liest einen Parameter in der URL aus
function getParam(parameterName){
    const parameter= new URLSearchParams(window.location.search);
    console.log(parameter.get(parameterName));
    return parameter.get(parameterName);

}