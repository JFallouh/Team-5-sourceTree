/* 

Class: User Interface
Assignment: Final Project

Team 4
    Craig Collins (1038789)
    James Fallouh (6171620)
    SeyedehFatemeh Fekribaygi (6284424)

    Current Date: TBD
    Filename: script.js

    Purpose: This is the script.js code.
*/


'use strict';

/*----------- Search input -----------*/
// Event listener for page reload
/*
document.onload = function () {
  localStorage.clear();
};
$(window).on('load', function () {
  localStorage.clear();
});
// Event listener for page reload
window.onload = function () {
  localStorage.clear();
  
};*/

$(document).ready(function () {
  // Check if there's a previous search term in local storage
  let previousSearchTerm = sessionStorage.getItem('searchTerm');
  if (previousSearchTerm) {
    highlightText(previousSearchTerm);
  }

  // Function to highlight text based on user input
  $('#NavSearch').on('keypress', function (event) {
    // Check if the Enter key was pressed (key code 13)
    if (event.which === 13) {
      let searchText = $(this).val().trim();

      // Highlight matching text (excluding HTML tags and attributes)
      highlightText(searchText);

      // Save the search term in local storage
      sessionStorage.setItem('searchTerm', searchText);
    }
  });

  // Event listener for the Escape key
  $(document).on('keydown', function (event) {
    if (event.which === 27) { // 27 is the key code for the Escape key
      clearHighlight();
    }
  });

  function highlightText(searchText) {
    // Remove existing highlights
    $('main').find('.highlight').contents().unwrap();
    // replace main with body to search the entire document
    // Highlight matching text (excluding HTML tags and attributes)
    if (searchText !== '') {
      // replace main with body to search the entire document
      $('main').find(':not(iframe, script, style, textarea)').contents().filter(function () {
        return this.nodeType === 3 && this.nodeValue.match(new RegExp('(' + searchText + ')', 'ig'));
      }).each(function () {
        let content = this.nodeValue;
        let regex = new RegExp('(' + searchText + ')', 'ig');
        let highlightedContent = content.replace(regex, '<span class="highlight">$1</span>');
        $(this).replaceWith(highlightedContent);
      });
    }
  }

  function clearHighlight() {
    // Remove existing highlights
    // replace main with body to clear search from the entire document
    $('main').find('.highlight').contents().unwrap();
    // Clear the search term in local storage
    sessionStorage.removeItem(`searchTerm`);
    sessionStorage
  }
});

/*----------- End of Search input -----------*/

/*----------- form message counter -----------*/
const MAX_REVIEW = 1000;
document.getElementById("limit").innerHTML = MAX_REVIEW;

// Reference to elemets in the web page
let wordCountBox = document.getElementById("countValue");
let warningBox = document.getElementById("warningBox");


// Event listener for typing into the comment box
document.getElementById("Message").addEventListener("keyup", updateCount);

// Function to update the count with each keyup event
function updateCount() {
  // Set the warning box to an empty text string 
  warningBox.innerHTML = "";

  // Count the number of characters in the comment box
  let commentText = document.getElementById("Message").value;
  let charCount = countCharacters(commentText);

  try {
    // Check if the character count exceeds the limit
    if (charCount > MAX_REVIEW) {
      // Throw an exception if the limit is exceeded
      throw new Error("You have exceeded the character count limit");
    }
    // Display the character count
    wordCountBox.innerHTML = charCount;
  } catch (error) {
    // Display the error message within the innerHTML of the warningBox
    warningBox.innerHTML = error.message;
  } finally {
    // Whether the exception is thrown or not, change the innerHTML of the wordCountBox
    // object to the value of the charCount variable.
    wordCountBox.innerHTML = charCount;
  }

}


/*=================================================================*/
// Function to count the number of characters in a text string
function countCharacters(textStr) {
  let commentregx = /\s/g;
  let chars = textStr.replace(commentregx, "");
  return chars.length;
}

