import * as express from 'express';
import * as session from "express-session";
import * as mysql from "mysql";
import {MysqlError} from "mysql";
import * as e from "express";


const PORT: number = 8080;

const router: express.Express = express();

const connection: mysql.Connection = mysql.createConnection({
    database: "revertit",
    host: "localhost",
    user: "root",
    //port:8080
});



connection.connect((err:MysqlError) => {
    if (err === null) {
        console.log("Datenbank erfolgreich verbunden.");
    } else {
        console.log("DB-Fehler: " + err );
    }
});


router.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT + "/");
});
//Route für die Registrierungseiete
router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/index.html");
});
//Link Routen
router.get("/registrierung", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/registrierung.html");
});
router.get("/anmeldung", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/Login.html");
});
router.get("/ProfilCreator", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/ProfilCreator.html")
});
router.get("/ProfilUser", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/ProfilUser.html")
});
router.get("/editPage", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/bearbeiten.html")
});
router.get("/workshopSuchen", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/ergebnisseite.html")
});
router.get("/workshopErstellen", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/workshopErstellen.html")
});
router.get("/warenkorb", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/warenkorb.html")
});
router.get("/impressum", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/impressum.html")
});
router.get("/Detailseite", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/Detailseite.html")
})
router.get("/workshopBearbeiten", (req:express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/workshopBearbeiten.html")
})
router.get("/workshop",(req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/Detailseite.html");
});
router.get("/myWorkshopListRender",(req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/client/views/myWorkshopsListing.html");
});

//Ende von Link Routen



router.use(express.json());
router.use(express.urlencoded({extended: false}));
router.use("/src", express.static(__dirname + "/client/src"));
router.use("/css", express.static(__dirname + "/client/css"));
//router.use("/src", express.static(__dirname + "/client"));
//router.use("/src", express.static("client/src"));

router.use(express.static(__dirname + 'client'));
router.use(express.static('client/views'));


router.use(session({
    cookie: {
        expires: new Date(Date.now() + (1000 * 60 * 60)),
    },
    secret: Math.random().toString(),
}));



//Routen zu Funktionen

router.post("/register", postUser);
router.post("/login", loginUser);
router.post("/logout",checkLogin, logout);
router.post("/checkLogin", checkLoginClient);
router.get("/userNames", getUserNames);
router.put("/editUser", changeUser);
router.delete("/deleteUser", deleteUser);
router.get("/checkRolle", checkRolle);
router.get("/renderBio", renderBio);
router.post("/erstellenn", postWorkshop);
router.put("/editWorkshop/:Id_Workshop", changeWorkshop);
router.delete("/deleteWorkshop/:Id_Workshop", deleteWorkshop);
router.get("/workshopData/:Id_Workshop", getWorkshopData)
//Create: ein user wird angelegt/Registrierung
function postUser(req: express.Request, res: express.Response): void {
    console.log("geht in PostUser");
    const sqlQuery: string = "INSERT INTO user (Geschlecht, Vorname, Nachname, Email, Passwort, Id_Rolle) VALUES (?, ?, ?, ?, ?, ?);"

    const geschlecht: string = req.body.Geschlecht;
    const fName: string = req.body.Vorname;
    const lName: string = req.body.Nachname;
    const eMail: string = req.body.Email;
    const passwort: string = req.body.Passwort;
    const rolle: number = req.body.Id_Rolle;

    if (fName === undefined || lName === undefined || eMail === undefined || passwort === undefined || rolle === undefined || geschlecht == undefined){

        res.send("Nicht alle informationen gegeben")
        res.status(400);
    } else {

        query(sqlQuery, [geschlecht, fName, lName, eMail, passwort,rolle]).then(() => {
            req.session.Email = eMail;
            console.log("User wurde erfolgreich in die Datenbank hinzugefügt");
            res.status(201);

            res.send("/register/" + eMail);

        }).catch((err: mysql.MysqlError) =>{
            console.log("Fehler in der Datenbank bei POST: " + err);
            res.sendStatus(500);

        })

    }
}



//loggt den User ein und erstellt eine session/gibt ihm einen cookie
function loginUser(req: express.Request, res: express.Response): void{

    query("SELECT null FROM user WHERE Email = ? AND passwort = ?;", [req.body.loginMail, req.body.loginPasswort])
        .then((results) => {
            if(results.length == 1) {
                req.session.Email = req.body.loginMail;
                console.log("user sollte eingeloggt sein", req.session.Email);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }).catch((err)=>{
        console.log("LOGIN", err);
        res.sendStatus(500);
    })
}
//loggt den User aus und zerstört seinen Cookie
function logout(req: express.Request, res: express.Response): void {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.sendStatus(200);
    });
}
function getSessionName(req: express.Request, res: express.Response): void {
    console.log(req.session.Email+ " wird gefunden");
    res.json({
        "Email": req.session.Email
    });
    console.log(req.session.Email);
}

