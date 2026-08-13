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