import { useEffect, useRef, useState } from "react"
import { debounce } from "lodash-es"

export type UseDebounce = <TValue = any>(initialState: TValue, delay: number, options?: UseDebounceOptions) => TValue

export type UseDebounceOptions = {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export const useDebounce: UseDebounce = <TValue>(value: TValue, delay, options) => {
  const [state, setState] = useState<TValue | null>(typeof value === "function" ? null : value)
  const callback = debounce(
    (...args) => {
      if (typeof ref.current.value === "function") {
        ref.current.value(...args)
      } else {
        setState(ref.current.value)
      }
    },
    delay,
    options
  )

  const ref = useRef({ value, callback })

  useEffect(() => {
    ref.current.value = value

    if (typeof ref.current.value !== "function") {
      ref.current.callback()
    }
  }, [value])

  return typeof ref.current.value === "function" ? (ref.current.callback as any) : state
}
