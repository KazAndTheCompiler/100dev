const refs = {
  finalRose: document.querySelector('#finalRose'),
  claire: document.querySelector('#claire'),
  nikki: document.querySelector('#nikki'),
  sharleen: document.querySelector('#sharleen')
}

refs.finalRose.addEventListener('click', revealWinner)

function hideNonWinners() {
  refs.claire.style.display = 'none'
  refs.sharleen.style.display = 'none'
}

function revealWinner() {
  hideNonWinners()
  refs.nikki.style.display = 'block'
}
