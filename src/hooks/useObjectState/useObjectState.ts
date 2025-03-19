import { useState } from 'react'

import type {
  ObjectStateSet,
  ObjectStateSetState,
  ObjectStateReturned,
} from './useObjectState.type'

/**
 * React Custom hooks for creating state in object form and easier to manipulate.
 * @template S The type of the state object.
 * @param {S} defaultValue The initial state object.
 * @returns {ObjectStateReturned} The state object with `set` and `setState` methods.
 */
const useObjectState = <S extends object>(
  defaultValue: S
): ObjectStateReturned<S> => {
  const [state, setState] = useState<S>(defaultValue)

  const set: ObjectStateSet<S> = (key, dispatch) => {
    if (dispatch instanceof Function) {
      setState((prev) => ({ ...prev, [key]: dispatch(prev[key]) }))
    } else {
      setState((prev) => ({ ...prev, [key]: dispatch }))
    }
  }

  const setObjectState: ObjectStateSetState<S> = (dispatch) => {
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
