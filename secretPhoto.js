const imgInput = document.getElementById("imgInput");
const previewBox = document.getElementById("preview");
const clearBtn = document.getElementById("clearBtn");
const overlay = document.getElementById("overlay");
const fullImg = document.getElementById("fullImg");
const fullCaption = document.getElementById("fullCaption");

let storedImages = JSON.parse(localStorage.getItem("imagesWithCaptions")) || [];
storedImages.forEach((obj, index) => createImage(obj, index));

imgInput.addEventListener("change", function () {
  Array.from(this.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataURL = e.target.result;
      const caption = prompt("Enter caption for this image 📝") || "";
      const imageObj = { img: dataURL, caption };
      storedImages.push(imageObj);
      localStorage.setItem("imagesWithCaptions", JSON.stringify(storedImages));
      createImage(imageObj, storedImages.length - 1);
    };
    reader.readAsDataURL(file);
  });
});

function createImage(obj, index) {
  const wrapper = document.createElement("div");
  wrapper.className = "preview-wrapper";

  const img = document.createElement("img");
  img.src = obj.img;

  const caption = document.createElement("p");
  caption.textContent = obj.caption;

  img.addEventListener("click", () => {
    fullImg.src = obj.img;
    fullCaption.textContent = obj.caption;
    overlay.style.display = "flex";
  });

  img.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (confirm("Delete this image and caption?")) {
      storedImages.splice(index, 1);
      localStorage.setItem("imagesWithCaptions", JSON.stringify(storedImages));
      previewBox.innerHTML = "";
      storedImages.forEach((item, i) => createImage(item, i));
    }
  });

  wrapper.appendChild(img);
  wrapper.appendChild(caption);
  previewBox.appendChild(wrapper);
}

clearBtn.addEventListener("click", () => {
  if (confirm("Clear all saved images and captions?")) {
    storedImages = [];
    localStorage.removeItem("imagesWithCaptions");
    previewBox.innerHTML = "";
  }
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
});
