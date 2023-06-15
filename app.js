// @ts-nocheck
import auth from './auth'

const actions = {
  loginWithGithub: auth.github,
  appTest: auth.things
}

document.addEventListener('click', async e => {
  const btn = e.target?.closest('[data-when-clicked]')
  const fn = btn && actions[btn.dataset.whenClicked]
  if (!fn || !btn) return
  const out = document.querySelector(btn.dataset.outputTo)

  btn.classList.toggle('state-busy', true)
  const r = await fn()
  btn.classList.toggle('state-busy', false)

  if (out) {
    out.closest('.output')?.classList.toggle('output-set', true)
    out.innerHTML = JSON.stringify(r, null, 2)
  } else {
    console.log(r)
  }
})
