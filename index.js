import axios from "axios";
import https from "https";

const Connstring = "data source=c:\\Users\\HP\\Documents\\Angel\\SDG\\Sybase\\Data;ServerType=local;CharType=ansi;TableType=ADT;";
const Localquery = "select PkData, CardNumberFormatted, UserName, Email, Picture from Card";

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

instance.post("getUsers", { Connstring, Localquery })
    .then(response =>{
        console.log(response.data);
    })
    .catch(error => {
        console.log("Error:", error);
    });