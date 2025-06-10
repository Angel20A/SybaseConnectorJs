import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";

const Connstring = "data source=c:\\Users\\HP\\Documents\\Angel\\SDG\\Sybase\\Data;ServerType=local;CharType=ansi;TableType=ADT;";
const agent = new https.Agent({
    rejectUnauthorized: false
});

const url = "https://localhost:7030/";
const instance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    },
    httpsAgent: agent
});

function getUsers () {
    const Localquery = "select PkData, CardNumberFormatted, UserName, Email, Picture from Card";
    instance.post("getUsers", { Connstring, Localquery })
        .then(response =>{
            console.log(response.data);
        })
        .catch(error => {
            console.log("Error:", error);
        });
};
//getUsers();

function getUsersId (id){
    const Localquery = "select PkData, CardNumberFormatted, UserName, Email, Picture from Card where PkData = " + id;
    instance.post("getUsers", { Connstring, Localquery })
        .then(response =>{
            console.log(response.data);
        })
        .catch(error => {
            console.log("Error:", error);
        });
};
//getUsersId(70);

async function postUser (PkData, CardNumberFormatted, Username, Email, PicturePath){
    try{
        /*const imagePath = "C:/Users/HP/Downloads/userprofile3.jpg";
        console.log(imagePath);
        const imageBuffer = fs.readFileSync(imagePath).toString("base64");
        console.log("imagen a byte:" + imageBuffer);*/
        

        //const Localquery = `insert into Card (PkData, CardNumberFormatted, UserName, Email, Picture) values (77, '0000:22075', 'Seven User', 'seven@user.com', ${imageBuffer}`;
        //const pictureRoute = path.join(__dirname, PicturePath);
        const Picture = fs.readFileSync(PicturePath).toString("base64");
        console.log("Imagen a base64:", Picture);
        instance.post("postUser", { PkData, CardNumberFormatted, Username, Email, Picture } ) //{ Connstring, Localquery }
            .then(response => {
                console.log(response.data);
            })
            .catch(error =>{
                console.log("Error:", error);
            });
    }catch(error){
        console.error(error.response);
    }
};
postUser(78, '0000:22078', 'Eight User', 'eight@user.com', 'C:/Users/HP/Downloads/userprofile3.jpg');