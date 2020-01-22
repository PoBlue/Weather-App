/* Global Variables */
const openWeatherBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var zipCode;
const appid = '&appid=fd3b6a58f8ab4ef50b34bf5ec115bf56&units=metric';


// Create a new date instance dynamically with JS
const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
}

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
        alert(`请求失败: ${error}`);
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
        alert(`请求失败: ${error}`);
        // appropriately handle the error
    }
}

//click generate
document.getElementById("generate").addEventListener('click', () => {
    let input = getInput();
    let newDate = getDate();

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
    }).catch((error) => {
        alert(`请求失败, 请检查输入！`);
    });
} , false);

const dateEle = document.querySelector("#date");
const tempEle = document.querySelector("#temp");
const contentEle = document.querySelector("#content");

const updateUI = (data) => {
    dateEle.innerHTML = "Date: " + data.date;
    tempEle.innerHTML = "Temp: " + data.temp;
    contentEle.innerHTML = "Feelings: " + data.feelings;
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