const CACHE_NAME = "pizzaria-patio-v10"; //Criamos primeiro um nome para o nosso cache. O v9 representa a versão do cache.

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
    self.skipWaiting(); //Não fique aguardando o Service Worker antigo terminar. Quero que esta nova versão seja ativada.
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(nomesCaches) {
            return Promise.all(
                nomesCaches.map(function(nomeCache) {
                    if (nomeCache !== CACHE_NAME) {
                        return caches.delete(nomeCache);
                    }
                })
            );
        })
    );
    self.clients.claim(); //Depois de ativado, passe a controlar imediatamente as páginas abertas.
});

self.addEventListener("fetch", function(event) {

    if (event.request.url.includes("themealdb.com")) {
         event.respondWith(
            fetch(event.request)
                .then(function(resposta) {

                    const respostaClone = resposta.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, respostaClone);
                        });

                    return resposta;
                })
                .catch(function() {
                    return caches.match(event.request);
                })
        );

        return;
    }

     if (event.request.mode === "navigate") {

        event.respondWith(
            caches.match(event.request)
                .then(function(resposta) {
                    return resposta || fetch(event.request);
                })
        );

        return;  //Se o usuário estiver tentando abrir uma página, entregue o index.html que está no cache.
    }

    event.respondWith(
        caches.match(event.request) //Esse recurso que o navegador está tentando acessar está no meu cache?
            .then(function(resposta) {
                return resposta || fetch(event.request); //Se estiver: return resposta; ele entrega a versão armazenada no cache.  
        })                                                //Se não estiver: return fetch(event.request); ele tenta buscar normalmente pela rede.       
    );  
});