const searchInput = document.querySelector("#search-input");
const container = document.querySelector("#results-container");
const searchForm = document.querySelector("#search-form");
const btns = document.querySelectorAll(".pagination");
const mealList = document.querySelector(".meal-list"); 
let recipesData = [];


// searchInput.addEventListener("keyup", )

mealList.addEventListener("change", (e) => {
    const selected = e.target.value;
    console.log(selected);
    if(selected === "Select all"){
        renderRecipes(recipesData)
    } else {
        const filteredData = recipesData.filter(el => el.recipe.mealType.includes(selected));
        renderRecipes(filteredData)
    }
})

searchForm.addEventListener("submit", (e) => {
    
    e.preventDefault();
    fetchRecipes();
})

const renderRecipes = (arr, pageNum = 1) => {
    container.innerHTML = '';
    const endIndex = pageNum * 10;
    const startIndex = endIndex - 10;
    
    const pieceOfData = arr.slice(startIndex, endIndex);
    
    pieceOfData.forEach(el => {
        console.log(pieceOfData);
        console.log(el);
        const { label, image, url, calories, yield } = el.recipe;
        const div = document.createElement("div");
        div.className = "recipe-card";
        const h2 = document.createElement("h2");
        h2.innerText = label;
        const img = document.createElement("img");
        img.src = image ;
        const a = document.createElement("a");
        a.target = "_blank"
        a.href = url;
        a.innerText = "View Recipe";
        const cal = document.createElement("p");
        cal.innerText = `Calories: ${calories.toFixed(2)}`
        const ser = document.createElement("p");
        ser.innerText = `Servings: ${yield}`;
        div.append(h2, img, cal, ser, a);
        container.appendChild(div);
    })
}

const fetchRecipes = async () => {
    const res =  await fetch(`https://api.edamam.com/search?q=${searchInput.value}&app_id=e44a465a&app_key=78bc67fe1395b0246c033e4a9f234285&to=30&excluded=pork&excluded=alcohol`);
    const data = await res.json();
    recipesData = data.hits;
    if(recipesData.length){
        renderRecipes(recipesData);
    }
}

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        btns.forEach(button => button.classList.remove("active"));
        btn.classList.add("active");
        renderRecipes(btn.innerText);
    });
});



