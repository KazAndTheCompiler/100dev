const refs = {
  contestants: document.querySelectorAll('.contestant'),
  claire: document.querySelector('#claire'),
  nikki: document.querySelector('#nikki'),
  status: document.querySelector('#status')
}

let revealed = false

Array.from(refs.contestants).forEach((element) => {
  element.addEventListener('click', checkForRose)
})

function checkForRose(event) {
  if (revealed) return

  if (event.currentTarget.classList.contains('rose')) {
    refs.nikki.classList.remove('hidden')
    refs.claire.classList.add('hidden')
    refs.status.textContent = 'Correct! Nikki has the final rose.'
    revealed = true
    return
  }

  refs.claire.classList.remove('hidden')
  refs.nikki.classList.add('hidden')
  refs.status.textContent = 'Not this time — try again.'
}
