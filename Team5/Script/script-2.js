/********** Case Study 2: Two Functions **********/

//ID selectors
//this function initializes the likes/dislikes counters in local storage, basically it's pulling the localstorage data or setting it to zero if it exists

"use strict";
function initializeCounters() {

    // retrieves entire data object, i.e. JSON record
    let allLikesDislikes = JSON.parse(localStorage.getItem('allLikesDislikes'));
  
    //checks if object is empty otherwise it won't work, i.e. checks if allLikesDislikes is undefined, if it is, assigns empty object
    if (!allLikesDislikes) {
        allLikesDislikes = {};
    }

    //declare articles, providing access to the article branches, acts as a collection, like a pseudo-array
    let articles = document.getElementsByClassName('article');

    //iterates over the articles branch, picking up the likes/dislikes IDs and their associated data contained relevant allLikesDislikes
    for (let counter = 0; counter < articles.length; counter++) {
        
        //accessor for each article branch in the loop
        let article = articles[counter];
    
        //declares variables for each like + dislike ID
        let likesSpan = document.getElementById('likes' + (counter + 1));
        let dislikesSpan = document.getElementById('dislikes' + (counter + 1));
    
        //declares article data, derived from allLikesDislikes[0],[1], etc, JSON objects
        //sets JSON keys to 0 if empty, otherwise pulls key values
        let articleData = allLikesDislikes[counter] || { likes: 0, dislikes: 0 };
    
        //overwrites likesSpan text content with likes/dislikes value from articleData variable
        likesSpan.textContent = articleData.likes;
        dislikesSpan.textContent = articleData.dislikes;
    }
}

"use strict";
// update likes/dislikes counter
function updateLikesDislikes(counter, likeType) {

    //retrieves  entire data object from local storage, i.e., JSON record
    let allLikesDislikes = JSON.parse(localStorage.getItem('allLikesDislikes'));

    //checks if  object is empty; if so, initializes it to an empty object
    if (!allLikesDislikes) {
        allLikesDislikes = {};
    }

    //declares article data, derived from allLikesDislikes[counter] JSON object
    //sets JSON key values to 0 if empty; otherwise, pulls key values
    let articleData = allLikesDislikes[counter] || { likes: 0, dislikes: 0 };

    //if likeType = true, +1 like/ if liketype = false + 1 dislike in allLikesDislikes[#]
    if (likeType) {
        articleData.likes += 1;
    } else {
        articleData.dislikes += 1;
    }

    //then updates articleData variable containing likes and dislikes within its localStorage record allLikesDislikes[#]
    allLikesDislikes[counter] = articleData;

    //accesses local storage, accesses JSON (allLikesDislikes) file, then stringifies the allLikesDislikes variable into the JSON
    localStorage.setItem('allLikesDislikes', JSON.stringify(allLikesDislikes));

    //updates the likes and dislikes counter on HTML
    //declares likesSpan/dislikesSpan variables for each article 
    let likesSpan = document.getElementById('likes' + (counter + 1));
    let dislikesSpan = document.getElementById('dislikes' + (counter + 1));

    //overwrites likesSpan text content with likes/dislikes value from articleData variable
    likesSpan.textContent = articleData.likes;
    dislikesSpan.textContent = articleData.dislikes;
}

//attaches event listeners to like/dislike buttons
//class selectors
"use strict";
function attachEventListeners() {

    //declares articles, providing access to the article branches, acts as a collection, like a pseudo-array
    let articles = document.getElementsByClassName('article');

    //iterates over articles branch
    //need different counters (counter1,counter2, counter3) causing conflict
    for (let counter1 = 0; counter1 < articles.length; counter1++) {

        //accessor for each article branch in the loop
        let article = articles[counter1];

        //declares variables for each like-button and dislike button using class selectors
        let likeButtons = article.getElementsByClassName('like-button');
        let dislikeButtons = article.getElementsByClassName('dislike-button');

        //attaches click event listeners to each like button
        for (let counter2 = 0; counter2 < likeButtons.length; counter2++) {

            //accesses the like button[counter2] in the array and attaches the click event, triggering the anonymous function, preventing the script calling the updateLikesDislikes function
            likeButtons[counter2].addEventListener('click', function() {

                //calls function updateLikesDislikes, setting the counter and likeType
                updateLikesDislikes(counter1, true);

            });
        }

        //does the same thing, but for dislikes
        for (let counter3 = 0; counter3 < dislikeButtons.length; counter3++) {
            dislikeButtons[counter3].addEventListener('click', function() {
                updateLikesDislikes(counter1, false);
            });
        }
    }
}

