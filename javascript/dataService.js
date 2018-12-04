//Load in github json file via web api
function ApiService(url){
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();
    return new Promise((resolve, reject) => {
        Http.onreadystatechange=(e)=>{
            if(Http.readyState === 4 && Http.status === 200) {
                resolve(Http.responseText);
            }
            else if(Http.status >= 400){
                reject("Could not retrieve data from GitHub");
            }
        }
    });
}

//Convert a json string to a javascript object
function ConvertJsonToObject(json){
    return JSON.parse(json);
}

//Parse GitHub object for last updated date
//Return a custom formatted date
function GetDateFromGithubApi(obj, name){
    let repo = ReturnElementByName(obj, name);
    let repoLastUpdated = new Date(repo.updated_at);
    let date = repoLastUpdated.getDate();
    let month = repoLastUpdated.getMonth();
    let year = repoLastUpdated.getFullYear();

    return FormatDateString(date, month, year);
}

//Find an element by name property
function ReturnElementByName(obj, name){
    let el = obj.find(function(element) {
        return element.name == name;
    });

    return el;
}

//Custom format date strings
function FormatDateString(date, month, year){
    return  (month + 1) + "-" + date + "-" + year;
}