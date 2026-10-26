//A. Declaração de Variáveis
const colecao = document.querySelector("#produtos div")
const carrinho = document.querySelector("#cesto div")
const produtos_selecionados = JSON.parse(localStorage.getItem('produtos_selecionados')) || []
const valor_total = document.querySelector('#cesto h4 span')
const cesto = document.querySelector('aside')


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

            const produto_existente = produtos_selecionados.find(p => p.title === produto.title)
            if(produto_existente){
                produto_existente.quantidade++
            }
            else{
                 produtos_selecionados.push({
                title: produto.title,
                price: produto.price,
                image: produto.image,
                quantidade: 1
                })
            }
            localStorage.setItem('produtos_selecionados', JSON.stringify(produtos_selecionados))
            atualizaCesto()
            console.log(produtos_selecionados)
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
    price.textContent = `${produto.price*produto.quantidade}€`

    const quantidade = document.createElement('input')
    quantidade.type = 'number'
    quantidade.min = '1'
    quantidade.step = '1'
    quantidade.value = produto.quantidade

    const diminuir = document.createElement('button')
    diminuir.textContent = '-'
    diminuir.classList.add("diminuir")

    const aumentar = document.createElement('button')
    aumentar.textContent = '+'
    aumentar.classList.add("aumentar")

    const quantidade_div = document.createElement('div')
    quantidade_div.append(diminuir,quantidade,aumentar)

    const imagem = document.createElement('img')
    imagem.src = produto.image

    const div = document.createElement('div')
    div.append(title,quantidade_div,price)


    article.append(imagem,div)

    const eliminar = document.createElement('button')
    eliminar.textContent = "x"

    article.append(eliminar)

    eliminar.addEventListener('click', ()=>{
        eliminaProduto(produto)
    })

    console.log('Vou associar o evento ao botão diminuir')

    diminuir.addEventListener('click', ()=>{
        diminuiQuantidade(produto)
    })

    aumentar.addEventListener('click', () => {
        aumentaQuantidade(produto)
    })

    quantidade.addEventListener('change', () => {
        const produto_atual = produtos_selecionados.find(p => p.title === produto.title)
        if(produto_atual){
            if(Number(quantidade.value)>0){
                produto_atual.quantidade = Number(quantidade.value)
                localStorage.setItem('produtos_selecionados', JSON.stringify(produtos_selecionados))
                atualizaCesto()
            }
            else if(Number(quantidade.value) === 0){
                eliminaProduto(produto)
            }
        }

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

function diminuiQuantidade(produto){
    const produto_atual = produtos_selecionados.find(p => p.title === produto.title)
    if(produto_atual){
        if(produto_atual.quantidade >1){
            produto_atual.quantidade--
            localStorage.setItem('produtos_selecionados', JSON.stringify(produtos_selecionados))
            atualizaCesto()
        }
        else{
            eliminaProduto(produto)
        }

    }
}

function aumentaQuantidade(produto){
    const produto_atual = produtos_selecionados.find(p => p.title === produto.title)
    if(produto_atual){
        produto_atual.quantidade++
        localStorage.setItem('produtos_selecionados', JSON.stringify(produtos_selecionados))
        atualizaCesto()
    }
}

//D. Event Listeners
function abreCesto() {
    cesto.classList.add('show')
}

function fechaCesto() {
    cesto.classList.remove('show')
}

//E. Inicialização
renderizarProdutos(produtos)
atualizaCesto()


