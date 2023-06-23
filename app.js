// @ts-nocheck
import auth from './auth'

const actions = {
  loginWithGithub: auth.github,
  appTest: auth.things,
  logout: auth.logout
}

function shortenValue (v) {
  if (!v) return v
  switch (typeof v) {
    case 'object':
      if (Array.isArray(v)) {
        return v.map(vv => shortenValue(vv))
      } else {
        return shorten(v)
      }
    case 'string' :
      return v.length > 50 ? v.substring(0, 47) + '...' : v
    default:
      return v
  }
}

function shorten (obj) {
  if (!obj) { return obj }
  return Object.fromEntries(Object.entries(obj)
    .map(([k, v]) => [k, shortenValue(v)]
    )
  )
}

function output (msg, { to } = {}) {
  const out = to && document.querySelector(to)
  if (out) {
    out.closest('.output')?.classList.toggle('output-set', true)
    out.innerHTML = JSON.stringify(shorten(msg), null, 2)
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
  output(
    await auth.check(),
    // { x: 1, aa: ['foobar'], y: 'lishdfroiasdbhpoaibnrolsidjfhvksjldhfvbklsjhdfblsajhdbvflaijdfvlaidjfnvlaijfndvlaidjfnvlksjdfvnlsdjfhbvlsidbfjlskdjfbnsldibfjnsdikfjnvbs;dfjvnsldfkjvnsldkfjvnskldjfhvbnskldjfhvblsdjkfhbvlsdjfkbvlsdfjgkbsdlfgjkbh'},
    { to: '#session code' }
  )
  // output({a:1}, { to: '#session' })
})
