
const url = "https://deisishop.pw.deisi.ulusofona.pt/products"
const url2 = "https://deisishop.pw.deisi.ulusofona.pt/categories"
const colecaoDiv = document.querySelector('#colecao #produtos')
const cestoDiv = document.querySelector('#cesto div')
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
const searchbar = document.querySelector('#searchbar')
const filtro = document.querySelector('#filtro')
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
        const dados = data
        renderizaDados(dados)
        searchbar.addEventListener('input', ()=>{
            const textoPesquisa = searchbar.value.toLowerCase()
            const novaArray = dados.filter(e => e.title.toLowerCase().startsWith(textoPesquisa))
            renderizaDados(novaArray)
            console.log(textoPesquisa)
        })


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
    preco.textContent = dado.price

    const div = document.createElement('div')
    div.append(nome,descricao,preco)

    const button = document.createElement('button')
    button.textContent = "Adicionar ao Carrinho"

    article.append(imagem,div,button)

    button.addEventListener('click', ()=>{
        const produtoExiste = carrinho.find(p => p.title === dado.title)

        if(produtoExiste){
            produtoExiste.quantidade++
        }
        else{
            const novoProduto = { ...dado, quantidade: 1 }
            carrinho.push(novoProduto)
        }

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

    const quantidade = document.createElement('P')
    quantidade.textContent = dado.quantidade

    const buttonIncrementar = document.createElement('button')
    buttonIncrementar.textContent = "+"

    const buttonDecrementar = document.createElement('button')
    buttonDecrementar.textContent = "-"

    let preco = document.createElement('p')
    preco.textContent = `${dado.price*dado.quantidade} €`

    const button = document.createElement('button')
    button.textContent = "Eliminar"

    const divQuantidade = document.createElement('div')
    divQuantidade.append(buttonDecrementar,quantidade,buttonIncrementar)

    const div = document.createElement('div')
    div.append(nome,divQuantidade,preco)

    article.append(imagem,div,button)

    button.addEventListener('click', () =>{
        eliminaProduto(dado)

    })

    buttonIncrementar.addEventListener('click', ()=>{
        const produtoIncrementado = carrinho.find(p => p.title === dado.title)
        if(produtoIncrementado){
            produtoIncrementado.quantidade++
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            renderizaDadosCesto(carrinho)
        }
    })

    buttonDecrementar.addEventListener('click', ()=>{
        const produtoDecrementado = carrinho.find(p=>p.title === dado.title)
        if(produtoDecrementado.quantidade>1){
            produtoDecrementado.quantidade--
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            renderizaDadosCesto(carrinho)
        }
        else{
            eliminaProduto(dado)
        }
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
}


