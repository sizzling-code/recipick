const inputField = document.getElementById("ingredientField");
const tagsContainer = document.getElementById("ingredientTags");

inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const value = inputField.value.trim();
    if (value !== "") {
      addTag(value);
      inputField.value = "";
    }
  }
});

function addTag(text) {
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = text;

  const btn = document.createElement("button");
  btn.textContent = "×";
  btn.addEventListener("click", () => tag.remove());

  tag.appendChild(btn);
  tagsContainer.appendChild(tag);
}
