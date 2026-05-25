import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import '@/styles/index.css'

function hideSplash() {
  const splash = document.getElementById('app-splash')

  if (!splash) {
    return
  }

  splash.classList.add('is-hidden')
  splash.addEventListener(
    'transitionend',
    () => {
      splash.remove()
    },
    { once: true },
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

hideSplash()
