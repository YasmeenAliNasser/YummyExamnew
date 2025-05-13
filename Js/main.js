const innerw = $(".sidebar .inner").innerWidth();

$(".sidebar").css("left", `-${innerw}px`);

$(".sidebar .menu").click(function () {
  const sidebar = $(".sidebar");
  const icon = $("#toggle-icon");

  const currentLeft = sidebar.css("left");

  if (currentLeft === `-${innerw}px`) {
    sidebar.animate({ left: "0px" }, 500);
    icon.removeClass("fa-bars").addClass("fa-x close");
  } else {
    sidebar.animate({ left: `-${innerw}px` }, 500);
    icon.removeClass("fa-x close").addClass("fa-bars");
  }
});

$(".sidebar .links a").click(function () {
  const innerw = $(".sidebar .inner").innerWidth();
  $(".sidebar").animate({ left: `-${innerw}px` }, 500);
  $("#toggle-icon").removeClass("fa-x close").addClass("fa-bars");
});

let rowData = document.getElementById("rowData");
let Homepage = document.getElementById("Homepage");
let Recpage = document.getElementById("Recpage");
let rowRec = document.getElementById("rowRec");
let loader = document.getElementById("loader");
let Search = document.getElementById("Search");
let Categories = document.getElementById("Categories");
let Area = document.getElementById("Area");
let Ingredients = document.getElementById("Ingredients");
let Contact = document.getElementById("Contact");
let Seachpage = document.getElementById("Seachpage");

let searchInput = document.getElementById("searchInput");
let searchInputbyletter = document.getElementById("searchInputbyletter");
let rowSearch=document.getElementById('rowSearch')
let rowCategory=document.getElementById('rowCategory')
let Categorypage=document.getElementById('Categorypage')
let OneCategory=document.getElementById('OneCategory')
let rowCategoryone=document.getElementById('rowCategoryone')
let AllAreaspage=document.getElementById('AllAreaspage')
let rowArea=document.getElementById('rowArea')
let OneAreaPage=document.getElementById('OneAreaPage')
let rowAreaone=document.getElementById('rowAreaone')
let AllIngredients=document.getElementById('AllIngredients')
let rowIngredient=document.getElementById('rowIngredient')
let OneIngredientPage=document.getElementById('OneIngredientPage')
let rowIngredientone=document.getElementById('rowIngredientone')
let ContactPage=document.getElementById('ContactPage')
let rowContact=document.getElementById('rowContact')

let name=document.getElementById('name')
let email=document.getElementById('email')
let phone=document.getElementById('phone')
let age=document.getElementById('age')
let password=document.getElementById('password')
let repassword=document.getElementById('repassword')
 const submitBtn = document.getElementById("submitBtn");


 
 //Home Page
async function getMeals() {
  loader.classList.remove("d-none");
  let x = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");

  if (x.ok) {
    let data = await x.json();
    console.log(data);
    displayHomePage(data.meals);
    loader.classList.add("d-none");
  }
}

