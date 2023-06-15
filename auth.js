import { createClient } from '@supabase/supabase-js'


const supabaseCfg = {
  url: 'https://klmoxrjjzvtijmsgwpao.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsbW94cmpqenZ0aWptc2d3cGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NDc4MjgsImV4cCI6MjAwMjMyMzgyOH0.JlDABopSduRg9zZjXFa0OpRbdCYpwExnxLf8z0-eSFs'
}

const supabase = createClient(supabaseCfg.url, supabaseCfg.key)

export default {
  things: async function () {
    const result = await new Promise(done => setTimeout(() => done({
      foo: 'barf'
    }), 2000))
    return result
  },
  github: async function () {
    return await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // redirectTo: location.href
      }
    })
  }
}
