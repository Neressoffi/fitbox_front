import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · FitBox` : 'FitBox · Vêtements de sport selon la météo'
  }, [title])
}
