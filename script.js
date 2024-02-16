let input=document.getElementById("input-box");
let button=document.getElementById("submit-button");
let showcontainer=document.getElementById("show-container");
let listcontainer=document.querySelector(".list");

let date=new Date();
console.log(date.getTime());

let ts =1707813314612;
let publicKey = "5996a1ae715fcea88b8f2ac7636aeb3d";
let hashVal = "44358ca42373fb18e7d8f2add5396758";
const [timestamp,apiKey,hashValue]=[ts,publicKey,hashVal];



function displayWords(value) {
    input.value = value;
    removeElements();
  }
  function removeElements() {
    listcontainer.innerHTML = "";
  }
  
input.addEventListener("keyup",()=>{
    //removeElements();
    if(input.value.length<4){
        return false;
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
   // console.log(url);
   fetch(url).then((res)=>res.json()).then((data)=>{
    data.data["results"].forEach((result)=>{
        let name=result.name;
        let div1=document.createElement("div");
        div1.style.cursor='pointer';
        div1.classList.add("autocomplete-items");
        div1.setAttribute("onclick","displayWords('"+name+"')");
        let word="<b>"+name.substr(0,input.value.length);
        div1.innerHTML=`<p class="item">${word}</p>`;
        listcontainer.appendChild(div1);
        console.log(listcontainer);
    })
   });
});
   button.addEventListener(
    "click",
    (getRsult = async () => {
      if (input.value.trim().length < 1) {
        alert("Input cannot be blank");
      }
      showcontainer.innerHTML = "";
      const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      jsonData.data["results"].forEach((element) => {
        showcontainer.innerHTML = `<div class="card-container">
          <div class="container-character-image">
          <img src="${
            element.thumbnail["path"] + "." + element.thumbnail["extension"]
          }"/></div>
          <div class="character-name">${element.name}</div>
          <div class="character-description">${element.description}</div>
          </div>`;
      });
    })
  );
    


