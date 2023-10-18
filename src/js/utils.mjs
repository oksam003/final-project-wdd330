export async function loadHeaderFooter() {
    const headerTemplateFn = loadTemplate("/partials/header.html");
    const navTemplateFn = loadTemplate("/partials/nav.html");
    const footerTemplateFn = loadTemplate("/partials/footer.html");
    const headerEl = document.getElementById("main-header");
    const navE1 = document.getElementById("main-nav");
    const footerEl = document.getElementById("main-footer");
    await renderWithTemplate(headerTemplateFn, headerEl);
    await renderWithTemplate(navTemplateFn, navE1);
    await renderWithTemplate(footerTemplateFn, footerEl);
    const x = document.getElementById('hamburgerBtn');
    x.addEventListener('click', toggleMenu);
  }

export async function renderWithTemplate(
    templateFn,
    parentElement,
    data,
    callback,
    position = "afterbegin",
    clear = true
  ) {
    if (clear) {
      parentElement.innerHTML = "";
    }
    const htmlString = await templateFn(data);
    parentElement.insertAdjacentHTML(position, htmlString);
    if(callback) {
      callback(data);
    }
  }

  function loadTemplate(path) {
    return async function () {
        const res = await fetch(path);
        if (res.ok) {
        const html = await res.text();
        return html;
        }
    };
  } 

function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}



  export async function getBirds(stateAb, day, month, year, maxResults) {
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "j3ujg9aifboj");
  
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(`https://api.ebird.org/v2/data/obs/US-${stateAb}/historic/${year}/${month}/${day}?maxResults=${maxResults}`, requestOptions)
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log('Error fetching bird data:', error);
      return [];
    }
  }

  export async function lazyLoad(){
  const images = document.querySelectorAll("[data-srcset]");

  function preloadImage(image) {
      image.setAttribute("srcset", image.getAttribute("data-srcset"));
      image.onload = () => {
        image.removeAttribute("data-srcset");
      };
  }

const imgOptions = {
    threshold : 1,
    rootMargin : "0px 0px 2px 0px"
};
  
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, imgObserver) => {
        items.forEach(item => {
            if (item.isIntersecting) {
                preloadImage(item.target);
                imgObserver.unobserve(item.target);
            }
        });
    }, imgOptions);
    images.forEach(image => {
        imgObserver.observe(image);
    });
}
else {
    images.forEach(image => {
        preloadImage(image);
    });
  }
}