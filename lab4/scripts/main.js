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
const botao = document.querySelector('#um button')
botao.addEventListener('click', muda_cor)

function muda_cor(){
    if(botao.textContent == "Red"){
        titulo.style.color = "red"
    }else if(botao.textContent == "Green"){
        titulo.style.color = "green"
    }else if(botao.textContent == "Blue"){
        titulo.style.color = "blue"
    }else if(botao.textContent == "Yellow"){
        titulo.style.color = "yellow"
    }else if(botao.textContent == "Purple"){
        titulo.style.color = "purple"
    }else if(botao.textContent == "Black"){
        titulo.style.color = "black"
    }
}
