# Inputs and State

```
function App() {
  let [minutes, setMinutes] = React.useState()
  const onChange = (event) => {
    setMinutes(event.target.value)
  }
  return (
    <div>
      <h1>Super Converter</h1>
      <label htmlFor="minutes">Minutes</label>
      <input onChange={onChange} value={minutes} id="minutes" placeholder="Minutes" type="number" />
      <h4>You want to convert {minutes}</h4>
      <label htmlFor="hours">Hours</label>
      <input id="hours" placeholder="Hours" type="number" />
    </div>
  )
}
```

위 코드는 최종적으로 분을 입력하면 그것을 시간으로 바꿔줄 기능을 수행할 코드가 될 것이다.

JSX에서는 label tag에서 for 대신 htmlFor를 사용한다.

minutes input에 입력을 하면 onChange event가 호출되고, event가 전달돼서 event.target.value를 setMinutes에 인자로 전달하면 minutes의 값이 바뀌게 된다.