/*----------- End of form message counter -----------*/
const selectedServices = []; // Array to store selected services
/*===============adding the html ============*/
function createSelectedServicesElements() {
  // Check if the sections are already created
  let selectedServicesImgSec = document.querySelector("#Select_Service_div .selected-services-img-sec");
  let selectedServicesContainer = document.querySelector("#Select_Service_div .selected-services-container");

  if (!selectedServicesImgSec || !selectedServicesContainer) {
      // Create the selected services image section if not already created
      if (!selectedServicesImgSec) {
          selectedServicesImgSec = document.createElement("section");
          selectedServicesImgSec.classList.add("selected-services-img-sec");

          let img = document.createElement("img");
          img.setAttribute("src", "../../images/arrow_down.gif");
          img.setAttribute("alt", "arrow to the right");
          img.setAttribute("title", "arrow to the right");
          img.setAttribute("height", "100");
          img.setAttribute("width", "100");
          img.style.margin = "2rem 0 0 1rem";
          img.style.transform = "rotate(270deg)";

          selectedServicesImgSec.appendChild(img);
      }

      // Create the selected services container section if not already created
      if (!selectedServicesContainer) {
          selectedServicesContainer = document.createElement("section");
          selectedServicesContainer.classList.add("selected-services-container");
          selectedServicesContainer.style.width = "35rem";
          selectedServicesContainer.style.height = "8.5rem";
          selectedServicesContainer.style.margin = "1.3rem";
          selectedServicesContainer.style.padding = "0";

          let h2 = document.createElement("h2");
          h2.classList.add("bg-primary", "bg-gradient", "text-center");
          h2.style.color = "white";
          h2.style.fontSize = "smaller";
          h2.style.display = "block";
          h2.style.margin = "0";
          h2.style.padding = "0";
          h2.textContent = "Selected Services";

          let ul = document.createElement("ul");
          ul.setAttribute("id", "selected-services-list");
          ul.style.fontFamily = "serif";
          ul.style.margin = "0";
          ul.style.padding = "0";

          selectedServicesContainer.appendChild(h2);
          selectedServicesContainer.appendChild(ul);
      }

      // Append the created elements to the Select_Service_div
      let selectServiceDiv = document.getElementById("Select_Service_div");
      selectServiceDiv.appendChild(selectedServicesImgSec);
      selectServiceDiv.appendChild(selectedServicesContainer);
  }
}


/*===============end of adding the html ============*/
/*----------- validate form -----------*/
document.addEventListener('DOMContentLoaded', function() {
  const selectServiceOptions = document.querySelectorAll('#Select_Service option');
  

  selectServiceOptions.forEach(function(option) {
    option.addEventListener('click', function(event) {
      const selectedOption = event.target;

      // Toggle the highlight class
      if (selectedOption.classList.contains('highlightList')) {
        selectedOption.classList.remove('highlightList');
        // Remove from selectedServices array
        const index = selectedServices.indexOf(selectedOption.value);
        if (index !== -1) {
          selectedServices.splice(index, 1);
        }
      } else {
        selectedOption.classList.add('highlightList');
        // Add to selectedServices array
        selectedServices.push(selectedOption.value);
      }

      // Log selectedServices array in console
      console.log(selectedServices);

      // Display selectedServices array in HTML
      const selectedServicesList = document.getElementById('selected-services-list');
      selectedServicesList.innerHTML = '';
      selectedServices.forEach(service => {
        const li = document.createElement('li');
        li.textContent = service;
        selectedServicesList.appendChild(li);
      });
    });
  });
  
});

