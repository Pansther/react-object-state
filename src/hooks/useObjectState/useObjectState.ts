import { useState } from 'react'

import type {
  ObjectStateSetKey,
  ObjectStateSetObject,
  ObjectStateReturned,
} from './useObjectState.type'

/**
 * React Custom hooks for creating state in object form and easier to manipulate.
 * @template S The type of the state object.
 * @param {S} defaultValue The initial state object.
 * @returns {ObjectStateReturned} The state object with `set` methods.
 * 
 * @example
 * const state = useObjectState({
 *  count: 0,
 *  foo: 'bar',
 * })
 * 
 * // Example 1 - Set value explicit
 * set('count', 10)
 * set({ count: 10 })
 *
 * // Example 2 - Set value with previous value
 * set('count', (prev) => prev + 1)
 * set((prev) => ({ count: prev + 1 }))
 * set(({ count }) => ({ count: count + 1 })) // destructuring
 */
const useObjectState = <S extends object>(
  defaultValue: S
): ObjectStateReturned<S> => {
  const [state, setState] = useState<S>(defaultValue)

  const setKey: ObjectStateSetKey<S> = (key, dispatch) => {
    if (dispatch instanceof Function) {
      setState((prev) => ({ ...prev, [key]: dispatch(prev[key]) }))
    } else {
      setState((prev) => ({ ...prev, [key]: dispatch }))
    }
  }

  const setObjectState: ObjectStateSetObject<S> = (dispatch) => {
    if (dispatch instanceof Function) {
      setState((prev) => ({ ...prev, ...dispatch(prev) }))
    } else {
      setState(() => ({ ...state, ...dispatch }))
    }
  }

  function set<K extends keyof S>(
    key: K,
    dispatch?: S[K] | ((prev: Partial<S[K]>) => S[K])
  ): void
  function set<T extends Partial<S>>(dispatch: T | ((prev: S) => T)): void
  function set<T extends Partial<S>, K extends keyof S>(
    action: K | (T | ((prev: S) => T)),
    dispatch?: (S[K] | ((prev: Partial<S[K]>) => S[K])) | (T | ((prev: S) => T))
  ) {
    if (typeof action === 'string') {
      setKey(action as K, dispatch as S[K] | ((prev: Partial<S[K]>) => S[K]))
    } else {
      setObjectState(action as T | ((prev: S) => T))
    }
  }

  return {
    ...state,
    set,
  }
}

export default useObjectState
