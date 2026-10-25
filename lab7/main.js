//A. Declaração de Variáveis
const colecao = document.querySelector("#produtos div")
const carrinho = document.querySelector("#cesto div")
const produtos_selecionados = JSON.parse(localStorage.getItem('produtos_selecionados')) || []
const valor_total = document.querySelector('#cesto h4 span')




//B. Funções utilitárias
function criarProduto(produto){
        const article = document.createElement('article')
        const h3 = document.createElement('h3')
        h3.textContent = produto.title

        const img = document.createElement('img')
        img.src = produto.image

        const preco = document.createElement('p')
        preco.textContent = `${produto.price}€`

        const p = document.createElement('p')
        p.textContent = produto.description

        article.append(img,h3,p,preco)

        const botao = document.createElement('button')
        botao.textContent = " 🛒 Adicionar ao Carrinho"

        article.append(botao)

        botao.addEventListener('click', () =>{
            produtos_selecionados.push({
                title: produto.title,
                price: produto.price
            })
            localStorage.setItem('produtos_selecionados', JSON.stringify(produtos_selecionados))
            atualizaCesto()
        })

        return article
}



//C. Event Handlers
 function renderizarProdutos(produtos){
    produtos.forEach(produto => {
        const artigo = criarProduto(produto)
        colecao.append(artigo)
    });
 }

 function criarProdutoCesto(produto){
    const article = document.createElement('article')
    const title = document.createElement('h3')
    title.textContent = produto.title
    const price = document.createElement('p')
    price.textContent = `${produto.price}€`

    article.append(title,price)

    const eliminar = document.createElement('button')
    eliminar.textContent = "Eliminar"

    article.append(eliminar)

    eliminar.addEventListener('click', ()=>{
        eliminaProduto(produto)
    })


    return article
 }

 function atualizaCesto(){
    const artigos_cesto = JSON.parse(localStorage.getItem('produtos_selecionados')) || []
    carrinho.innerHTML = ''
    let total = 0
    artigos_cesto.forEach(produto =>{
        const article = criarProdutoCesto(produto)
        carrinho.append(article)
        total += produto.price
    })
     valor_total.textContent = `${total} €`
 }

function eliminaProduto(produto){
    const indice = produtos_selecionados.findIndex(p => p.title === produto.title)
    console.log(indice)
    if(indice !== -1){
        produtos_selecionados.splice(indice,1)
        localStorage.setItem('produtos_selecionados', JSON.stringify(produtos_selecionados))
        atualizaCesto()
        console.log(produtos_selecionados)
    }
}



//D. Inicialização
renderizarProdutos(produtos)
atualizaCesto()


