const accessKey = "n5Nv8SBya9IvY2mrFc5xjpT7_AI8HGjAlDSA7MkmomI";

const searchForm = document.querySelector("form");
const imageContainer = document.querySelector(".container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;

const fetchImages = async (input, page) => {
  if (page == 1) {
    imageContainer.innerHTML = "";
  }
  const url = `https://api.unsplash.com/search/photos?query=${input}&per_page=30&page=${page}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);

  if (data.results.length > 0) {
    data.results.forEach((img) => {
      const imageElement = document.createElement("div");
      imageElement.classList.add("imageDiv");
      imageElement.innerHTML = `<img src="${img.urls.regular}"/>`;

      const overlayElement = document.createElement("div");
      overlayElement.classList.add("overlay");

      const overlayText = document.createElement("h4");
      overlayText.innerHTML = `${img.alt_description}`;

      overlayElement.appendChild(overlayText);

      imageElement.appendChild(overlayElement);

      imageContainer.appendChild(imageElement);
    });

    if (data.total_pages === page) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  } else {
    loadMoreBtn.style.display = "none";
    imageContainer.innerHTML = `<h2>No image found!</h2>`;
  }
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imageContainer.innerHTML = `<h2>Please search for images!</h2>`;
  }
});

loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
