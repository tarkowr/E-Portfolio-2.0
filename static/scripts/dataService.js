// Load in github json file via web api
function ApiService(environment){
    const Http = new XMLHttpRequest();
    Http.open("GET", environment.apiUrl + '/github/data');
    Http.setRequestHeader("Content-type", "application/json");
    Http.send();

    return new Promise((resolve, reject) => {
        Http.onreadystatechange=(e)=>{
            if(Http.readyState === 4 && Http.status === 200) {
                resolve(Http.responseText);
            }
        }
    });
}

// Parse GitHub object for last updated date
// Return a custom formatted date
function GetDateFromGithubApi(obj, name){
    let repo = ReturnElementByName(obj, name);
    let repoLastUpdated = new Date(repo.updated_at);
    let date = repoLastUpdated.getDate();
    let month = repoLastUpdated.getMonth();
    let year = repoLastUpdated.getFullYear();

    return FormatDateString(date, month, year);
}

// Find an element by name property
function ReturnElementByName(obj, name){
    let json = JSON.parse(obj);

    let el = json.find(function(element) {
        return element.name == name;
    });

    return el;
}

// Custom format date strings
function FormatDateString(date, month, year){
    return  (month + 1) + "-" + date + "-" + year;
}