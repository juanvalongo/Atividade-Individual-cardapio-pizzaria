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

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=pizza"; //Isso simplesmente guarda o endereço da API em uma variável.

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
        const indice = Math.floor(Math.random() * data.meals.length); // Math.random() gera um número decimal aleatório entre 0 (incluído) e 1 (não incluído). Esse número é multiplicado por data.meals.length, que representa a quantidade de receitas encontradas pela API. Math.floor() arredonda o resultado para baixo, transformando-o em um número inteiro válido para representar uma posição no array. Dessa forma, a variável indice recebe aleatoriamente um dos índices disponíveis em data.meals, permitindo selecionar uma receita diferente a cada carregamento da página.

        const receita = data.meals[indice]; // A variável receita recebe a receita localizada no array data.meals na posição indicada pela variável indice. Como indice foi gerado aleatoriamente na linha anterior, essa instrução seleciona uma das receitas retornadas pela API de forma aleatória. Por exemplo, se a API retornar três receitas, os índices possíveis serão 0, 1 e 2, e data.meals[indice] acessará a receita correspondente ao índice sorteado.

        console.log(receita.strMeal);
        console.log(receita.strMealThumb);
        containerReceita.innerHTML = `
        <div class="card-receita">

            <img 
                src="${receita.strMealThumb}" 
                alt="${receita.strMeal}"
                class="imagem-receita"
            >

            <div class="conteudo-receita">
                <h3>${receita.strMeal}</h3>
                <p>Categoria: ${receita.strCategory}</p>
                <p>Origem: ${receita.strArea}</p>
            </div>
           
        </div>
        `;
         /* A propriedade strMealThumb contém a URL da imagem da receita retornada pela API, 
         por isso ela é usada no atributo src da tag <img> para informar ao navegador qual imagem deve ser exibida. 
         Já a propriedade strMeal contém o nome da receita e é utilizada tanto no atributo alt da imagem, 
         fornecendo uma descrição para acessibilidade, quanto dentro da tag <h3>, para exibir o nome da receita na página. 
         As expressões ${...} permitem inserir dinamicamente os valores das propriedades do objeto receita dentro do HTML. 
         As crases (`) utilizadas delimitam uma template string, permitindo escrever HTML dentro do JavaScript e 
         inserir valores de variáveis ou propriedades diretamente no conteúdo. */
    });

    
  