// @ts-nocheck
const actions = {
  loginWithGithub: async function () {
    const result = await new Promise(done => setTimeout(() => done({
      foo: 'bar'
    }), 2000))
    return result
  }
}

document.addEventListener('click', async e => {
  const btn = e.target?.closest('[data-when-clicked]')
  if (!btn) return
  const fn = actions[btn.dataset.whenClicked]
  if (!fn) return

  btn.classList.toggle('state-busy', true)
  const r = await fn()
  btn.classList.toggle('state-busy', false)
  console.log(r)
})
