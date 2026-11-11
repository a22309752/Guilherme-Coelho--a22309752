
const url = "https://deisishop.pw.deisi.ulusofona.pt/products"
const url2 = "https://deisishop.pw.deisi.ulusofona.pt/categories"
const colecaoDiv = document.querySelector('#colecao #produtos')
const cestoDiv = document.querySelector('#cesto div')
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
const searchbar = document.querySelector('#searchbar')
const filtro = document.querySelector('#filtro')
const ordenar = document.querySelector('#ordenar')
const form = document.querySelector('#checkout form')

let dados = []
renderizaDadosCesto(carrinho)


fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error("Erro ao obter produtos");
        }
        else{
           return response.json()
        }
    })
    .then(data =>{
        dados = data
        renderizaDados(dados)
        console.log(dados)
    })
    .catch(error => console.error('Erro:', error));

fetch(url2)
    .then(response =>{
        if(!response.ok){
            throw new Error("Erro ao obter categorias")
        }
        else{
            return response.json()
        }
    })
    .then(data => {
        const categorias = data
        categorias.forEach(categoria =>{
            const opcao = document.createElement('option')
            opcao.value = categoria.name
            opcao.textContent = categoria.name
            filtro.append(opcao)
        })

        console.log(categorias)
    })
    .catch(error => console.log(error))


function criaProduto(dado){
    const article = document.createElement('article')

    const nome = document.createElement('h5')
    nome.textContent = dado.title

    const imagem = document.createElement('img')
    imagem.src = `https://deisishop.pw.deisi.ulusofona.pt${dado.image}`

    const descricao = document.createElement('p')
    descricao.textContent = dado.description

    const preco = document.createElement('p')
    preco.textContent = `${dado.price} €`

    const div = document.createElement('div')
    div.append(nome,descricao,preco)

    const button = document.createElement('button')
    button.textContent = "Adicionar ao Carrinho"

    article.append(imagem,div,button)

    button.addEventListener('click', ()=>{
        carrinho.push(dado)

        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        renderizaDadosCesto(carrinho)
    })

    return article
}

function criaProdutoCesto(dado){
    const article = document.createElement('article')

    const nome = document.createElement('h5')
    nome.textContent = dado.title

    const imagem = document.createElement('img')
    imagem.src = `https://deisishop.pw.deisi.ulusofona.pt${dado.image}`

    let preco = document.createElement('p')
    preco.textContent = `${dado.price} €`

    const button = document.createElement('button')
    button.textContent = "Eliminar"

    const div = document.createElement('div')
    div.append(nome,preco)

    article.append(imagem,div,button)

    button.addEventListener('click', () =>{
        eliminaProduto(dado)

    })

    return article
}

function eliminaProduto(dado){
    const produtoEliminado = carrinho.findIndex(p=> p.title === dado.title)
        console.log(produtoEliminado)
        if(produtoEliminado>=0){
            carrinho.splice(produtoEliminado,1)
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            renderizaDadosCesto(carrinho)
        }
}

function renderizaDados(dados){
    colecaoDiv.innerHTML = ''
    dados.forEach(dado =>{
        const article = criaProduto(dado)
        colecaoDiv.append(article)
    })
}

function renderizaDadosCesto(dados){
    cestoDiv.innerHTML = ''
    dados.forEach(dado => {
        const article = criaProdutoCesto(dado)
        cestoDiv.append(article)
    })
    const total = dados.reduce((soma, produto) => soma + Number(produto.price), 0)

    document.querySelector('#custoTotal').textContent =
        `Custo total: ${total.toFixed(2)} €`
    }

function atualizaDados(){
    let novaArray = [...dados]


    // Filtrar por categoria
    const categoria = filtro.value

    if (categoria !== "") {
        novaArray = novaArray.filter(e => e.category === categoria)
    }

    // Filtrar pela pesquisa
    const textoPesquisa = searchbar.value.toLowerCase()

    novaArray = novaArray.filter(e =>
        e.title.toLowerCase().startsWith(textoPesquisa)
    )

    // Ordenar por preço
    const opcao = ordenar.value

    if (opcao === "asc") {
        novaArray.sort((a, b) => a.price - b.price)
    }
    else if (opcao === "desc") {
        novaArray.sort((a, b) => b.price - a.price)
    }

    // Apresentar os produtos
    renderizaDados(novaArray)
}


searchbar.addEventListener('input', () => {
    atualizaDados()
})

filtro.addEventListener('change', () => {
    atualizaDados()
})

ordenar.addEventListener('change', () => {
    atualizaDados()
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log("Compra inicializada")
    const produtosID = carrinho.map(produto => produto.id)
    const nome = document.querySelector('#nome')
    const estudante = document.querySelector('#estudante')
    const cupao = document.querySelector('#cupao')
    const url3 = "https://deisishop.pw.deisi.ulusofona.pt/buy"

    console.log(nome.value)
    console.log(estudante.checked)
    console.log(cupao.value)
    const compra = {
        "products": produtosID,
        "student": estudante.checked,
        "coupon": cupao.value,
        "name": nome.value
    }

    fetch(url3,{
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(compra)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Erro ao receber resposta")
        }
        else{
            return response.json()
        }
    })
    .then(data =>{
        const valorFinal = document.querySelector('#valorFinal')
        valorFinal.textContent = `Valor Final: ${data.totalCost} €`

        const referenciaPagamento = document.querySelector('#referenciaPagamento')
        referenciaPagamento.textContent = `Referência: ${data.reference}`

        carrinho.length = 0
        localStorage.removeItem('carrinho')
        renderizaDadosCesto(carrinho)
    })
    .catch(error => console.log(error))

})
