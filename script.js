// Smooth scrolling
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// Scroll reveal animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

// Contact form message
const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector("textarea").value;

  try {
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("Failed to send message");
    }
  } catch (error) {
    alert("Server error. Try again later.");
  }
});

function copyMessage() {
    const text = document.getElementById("messageBox");
    text.select();
    text.setSelectionRange(0, 99999); // for mobile
    navigator.clipboard.writeText(text.value);
    alert("Recruiter message copied!");
}
const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});
// HERO PARALLAX EFFECT
const hero = document.querySelector(".parallax");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});


