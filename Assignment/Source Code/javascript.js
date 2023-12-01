function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  var clickableImage = document.getElementById('clickableImage');

  // Add a click event listener
  clickableImage.addEventListener('click', function() {

    var url = 'https://open.spotify.com/album/78bpIziExqiI9qztvNFlQu?si=NttHx3ikRmKH_5E_ToTxzg';

    // Open a new tab or window with the specified URL
    window.open(url, '_blank');
  });