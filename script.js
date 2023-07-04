const searchInput = document.querySelector("#search-input");
const container = document.querySelector("#results-container");
const searchForm = document.querySelector("#search-form");
const btns = document.querySelectorAll(".pagination");
let recipesData = [];


// searchInput.addEventListener("keyup", )


searchForm.addEventListener("submit", (e) => {
    
    e.preventDefault();
    fetchRecipes();
})

const renderRecipes = (pageNum = 1) => {
    container.innerHTML = '';
    const endIndex = pageNum * 10;
    const startIndex = endIndex - 10;
    
    const pieceOfData = recipesData.slice(startIndex, endIndex);
    
    pieceOfData.forEach(el => {
        console.log(el);
        const div = document.createElement("div");
        div.className = "recipe-card";
        const h2 = document.createElement("h2");
        h2.innerText = el.recipe.label;
        const img = document.createElement("img");
        img.src = el.recipe.image ;
        const a = document.createElement("a");
        a.target = "_blank"
        a.href = el.recipe.url;
        a.innerText = "View Recipe";
        const cal = document.createElement("p");
        cal.innerText = `Calories: ${el.recipe.calories.toFixed(2)}`
        const ser = document.createElement("p");
        ser.innerText = `Servings: ${el.recipe.yield}`;
        div.append(h2, img, cal, ser, a);
        container.appendChild(div);
    })
}

const fetchRecipes = async () => {
    const res =  await fetch(`https://api.edamam.com/search?q=${searchInput.value}&app_id=e44a465a&app_key=78bc67fe1395b0246c033e4a9f234285&to=30`);
    const data = await res.json();
    recipesData = data.hits;
    renderRecipes();
}

btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let currBtn = document.querySelector(".active");
        currBtn.classList.remove('active');
        currBtn = e.target;
        currBtn.classList.add('active');
        renderRecipes(btn.innerText);
    });
});