/*document.addEventListener('DOMContentLoaded', function() {
  const selectServiceOptions = document.querySelectorAll('#Select_Service option');

  selectServiceOptions.forEach(function(option) {
    option.addEventListener('click', function(event) {
      const selectedOption = event.target;

      // Toggle the highlight class
      if (selectedOption.classList.contains('highlightList')) {
        selectedOption.classList.remove('highlightList');
      } else {
        selectedOption.classList.add('highlightList');
      }
    });
  });
});
*/
/* ================add to array the selected items================*/
/*// Initialize the array to store selected services
let selectedServices = [];

// Function to add or remove selected service
function toggleSelectedService(service) {
  // Check if the service is already in the array
  const index = selectedServices.indexOf(service);

  // If the service is not in the array, add it
  if (index === -1) {
    selectedServices.push(service);
  } else {
    // If the service is already in the array, remove it
    selectedServices.splice(index, 1);
  }

  // Convert the array to a string and log it
  const selectedServicesString = selectedServices.join(', ');
  console.log(selectedServicesString);
// Update the selected services list in the HTML
  updateSelectedServicesList();
}

// Event listeners for dropdown options
document.getElementById('Select_Service').addEventListener('change', function(event) {
  const selectedOption = event.target.value;
  toggleSelectedService(selectedOption);
});

/*================code 2================*/
// Function to update the list of selected services in the HTML
/*function updateSelectedServicesList() {
  const selectedServicesList = document.getElementById("selected-services-list");

  // Clear the existing list items
  selectedServicesList.innerHTML = "";

  // Populate the list with selected services
  selectedServices.forEach(service => {
    const listItem = document.createElement("li");
    listItem.textContent = service;
    selectedServicesList.appendChild(listItem);
  });
}*/
/*------------------------*/
let Name;
let Email;
let Phone;
let Message;
let SelectService;



function validateForm() {
  Name = document.getElementById("Name");
  Email = document.getElementById("Email");
  Phone = document.getElementById("Phone");
  Message = document.getElementById("Message");
  SelectService = document.getElementById("Select_Service");

  // Validate the form data
  if (!isValidName(Name.value)) {
    alert("Please enter a valid name (no numbers allowed).");
    Name.focus();
    /*setTimeout(function() {
      Name.focus(); // Set focus to the Name field
    }, 0);*/
    return false; // Stop form submission

  }

  if (Email.value.trim() === "") {
    alert("Please enter a valid Email.");
    return false; // Stop form submission
  }

  // Validate the phone number
  if (!isValidPhoneNumber(Phone.value)) {
    alert("Please enter a valid phone number in the format 123-456-7890");
    Phone.focus();
    return false; // Stop form submission
  }
  // Check if the default option is selected
  /* if (SelectService.value === "") {
     alert("Please select a service.");
     SelectService.focus();
     return false; // Stop form submission
   }*/

   if (selectedServices.length === 0) {
    alert("Please select one or more services.");
    document.getElementById('Select_Service').focus();
    return false; // Stop form submission
  }
   
  
  // validate the text 
  if (Message.value.trim() === "") {
    alert("Please enter your message ");
    Message.focus();
    return false; // Stop form submission
  }

  // If all validations pass, allow the form to be submitted
  return true;
}
/*
function isServiceSelected() {
  // Check if at least one option is selected
  return Array.from(SelectService.option ).some(option => option.selected);
}
This function uses the Array.
from method to convert the options of the Select_Service
 dropdown into an array, and then it uses the some method
  to check if at least one option has the selected property set to true.
*/
function isValidPhoneNumber(phone) {
  // Check if the phone number matches the pattern "123-456-7890"
  const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

  if (!phone.match(phonePattern)) {
    // If not, try to format and validate
    const formattedPhone = formatPhoneNumber(phone);

    if (!formattedPhone || !formattedPhone.match(phonePattern)) {
      return false;
    }

    // Update the phone input value with the formatted version
    document.getElementById("Phone").value = formattedPhone;
  }

  return true;
}






