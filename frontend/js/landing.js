const benefits = [
    "No food waste",
    "Instant recipe",
    "Always free"
]

const container = document.getElementById('benefits');

benefits.forEach(txt=>{
    const div = document.createElement("div");
    div.classList.add("benefit");
    const img = document.createElement("img");
    img.src = "assets/check-mark.png";
    img.alt = "checkmark";
    img.classList.add("check-icon");
    const p = document.createElement("p");
    p.textContent = txt;

    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
})