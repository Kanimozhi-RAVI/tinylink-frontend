import { useEffect } from "react"
import { useParams } from "react-router-dom"

const API = import.meta.env.VITE_API_BASE || ''

export default function RedirectHandler() {
  const { code } = useParams()

  useEffect(() => {
    async function go() {
      const res = await fetch(`${API}/api/links/${code}/open`)
      const json = await res.json().catch(() => null)

      if (json?.url) window.location.href = json.url
      else document.body.innerHTML = "<h2>Invalid link</h2>"
    }
    go()
  }, [])

  return <div>Redirecting...</div>
}
