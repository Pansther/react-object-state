import { useState } from 'react'

const useObjectState = <S extends object>(defaultValue: S) => {
  const [state, setState] = useState<S>(defaultValue)

  const set = <K extends keyof S>(
    key: K,
    dispatch: S[K] | ((prev: S[K]) => S[K])
  ) => {
    if (dispatch instanceof Function) {
      setState((prev) => ({ ...prev, [key]: dispatch(prev[key]) }))
    } else {
      setState((prev) => ({ ...prev, [key]: dispatch }))
    }
  }

  const setObjectState = <T extends Partial<S>>(
    dispatch: T | ((prev: S) => T)
  ) => {
    if (dispatch instanceof Function) {
      setState((prev) => ({ ...prev, ...dispatch(prev) }))
    } else {
      setState(() => ({ ...state, ...dispatch }))
    }
  }

  return {
    ...state,
    set,
    setState: setObjectState,
  }
}

export default useObjectState
