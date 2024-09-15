const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')

const modal = document.getElementById('modal')

const overlay = document.getElementById('overlay')
let editItemId

const closeEl = document.getElementById('close')


let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []
//bunDA localStorage da malumot bollsa malumotni bolmasa bosh arrayni qaytarad
if (todos.length) showTodos()

//localStorage ga saqlash
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}
console.log(todos);
// localStorage dagi malumotni ekranga chiqarish
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = '' //inputga yangi makumot kiritilganida avva;gilari bn qoshib qayta qayta chiqarmasligi uxhun bosh stringa tenglanadi
    todos.forEach((item, index) => {
        listGroupTodo.innerHTML += `
            <li  id="username" class="list-group-item d-flex justify-content-between align-items-center">
                ${item.text} 
                <div class="buttons">
                    <button onclick=(editTodo(${index})) class="btn btn-outline-success">edit</button>
                    <button onclick=(deleteTodo(${index})) class="btn btn-outline-danger">delete</button>
                </div>
            </li>
        `
        //onclick boganda deleteTodo function ishga tushadi va qaysi item bosilga bosa ozini indexi beriladi
    })
}

// document.addEventListener("DOMContentLoaded", function() {
//     // LocalStorage'dan ma'lumotlarni olish
//     let datas = JSON.parse(localStorage.getItem('data'));

//     // Agar ma'lumotlar mavjud bo'lsa, ularni sahifada ko'rsatish
//     if (datas) {
//         document.getElementById('username').innerHTML += `
//         <li  id="username" class="list-group-item d-flex justify-content-between align-items-center">
//             ${datas.Username} 
//           <div class="buttons">
//              <button onclick=(editTodo(${index})) class="btn btn-outline-success">edit</button>
//            <button onclick=(deleteTodo(${index})) class="btn btn-outline-danger">delete</button>
//           </div>
//         </li>`;


//     } else {
//         document.getElementById('username').textContent = 'No data available.';
//     }
// });


//erorni korsatad
function showMassage(qayerga, nima) {
    document.getElementById(`${qayerga}`).textContent = nima
    setTimeout(() => {
        document.getElementById(`${qayerga}`).textContent = ''
    }, 2000)
}


formCreate.addEventListener('submit', (e) => {
    e.preventDefault() //inputni ichidagi malumotlar yangilanib ketmasligi uchun
    const todoTaxt = formCreate['input-create'].value.trim() //boshjoylarni tozlab yoq qib berad
    formCreate.reset() //bu inputni tozalab berad

    if (todoTaxt.length) {
        todos.push({
            text: todoTaxt
        })
        setTodos()
        showTodos()
    } else {
        showMassage('message-create', 'xatolik bor')
    }
})

//deleteTodo
function deleteTodo(id) {
    const deletedTodos = todos.filter((item, index) => {
        return index !== id
    })

    todos = deletedTodos
    setTodos() //ozgargan malumotlarini saqlab
    showTodos() //boshqattadan tuzib chiqad
}

//edit form
formEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoTaxt = formEdit['input-edit'].value.trim() //boshjoylarni tozlab yoq qib berad
    formEdit.reset() //bu inputni tozalab berad

    if (todoTaxt.length) {
        todos.splice(editItemId, 1, {
            text: todoTaxt
        })
        setTodos()
        showTodos()
        close()
    } else {
        showMassage('message-create', 'xatolik bor')
    }
})

//editTodo
function editTodo(id) {
    open()
    editItemId = id
}


//modal 
overlay.addEventListener('click', close) //overlay yani windov bosilganda close funcsiyasi ishga tushib madal yopilad
closeEl.addEventListener('click', close)
// document.addEventListener('keydown',(e)=>{
//   if(e.which = 27){
//     close()
//   }
// })


//open
function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
//close
function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}