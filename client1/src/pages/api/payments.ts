const apiUrl = 'http://localhost:3000/api';




export function getPaymentsTypes() {
    return fetch(`${apiUrl}/paymentsTypes`).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err);
    })
}

export function addPayment(data) {

    return fetch(`${apiUrl}/payments`, {
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