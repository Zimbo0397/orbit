
const apiUrl = 'http://localhost:3000/api';

export function addExpenses(data) {

    return fetch(`${apiUrl}/expenses`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err);
    })
}

export function addExpensesType(data) {

    return fetch(`${apiUrl}/expensesTypes`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err);
    })
}

