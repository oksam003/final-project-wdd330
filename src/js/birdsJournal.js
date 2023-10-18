import { loadHeaderFooter } from "./utils.mjs"

loadHeaderFooter();

var form = document.createElement('form');
form.id = 'observationForm';

var dateLabel = document.createElement('label');
dateLabel.setAttribute('for', 'date');
dateLabel.textContent = 'Date:';
form.appendChild(dateLabel);

var dateInput = document.createElement('input');
dateInput.type = 'date';
dateInput.id = 'date';
dateInput.name = 'date';
dateInput.required = true;

var today = new Date();
var formattedDate = today.toISOString().substr(0, 10);
dateInput.defaultValue = formattedDate;

form.appendChild(dateInput);

form.appendChild(document.createElement('br'));

var birdNameLabel = document.createElement('label');
birdNameLabel.setAttribute('for', 'birdName');
birdNameLabel.textContent = 'Bird Name:';
form.appendChild(birdNameLabel);

var birdNameInput = document.createElement('input');
birdNameInput.type = 'text';
birdNameInput.id = 'birdName';
birdNameInput.name = 'birdName';
birdNameInput.required = true;
form.appendChild(birdNameInput);

form.appendChild(document.createElement('br'));

var locationLabel = document.createElement('label');
locationLabel.setAttribute('for', 'location');
locationLabel.textContent = 'Location:';
form.appendChild(locationLabel);

var locationInput = document.createElement('input');
locationInput.type = 'text';
locationInput.id = 'location';
locationInput.name = 'location';
locationInput.required = true;
form.appendChild(locationInput);

form.appendChild(document.createElement('br'));

var notesLabel = document.createElement('label');
notesLabel.setAttribute('for', 'notes');
notesLabel.textContent = 'Notes:';
form.appendChild(notesLabel);

form.appendChild(document.createElement('br'));

var notesTextarea = document.createElement('textarea');
notesTextarea.id = 'notes';
notesTextarea.name = 'notes';
notesTextarea.classList.add('notes-box');
form.appendChild(notesTextarea);

form.appendChild(document.createElement('br'));

var submitButton = document.createElement('input');
submitButton.type = 'submit';
submitButton.value = 'Add Entry';
submitButton.classList.add('submitBtn');
form.appendChild(submitButton);

var birdEntryDiv = document.getElementById('bird-entry');
birdEntryDiv.appendChild(form);

displaySubmittedData(JSON.parse(localStorage.getItem('birdjournal')));

function displaySubmittedData(observations) {
  
  if(observations != null){
    var entryDisplayDiv = document.getElementById('entry-display');
    while (entryDisplayDiv.firstChild) {
      entryDisplayDiv.removeChild(entryDisplayDiv.firstChild);
    }
    observations.forEach(function(obs) {
      var entrySection = document.createElement('section');
      entrySection.classList.add('entry-submission');
    
      var dateElement = document.createElement('p');
      dateElement.textContent = 'Date: ' + obs.date;
      entrySection.appendChild(dateElement);
    
      var birdNameElement = document.createElement('h3');
      birdNameElement.textContent = 'Bird Name: ' + obs.birdName;
      entrySection.appendChild(birdNameElement);
    
      var locationElement = document.createElement('h4');
      locationElement.textContent = 'Location: ' + obs.location;
      entrySection.appendChild(locationElement);
    
      var notesElement = document.createElement('p');
      notesElement.textContent = 'Notes: ' + obs.notes;
      entrySection.appendChild(notesElement);

      var hr = document.createElement('hr');
      entrySection.appendChild(hr);
    
      entryDisplayDiv.appendChild(entrySection);
    });
  }
}

// Add an event listener to the form submission
document.getElementById('observationForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  var date = document.getElementById('date').value;
  var birdName = document.getElementById('birdName').value;
  var location = document.getElementById('location').value;
  var notes = document.getElementById('notes').value;

  var storedObservation = JSON.parse(localStorage.getItem('birdjournal'));

  // Create an object to store the observation data
  var observation = {
    date: date,
    birdName: birdName,
    location: location,
    notes: notes
  };

  if(storedObservation == null){
    storedObservation = [];
  }
    
  storedObservation.push(observation);

  // Generate a unique key for each entry
  var entryKey = 'birdjournal';

  // Save the observation data to local storage
  localStorage.setItem(entryKey, JSON.stringify(storedObservation));

  // Clear the form fields
  document.getElementById('observationForm').reset();

  document.getElementById('date').value = date;
  
  displaySubmittedData(storedObservation);
});
