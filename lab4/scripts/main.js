const conta = document.querySelector('#contador')
let counter = 0
function contar() {
    counter++;
    conta.textContent=counter;
}

const texto = document.querySelector('#dois h2')
const textoOriginal = texto.textContent
texto.addEventListener('mouseover', muda_texto)
function muda_texto(){
        texto.textContent = "This is Master Obi-Wan Kenobi. I regret to report that both our Jedi Order and the Republic have fallen.";
}
texto.addEventListener('mouseout', retorna_texto);
function retorna_texto(){
    texto.textContent=textoOriginal
}


const titulo = document.querySelector('#um h2')
const botoes = document.querySelectorAll('#um button')

botoes.forEach(function(botao) {
    botao.addEventListener('click', muda_cor)
})

function muda_cor(event) {
    titulo.style.color = event.target.textContent.toLowerCase()
}


const inputCor = document.querySelector('#tres input')
inputCor.addEventListener('input', muda_background_color)
const caixa = document.querySelector('#cinco input')
const cores = ['lightblue', 'lightgreen', 'lightpink', 'yellow', 'orange', 'plum']
let indice = 0
function muda_background_color(){
    document.body.style.backgroundColor = inputCor.value
}

caixa.addEventListener('input', muda_cor_input)

function muda_cor_input() {
    caixa.style.backgroundColor = cores[indice]

    indice++

    if (indice == cores.length) {
        indice = 0
    }
}
