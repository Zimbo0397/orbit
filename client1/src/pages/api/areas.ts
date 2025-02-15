const apiUrl = 'http://localhost:3000/api';

export function getAreas() {
    return fetch(`${apiUrl}/areas`).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err);
    })
}

export function addArea(data) {

    return fetch(`${apiUrl}/areas`, {
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