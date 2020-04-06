/* eslint-disable no-unused-vars */

const deleteProducer = clickedId => {
    fetch('admin', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: clickedId }),
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
}

const deleteProduct = (clickedProduct, currentProducer) => {
    fetch('/producer', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clickedProduct, currentProducer }),
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            window.location.reload(true)
            console.log(data)
        })
}

const refillProduct = (clickedProduct, currentProducer) => {
    const amountToRefill = document.getElementsByName(clickedProduct)[0].value
    if (amountToRefill == '') {
        alert('Fyll i ett värde!')
    } else {
        fetch('/producer', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amountToRefill, clickedProduct, currentProducer }),
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(data => {
                window.location.reload(true)
                console.log(data)
            })
    }
}