function displayHomePage(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col gap-4 g-4" data-id="${array[i].idMeal}">
        <div class="imglayer">
          <img src="${array[i].strMealThumb}" class="img-fluid" alt="">
          <div class="layer">${array[i].strMeal}</div>
        </div>
      </div>
    `;
  }
  rowData.innerHTML = cartona;
}
//sidebar
$(".menu").click(function () {
  $(" li").addClass("animate__animated animate__bounceInUp");
});

$(".close").click(function () {
  $(".links li").addClass("animate__animated animate__bounceOutDown");
});
//getdetails
async function getShowRec(id) {
  loader.classList.remove("d-none");
  let x = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (x.ok) {
    let data = await x.json();
    console.log(data);
    displayRec(data.meals); 
    loader.classList.add("d-none");
  }
}

function displayRec(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    let ingredientsHTML = "";
    for (let j = 1; j <= 20; j++) {
      let ingredient = array[i][`strIngredient${j}`];
      let measure = array[i][`strMeasure${j}`];

      if (ingredient && ingredient.trim() !== "") {
        let badgeRec = `${measure ? measure : ""} ${ingredient}`.trim();
        ingredientsHTML += `<span class="badge  badgeee  px-2 py-2 m-1">${badgeRec}</span>`;
      }
    }
    let tagsHTML = "";
if (array[i].strTags) {
  let tagsArray = array[i].strTags.split(",");
  for (let tag of tagsArray) {
    tagsHTML += `<span class="badge   text-dark px-2 py-2 m-1 tagbade">${tag.trim()}</span>`;
  }
}

    cartona += `
      <div class="col-12 col-md-4">
        <img src="${array[i].strMealThumb}" alt="" class="w-100">
        <h2>${array[i].strMeal}</h2>
      </div>
      <div class="col-12 col-md-8 gap-2">
        <h2>Instructions</h2>
        <p>${array[i].strInstructions}</p>
        <h4 class="py-1">Area: ${array[i].strArea}</h4>
        <h4 class="py-1">Category: ${array[i].strCategory}</h4>
        <h4 class="py-1">Recipes:</h4>
        <div class="bages py-2">
          ${ingredientsHTML}
        </div>
        <h4>
          Tags:
          <div class="bages py-2">
         ${tagsHTML}
        </div>
          <div class="btnns py-2">
            <button class="btn btn-success" onclick="window.open('${array[i].strSource}', '_blank')">Source</button>
            <button class="btn btn-danger" onclick="window.open('${array[i].strYoutube}', '_blank')">Youtube</button>
          </div>
        </h4>
      </div>
    `;
  }
  rowRec.innerHTML = cartona;
}

 
async function searchByName(name) {
  loader.classList.remove("d-none");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );

  if (response.ok) {
    let data = await response.json();

    console.log(data);
    displaysearch(data.meals);
  }

  loader.classList.add("d-none");
}

function displaysearch(array) {
  let cartona = "";
  for (let i = 0; i < 20; i++) {
    cartona += `
      <div class="col gap-4 g-4" data-id="${array[i].idMeal}">
        <div class="imglayer">
          <img src="${array[i].strMealThumb}" class="img-fluid" alt="">
          <div class="layer">${array[i].strMeal}</div>
        </div>
      </div>
    `;
  }
  rowSearch.innerHTML = cartona;
}
  
function showSearch() {
  Search.addEventListener("click", () => {
    Homepage.classList.add("d-none");
    Recpage.classList.add("d-none");
    Categorypage.classList.add("d-none");
    OneCategory.classList.add("d-none");
    AllAreaspage.classList.add("d-none");
    OneAreaPage.classList.add("d-none");
    AllIngredients.classList.add("d-none");
    OneIngredientPage.classList.add("d-none");
    ContactPage.classList.add("d-none");

    Seachpage.classList.remove("d-none");
    searchInput.addEventListener("input", function () {
      let searchValue = searchInput.value.trim();

      searchByName(searchValue);
    });
  });
}

async function searchByLetter(letter) {
  loader.classList.remove("d-none");

  let response = await fetch(
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );

  if (response.ok) {
    let data = await response.json();

    console.log(data);
    displaysearch(data.meals);
  }

  loader.classList.add("d-none");
}
  
function showSearchbyLetter() {
  Search.addEventListener("click", () => {
     Homepage.classList.add("d-none");
    Recpage.classList.add("d-none");
    Categorypage.classList.add("d-none");
    OneCategory.classList.add("d-none");
    AllAreaspage.classList.add("d-none");
    OneAreaPage.classList.add("d-none");
    AllIngredients.classList.add("d-none");
    OneIngredientPage.classList.add("d-none");
     ContactPage.classList.add("d-none");

    Seachpage.classList.remove("d-none");
    searchInputbyletter.addEventListener("input", function () {
      let searchValue = searchInputbyletter.value.trim();

      searchByLetter(searchValue);
    });
  });
}

//category
async function getAllCategories() {
 
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let data = await response.json();
  displayCategories(data.categories);
  loader.classList.add("d-none");
}

function displayCategories(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col-md-3 col-sm-6 g-4" data-id="${array[i].strCategory}">
        <div class="imglayer text-center">
          <img src="${array[i].strCategoryThumb}" class="img-fluid" alt="">
          <div class="layer fw-bold fs-5 d-flex flex-column text-center">
          <h1>${array[i].strCategory}</h1>
          <span>      ${array[i].strCategoryDescription ? array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ") : ""}</span>
          </div>
        </div>
      </div>
    `;
  }
  rowCategory.innerHTML = cartona;
}


function showCategory() {
  Categories.addEventListener("click", () => {
     Homepage.classList.add("d-none");
    Recpage.classList.add("d-none");
    Seachpage.classList.add('d-none')
    AllAreaspage.classList.add("d-none");
    OneAreaPage.classList.add("d-none");
    AllIngredients.classList.add("d-none");
    OneIngredientPage.classList.add("d-none");
     ContactPage.classList.add("d-none");

    Categorypage.classList.remove("d-none");
     getAllCategories()
    // console.log('hiii');

     
  });
}
///////onecategory

