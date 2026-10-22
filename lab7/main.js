//A. Declaração de Variáveis
const colecao = document.querySelector("#produtos div")
const carrinho = document.querySelector("#cesto div")

//B. Event Handlers
 function renderizarProdutos(produtos){
    produtos.forEach(element =>{
        console.log(element.title)
    })
 }

//C. Funções utilitárias
function criarProduto(produto){
        const article = document.createElement('article')
        article.textContent = produto.title
        return article
}

function carregarProduto(){
    produtos.forEach(produto =>{
        colecao.append(article)
    })

}
//D. Inicialização
renderizarProdutos(produtos)

