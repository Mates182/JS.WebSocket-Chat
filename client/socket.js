import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const getUsername = async () => {
  const username = localStorage.getItem('username')
  if (username) {
    console.log(`User existed ${username}`)
    return username
  }

  const res = await fetch('https://random-data-api.com/api/users/random_user')
  const { username: randomUsername } = await res.json()

  localStorage.setItem('username', randomUsername)
  return randomUsername
}
const socket = io({
  auth: {
    username: await getUsername(),
    serverOffset: 0
  }
})

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

socket.on('chat message', (msg, username) =>{
  if (socket.auth.username == username){
    console.log(username)
  }
  const item = `<li>
  <small>${username}:</small>
  <p>${msg}</p> 
  </li>`
  messages.insertAdjacentHTML('beforeend', item)
  messages.scrollTop = messages.scrollHeight
})

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    if(input.value){
        socket.emit('chat message', input.value)
        input.value = ''
    }
})