document.addEventListener("DOMContentLoaded", function () {
  const servicesList = [
    "Penetration Testing",
    "Vulnerability Assessment",
    "Reverse Engineering",
    "Cybercrime Investigation",
    "OSINT",
    "Training and Workshops"
  ];

  const serviceText = document.getElementById("serviceText");
  const cursor = document.getElementById("cursor");

  function typeAndErase(index) {
    const service = servicesList[index % servicesList.length];
    animateText(service, () => {
      setTimeout(() => {
        eraseText(() => {
          setTimeout(() => {
            typeAndErase(index + 1);
          }, 500); // Delay before starting the next animation cycle
        });
      }, 1000); // Delay before starting to erase
    });
  }

  function animateText(text, callback) {
    const characters = text.split("");
    let index = 0;

    cursor.style.display = "inline-block"; // Ensure cursor is visible during typing
    serviceText.textContent = ""; // Clear the text content before typing

    const typingInterval = setInterval(() => {
      if (index < characters.length) {
        serviceText.textContent += characters[index];
        index++;
      } else {
        clearInterval(typingInterval);
        cursor.style.display = "inline-block"; // Keep cursor visible after typing
        setTimeout(callback, 1000); // Delay before erasing
      }
    }, 100); // Typing speed
  }

  function eraseText(callback) {
    const text = serviceText.textContent;
    let index = text.length;

    cursor.style.display = "inline-block"; // Ensure cursor is visible during erasing

    const eraseInterval = setInterval(() => {
      if (index > 0) {
        serviceText.textContent = text.slice(0, index - 1);
        index--;
      } else {
        clearInterval(eraseInterval);
        cursor.style.display = "inline-block"; // Keep cursor visible after erasing
        setTimeout(callback, 500); // Delay before starting the next animation
      }
    }, 30); // Erasing speed
  }

  typeAndErase(0); // Start the animation
});