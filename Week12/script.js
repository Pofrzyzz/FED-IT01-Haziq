//[STEP 0]: Make sure our document is A-OK
document.addEventListener("DOMContentLoaded", function () {
  // What kind of interface we want at the start 
  const APIKEY = "659b1f58220862cfe708f79e";
  getContacts();
  document.getElementById("update-contact-container").style.display = "none";
  document.getElementById("add-update-msg").style.display = "none";

  //[STEP 1]: Create our submit form listener
  document.getElementById("contact-submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: Let's retrieve form data
    // For now, we assume all information is valid
    // You are to do your own data validation
    let contactName = document.getElementById("contact-name").value;
    let contactID = document.getElementById("contact-studentid").value;
    let contactMentor = document.getElementById("contact-studentmentor").value;
    let contactClass = document.getElementById("contact-studentclass").value;
    let contactEmail = document.getElementById("contact-studentemail").value;
    let contactCourse = document.getElementById("contact-studentcourse").value;

    //[STEP 3]: Get form values when the user clicks on send
    // Adapted from restdb API
    let jsondata = {
      "Name": contactName,
      "Student_ID": contactID,
      "Student_Mentor": contactMentor,
      "Student_Class": contactClass,
      "Student_Email": contactEmail,
      "Student_Course": contactCourse
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      method: "POST", //[cher] we will use post to send info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        // Disable our button or show loading bar
        document.getElementById("contact-submit").disabled = true;
        // Clear our form using the form ID and triggering its reset feature
        document.getElementById("add-contact-form").reset();
      }
    }

    //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch("https://haziqdatabase-1ac8.restdb.io/rest/contact", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("contact-submit").disabled = false;
        //@TODO update frontend UI 
        document.getElementById("add-update-msg").style.display = "block";
        setTimeout(function () {
          document.getElementById("add-update-msg").style.display = "none";
        }, 3000);
        // Update our table 
        getContacts();
      });
  });//end click 


  //[STEP] 6
  // Let's create a function to allow you to retrieve all the information in your contacts
  // By default, we only retrieve 10 results
  function getContacts(limit = 10, all = true) {

    //[STEP 7]: Create our AJAX settings
    let settings = {
      method: "GET", //[cher] we will use GET to retrieve info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    //[STEP 8]: Make our AJAX calls
    // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
    // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links 
    fetch("https://haziqdatabase-1ac8.restdb.io/rest/contact", settings)
      .then(response => response.json())
      .then(response => {
        let content = "";

        for (var i = 0; i < response.length && i < limit; i++) {
          //console.log(response[i]);
          //[METHOD 1]
          // Let's run our loop and slowly append content
          // We can use the normal string append += method
          /*
          content += "<tr><td>" + response[i].name + "</td>" +
            "<td>" + response[i].email + "</td>" +
            "<td>" + response[i].message + "</td>
            "<td>Del</td><td>Update</td</tr>";
          */

          //[METHOD 2]
          // Using our template literal method using backticks
          // Take note that we can't use += for template literal strings
          // We use ${content} because -> content += content 
          // We want to add on previous content at the same time
          content = `${content}<tr id='${response[i]._id}'>
              <td>${response[i].Name}</td>
              <td>${response[i].Student_Email}</td>
              <td>${response[i].Student_ID}</td>
              <td>${response[i].Student_Class}</td>
              <td>${response[i].Student_Course}</td>
              <td>${response[i].Student_Mentor}</td>
              <td>
                  <a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-studentid='${response[i].Student_ID}' data-name='${response[i].Name}' data-email='${response[i].Student_Email}' data-studentclass='${response[i].Student_Class}' data-studentcourse='${response[i].Student_Course}' data-studentmentor='${response[i].Student_Mentor}'>Update</a>
                  <a href='#' class='delete' data-id='${response[i]._id}'>Delete</a>
              </td>
          </tr>`;

        }

        //[STEP 9]: Update our HTML content
        // Let's dump the content into our table body
        document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;

        document.getElementById("total-contacts").innerHTML = response.length;
      });
  }

  //[STEP 10]: Create our update listener
  // Here we tap onto our previous table when we click on update
  // This is a delegation feature of jQuery
  // Because our content is dynamic in nature, we listen in on the main container which is "#contact-list". For each row, we have a class .update to help us
  document.getElementById("contact-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("update")) {
      e.preventDefault();
      // Update our update form values
      let contactName = e.target.getAttribute("data-name");
      let contactEmail = e.target.getAttribute("data-email");
      let contactID = e.target.getAttribute("data-studentid");
      let contactClass = e.target.getAttribute("data-studentclass");
      let contactCourse = e.target.getAttribute("data-studentcourse");
      let contactMentor = e.target.getAttribute("data-studentmentor");
      let contactId = e.target.getAttribute("data-id");
      console.log(e.target.getAttribute("data-msg"));

      //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
      document.getElementById("update-contact-name").value = contactName;
      document.getElementById("update-contact-email").value = contactEmail;
      document.getElementById("update-contact-studentid").value = contactID;
      document.getElementById("update-contact-class").value = contactClass;
      document.getElementById("update-contact-course").value = contactCourse;
      document.getElementById("update-contact-mentor").value = contactMentor;
      document.getElementById("update-contact-id").value = contactId;
      document.getElementById("update-contact-container").style.display = "block";
    }
    else if (e.target.classList.contains("delete")) {
        e.preventDefault();

        let contactId = e.target.dataset.id;
        deleteContact(contactId);
    }
  });//end contact-list listener for update function

  //[STEP 12]: Here we load in our contact form data
  // Update form listener
  document.getElementById("update-contact-submit").addEventListener("click", function (e) {
    e.preventDefault();
    // Retrieve all my update form values
    let contactName = document.getElementById("update-contact-name").value;
    let contactEmail = document.getElementById("update-contact-email").value;
    let contactID = document.getElementById("update-contact-studentid").value;
    let contactClass = document.getElementById("update-contact-class").value;
    let contactCourse = document.getElementById("update-contact-course").value;
    let contactMentor = document.getElementById("update-contact-mentor").value;
    let contactId = document.getElementById("update-contact-id").value;

    //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
    updateForm(contactId, contactName, contactEmail, contactID, contactClass, contactCourse, contactMentor);;
  });//end updatecontactform listener

  //[STEP 13]: Function that makes an AJAX call and processes it 
  // UPDATE Based on the ID chosen
  function updateForm(id, contactName, contactEmail, contactID, contactClass, contactCourse, contactMentor) {
    //@TODO create validation methods for id etc. 

    var jsondata = { "Name": contactName, "Student_Email": contactEmail, "Student_ID": contactID, "Student_Class": contactClass, "Student_Course": contactCourse, "Student_Mentor": contactMentor };
    var settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata)
    }

    //[STEP 13a]: Send our AJAX request and hide the update contact form
    fetch(`https://haziqdatabase-1ac8.restdb.io/rest/contact/${id}`, settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("update-contact-container").style.display = "none";
        // Update our contacts table
        getContacts();
      });
  }//end updateform function
//Delete function

  function deleteContact(id) {
    const settings = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    };

    fetch(`https://haziqdatabase-1ac8.restdb.io/rest/contact/${id}`, settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        getContacts(); // Refresh the contact list after deletion
      })
      .catch(error => console.error("Error deleting contact:", error));
  }
});
