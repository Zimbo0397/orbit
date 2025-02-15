
const apiUrl = 'http://localhost:3000/api';

export function getExpenses() {

    return fetch(`${apiUrl}/users`).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err);
    })
}