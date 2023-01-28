const selectElements = document.querySelectorAll('select')
console.log(selectElements);
const input = document.querySelector('.val_input')
console.log(input);
const output = document.querySelector('.val_output')
console.log(output);
const btn = document.querySelector('button')
console.log(btn);

get_currencies()
async function get_currencies () {
    const resp = await fetch('https://api.frankfurter.app/currencies')
    console.log(resp);
    const respData = await resp.json()
    console.log(respData);

    show_to_dom(respData)
}

function show_to_dom (data) {
    const entries = Object.entries(data)
    console.log(entries);
    for(let i = 0; i < entries.length; i++) {
        const option = document.createElement('option')
        console.log(option);
        option.value = `${entries[i][0]}`
        option.innerText = `${entries[i][0]}`

        selectElements[0].appendChild(option)
        selectElements[1].appendChild(option.cloneNode(option))
    }
}

btn.addEventListener('click', () => {
    let currency1 = selectElements[0].value;
    console.log(currency1);
    let currency2 = selectElements[1].value;
    console.log(currency2);
    let value = input.value;
    console.log(value);

    if (currency1 != currency2) {
        completeConversion(currency1, currency2, value)
    } else {
        const p = document.createElement('p')
        console.log(p);
        p.innerText = `ALERT: Choose a different currency`
        p.classList.add('alert')
        document.querySelector('.container').appendChild(p)
        setTimeout(() => {
            p.style.display = 'none'
        }, 3000)
    }
})

async function completeConversion(currency1, currency2, value) {
    const host = 'api.frankfurter.app'
    console.log(host);
    const resp = await fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
    const respData = await resp.json()
    output.value = Object.values(respData.rates)[0]
}