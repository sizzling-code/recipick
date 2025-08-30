const benefits = [
    "No food waste",
    "Instant recipe",
    "Always free"
]

const container = document.getElementById('benefits');

benefits.forEach(txt => {
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

const problems = [
    {
        icon: "❌",
        title: "Food Waste Crisis",
        description: "40% of food is wasted because people don't know what to cook with what they have."
    },
    {
        icon: "💸",
        title: "Money Down the Drain",
        description: "The average family throws away $1,500 worth of food every year."
    },
    {
        icon: "⏰",
        title: "Decision Fatigue",
        description: "Spending 30+ minutes daily just deciding what to cook for dinner."
    }
];

const problemBox = document.getElementById("problems-container");

problems.forEach(problem => {
    problemBox.innerHTML += `
      <div class="this-sol">
        <div class="problem-icon">${problem.icon}</div>
        <div class="def-sol">
          <h3>${problem.title}</h3>
          <p>${problem.description}</p>
        </div>
      </div>
    `;
});

const steps = [
    {
        num: 1,
        icon: "assets/search.png",
        title: "List Your Ingredients",
        description:
            "Quickly type in what you have: vegetables, proteins, spices, anything! Our smart tag system makes it super easy."
    },
    {
        num: 2,
        icon: "assets/green-sparkle.png",
        title: "AI Creates Magic",
        description:
            "Our advanced AI instantly analyzes your ingredients and suggests personalized recipes you can actually make right now."
    },
    {
        num: 3,
        icon: "assets/chef.png",
        title: "Cook & Enjoy",
        description:
            "Follow the step-by-step instructions, save your favorites, and enjoy delicious meals without any waste."
    }
];

const howContainer = document.getElementById("how-container");

steps.forEach(step => {
    howContainer.innerHTML += `
      <div class="how-cards">
        <div class="procedure_num">${step.num}</div>
        <div class="how_icon_box">
          <img class="how_icon" src="${step.icon}" alt="${step.title}" />
        </div>
        <div class="def-sol how_txt">
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </div>
      </div>
    `;
});


const choices = [
    {
        icon: "assets/clock.png",
        alt: "clock",
        boxClass: "clock-box",
        title: "Save Time",
        description: "No more scrolling through endless recipes. Get instant suggestions based on what you actually have."
    },
    {
        icon: "assets/check-mark.png",
        alt: "checkmark",
        boxClass: "checkmark-box",
        title: "Reduce Waste",
        description: "Use up ingredients before they spoil. Every suggestion helps you minimize food waste."
    },
    {
        icon: "assets/purple-sparkle.png",
        alt: "sparkle",
        boxClass: "purple-sparkle-box",
        title: "Smart AI",
        description: "Our AI learns your preferences and dietary restrictions for better recommendations."
    },
    {
        icon: "assets/open-book.png",
        alt: "book",
        boxClass: "book-box",
        title: "Recipe Library",
        description: "Save and organize your favorite recipes. Build your personal cookbook over time."
    },
    {
        icon: "assets/people.png",
        alt: "group",
        boxClass: "group-box",
        title: "Family Friendly",
        description: "Filter by dietary restrictions, allergies, and family preferences for everyone."
    },
    {
        icon: "assets/yellow-star.png",
        alt: "star",
        boxClass: "star-box",
        title: "Always Free",
        description: "Core features are completely free. No hidden costs, no premium tiers for basic functionality."
    }
];

const choiceContainer = document.getElementById("choice-container");

choices.forEach(choice => {
    choiceContainer.innerHTML += `
      <div class="choice_card">
        <div class="choice-icon-box ${choice.boxClass}">
          <img class="choice-icon" src="${choice.icon}" alt="${choice.alt}" />
        </div>
        <div class="def-sol choice-txt">
          <h3>${choice.title}</h3>
          <p>${choice.description}</p>
        </div>
      </div>
    `;
});

document.getElementById("year").textContent = new Date().getFullYear();