function formatPhoneNumber(phone) {
  // Remove non-numeric characters
  const numericPhone = phone.replace(/\D/g, "");

  // Check if the numericPhone has 10 digits
  if (numericPhone.length === 10) {
    // Format the phone number as "123-456-7890"
    return `${numericPhone.substr(0, 3)}-${numericPhone.substr(3, 3)}-${numericPhone.substr(6)}`;
  }

  return null;
}
function isValidName(name) {
  // Check if the name contains only letters (no numbers allowed)
  //const namePattern = /^[A-Za-z]+$/;

  // Allow white spaces in the name
  const namePattern = /^[A-Za-z\s]+$/;

  return namePattern.test(name);
}

function resetForm() {
 /*
  // Reset the form
  document.getElementById("Name").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Phone").value = "";
  document.getElementById("Select_Service").value = "";
  document.getElementById("Message").value = "";

   // Clear all elements inside the selected-services-list
   document.getElementById("selected-services-list").innerHTML = "";
  // Remove highlightList class from all options in the Select_Service dropdown
  let selectServiceOptions = document.querySelectorAll('#Select_Service option');
  selectServiceOptions.forEach(option => {
    option.classList.remove('highlightList');
  });

  // Call the updateCount function to reset character count
  updateCount();

  // Clear selectedOption
  document.getElementById('selectedOption').selectedIndex = 0;


 

   // Remove highlightList class from all options in the Select_Service dropdown
   let selectServiceOptions1 = document.querySelectorAll('#Select_Service option');
   selectServiceOptions1.forEach(option => {
     option.classList.remove('highlightList');
   });
   
    // Empty the selectedOption
  let selectedOption = document.getElementById("Select_Service");
  selectedOption.value = "";
  // Clear selectedOption
document.getElementById('selectedOption').selectedIndex = 0;
  // Empty the selectedServices array
  selectedServices = [];
  // You can add additional reset logic if needed
  // For example, clear the local storage for the search term
  //sessionStorage.removeItem('searchTerm');
  sessionStorage.clear;
  localStorage.clear;
  // Reload the page
  */
  location.reload();
}
/*----------- End of form validation -----------*/

/*------------------ selected service container---------------------*/
/*function updateSelectedServicesList() {
  const selectedServicesList = document.getElementById("selected-services-list");
  // Clear the existing list items
  selectedServicesList.innerHTML = "";
  // Populate the list with selected services
  selectedServices.forEach(service => {
    const listItem = document.createElement("li");
    listItem.textContent = service;
    selectedServicesList.appendChild(listItem);
  });
}

// Function to add or remove selected service
function toggleSelectedService(service) {
  // Check if the service is already in the array
  const index = selectedServices.indexOf(service);

  // If the service is not in the array, add it
  if (index === -1) {
    selectedServices.push(service);
  } else {
    // If the service is already in the array, remove it
    selectedServices.splice(index, 1);
  }

  // Update the selected services list
  updateSelectedServicesList();
}*/
/*====================end of selected service container========================*/
/*====================alternate images========================*/
document.addEventListener('DOMContentLoaded', function() {
  const images = [
    "../../images/Call_Center.gif",
    "../../images/Email_Marketing.gif",
    "../../animations/Busines-group-meeting.gif",
    "../../animations/Video-Marketing.gif",
    "../../images/royalty-free/Contact.jpg"

    
    // Add more image paths as needed
  ];
  const interval = 5000; // Time interval in milliseconds (10 seconds)

  let currentIndex = 0;
  const imgElement = document.getElementById('contact_us_image');

  // Function to change the image
  function changeImage() {
    imgElement.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Initial call to display the first image
  changeImage();

  // Set interval to change the image every 'interval' milliseconds
  setInterval(changeImage, interval);
});
/*====================end of alternate images========================*/
/*====================transfer data to other page========================*/
function handleSubmit() {
  const nameOfClient = document.getElementById('Name').value;
  localStorage.setItem('Name', nameOfClient);
  return;
}
/*====================transfer data to other page========================*/