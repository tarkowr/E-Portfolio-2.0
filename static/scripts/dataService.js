// Load in github json file via the github web api
function ApiService(environment){
    const ROUTE = '/github/data';
    const URL = environment.apiUrl + ROUTE;

    return fetch(URL)
    .then(response => {
        return response.json();
    });
}

// Parse GitHub object for last updated date
// Return a custom formatted date
function GetDateFromGithubApi(obj, name){
    let repo = ReturnElementByName(obj, name);

    if (!repo) return null;

    let repoLastUpdated = new Date(repo.updated_at);
    let date = repoLastUpdated.getDate();
    let month = repoLastUpdated.getMonth();
    let year = repoLastUpdated.getFullYear();

    return FormatDateString(date, month, year);
}

// Find an element by name property
function ReturnElementByName(json, name){
    let el = json.find(function(element) {
        return element.name == name;
    });

    return el;
}

// Custom format date strings
function FormatDateString(date, month, year){
    return  (month + 1) + '-' + date + '-' + year;
}