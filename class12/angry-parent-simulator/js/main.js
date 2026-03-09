const refs = {
  yellButton: document.querySelector('#yell'),
  firstName: document.querySelector('#firstName'),
  firstMiddle: document.querySelector('#firstMiddle'),
  lastMiddle: document.querySelector('#lastMiddle'),
  lastName: document.querySelector('#lastName'),
  output: document.querySelector('#placeToYell'),
  examples: document.querySelector('#examples')
}

function normalizeNamePart(value) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}
function joinParts(parts) { return parts.filter(Boolean).join(' ') }
function toYell(text) { return `${text.toUpperCase()}!!!` }
function toParentMode(text) { return `🚨 ${toYell(text)}` }
function initials(parts) { return parts.filter(Boolean).map((p) => p[0].toUpperCase()).join('.') }

function run() {
  const parts = [
    normalizeNamePart(refs.firstName.value),
    normalizeNamePart(refs.firstMiddle.value),
    normalizeNamePart(refs.lastMiddle.value),
    normalizeNamePart(refs.lastName.value)
  ].filter(Boolean)

  if (!parts.length) {
    refs.output.textContent = 'Type a name first so I can yell properly.'
    return
  }

  refs.output.textContent = toParentMode(joinParts(parts))
}

function runExamples() {
  const samples = [
    ['henry', '', '', 'jones'],
    ['zoe', 'the', '', 'queen'],
    ['maria', 'elena', 'de', 'la cruz'],
    ['john', 'fitzgerald', '', 'kennedy'],
    ['ada', '', '', 'lovelace'],
    ['neo', '', '', 'anderson'],
    ['luke', '', '', 'skywalker'],
    ['amy', 'pond', '', 'williams'],
    ['first', 'second', 'third', 'fourth'],
    ['mr', '', '', 'robot']
  ]

  refs.examples.textContent = samples.map((parts, i) => {
    const clean = parts.map(normalizeNamePart)
    const full = joinParts(clean)
    return `${i + 1}) toParentMode(${JSON.stringify(full)}) => ${toParentMode(full)} | initials=${initials(clean)}`
  }).join('\n')
}

refs.yellButton.addEventListener('click', run)
document.querySelector('#runExamplesBtn').addEventListener('click', runExamples)
