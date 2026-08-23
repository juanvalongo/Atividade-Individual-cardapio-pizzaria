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

function traduzirIngrediente(ingrediente) {

    const traducoes = {
        "Flour": "Farinha",
        "Water": "Água",
        "Salt": "Sal",
        "Olive Oil": "Azeite",
        "Tomato": "Tomate",
        "Mozzarella": "Muçarela",
        "Oregano": "Orégano",
        "Sugar": "Açúcar",
        "Yeast": "Fermento",
        "Plain Flour": "Farinha Simples",
        "Black Pepper": "Pimenta-do-reino",
        "Passata": "Passata de tomate",
        "Tomato Sauce": "Molho de tomate",
        "Turkey Ham": "Presunto de peru",
        "Sweetcorn": "Milho verde",
        "Green Olives": "Azeitonas verdes",
        "Paprika": "Páprica",
        "Beef Flank Steak": "Fatias de fraldinha",
        "Pepper": "Pimenta",
        "Chorizo": "Chouriço",
        "Basil": "Manjericão"
    };

    return traducoes[ingrediente] || ingrediente; //"Se existir uma tradução para esse ingrediente, retorne a tradução. Caso contrário, retorne o ingrediente original."
}


function traduzirMedida(medida) {

    if (!medida) { //Estamos dizendo: Se não existir uma medida, retorne uma string vazia. Isso evita problemas durante o processamento.
        return "";
    }

    const traducoes = {
        "tsp": "colher de chá",
        "tbsp": "colher de sopa",
        "cup": "xícara",
        "cups": "xícaras",
        "tablespoon": "colher de sopa",
        "tablespoons": "colheres de sopa",
        "teaspoon": "colher de chá",
        "teaspoons": "colheres de chá",
        "Drizzle": "fios de",
        "Peeled and Sliced": "descascado e fatiado",
        "Leaves": "folhas",
        "Pinch": "pitada",
        "6 cut thick slices": "6 fatias grossas cortadas",
        "To taste": "a gosto"
    };

    let medidaTraduzida = medida;

    for (const termo in traducoes) { //Esse for percorre as chaves do objeto. A cada repetição, termo representa uma dessas palavras da lista acima.
        medidaTraduzida = medidaTraduzida.replace(termo, traducoes[termo]); //O .replace() procura um texto e substitui por outro. Exemplo: "1 tsp".replace("tsp", "colher de chá")
    }

    return medidaTraduzida;
}


fetch(url) //fetch() é uma função do JavaScript usada para fazer uma requisição HTTP. Estamos dizendo: "JavaScript, vá buscar os dados nesse endereço."
    .then(response => response.json()) //A API responde em JSON. Esse comando transforma a resposta em um objeto JavaScript que podemos manipular.
    .then(data => {
        const indice = Math.floor(Math.random() * data.meals.length); // Math.random() gera um número decimal aleatório entre 0 (incluído) e 1 (não incluído). Esse número é multiplicado por data.meals.length, que representa a quantidade de receitas encontradas pela API. Math.floor() arredonda o resultado para baixo, transformando-o em um número inteiro válido para representar uma posição no array. Dessa forma, a variável indice recebe aleatoriamente um dos índices disponíveis em data.meals, permitindo selecionar uma receita diferente a cada carregamento da página.

        const receita = data.meals[indice]; // A variável receita recebe a receita localizada no array data.meals na posição indicada pela variável indice. Como indice foi gerado aleatoriamente na linha anterior, essa instrução seleciona uma das receitas retornadas pela API de forma aleatória. Por exemplo, se a API retornar três receitas, os índices possíveis serão 0, 1 e 2, e data.meals[indice] acessará a receita correspondente ao índice sorteado.

        let listaIngredientes = "";
        for (let i = 1; i <= 20; i++) {
            const ingrediente = receita[`strIngredient${i}`];
            const medida = receita[`strMeasure${i}`];
            if (ingrediente) {
                const medidaTraduzida = traduzirMedida(medida);
                const ingredienteTraduzido = traduzirIngrediente(ingrediente);    
                listaIngredientes += `<li>${ingredienteTraduzido}${medidaTraduzida ? ` — ${medidaTraduzida}` : ""}</li>`; //medidaTraduzida ? ` — ${medidaTraduzida}` : ""  Significa: Se existir uma medida, coloque " — " + a medida. Caso contrário, coloque nada.
            }
        } //lógica para percorrer strIngredient1 até strIngredient20 e identificar os ingredientes existentes.

        console.log(receita.strMeal);
        console.log(receita.strMealThumb);

        containerReceita.innerHTML = `
        <div class="card-receita">

            <img 
                src="${receita.strMealThumb}/medium" 
                alt="${receita.strMeal}"
                class="imagem-receita"
            >

            <div class="conteudo-receita">
                <h3>${receita.strMeal}</h3>
                <div class="informacoes-receita">
                    <p><strong>Categoria:</strong> ${receita.strCategory}</p>
                    <p><strong>Origem:</strong> ${receita.strArea}</p>
                </div>

                <h4>Ingredientes:</h4>

                <ul>
                    ${listaIngredientes}
                </ul>
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
         /*"A imagem fornecida pela API foi otimizada utilizando a versão medium disponibilizada pelo servidor da TheMealDB, 
          reduzindo o tamanho do recurso transferido sem comprometer a integração dinâmica da aplicação."*/
    });

    
  