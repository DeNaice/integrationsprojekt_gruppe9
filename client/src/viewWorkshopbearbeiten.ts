let bearbeitenBttn: HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
    bearbeitenBttn = document.getElementById("bearbeitenBttn") as HTMLElement;
    bearbeitenBttn.addEventListener("click", viewworkshopbearbeiten);
});

//liest einen Parameter in der URL aus
function getParam(parameterName) {
    const parameter = new URLSearchParams(window.location.search);
    console.log(parameter.get(parameterName));
    return parameter.get(parameterName);

}

function viewworkshopbearbeiten() {
    let Id_Workshop = getParam("Id_Workshop");
    window.location = "/workshopBearbeiten/?Id_Workshop=" + Id_Workshop;
}