function getUserNames(req: express.Request, res: express.Response): void {
    query("SELECT Vorname, Nachname FROM user WHERE Email = ?;", [req.session.Email])
        .then((results) => {
            res.status(200);
            res.json(results[0]);
        }).catch((err) => {
            console.log("Vorname", err);
            res.sendStatus(500);
        })
}
//Delete: ein User wird gelöscht
function deleteUser(req: express.Request, res: express.Response): void {
    const Email : string = req.session.Email;
    const sqlQuery : string = "Delete from user where Email=?;";

    query(sqlQuery, [Email]).then(()=>{
        res.status(200);
        res.send("User deleted");
    }).catch((err: mysql.MysqlError) => {
        res.sendStatus(500);
        console.log("Fehler in der Datenbank (in Route Delete): " + err);
    })
}


// die selbe funktion wie die darunter, nur wird hier an die nächst Funktion im Server weitergeleitet statt zum clienten

function checkLogin(req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.log(req.session.Email);
    if (req.session.Email !== undefined) {
        // Ruft die nächste Funktion der Funktionskette
        next();
    } else {
        // Client nicht angemeldet
        res.sendStatus(401);
    }
}

//lässt den Client den Then Fall durchführen, wenn der User eingeloggt ist
function checkLoginClient(req: express.Request, res: express.Response, next: express.NextFunction): void {

    if (req.session.Email !== undefined) {
        res.sendStatus(200);
    } else {
        // Client nicht angemeldet
        res.sendStatus(401);
    }
}
//read: der Server schickt die Rolle des Users an den Clienten
function checkRolle(req: express.Request, res: express.Response): void {


    query("SELECT Id_Rolle FROM user WHERE Email = ?;", [req.session.Email])
        .then((results) => {
        res.status(200);
        res.json(results[0]);
    }).catch((err: mysql.MysqlError) => {
        console.log("Fehler in der Datenbank bei SELECT: " + err);
        res.sendStatus(500);

    })

}
//Update: Ein User wird bearbeitet
function changeUser(req: express.Request, res: express.Response): void {
    const Email: string = req.session.Email;
    const text: string = req.body.text;
    const fName: string = req.body.firstname;
    const lName: string = req.body.lastname;
    const sqlQuery: string = "UPDATE user SET Bio = ?, Vorname = ?, Nachname = ? WHERE Email = ?;";


        if (text === undefined || fName === undefined || lName === undefined) {
            res.status(400);
            res.send("Nicht alle Informationen gegeben");
        } else {

            query(sqlQuery, [text,fName,lName,Email]).then(() => {

                res.status(200);
                res.contentType("text/urilist");
                res.send("/userNames/" + encodeURI(Email));
                // ???
                console.log(Email);

            }).catch((err: mysql.MysqlError) => {

                res.sendStatus(500);
                console.log("Ein Fehler in der Datenbank UPDATE: " + err);
            });

        }
    }
