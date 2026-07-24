export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    const art = `
    █████╗ ███╗   ███╗███████╗███████╗███╗   ██╗
   ██╔══██╗████╗ ████║██╔════╝██╔════╝████╗  ██║
   ███████║██╔████╔██║█████╗  █████╗  ██╔██╗ ██║
   ██╔══██║██║╚██╔╝██║██╔══╝  ██╔══╝  ██║╚██╗██║
   ██║  ██║██║ ╚═╝ ██║███████╗███████╗██║ ╚████║
   ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝
                                                 
   Looking under the hood? I like you.
   Let's build something crazy together: ameeenmv@gmail.com
   `
    
    console.log(
      `%c${art}`,
      'color: #00DC82; font-weight: bold; font-family: monospace;'
    )
  }
})
