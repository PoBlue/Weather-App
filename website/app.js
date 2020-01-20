/* Global Variables */
const openWeatherBaseUrl = 'https://samples.openweathermap.org/data/2.5/weather?zip=';
var zipCode = '94040';
const appid = '&appid=b6907d289e10d714a6e88b30761fae22';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const retrieveData = async (url = '') => {
    const request = await fetch(url, {mode: 'cors'});
    try {
        // Transform into JSON
        const allData = await request.json();
        return allData;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

//click generate
document.getElementById("generate").addEventListener('click', () => {
    let input = getInput();

    retrieveData(openWeatherBaseUrl + input.zipCode + appid).then((data) => {
        let d = {
            date: newDate,
            feelings: input.feelings,
            temp: data.main.temp
        };

        postData('/add', d).then((d)=>{
            retrieveData('/last').then((data) => {
                updateUI(data);
            });
        });
    })
} , false);

const updateUI = (data) => {
    console.log(data);
};

//get input
const getInput = () => {
    let zipCode = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;

    return {
        zipCode,
        feelings
    }
};