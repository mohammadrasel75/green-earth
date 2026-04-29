console.log("Hello"); 

const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allTreesbtn = document.getElementById("allTressbtn");

function showLoading(){
  loadingSpinner.classList.remove("hidden");
  treesContainer.innerHTML = "";
}

function hideLoading(){
  loadingSpinner.classList.add("hidden");
}


async function loadCategories(){
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data=>{
    console.log(data);
})

.catch((e) => console.log(e));

// async await
const res = await fetch("https://openapi.programming-hero.com/api/categories",);

const data = await res.json();
console.log(res);
console.log(data);
console.log(categoriesContainer); 
data.categories.forEach(category=> {
    console.log(category);
    const btn = document.createElement("button");
    btn.className = "btn btn-outline w-full";
    btn.textContent = category.category_name;
    btn.onclick = ()=> selectCategory(category.id, btn);
    categoriesContainer.appendChild(btn);

});

}

async function selectCategory(categoryId, btn){
  console.log(categoryId, btn);
  showLoading();



  const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesbtn")

  // console.log(allButtons);
  allButtons.forEach(btn=> {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });
  btn.classList.add("btn-primary");
  btn.classList.remove("btn-outline");

  const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
  const data = await res.json();
  console.log(data); 
  displayTress(data.plants);
  hideLoading();
}

// const allTreesbtn.addEventListener("click", ()=> {
//   // Update Active Button Style
//    const allButtons = document.querySelectorAll(
//     "#categoriesContainer button, #allTreesbtn",);

//   // console.log(allButtons);
//   allButtons.forEach(btn=> {
//     btn.classList.remove("btn-primary");
//     btn.classList.add("btn-outline");
// });
//   allTreesbtn.classList.add("btn-primary");
//     allTreesbtn.classList.remove("btn-outline");
//      loadTress();

// })

async function loadTress() {
  showLoading();
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  loadingSpinner.classList.add("hidden");
 displayTress(data.plants);
  
}

function displayTress(tress){
  console.log(tress);
  tress.forEach(tree =>{
  console.log(tree);
  const card = document.createElement("div")
  card.className = "card bg-white shadow-sm";
  card.innerHTML = `<figure>
    <img
      src="${tree.image}"
      alt="${tree.name}"
      title="${tree.name}" 
      class="h-48 w-full object-cover"
      />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${tree.name}</h2>
    <p class="line-clamp-2">A card component has a figure, a body part, 
      and inside body there are title and actions parts</p>
      <div class="badge badge-success badge-outline">${tree.category}</div>
    <div class="flex justify-between items-center">
      <h2 class="font-bold text-xl text-[#4ade80]">$${tree.price}</h2>

      <button class="btn btn-primary bg-[#4ade80]">Card</button>
    </div>
  </div>
            </div>`
    treesContainer.appendChild(card);        

  });
}

async function openTreeModel(treeId) {
  console.log(treeId, "treeId");
  const res = await fetch(`
    https://openapi.programming-hero.com/api/plant/${treeId}`,)

  const data = await res.json();
  const plantDetails = data.plants;
  console.log(plantDetails, "data");
  treeDetailsModal.showModal();
}
loadCategories();
loadTress();