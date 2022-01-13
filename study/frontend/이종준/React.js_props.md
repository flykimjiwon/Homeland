# props

Props란?

- 속성을 나타내는 데이터

```
function Btn({ text, fontSize = 16 }) {
      return (
        <button
          style={{
            backgroundColor: "tomato",
            color: "white",
            padding: "10px 20px",
            border: 0,
            borderRadius: 10,
            fontSize,
          }}
        >
          {text}
        </button>
      )
    }
function App() {
      const [value, setValue] = React.useState("Save Changes")
      const changeValue = () => setValue("Revert Changes")
      return (
        <div>
          <Btn 
            text="Save Changes"
            fontSize={18}
          />
          <Btn 
            text={"Continue"}
          />
        </div>
      ) 
    }   
```

위 코드를 살펴보면, App() 내부에 Btn 컴포넌트 안에 text와 fontSize가 있다. 이렇게 컴포넌트 안에 데이터를 집어넣으면 이 데이터들이 props가 되어서, object 형식으로 데이터를 전달할 준비가 된다.

그러면 Btn()으로 props가 전달되는데, 이는 Btn(props) 형태로 받은 뒤 props.text와 같은 형식으로 받을 수 있다. 하지만 이 방식에도 shortcut이 있는데, Btn({ text, fontSize })와 같은 형식을 사용하면 props.text에서 앞에 props를 떼고 사용할 수 있다!

그런데 전달할 props의 type을 변경시키지 않고 싶을 때가 있을 것이다. 예를 들어 위에서처럼 text에는 string만 들어갈 수 있게, fontSize에는 숫자만 들어갈 수 있게 type을 지정해 주면 실수했을 때 오류가 생성되어 바로잡을 수 있을 것이다.

```
Btn.propTypes = {
      text: PropTypes.string.isRequired,
      fontSize: PropTypes.number,
    }
```

위와 같이 propTypes를 이용해서 type을 지정할 수 있다.

.isRequired는 데이터가 반드시 필요할 때 사용할 수 있다. 위와 같은 경우는 text가 반드시 props에 담겨 있어야 한다는 뜻이다.

이렇게 props를 이용해서 컴포넌트 간에 데이터를 주고받을 수 있다.
