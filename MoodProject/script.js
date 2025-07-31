const moods = {
  happy: {
    emoji: "😊",
    quote: "Smile big! Today is a great day!",
    video: "https://www.youtube.com/embed/m1AwyeevH2k",
    thumb: "https://img.youtube.com/vi/m1AwyeevH2k/hqdefault.jpg"
  },
  sad: {
    emoji: "💙",
    quote: "It's okay to feel. Let it pass...",
    video: "https://www.youtube.com/embed/jkzgo3Y8d4U",
    thumb: "https://img.youtube.com/vi/jkzgo3Y8d4U/hqdefault.jpg"
  },
  angry: {
    emoji: "😤",
    quote: "Let go of the fire. Find your center.",
    video: "https://www.youtube.com/embed/7_IPwh4eTPQ",
    thumb: "https://img.youtube.com/vi/7_IPwh4eTPQ/hqdefault.jpg"
  },
  love: {
    emoji: "❤️",
    quote: "Love makes the world more beautiful.",
    video: "https://www.youtube.com/embed/X3odW4nqfY4",
    thumb: "https://img.youtube.com/vi/X3odW4nqfY4/hqdefault.jpg"
  },
  calm: {
    emoji: "😌",
    quote: "Peace begins with a deep breath.",
    video: "https://www.youtube.com/embed/2OEL4P1Rz04",
    thumb: "https://img.youtube.com/vi/2OEL4P1Rz04/hqdefault.jpg"
  }
};

let isMuted = true;

function setMood(mood) {
  if (!moods[mood]) return;
  const { quote, video } = moods[mood];
  document.getElementById("quote").textContent = quote;
  const autoplay = isMuted ? "1&mute=1" : "1&mute=0";
  document.getElementById("player").innerHTML = `
    <iframe id="music-frame"
      src="${video}?autoplay=${autoplay}&controls=1&rel=0"
      allow="autoplay; encrypted-media"
      allowfullscreen></iframe>
  `;
}

document.getElementById("mood-input").addEventListener("input", (e) => {
  const mood = e.target.value.toLowerCase();
  if (moods[mood]) {
    setMood(mood);
  }
});

document.getElementById("volume-toggle").addEventListener("click", () => {
  isMuted = !isMuted;
  document.getElementById("volume-toggle").textContent = isMuted ? "🔇" : "🔊";
  const iframe = document.getElementById("music-frame");
  if (iframe) {
    const src = new URL(iframe.src);
    src.searchParams.set("mute", isMuted ? "1" : "0");
    iframe.src = src.toString();
  }
});

// Create mood cards
const cardsContainer = document.querySelector(".mood-cards");
Object.keys(moods).forEach((moodKey) => {
  const mood = moods[moodKey];
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${mood.emoji} ${moodKey.toUpperCase()}</h3>
    <img src="${mood.thumb}" alt="${moodKey} preview"/>
    <p>${mood.quote}</p>
  `;
  card.addEventListener("click", () => {
    document.getElementById("mood-input").value = moodKey;
    setMood(moodKey);
  });
  cardsContainer.appendChild(card);
});
