const contestants = {
  andi: document.querySelector('#andi'),
  claire: document.querySelector('#claire'),
  sharleen: document.querySelector('#sharleen')
}

const triggerMap = {
  andiNext: 'andi',
  claireNext: 'claire',
  sharleenNext: 'sharleen'
}

Object.entries(triggerMap).forEach(([triggerId, contestantKey]) => {
  const trigger = document.querySelector(`#${triggerId}`)
  if (!trigger) return

  trigger.addEventListener('click', () => showOnly(contestantKey))
})

function showOnly(targetKey) {
  Object.entries(contestants).forEach(([key, node]) => {
    if (!node) return

    const shouldShow = key === targetKey
    node.classList.toggle('hidden', !shouldShow)
    node.setAttribute('aria-hidden', String(!shouldShow))
  })
}
