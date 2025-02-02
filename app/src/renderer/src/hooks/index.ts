import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => any, delay: number | null) => {
  const savedCallback = useRef<() => any>()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      !!savedCallback.current && savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    } else return
  }, [delay])
}
