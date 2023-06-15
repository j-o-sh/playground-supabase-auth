// @ts-nocheck
import auth from './auth'

const actions = {
  loginWithGithub: auth.github,
  appTest: auth.things
}

function output(msg, { to } = {}) {
  const out = to && document.querySelector(to)
  if (out) {
    out.closest('.output')?.classList.toggle('output-set', true)
    out.innerHTML = JSON.stringify(msg, null, 2)
  } else {
    console.log(msg)
  }
}

document.addEventListener('click', async e => {
  const btn = e.target?.closest('[data-when-clicked]')
  const fn = btn && actions[btn.dataset.whenClicked]
  if (!fn || !btn) return

  btn.classList.toggle('state-busy', true)
  const r = await fn()
  btn.classList.toggle('state-busy', false)

  output(r, { to: btn.dataset.outputTo })
})

setTimeout(async () => {
  output(await auth.check(), { to: '#session' })
  // output({a:1}, { to: '#session' })
})
