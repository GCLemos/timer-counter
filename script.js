const html = document.querySelector('html')

const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const buttons = document.querySelectorAll('.app__card-button')

const banner = document.querySelector('.app__image')

const iniciarOuPausarBtn = document.querySelector('#start-pause span')

const startPauseBtn = document.querySelector('#start-pause')
const resetBtn = document.querySelector('#reset')

const icone = document.querySelector('#start-pause img')

const tempoNaTela = document.querySelector('#timer')
const contadorNaTela = document.querySelector('#counter')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')

const audioStart = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')


let contador = 1
let intervaloId = null

let tempoDecorridoEmSegundos = 0
let tempoDescansoCurto = 0
let tempoDescansoLongo = 0


musica.loop = true

musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play()
  } else {
    musica.pause()
  }

})


curtoBtn.addEventListener('click', () => {
  tempoDescansoCurto = pedirTempo()
  tempoDecorridoEmSegundos = tempoDescansoCurto
  alterarContexto('descanso-curto')
  document.getElementById("counter").style.display = "block";
  curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
  tempoDescansoLongo = pedirTempo()
  tempoDecorridoEmSegundos = tempoDescansoLongo
  alterarContexto('descanso-longo')
  document.getElementById("counter").style.display = "none";
  longoBtn.classList.add('active')
})

function alterarContexto (contexto) {
  mostrarTempo()
  buttons.forEach(function (contexto) {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
}

const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos < 1){
    audioTempoFinalizado.play()
    tempoDecorridoEmSegundos = tempoDescansoCurto
    contador += 1
    contarSeries()
    mostrarTempo()
    alert('Acabou!')
    zerar()
    iniciarOuPausarBtn.textContent = 'Começar'
    icone.setAttribute('src', `/imagens/play_arrow.png`)
    return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
}

startPauseBtn.addEventListener('click', iniciarOuPausar)

resetBtn.addEventListener('click', reset)

function iniciarOuPausar() {
  if(intervaloId){
    audioPause.play();
    iniciarOuPausarBtn.textContent = 'Começar'
    icone.setAttribute('src', `/imagens/play_arrow.png`)
    zerar()
    return
  }
  audioStart.play();
  iniciarOuPausarBtn.textContent = 'Pausar'
  icone.setAttribute('src', `/imagens/pause.png`)
  intervaloId = setInterval(contagemRegressiva, 1000)
}

function reset() {
  zerar()
  tempoDescansoCurto = pedirTempo()
  tempoDecorridoEmSegundos = tempoDescansoCurto
  mostrarTempo()
  contador = 1
  return contadorNaTela.innerHTML = `Série: ${contador}`
}


function zerar() {
  clearInterval(intervaloId)
  intervaloId = null    
}


function pedirTempo () {
  let tempo = prompt('Digite o tempo de descanso em minutos')
  return tempo*60
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

function contarSeries () {
  contadorNaTela.innerHTML = `Série: ${contador}`
}


tempoDescansoCurto = pedirTempo()
tempoDecorridoEmSegundos = tempoDescansoCurto
mostrarTempo()
contarSeries()