async function getOneCategory(name) {
  loader.classList.remove("d-none");
  let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
  if (x.ok) {
    let data = await x.json();
    displayOneCategory(data.meals); 
    loader.classList.add("d-none");
  }
}

function displayOneCategory(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col-md-3 col-sm-6 g-4" data-id="${array[i].idMeal}">
        <div class="imglayer text-center">
          <img src="${array[i].strMealThumb}" class="img-fluid" alt="">
          <div class="layer fw-bold fs-5">
            <h1>  ${array[i].strMeal}</h1>
           
          </div>
        </div>
      </div>
    `;
  }
  rowCategoryone.innerHTML = cartona;
}


function showCategoryOne() {
  rowCategory.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (card) {
      const categoryName = card.dataset.id;
      Categorypage.classList.add("d-none");
      OneCategory.classList.remove("d-none");
       ContactPage.classList.add("d-none");
      getOneCategory(categoryName);
    }
  });
}

 
function addCardClickListener(container) {
  container.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (card) {
      const id = card.dataset.id;

      
      Recpage.classList.remove("d-none");
      Homepage.classList.add("d-none");
      Seachpage.classList.add("d-none");
      Categorypage.classList.add("d-none");
      OneCategory.classList.add("d-none");
      AllAreaspage.classList.add("d-none");
      OneAreaPage.classList.add("d-none");
      OneIngredientPage.classList.add("d-none");

      getShowRec(id);
    }
  });
}

//area
async function getAllAreas() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let data = await response.json();
  displayAllAreas(data.meals);
  loader.classList.add("d-none");
}

function displayAllAreas(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col text-white text-center" p-5 data-id="${array[i].strArea}">
             <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3> ${array[i].strArea}</h3>
            </div>
    `;
  }
  rowArea.innerHTML = cartona;
}


function showAllAreas() {
  Area.addEventListener("click", () => {
     Homepage.classList.add("d-none");
    Recpage.classList.add("d-none");
    Seachpage.classList.add('d-none')
    Categorypage.classList.add("d-none");
    OneCategory.classList.add("d-none");
    AllIngredients.classList.add("d-none");
    OneIngredientPage.classList.add("d-none");
     ContactPage.classList.add("d-none");
    // AllAreaspage.classList.add("d-none");

    AllAreaspage.classList.remove("d-none");
     getAllAreas()
    // console.log('hiii');

     
  });
}
//one page
async function getOneArea(area) {
  loader.classList.remove("d-none");
  let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  if (x.ok) {
    let data = await x.json();
    displayOneArea(data.meals); 
    console.log(data.meals);
    loader.classList.add("d-none");
  }
}

function displayOneArea(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col-md-3 col-sm-6 g-4" data-id="${array[i].idMeal}">
        <div class="imglayer text-center">
          <img src="${array[i].strMealThumb}" class="img-fluid" alt="">
          <div class="layer fw-bold fs-5">
            <h1>  ${array[i].strMeal}</h1>
           
          </div>
        </div>
      </div>
    `;
  }
  rowAreaone.innerHTML = cartona;
}

function showOneArea() {
  rowArea.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (card) {
      const areaName = card.dataset.id;
      AllAreaspage.classList.add("d-none");
      OneAreaPage.classList.remove("d-none");
       ContactPage.classList.add("d-none");
      getOneArea(areaName);
    }
  });
}

//Ingredient all
async function getAllIngredients() {
   loader.classList.remove("d-none");
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let data = await response.json();
  displayAllIngredients(data.meals);
  loader.classList.add("d-none");
}

function displayAllIngredients(array) {
  let cartona = "";
  for (let i = 0; i <20; i++) {
    cartona += `
     <div class="col text-white text-center g-5"  data-id="${array[i].strIngredient}">
             <i class="fa-solid fa-drumstick-bite fa-4x"></i>
             <h3> ${array[i].strIngredient} </h3>
            <span> ${array[i].strDescription ? array[i].strDescription.split(" ").slice(0, 20).join(" ") : ""} </span>

               
            </div>
    `;
  }
  rowIngredient.innerHTML = cartona;
}


function showAllIngredients() {
  Ingredients.addEventListener("click", () => {
    Homepage.classList.add("d-none");
    Recpage.classList.add("d-none");
    Seachpage.classList.add('d-none')
    Categorypage.classList.add("d-none");
    OneCategory.classList.add("d-none");
    AllAreaspage.classList.add("d-none");
    OneAreaPage.classList.add("d-none"); 
     ContactPage.classList.add("d-none");            
    
    
    AllIngredients.classList.remove("d-none");
     getAllIngredients()
    // console.log('hiii');

     
  });
}

//one ingred
async function getOneIngredient(ing) {
  loader.classList.remove("d-none");
  let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
  if (x.ok) {
    let data = await x.json();
     console.log(data.meals);
    displayOnengredient(data.meals); 
   
    loader.classList.add("d-none");
  }
}

function displayOnengredient(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col-md-3 col-sm-6 g-4" data-id="${array[i].idMeal}">
        <div class="imglayer text-center">
          <img src="${array[i].strMealThumb}" class="img-fluid" alt="">
          <div class="layer fw-bold fs-5">
            <h1>  ${array[i].strMeal}</h1>
           
          </div>
        </div>
      </div>
    `;
  }
  rowIngredientone.innerHTML = cartona;
}

