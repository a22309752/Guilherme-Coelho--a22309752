
const url ="https://deisishop.pw.deisi.ulusofona.pt/products"
const colecaoDiv = document.querySelector('#colecao div')
const cestoDiv = document.querySelector('#cesto div')
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

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
        console.log(dados)
    })
    .catch(error => console.error('Erro:', error));


function criaProduto(dado){
    const article = document.createElement('article')

    const nome = document.createElement('h5')
    nome.textContent = dado.title

    const imagem = document.createElement('img')
    imagem.src = dado.image

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
        produtoExiste = carrinho.find(p => p.title === title)

        if(produtoExiste){
            produtoExiste.quantidade++
        }
        else{
            carrinho.push(produtoExiste)
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        renderizaDadosCesto(carrinho)
    })

    return article
}

function criaProdutoCesto(dado){
    cestoDiv.innerHTML = ''
    const article = document.createElement('article')

    const nome = document.createElement('h5')
    nome.textContent = dado.title

    const imagem = document.createElement('img')
    imagem.src = dado.image

    const quantidade = document.createElement('P')
    quantidade.textContent = dado.quantidade

    const preco = document.createElement('p')
    preco = `${dado.price*dado.quantidade} €`

    const button = document.createElement('button')
    button.textContent = "Eliminar"


}


function renderizaDados(dados){
    dados.forEach(dado =>{
        const article = criaProduto(dado)
        colecaoDiv.append(article)
    })
}

function renderizaDadosCesto(dados){
    dados.forEach(dado => {
        const article = criaProdutoCesto(dado)
        cestoDiv.append(article)
    })

}


