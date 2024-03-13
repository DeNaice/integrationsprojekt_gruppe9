//import axios, {AxiosError, AxiosResponse} from "axios";

let abmeldenBttn : HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
    
    abmeldenBttn = document.getElementById("abmeldenBttn");
    abmeldenBttn.addEventListener("click",logout)
});
//Meldet den User ab
function logout() {
    axios.post("/logout")
        .then(() => {
            window.location="/";
        });
}