function showOnengredient() {
  rowIngredient.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (card) {
      const ingName = card.dataset.id.trim();
      AllIngredients.classList.add("d-none");
      OneIngredientPage.classList.remove("d-none");
       ContactPage.classList.add("d-none");
      getOneIngredient(ingName);
    }
  });
}

//contact

 

function showContact() {
 Contact.addEventListener('click', function( ) {
     Homepage.classList.add("d-none");
    Recpage.classList.add("d-none");
    Seachpage.classList.add('d-none')
    Categorypage.classList.add("d-none");
    OneCategory.classList.add("d-none");
    AllAreaspage.classList.add("d-none");
    OneAreaPage.classList.add("d-none");
     AllIngredients.classList.add("d-none");
    OneIngredientPage.classList.add("d-none");
    



     ContactPage.classList.remove('d-none')  
     
});
}

function validationInput( element,inputErorr) {
    var text=element.value
     var regex={
        name:/^[a-z0-9_-]{3,15}$/,
        email:/^\w+@\w+\.\w+$/,
        // phone:/^ 01[0125][0-9]{8}$/,
         phone:/^[0-9]{11}$/,
        age:/^[0-9]{1,5}$/,
        password:/^[0-9]{8,10}$/,
        
    }
     if (regex[element.id].test(text)) {
        console.log('vaild');
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        submitBtn.removeAttribute("disabled");
        document.getElementById(inputErorr).classList.add('d-none')
        return true;
       

     } else {
        console.log('notvalid');
        element.classList.add('is-invalid')
       document.getElementById(inputErorr).classList.remove('d-none')
        return false;
          
     }
     

 }

 function validateRepassword() {
  var password = document.getElementById("password").value;
  var repassword = document.getElementById("repassword").value;

  if (repassword === password && repassword !== "") {
    document.getElementById("repassword").classList.add("is-valid");
    document.getElementById("repassword").classList.remove("is-invalid");
    document.getElementById("repassworderror").classList.add("d-none");
    submitBtn.removeAttribute("disabled");
    return true;
  } else {
    document.getElementById("repassword").classList.add("is-invalid");
    document.getElementById("repassword").classList.remove("is-valid");
    document.getElementById("repassworderror").classList.remove("d-none");
    return false;
  }
  
}

// function checkFormValidation() {
//   const nameValid = document.getElementById("name").classList.contains("is-valid");
//   const emailValid = document.getElementById("email").classList.contains("is-valid");
//   const phoneValid = document.getElementById("phone").classList.contains("is-valid");
//   const ageValid = document.getElementById("age").classList.contains("is-valid");
//   const passwordValid = document.getElementById("password").classList.contains("is-valid");
//   const repasswordValid = document.getElementById("repassword").classList.contains("is-valid");

//   const submitBtn = document.getElementById("submitBtn");

//   if (nameValid && emailValid && phoneValid && ageValid && passwordValid && repasswordValid) {
//     submitBtn.removeAttribute("disabled");
//     submitBtn.classList.remove("bg-dark", "text-danger", "border-danger");
//     submitBtn.classList.add("bg-success", "text-white", "border-success");
//   } else {
//     submitBtn.setAttribute("disabled", "true");
//     submitBtn.classList.remove("bg-success", "text-white", "border-success");
//     submitBtn.classList.add("bg-dark", "text-danger", "border-danger");
//   }
// }



 

addCardClickListener(rowData);         
addCardClickListener(rowSearch);      
addCardClickListener(rowCategoryone);  
addCardClickListener(rowAreaone);  
addCardClickListener(rowIngredientone);  


showContact();
showOnengredient();
showAllIngredients();
showOneArea();
showAllAreas();
showCategoryOne();
showCategory();
showSearch();
showSearchbyLetter();
getMeals();
 
 
