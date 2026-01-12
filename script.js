const track = document.querySelector(".poster-track");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

// Duplicate content once
track.innerHTML += track.innerHTML;

let position = 0;
let speed = 0.5; // auto scroll speed 
let posterWidth = track.children[0].offsetWidth + 20;
let totalWidth = posterWidth * (track.children.length / 2);

// AUTO SCROLL LOOP
function autoScroll() {
    position += speed;

    if (position >= totalWidth) {
        position = 0; // instant jump (invisible)
    }

    track.style.transform = `translateX(-${position}px)`;
    requestAnimationFrame(autoScroll);
}

// Manual buttons
nextBtn.addEventListener("click", () => {
    position += posterWidth;
});

prevBtn.addEventListener("click", () => {
    position -= posterWidth;
    if (position < 0) position = totalWidth;
});

// Pause on hover
track.addEventListener("mouseenter", () => speed = 0);
track.addEventListener("mouseleave", () => speed = 0.5);

// Start
requestAnimationFrame(autoScroll);

document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent page reload

    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!query) return;

    // Map movie titles to poster image paths
    const posters = {
        "avengers": "27.webp",
        "inception": "3.jpg",
        "300": "4.webp",
    };

    // Find partial match
    let found = null;
    for (let title in posters) {
        if (title.includes(query)) {
            found = posters[title];
            break;
        }
    }

    if (found) {
        // Open poster in new tab
        window.open(found, "_blank");
    } else {
        alert("Movie not found!");
    }

    // Clear input
    document.getElementById("searchInput").value = "";
});

const posterLinks = {
    "300": "4.webp",
};

// Add click event to all posters in carousels
document.querySelectorAll(".poster-track img").forEach(img => {
    img.addEventListener("click", () => {
        const title = img.dataset.title.toLowerCase();
        if (posterLinks[title]) {
            window.open(posterLinks[title], "_blank"); // open poster in new tab
        } else {
            alert("Poster not found!");
        }
    });
});

let startX = 0;

track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", e => {
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    position += diff * 0.8;
    startX = currentX;
});

document.addEventListener("visibilitychange", () => {
    speed = document.hidden ? 0 : 0.5;
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".mobile-nav a.active")?.classList.remove("active");
        link.classList.add("active");
    });
});

document.querySelectorAll(".row img").forEach(img => {
    img.addEventListener("click", () => {
        window.open(img.src, "_blank");
    });
});