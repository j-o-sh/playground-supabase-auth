export default {
  github: async function () {
    const result = await new Promise(done => setTimeout(() => done({
      foo: 'barf'
    }), 2000))
    return result
  }
}
