import styled from "styled-components";
import { useEffect, useState } from "react";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .cre{
    width: 100%;
  }

  li{
    margin-top: 30px;
  }

  span{
    margin-left: 20px;
  }

  button{
    margin: 8px;
    width: 80px;
    font-size: 150%;
  }

  .info{
    display: flex;
    justify-content: space-between;
  }

  .total{
    margin-top: 20px;
  }
`

function App() {

  const [info, setInfo] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/shoping_list`)
    .then((response) => response.json())
    .then((data) => {
      setInfo(data)
    }, [])

  })

  const handleQuantityButton = (id) => {

    

    let putData = {
      'id' : info[id].id,
      'name' : info[id].name,
      'quantity' : info[id].quantity += 1,
      'price' : info[id].price
    }

    fetch(`http://localhost:3001/shoping_list/${id}`, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(putData)
    }).then(() => {
      console.log('더하기')
    }).catch(() => {
      console.log('err')
    })

  }

  const handleQuantityButton2 = (id) => {

    let reesult = info[id].quantity - 1

    if(info[id].quantity === 0){
      reesult = 0
    }

    let putData = {
      'id' : info[id].id,
      'name' : info[id].name,
      'quantity' : reesult,
      'price' : info[id].price
    }

    fetch(`http://localhost:3001/shoping_list/${id}`, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(putData)
    }).then(() => {
      console.log('빼기')
    }).catch(() => {
      console.log('err')
    })

  }

  const handleCreate = (e) => {

    e.preventDefault();

    let cre = {
      "id" : info.length,
      "name" : "생성됐다",
      "quantity" : 0 ,
      "price" : 9999
    }

      fetch(`http://localhost:3001/shoping_list`, {
        method: 'POST',
        headers: { 'content-Type' : 'application/json'},
        body: JSON.stringify(cre)
      }).then(() => {
        console.log('생성됐다!')
      }).catch(() => {
        console.log('err')
      })
  }

  const handleDlelte = (id) => {

    fetch(`http://localhost:3001/shoping_list${id}`,{
      method: "DELETE"
    }).then(() => {
      console.log("삭제됐다!")
    }).catch(() => {
      console.log("err")
    })
  }


  return (
    <Style>
      <div>
        {info.map((el) => {
          return (
            <div key={el.id}>
              <li>{el.name}</li>
              <div className="info">
                <span>{el.price}</span>
                <span>{el.quantity}</span>
              </div>
              <button onClick={() => {
                handleQuantityButton(el.id)
              }}>+</button>
              <button onClick={() => {
                handleQuantityButton2(el.id);
              }}>-</button>
                <button onClick={() => {
                  handleDlelte(el.id)
                }}>삭제</button>
            </div>
          )
        })}
        <div>
          <button className="cre" onClick={handleCreate}>생성</button>
        </div>
      </div>
    </Style>
  );
}

export default App;
