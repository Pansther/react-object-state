export type ObjectStateSetKey<S> = <K extends keyof S>(
  key: K,
  dispatch: S[K] | ((prev: Partial<S[K]>) => S[K])
) => void

export type ObjectStateSetObject<S> = <T extends Partial<S>>(
  dispatch: T | ((prev: S) => T)
) => void

export interface ObjectStateSet<S> {
  /**
   * Overload 1: Updates a single property within the state object by its key.
   *
   * @param {K} key The key of the property in the state object to update.
   * @param {S[K] | ((prev: Partial<S[K]>) => S[K])} dispatch The new value for the key, or a function that receives
   * the previous value of that key and returns the new value.
   * @returns {void}
   *
   * @example
   * // Increment 'count' property:
   * set('count', 10)
   * // or
   * set('count', (prev) => prev + 1)
   */
  <K extends keyof S>(
    key: K,
    dispatch: S[K] | ((prev: Partial<S[K]>) => S[K])
  ): void

  /**
   * Overload 2: Updates multiple properties or the entire object state partially.
   *
   * @param {T | ((prev: S) => T)} dispatch The partial object with new values, or a function that receives
   * the previous full state and returns a partial object to merge.
   * @returns {void}
   *
   * @example
   * // Increment 'count' property:
   * set({ count: 10 })
   * // or
   * set((prev) => ({ count: prev.count + 1 }))
   * // or
   * set(({ count }) => ({ count: count + 1 }))
   */
  <T extends Partial<S>>(dispatch: T | ((prev: S) => T)): void
}

export interface ObjectStateDispatch<S> {
  set: ObjectStateSet<S>
}

export type ObjectStateReturned<S extends object> = S & ObjectStateDispatch<S>
