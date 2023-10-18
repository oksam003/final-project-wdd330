import { loadHeaderFooter, lazyLoad} from "./utils.mjs";

loadHeaderFooter();
lazyLoad();

const sliderContainer = document.createElement('div');
sliderContainer.classList.add('slider');

const images = [
  '/images/bird-berries.jpg',
  '/images/bluebird-branch.jpg',
  '/images/owl-branch.jpg',
  '/images/sparrows-branch.jpg'
];

images.forEach(imageSrc => {
  const slide = document.createElement('div');
  slide.classList.add('slide');

  const img = document.createElement('img');
  img.src = imageSrc;
  const altText = imageSrc.split('/').pop().split('.')[0]; 
  img.alt = altText;

  slide.appendChild(img);
  sliderContainer.appendChild(slide);
});

const dotsContainer = document.createElement('div');
dotsContainer.classList.add('dots-container');

images.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) {
    dot.classList.add('active');
  }
  dot.setAttribute('data-slide', index.toString());
  dotsContainer.appendChild(dot);
});

const sliderParentElement = document.getElementById('image-slider');
sliderParentElement.appendChild(sliderContainer);
sliderParentElement.appendChild(dotsContainer);


function Slider() {
  const carouselSlides = document.querySelectorAll('.slide');
  const dotsSlide = document.querySelector('.dots-container');
  const slideCount = carouselSlides.length;
  let currentSlide = 0;
  let previousSlide = 0;
  carouselSlides[currentSlide].style.opacity = '1';
  carouselSlides[currentSlide].style.zIndex = '1';

  const activeSlide = function (slide) {
    document.querySelectorAll('.dot').forEach((dot) =>
      dot.classList.remove('active')
    );
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add('active');
  };

  const changeSlide = function () {
    carouselSlides[previousSlide].style.opacity = '0';
    carouselSlides[previousSlide].style.zIndex = '0';
    carouselSlides[currentSlide].style.opacity = '1';
    carouselSlides[currentSlide].style.zIndex = '1';
  };

  const fadeTransition = function () {
    setTimeout(() => {
      carouselSlides.forEach((slide) => {
        slide.classList.add('fade-transition');
      });
    }, 10);
  };

  const nextSlide = function () {
    previousSlide = currentSlide;
    currentSlide = (currentSlide + 1) % slideCount;
    changeSlide();
    activeSlide(currentSlide);
  };

  const fadeDuration = 500; 

  fadeTransition();

  const interval = setInterval(nextSlide, 4000);


  dotsSlide.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
      const slide = parseInt(e.target.dataset.slide);
      previousSlide = currentSlide;
      currentSlide = slide;
      changeSlide();
      activeSlide(currentSlide);
    }
  });
}

Slider();

function getRandomBirdFact() {
  const apiKey = 'l8rA1gA1atTAa5jqSv5xkw==10Ma4atoVKCepEBx';
  const apiUrl = 'https://api.api-ninjas.com/v1/animals';

  const params = {
    name: 'bird',
    limit: 10 
  };

  const url = new URL(apiUrl);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result); 

      const birdFactsDiv = document.getElementById('bird-facts');

      const facts = result;
      if (facts && facts.length > 0) {
        const randomIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[randomIndex];
        const birdName = randomFact.name || 'N/A';
        const birdColor = randomFact.characteristics.color || 'N/A';
        const birdPrey = randomFact.characteristics.main_prey || 'N/A';
        const birdWingspan = randomFact.characteristics.wingspan || 'N/A';
        const birdTopSpeed = randomFact.characteristics.top_speed || 'N/A';
        const birdLocations = randomFact.locations || [];
        const colors = birdColor.match(/[A-Z][a-z]+/g);
        const birdNameHeader = document.createElement('h2');
        birdNameHeader.innerHTML = `Learn More About The <br> <i>${birdName}!</i>`;
        const birdColorElement = document.createElement('p');
        birdColorElement.innerHTML = `<b>Color:</b> ${colors ? colors.join(', ') : 'N/A'}`;
        const birdPreyElement = document.createElement('p');
        birdPreyElement.innerHTML = `<b>Prey:</b> ${birdPrey}`;
        const birdWingspanElement = document.createElement('p');
        birdWingspanElement.innerHTML = `<b>Wingspan:</b> ${birdWingspan}`;
        const birdTopSpeedElement = document.createElement('p');
        birdTopSpeedElement.innerHTML = `<b>Top Speed:</b> ${birdTopSpeed}`;
        const birdLocationsElement = document.createElement('p');
        birdLocationsElement.innerHTML = `<b>Locations:</b> ${birdLocations.join(', ')}`;
        const nextBirdButton = document.createElement('button');
        nextBirdButton.textContent = 'Next Bird';
        nextBirdButton.classList.add('submitBtn');
        nextBirdButton.addEventListener('click', () => {
          birdFactsDiv.innerHTML = '';
          getRandomBirdFact();
        });
        birdFactsDiv.appendChild(birdNameHeader);
        birdFactsDiv.appendChild(birdColorElement);
        birdFactsDiv.appendChild(birdPreyElement);
        birdFactsDiv.appendChild(birdWingspanElement);
        birdFactsDiv.appendChild(birdTopSpeedElement);
        birdFactsDiv.appendChild(birdLocationsElement);
        birdFactsDiv.appendChild(nextBirdButton);
      } else {
        console.error('No bird facts found.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
getRandomBirdFact();













