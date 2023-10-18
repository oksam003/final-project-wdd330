export async function getLocationInfo(zipcode) {
  const url = `https://api.zippopotam.us/us/${zipcode}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const { latitude, longitude, state } = data.places[0];
      const placeName = data.places[0]["place name"];
      const stateAb = data.places[0]["state abbreviation"];
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      console.log('placeName:', placeName);
      console.log('state:', state);
      console.log('stateAb:', stateAb);
      return new Location(latitude, longitude, placeName, state, stateAb);
    })
    .catch(error => {
      console.log('Error:', error);
      throw error; 
    });
}

export async function GetZipCodeFromLongLat(longitude, latitude){
  const apiKey = "a978f547780a4ca9809a381feb3184c1";
  
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`;
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        const zipCode = data.results[0].components.postcode;
        if (zipCode) {
          const zipInput = document.getElementById('zipInput');
          zipInput.value = zipCode;
        }
      } else {
        console.log("No results found.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}



export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const location = new Location(latitude, longitude);
          resolve(location);
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

export function zipEntry() {
  var zipEntryDiv = document.getElementById("zip-entry");

  var zipMessage = document.createElement("p");
  zipMessage.textContent = "Enter your zipcode and a date to find birds in your area now or ones that have been in your area on a previous date!";
  zipMessage.classList.add("zip-message");
  var form = document.createElement("form");
  form.id = "zipcodeForm";

  var zipLabel = document.createElement('label');
  zipLabel.textContent = "Zipcode:"
  zipLabel.setAttribute('for', 'zipInput')

  var zipInput = document.createElement("input");
  zipInput.type = "text";
  zipInput.pattern = "\\d{5}";
  zipInput.id = "zipInput";
  zipInput.placeholder = "12345";
  zipInput.required = true;

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
  dateInput.defaultValue = formattedDate

  form.appendChild(dateInput);

  var submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Find";
  submitButton.classList.add('submitBtn');

  var locationButton = document.createElement("button");
  locationButton.textContent = "Use my location";

  
  form.appendChild(zipLabel)
  form.appendChild(zipInput);
  form.appendChild(submitButton);

  form.insertBefore(document.createElement("br"), zipLabel);
  form.insertBefore(document.createElement("br"), submitButton);

  zipEntryDiv.appendChild(zipMessage);
  zipEntryDiv.appendChild(form);
  zipEntryDiv.appendChild(locationButton);
  locationButton.classList.add('locationBtn');

  locationButton.addEventListener("click", function(event) {
    event.preventDefault(); 
 
});
}

class Location {
    constructor(latitude, longitude, placeName, state, stateAb ) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.placeName = placeName;
      this.state = state;
      this.stateAb = stateAb;
    }
  
    getLatitude() {
      return this.latitude;
    }
  
    getLongitude() {
      return this.longitude;
    }

    getPlaceName(){
      return this.placeName;
    }

    getState(){
      return this.state;
    }

    getStateAb(){
      return this.stateAb;
    }
  
    toString() {
      return `Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
    }
  }

  export default Location;