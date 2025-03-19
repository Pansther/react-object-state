# react-object-state

> React hooks for creating state in object form and easier to manipulate.

## Installation

```bash
npm install react-object-state
# or
yarn add react-object-state
```

## Example 1

Setting state with key and value

```tsx
import { useObjectState } from 'react-object-state'

const App = () => {
  const state = useObjectState({
    count: 0,
  })

  const reset = () => {
    state.set('count', 0)
  }

  const increment = () => {
    state.set('count', state.count + 1)
    // or use previous value
    state.set('count', (prev) => prev + 1)
  }

  return (
    <div>
      <div>{state.count}</div>

      <button onClick={reset}>reset</button>
      <button onClick={increment}>increment</button>
    </div>
  )
}

export default App
```

## Example 2

Setting only needed state

```tsx
import { useObjectState } from 'react-object-state'

const App = () => {
  const state = useObjectState({
    count: 0,
    foo: 'bar',
  })

  const increment = () => {
    state.setState({ count: state.count + 1 })
    // or use previous value
    state.setState((prev) => ({ count: prev.count + 1 }))
    // or use previous value with object destructuring
    state.setState(({ count }) => ({ count: count + 1 }))
  }

  return (
    <div>
      <div>{state.count}</div>

      <button onClick={increment}>increment</button>
    </div>
  )
}

export default App
```

## Compare with Traditional

```tsx
import { useState } from 'react'
import { useObjectState } from 'react-object-state'

const App = () => {
  const [reactState, setReactState] = useState({
    count: 0,
    foo: 'bar',
  })
  const objectState = useObjectState({
    count: 0,
    foo: 'bar',
  })

  const incrementTraditional = () => {
    setReactState((prev) => ({ ...prev, count: prev.count + 1 }))
  }

  const incrementObjectState = () => {
    objectState.set('count', (prev) => prev + 1)
    // or
    objectState.setState(({ count }) => ({ count: count + 1 }))
  }

  return (
    <div>
      <div>{reactState.count}</div>
      <button onClick={incrementTraditional}>increment traditional</button>

      <div>{objectState.count}</div>
      <button onClick={incrementObjectState}>increment object state</button>
    </div>
  )
}

export default App
```

## API Documentation

| Method/Property | Description | Parameters | Return Value | Example |
|---|---|---|---|---|
| `useObjectState(initialState)` | Initializes and returns an object containing the state and methods. | `initialState`: An object representing the initial state. (Optional: If TypeScript is used, you can specify the type like `useObjectState<MyInterface>(initialState)`) | An object with the current state and methods (`set`, `setState`). | `const state = useObjectState({ count: 0, name: 'John' })` |
| `state.set(key, value)` | Sets the value of a single key in the state. | `key`: The key of the state property to update. <br> `value`: The new value for the key. Can be a value or a function receiving the previous value. | `void` | `state.set('count', 1)` <br> `state.set('count', (prev) => prev + 1)` |
| `state.setState(newState)` | Merges `newState` with the current state. | `newState`: An object representing the new state to merge, or a function that receives the previous state and returns a new state object. | `void` | `state.setState({ name: 'Jane' })` <br> `state.setState((prev) => ({ count: prev.count + 1 }))` <br> `state.setState(({ count }) => ({ count: count + 1 }))` |
| `state.property` | Accesses the current value of a state property. | `property`: The key of the state property. | The current value of the state property. | `console.log(state.count)` |
