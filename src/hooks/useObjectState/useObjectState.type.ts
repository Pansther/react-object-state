export type ObjectStateSet<S> = <K extends keyof S>(
  key: K,
  dispatch: S[K] | ((prev: Partial<S[K]>) => S[K])
) => void

export type ObjectStateSetState<S> = <T extends Partial<S>>(
  dispatch: T | ((prev: S) => T)
) => void

export interface ObjectStateDispatch<S extends object> {
  /**
   * Updates a single property in the state object.
   * @template K The key of the property to update.
   * @param {K} key The key of the property to update.
   * @param {S[K] | ((prev: Partial<S[K]>) => S[K])} dispatch The new value or a function that receives the previous value and returns a new value.
   * @returns {void}
   */
  set: ObjectStateSet<S>
  /**
   * Updates multiple properties in the state object.
   * @template T A partial type of the state object.
   * @param {T | ((prev: S) => T)} dispatch An object with the new state or a function that receives the previous state and returns a new state object.
   * @returns {void}
   */
  setState: ObjectStateSetState<S>
}

export type ObjectStateReturned<S extends object> = S & ObjectStateDispatch<S>
