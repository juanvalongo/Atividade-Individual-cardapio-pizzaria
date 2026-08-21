const pizzas = document.querySelectorAll(".pizza");

pizzas.forEach(function(pizza) {
    pizza.addEventListener("click", function() {
        const descricao = pizza.querySelector(".descricao");

        if (descricao.style.display === "none") {
            descricao.style.display = "block";
        } else {
            descricao.style.display = "none";
        }
    });
}); 

const sobremesas = document.querySelectorAll(".sobremesa");

sobremesas.forEach(function(sobremesa) {
    sobremesa.addEventListener("click", function() {
        const descricao = sobremesa.querySelector(".descricao");

        if (descricao.style.display === "none") {
            descricao.style.display = "block";
        } else {
            descricao.style.display = "none";
        }
    });
}); 

const url = "https://www.themealdb.com/api/json/v1/1/random.php"; //Isso simplesmente guarda o endereço da API em uma variável.

const containerReceita = document.querySelector("#receita-api");
/* O que document.querySelector() está fazendo?

Esta linha:

document.querySelector("#receita-api");

está procurando no HTML:

<div id="receita-api">

O # significa que estamos procurando um ID.

Então:

const containerReceita = ...

guarda esse elemento em uma variável. */

fetch(url) //fetch() é uma função do JavaScript usada para fazer uma requisição HTTP. Estamos dizendo: "JavaScript, vá buscar os dados nesse endereço."
    .then(response => response.json()) //A API responde em JSON. Esse comando transforma a resposta em um objeto JavaScript que podemos manipular.
    .then(data => {
        //console.log(data); //Agora data contém o resultado da API.
        const receita = data.meals[0]; //Estamos dizendo: "Dentro dos dados recebidos, encontre meals e pegue o primeiro elemento." Então: data.meals[0] significa: "Pegue a primeira receita que está dentro de meals."
        //console.log(receita.strMeal); //"Agora mostre somente essa receita."
        containerReceita.innerHTML = receita.strMeal; //Agora, em vez de aparecer apenas no Console, o nome da receita deverá aparecer no seu site.
    });

    
  