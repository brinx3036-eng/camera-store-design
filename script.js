const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNavigation.classList.toggle("is-open", !isExpanded);
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNavigation.classList.remove("is-open");
  }
});

const mainImage = document.querySelector(".main-product-image");
const imageFrame = document.querySelector(".product-image-frame");
const imageIndex = document.querySelector(".image-index");
const thumbnails = document.querySelectorAll(".thumbnail");

function showImageFallback(image) {
  image.classList.add("image-error");
}

mainImage.addEventListener("error", () => showImageFallback(mainImage));
mainImage.addEventListener("load", () => mainImage.classList.remove("image-error"));

thumbnails.forEach((thumbnail, index) => {
  const thumbnailImage = thumbnail.querySelector("img");
  thumbnailImage.addEventListener("error", () => {
    thumbnailImage.style.visibility = "hidden";
  });

  thumbnail.addEventListener("click", () => {
    const imageUrl = thumbnail.dataset.image;
    mainImage.classList.add("image-error");
    mainImage.alt = thumbnail.dataset.alt;
    mainImage.src = imageUrl;
    imageFrame.classList.remove("is-fallback");
    imageIndex.innerHTML = `${String(index + 1).padStart(2, "0")} <span>/</span> 05`;

    thumbnails.forEach((item) => {
      const isActive = item === thumbnail;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  });
});

const quantityOutput = document.querySelector(".quantity-value");
let quantity = 1;

document.querySelector(".quantity-decrease").addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  quantityOutput.value = quantity;
  quantityOutput.textContent = quantity;
});

document.querySelector(".quantity-increase").addEventListener("click", () => {
  quantity += 1;
  quantityOutput.value = quantity;
  quantityOutput.textContent = quantity;
});

const bagCount = document.querySelector(".bag-count");
const bagLink = document.querySelector(".bag-tool");
const bagConfirmation = document.querySelector(".bag-confirmation");

document.querySelector(".add-to-bag").addEventListener("click", () => {
  const currentCount = Number(bagCount.textContent);
  bagCount.textContent = currentCount + quantity;
  bagLink.setAttribute("aria-label", `Shopping bag, ${currentCount + quantity} items`);
  bagConfirmation.textContent = `${quantity} ${quantity === 1 ? "camera" : "cameras"} added to your bag.`;
});

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterMessage = document.querySelector(".newsletter-message");

newsletterEmail.addEventListener("input", () => {
  newsletterEmail.removeAttribute("aria-invalid");
  newsletterMessage.textContent = "";
  newsletterMessage.classList.remove("is-error");
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterMessage.classList.remove("is-error");
  const email = newsletterEmail.value.trim();

  if (!email || !newsletterEmail.validity.valid) {
    newsletterEmail.setAttribute("aria-invalid", "true");
    newsletterMessage.textContent = email
      ? "That email address doesn't look right. Check it and try again."
      : "Enter your email address to continue.";
    newsletterMessage.classList.add("is-error");
    newsletterEmail.focus();
    return;
  }

  newsletterEmail.removeAttribute("aria-invalid");
  newsletterMessage.textContent = "Thanks — your email looks good. This demo hasn't sent or saved it.";
  newsletterForm.reset();
});
