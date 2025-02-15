
const apiUrl = 'http://localhost:3000/api';

export function getExpensesTypes() {

    return fetch(`${apiUrl}/expensesTypes`).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err);
    })
}

