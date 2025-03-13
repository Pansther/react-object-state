# react-object-state

> React hooks for creating state in object form and easier to manipulate.

## Example

```typescriptreact
import { useObjectState } from './hooks'

const App = () => {
  const state = useObjectState({
    count: 0,
  })

  return (
    <div>
      <div>{state.count}</div>

      <button onClick={() => state.set('count', 0)}>reset</button>

      <button onClick={() => state.set('count', state.count + 1)}>
        increment
      </button>

      <button onClick={() => state.set('count', (count) => count + 1)}>
        increment 2
      </button>

      <button onClick={() => state.setObject({ count: state.count + 1 })}>
        increment 3
      </button>

      <button
        onClick={() => state.setObject(({ count }) => ({ count: count + 1 }))}
      >
        increment 4
      </button>
    </div>
  )
}

export default App
```
