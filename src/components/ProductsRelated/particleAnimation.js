export default function createParticles () {
  const menubar_cart_button = document.getElementById('menubar_cart_button')
  const particleDiv = document.createElement('div')
  particleDiv.className = 'particle_div'


  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('span')
    particle.className = 'particle'
    particleDiv.appendChild(particle)
    particle.style.animationName = `m${i}`
  }

  menubar_cart_button.classList.add('menubar_cart_btn')

  particleDiv.addEventListener('animationend', () => {
    particleDiv.remove()
  })

  particleDiv.addEventListener('animationend', () => {
    menubar_cart_button.classList.remove('menubar_cart_btn')
  })

  menubar_cart_button.appendChild(particleDiv)
}