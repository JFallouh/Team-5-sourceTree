/* 
Class: User Interface
Assignment: Final Project

Team 4
    Craig Collins (1038789)
    James Fallouh (6171620)
    SeyedehFatemeh Fekribaygi (6284424)

    Current Date: TBD
    Filename: index.html

    Purpose: This is the script file for the sevices page
*/

"use strict";
document.getElementById('quoteForm').addEventListener('submit', function(event){
    event.preventDefault();

    //get the hours for service
    var databasesHours = parseFloat(document.getElementById('Databases').value);
    var programmingHours = parseFloat(document.getElementById('Programming').value);
    var webdesignHours = parseFloat(document.getElementById('Webdesign').value);
    var webdevHours = parseFloat(document.getElementById('webdev').value);
    
    //validate if input negative
    if(databasesHours <0 || programmingHours <0 || webdesignHours <0 || webdevHours <0 ) {
        alert("Invalid Input. You must enter 0 or a positive number");
        return;
    }
    // calculate estimated quote for each service
    var databasesQuote = databasesHours * 25;
    var programmingQuote = programmingHours * 35;
    var webdesignQuote = webdesignHours * 45;
    var webdevQuote = webdevHours * 35;

    //Calculated total
    var totalQuote = databasesQuote + programmingQuote + webdesignQuote +webdevQuote;

    //display the quote in the table
    var quoteTableBody = document.getElementById("quoteTableBody");
    quoteTableBody.innerHTML = `
      <tr>
       <td>Datebase</td>
       <td>${databasesHours}</td>
       <td>${databasesQuote}</td>
      </tr>

      <tr>
       <td>Programming</td>
       <td>${programmingHours}</td>
       <td>${programmingQuote}</td>
      </tr>

      <tr>
       <td>Webdesign</td>
       <td>${webdesignHours}</td>
       <td>${webdesignQuote}</td>
      </tr>

      <tr>
       <td>webdev</td>
       <td>${webdevHours}</td>
       <td>${webdevQuote}</td>
      </tr>
    
    `;

    //display total
    document.getElementById("total").innerText = `$${totalQuote}`;


    // show the quote table
    document.getElementById('quoteTable').classList.remove('d-none');
});


