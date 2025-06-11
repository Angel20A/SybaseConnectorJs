import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";

const Connstring = "data source=c:\\Users\\HP\\Documents\\Angel\\SDG\\Sybase\\Data;ServerType=local;CharType=general_vfp_ci_as_1252;TableType=ADT;";
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
        console.log(PkData + ", " + CardNumberFormatted + ", " + Username + ", " + Email + ", " + PicturePath);
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
//postUser(78, '0000:22078', 'Eight User', 'eight@user.com', 'C:/Users/HP/Downloads/userprofile3.jpg');

async function putUser(PkData, CardNumberFormatted, Username, Email, PicturePath){
    try{
        console.log("Actualizando usuario...");

        console.log(PkData + ", " + CardNumberFormatted + ", " + Username + ", " + Email + ", " + PicturePath);
        const Picture = fs.readFileSync(PicturePath).toString("base64");
        console.log("Imagen a base64:", Picture);

        instance.put("PutUser", { PkData, CardNumberFormatted, Username, Email, Picture } )
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
//putUser(78, '0000:22078', 'Nine User', 'eight@user.com', 'C:/Users/HP/Downloads/userprofile3.jpg');

async function deletUser(PkData) {
    try{
        console.log("Eliminando usuario...");
        console.log("PkData:", PkData);
        instance.delete("DeleteUser/" + PkData)
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
deletUser(78);