// initializeCounters needs to be called first, otherwise they won't update, change, etc.
// attachEventListeners needs to be attached otherwise button clicking fails
initializeCounters();
attachEventListeners();



    /********** Case Study 3: Array + Loop **********/
    "use strict";
    //initializes an array with existing comments
    let comments = [
        { name: "John Doe", date: "2024-03-08", comment: "What a great article." },
        { name: "Jane Smith", date: "2024-03-08", comment: "I've read better" },
        { name: "Thunderman", date: "2024-03-08", comment: "UwU" },
        { name: "Bobby Hill", date: "2024-03-08", comment: "This is a placeholder." },
        { name: "Hank Hill", date: "2024-03-08", comment: "beep boop beep." }
    ];
    
    //adds comment and current date to the to the array
    // receives name and comment variables previously declared
    function addComment(name, comment) {
        //declares and assign current date gets current date
        //by creating a date object, which is then converted toISO string and sliced up to remove the extraneous characters, the last bit 0-10 characters
        let currentDate = new Date().toISOString().slice(0, 10); // 
    
        // pushes previously declared comments to the array, which will include the new comment
        comments.push({ name: name, date: currentDate, comment: comment });
    
        //updates the array with the new comments
        updateComments(); 
    } //end function

    "use strict";
    //comment update function, essentially updates what the user sees in the box
    function updateComments() {

        //declares comment list, pulled from html commentList id
        let commentList = document.getElementById('commentList');
    
        //initializes html variable to contain listitem
        let html = '';
    
        //for-loop that iterates through the array adding comments + formatting and also concatenates the content
        for (let counter = 0; counter < comments.length; counter++) {
    
            //instantiation of comment id, names, text, posted date and all of them concatenated
            let comment = comments[counter];
            let nameElement = '<strong style="color: #277DFD;">' + comment.name + '</strong>'; // styling to match website theme
            let commentText = '<div>' + comment.comment + '</div>'; // comment property of comment object
            let postedOn = '<span class="text-muted float-end">Posted on ' + comment.date + '</span>'; //styling to make the posted on + date grey/less intrusive
            let listItem = '<li class="list-group-item">' + nameElement + '<br>' + commentText + postedOn + '</li>';

            //attaches listItem to HTML variable, which was flushed 
            html += listItem;
    
        }//end for loop
    
        //sets commentlist ID innerhtml to the new content
        commentList.innerHTML = html;
    
    }//end function
    
    //calls the updatecomments function independently when the page loads so that the array of comments will actually appear
    updateComments();

    "use strict";
   
    //event listener for comment form
    //traverses dom document to commentForm ID selector, adds submit event + triggers  event.preventdefault
    document.getElementById('commentForm').addEventListener('submit', function(event) {

        //preventDefault prevents form from being submitted
        //this is to stop it for validation
        event.preventDefault(); 

        // declares and calls nameInput value from form, trimming whitespace
        let nameInput = document.getElementById('nameInput').value.trim();

        // declares and calls commentInput value from form, trimming whitespace
        let commentInput = document.getElementById('commentInput').value.trim();
    
        //if else statement that calls displayMissingFieldsWarning
        //i.e. if one or the other is not empty, adds nameinput and commentinput
        if (nameInput !== '' && commentInput !== '') {

            //adds to array
            addComment(nameInput, commentInput); 
    
            //then flushes the fields
            document.getElementById('nameInput').value = '';
            document.getElementById('commentInput').value = '';
        } else {

            //otherwise calls  warning message
            alert("Please fill in all required fields.");
        } //end if else
    }); //end event listener


    /*----------- Character limit validation -----------*/
/* stolen from James' code */
"use strict";
    const MAX_REVIEW = 1000;
    document.getElementById("charCount").innerHTML = `0 / ${MAX_REVIEW}`;
    let wordCountBox = document.getElementById("charCount");
    let warningBox = document.createElement("div");
    warningBox.className = "text-danger";
    document.getElementById("commentForm").appendChild(warningBox);
    document.getElementById("commentInput").addEventListener("input", updateCount);

function updateCount() {

  warningBox.innerHTML = "";
  let commentText = document.getElementById("commentInput").value;
  let charCount = countCharacters(commentText);
  wordCountBox.innerHTML = `${charCount} / ${MAX_REVIEW}`;
  if (charCount > MAX_REVIEW) {
    warningBox.innerHTML = "You have exceeded the character count limit";
  }
}

"use strict";
function countCharacters(textStr) {
  let commentregx = /\s/g;
  let chars = textStr.replace(commentregx, "");
  return chars.length;
}


