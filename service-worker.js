const CACHE_NAME = "pizzaria-patio-v3"; //Criamos primeiro um nome para o nosso cache. O v1 representa a versão do cache.

const ARQUIVOS_CACHE = [ //Depois criamos uma lista dos arquivos fundamentais para nossa aplicação
    "index.html",
    "bebidas.html",
    "sobremesas.html",
    "styles.css",
    "scripts.js",
    "manifest.json",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)  //o navegador cria/abre o nosso cache.
            .then(function(cache) {
                return cache.addAll(ARQUIVOS_CACHE); //solicita que esses arquivos sejam armazenados nele.
            })
    );
});

self.addEventListener("fetch", function(event) {

    if (event.request.url.includes("themealdb.com")) {
        event.respondWith(
            fetch(event.request)
        );
        return;
    }

    event.respondWith(
        caches.match(event.request) //Esse recurso que o navegador está tentando acessar está no meu cache?
            .then(function(resposta) {
                return resposta || fetch(event.request); //Se estiver: return resposta; ele entrega a versão armazenada no cache.  
        })                                                //Se não estiver: return fetch(event.request); ele tenta buscar normalmente pela rede.       
    );  
});