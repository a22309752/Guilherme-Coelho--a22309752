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

const botao = document.querySelector('#um button')
botao.addEventListener('click', muda_cor)
function muda_cor(){
    if(botao.textContent == "Red"){
        botao.style.backgroundColor = "red"
    }else if(botao.textContent == "Green"){
        botao.style.backgroundColor = "green"
    }else if(botao.textContent == "Blue"){
        botao.style.backgroundColor = "blue"
    }else if(botao.textContent == "Yellow"){
        botao.style.backgroundColor = "yellow"
    }else if(botao.textContent == "Purple"){
        botao.style.backgroundColor = "purple"
    }else if(botao.textContent == "Black"){
        botao.style.backgroundColor = "black"
    }
}
