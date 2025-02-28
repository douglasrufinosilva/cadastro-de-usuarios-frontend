import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  
  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    inputName.current.value = ""
    inputAge.current.value = ""
    inputEmail.current.value = ""
  }

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios")

    setUsers(usersFromApi.data)
  }

  async function deleteUsers(id) {
    await api.delete(`usuarios/${id}`)
  }

  useEffect(() => {
    getUsers()
  }, [users])

  return (
    <>
      <div className='container'>
        <form className='form-container'>
          <h1>Cadastro de Usuários</h1>

          <input name="name" type="text" placeholder="Nome" ref={inputName}/>
          <input name="age" type="number" placeholder='Idade' ref={inputAge}/>
          <input name='email' type="email" placeholder='E-mail' ref={inputEmail}/>
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>

        {
          users.map( user => (
            <div key={user.id} className='card'>
              <div>
                <p>Nome: <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>E-mail: <span>{user.email}</span></p>
              </div>
              
              <button onClick={() =>deleteUsers(user.id)}>
                <img src={Trash} alt="Deletar"/>
              </button>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default Home
