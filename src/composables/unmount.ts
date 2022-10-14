import { useEffect, useRef } from 'react'

export const useUnmount = (fn: Function): void => {
  const ref = useRef(fn)
  ref.current = fn

  useEffect(() => () => ref.current(), [])
}
