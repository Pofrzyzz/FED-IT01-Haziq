// // Function to scroll to a specific section on the webpage
function scrollToSection(sectionId) {
  // Get the DOM element corresponding to the provided sectionId
  var section = document.getElementById(sectionId);

  // Check if the section element exists in the DOM
  if (section) {
      // Scroll into view with smooth behavior
      section.scrollIntoView({ behavior: 'smooth' });
  }
}

