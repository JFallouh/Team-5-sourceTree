    /********** Case Study 5 **********/
    "use strict";
    // declares and instantiates XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    //function to fetch repositories
    function fetchRepos(username) {
        //declares and instantiates projectList to contain projectList html id
        let projectList = document.getElementById('project-list');
        
        //open method initializes request, GET to get the content, URL + concatenated username
        xhr.open("GET", "https://api.github.com/users/" + username + "/repos");

    //event handler 
    xhr.onreadystatechange = function() {

        //verifies that server has responded with 200, i.e. 4=complete request + 200 = successful 
        if (xhr.readyState === 4 && xhr.status === 200) {
            //if response succeeds, JSON response is parsed into data variable
            const data = JSON.parse(xhr.responseText);
            
            //for-loop that iterates through each repository
            for (let counter = 0; counter < data.length; counter++) {
                // array
                const repo = data[counter];

                //creates list item for the repo
                let listItem = document.createElement('li');

                //defines container and populates listitem with repo content, such as name, description, html, link
                listItem.innerHTML = '<strong>' + repo.name + '</strong>: ' + repo.description + ' | <a href="' + repo.html_url + '" target="_blank">View on GitHub</a>';
                
                //this adds the listitems one by one to the project list html 
                projectList.appendChild(listItem);
            }
        }
    }; //end event handler
    
    //triggers the http request to be sent
    xhr.send();
}

//calls fetchRepos function with the desired username
fetchRepos('Craig-Collins');