//read: Daten die zum rendern des Profils benötigt (Bio) werden, werden an den client geschickt
function renderBio(req: express.Request, res: express.Response): void {
    query("SELECT Bio FROM user WHERE Email = ?;", [req.session.Email])
        .then((results)=>{
            res.status(200);
            res.json(results[0]);
        })
        .catch((err)=>{
            console.log("User", err);
            res.sendStatus(500);
        })
}
//Create: Ein Workshop wird angelegt
function postWorkshop(req: express.Request, res: express.Response): void {
    console.log("geht in PostWorkshop");

    const sqlQuery: string = "INSERT INTO workshop (Email, Titel, Art, Preis, Termin, Ort, Workshop_Dauer, UberCreator, Geeignet, Beschreibung) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

    const titel: string = req.body.title;
    const art: string = req.body.art;
    const preis: number = req.body.preis;
    const termin: string = req.body.termin;
    const ort: string = req.body.ort;
    const Workshop_Dauer: string = req.body.Workshop_Dauer;
    const uberCreator: string = req.body.uberCreator;
    const geeignet: string = req.body.geeignet;
    const beschreibung: string = req.body.beschreibung;
    const email: string = req.session.Email;

    if (titel === undefined || art === undefined || preis === undefined || termin === undefined || uberCreator === undefined || geeignet === undefined || beschreibung === undefined ) {
        console.log(titel, art, preis, termin, uberCreator, geeignet, beschreibung);

        res.send("Nicht alle informationen gegeben bitte versuchen sie es erneut")
        res.status(400);
    } else {

        query(sqlQuery, [email, titel, art, preis, termin, ort, Workshop_Dauer, uberCreator, geeignet, beschreibung]).then(() => {

            console.log("Workshop wurde erfolgreich in die Datenbank hinzugefügt");
            res.status(201);

            res.send("/register/" + titel);

        }).catch((err: mysql.MysqlError) => {
            console.log("Fehler in der Datenbank bei POST: " + err);
            res.sendStatus(500);

        })

    }
}
//Update: ein Workshop wird bearbeitet
function changeWorkshop(req: express.Request, res: express.Response): void {
    const title: string = req.body.title;
    const art: string = req.body.art;
    const preis: number = req.body.preis;
    const termin: string = req.body.termin;
    const dauer: string = req.body.dauer;
    const ort: string = req.body.ort;
    const uberCreator: string = req.body.uberCreator;
    const geeignet: string = req.body.geeignet;
    const beschreibung: string = req.body.beschreibung;
    const Id_Workshop: string = req.params.Id_Workshop;
    const sqlQuery: string = "UPDATE workshop SET Titel = ?, Art = ?, Preis = ?, Termin = ?, Workshop_Dauer = ?, Ort = ?, UberCreator = ?, Geeignet = ?, Beschreibung = ? WHERE Id_Workshop = ?";


    if (title === undefined || art === undefined || preis === undefined || termin === undefined || uberCreator === undefined || geeignet === undefined || beschreibung === undefined) {
        res.status(400);
        res.send("Nicht alle Informationen gegeben");
    } else {

        query(sqlQuery, [title, art, preis, termin, dauer, ort, uberCreator, geeignet, beschreibung, Id_Workshop]).then(() => {

            res.status(200);
            res.contentType("text/urilist");
            res.send("/userNames/" + encodeURI(title));
            // ???


        }).catch((err: mysql.MysqlError) => {

            res.sendStatus(500);
            console.log("Ein Fehler in der Datenbank UPDATE: " + err);
        });

    }
}
//Delete: ein Workshop wird anhand seiner ID gelöscht
function deleteWorkshop(req: express.Request, res: express.Response): void {
    const Id_Workshop : string = req.params.Id_Workshop;
    const sqlQuery : string = "Delete from workshop where Id_Workshop=?;";

    query(sqlQuery, [Id_Workshop]).then(()=>{
        res.status(200);
        res.send("Workshop deleted");
    }).catch((err: mysql.MysqlError) => {
        res.sendStatus(500);
        console.log("Fehler in der Datenbank (in Route Delete): " + err);
    })
}
//der Server schickt die nötigen Einträge für das rendern einer Detailseite
function getWorkshopData (req: express.Request, res: express.Response): void {
    const Id_Workshop: string = req.params.Id_Workshop;
    query("SELECT Titel, Art, Preis, Termin, UberCreator, Geeignet, Beschreibung, Workshop_Dauer, Ort FROM workshop WHERE Id_Workshop = ?;", [Id_Workshop])
        .then((results) => {
            res.status(200);
            res.json(results[0]);
        }).catch((err) => {
        console.log( err);
        res.sendStatus(500);
    })
}

//Hier muss noch einiges getan werden: query über user-->wu_zuweisung-->Workshop(denke ich) --> ausgabe des
// titels und der workshop id, um spater damit auf eine einzelseite verweisen zu können
router.get("/myWorkshopList", (req: express.Request, res: express.Response) => {
    const Email: string = req.session.Email;
    console.log(Email);
    const sqlQuery: string = "SELECT Id_workshop, Titel FROM workshop WHERE Email= ?  ;";

    query(sqlQuery, [Email]).then((results) => {
        res.json(results);
        res.status(200);
    }).catch((err: mysql.MysqlError) => {
        res.sendStatus(500);
        console.log("Fehler in der Datenbank (in Route POST /getmyWorkshopList): " + err);
    });

});
//Wird diese Route verwendet???
//der Server schickt die nötigen Einträge für das rendern einer Detailseite



// Ein eigener Wrapper, um die MySQL-Query als Promise (then/catch Syntax) zu nutzen

function query(sql: string, param: any[] = []): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
        connection.query(sql, param, (err: mysql.MysqlError | null, results: any) => {
            if (err === null) {
                resolve(results);
            } else {
                reject(err);
            }
        });
    });
}

