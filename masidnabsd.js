let btn = document.getElementById('btn')

btn.addEventListener('click', async()=>{
    const api = await fetch('https://dummyjson.com/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const {users} = await api.json()
    users.forEach(user => {
        console.log(user)
    });
})
