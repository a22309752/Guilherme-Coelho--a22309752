const titulo = document.querySelector('section h2');
const original = titulo.textContent

const mudarTexto = () => {
    titulo.textContent = 'Olá';
};

titulo.addEventListener('mouseover', mudarTexto);

const textoOriginal = () => {
    titulo.textContent = original
}

titulo.addEventListener('mouseout', textoOriginal)


const tituloCor = document.querySelector('#titulo-cor h2');
const botoes = document.querySelectorAll('.color');

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        tituloCor.style.color = botao.textContent.toLowerCase();
    });
});


const cores = document.querySelector('#cores');

cores.addEventListener('change', function() {
    document.body.style.backgroundColor = this.value;
});


const formulario = document.querySelector('#formulario');
const nome = document.querySelector('#nome');
const idade = document.querySelector('#idade');
const resultado = document.querySelector('#texto');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    resultado.textContent = `Olá, ${nome.value}! Tens ${idade.value} anos.`;
});

const contador = document.querySelector('#contador')
const botao = document.querySelector('#conta')
let counter = Number(localStorage.getItem('counter')) || 0
contador.textContent = counter

const contar = () =>{
    counter++
    contador.textContent = counter
    localStorage.setItem('counter', counter)
}

conta.addEventListener('click', contar)


const clock = document.querySelector('#relogio span')
let segundos = 0;
const contarSegundos = () => {
    segundos++
    clock.textContent = segundos

}
setInterval(contarSegundos, 1000)

