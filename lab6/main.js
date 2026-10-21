//Declaração de variáveis

const nodeInputSubmit = document.querySelector('input[type="submit"] ')
const nodeInputNumero = document.querySelector('input[type="number"]')
const colecao = JSON.parse(localStorage.getItem('colecao')) || []
const cromoForm = document.querySelector('form')
const nodeUlColecao = document.querySelector('#colecao ul')
const nodeTotalCromos = document.querySelector('#colecao h3 span')
const listaRepetidos = JSON.parse(localStorage.getItem('repetidos')) || []
const nodeUlRepetidos = document.querySelector('#repetidos ul ')
const nodeTotalRepetidos = document.querySelector('#repetidos h3 span')

//B. event handlers

function guardaCarta(){
    const numero = Number(nodeInputNumero.value)
    if(colecao.includes(numero)){
        listaRepetidos.push(numero)
        listaRepetidos.sort()
    }
    else{
        colecao.push(numero)
        colecao.sort()
    }

    localStorage.setItem('colecao', JSON.stringify(colecao))
    localStorage.setItem('repetidos', JSON.stringify(listaRepetidos))

    atualizaLista()
}

function atualizaLista(){
    nodeUlColecao.innerHTML = ""
    nodeUlRepetidos.innerHTML = ""

    listaRepetidos.forEach(element => {
    const li2 = document.createElement('li')
    li2.innerHTML = `${element} <button>Eliminar</button>`
    nodeUlRepetidos.appendChild(li2)
    })


    colecao.forEach(element => {
    const li= document.createElement('li')
       li.textContent = element
    nodeUlColecao.appendChild(li)
    })

    nodeTotalCromos.textContent = colecao.length
    nodeTotalRepetidos.textContent = listaRepetidos.length
    configurarBotoesEliminar()
}

//C. event listener

cromoForm.onsubmit = (event) =>{
    event.preventDefault()
    guardaCarta()
}

function configurarBotoesEliminar() {
    const botoesEliminar = document.querySelectorAll('#repetidos button')

    botoesEliminar.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            listaRepetidos.splice(index, 1)
            localStorage.setItem('repetidos', JSON.stringify(listaRepetidos))
            atualizaLista()
        })
    })
}

atualizaLista()
