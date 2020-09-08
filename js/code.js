function calculateGCD() {
    document.getElementById("table").innerHTML = ""
    let m = document.getElementById("number-1").value
    let n = document.getElementById("number-2").value

    if (!inputIsCorrect(m, n))
        return

    let table = ""
    table += openTable()
    const mToInt = parseInt(m, 10)
    const nToInt = parseInt(n, 10)
    let resultArray = fillTable(mToInt, nToInt)
    table += resultArray[0]
    const s = resultArray[1]
    const t = resultArray[2]
    const d = resultArray[3]
    table += closeTable(d, s, t)

    document.getElementById("result-gcd").innerHTML =
        "NWD = " + m + " × <strong>" + s + "</strong> + " + n + " × <strong>" + t + "</strong> = " + d
    document.getElementById("table").innerHTML = table
}

function inputIsCorrect(m, n) {
    let x = 0
    const reg = /^[-]?\d+$/;

    if (!(reg.test(m) && reg.test(n)))
        document.getElementById("result-gcd").innerText = "Niepoprawne dane"
    else if (m < 1 || n < 1)
        document.getElementById("result-gcd").innerText = "Liczby muszą być większe od 0"
    else
        x = 1

    return Boolean(x)
}

function fillTable(m, n) {
    let table = ""
    let d = m
    let d_prime = n
    let d_prime_temp
    let s = 1
    let s_prime = 0
    let s_prime_temp
    let t = 0
    let t_prime = 1
    let t_prime_temp
    let q

    while (d_prime !== 0) {
        table += "<tr><td>" + d + "</td><td>" + d_prime + "</td>"
        q = Math.floor(d / d_prime)
        d_prime_temp = d_prime
        d_prime = d - q * d_prime
        d = d_prime_temp
        table += "<td>" + s + "</td><td>" + s_prime + "</td>"
        s_prime_temp = s_prime
        s_prime = s - s_prime * q
        s = s_prime_temp
        table += "<td>" + t + "</td><td>" + t_prime + "</td>"
        t_prime_temp = t_prime
        t_prime = t - t_prime * q
        t = t_prime_temp
        table += "<td>" + q + "</td></tr>"
    }
    return [table, s, t, d]
}

function openTable() {
    return "<table><tr><th><span class='bold'>d</span></th><th><span class='bold'>d'</span></th><th>" +
        "<span class='bold'>s</span></th><th><span class='bold'>s'</span>" + "</th><th><span class='bold'>t</span>" +
        "</th><th><span class='bold'>t'</span></th><th><span class='bold'>q</span></th></tr>"
}

function closeTable(d, s, t) {
    return "<tr><td>" + d + "</td>" + "<td>" + 0 + "</td>" + "<td><strong>" + s +
        "</strong></td>" + "<td></td>" + "<td><strong>" + t + "</strong></td><td></td><td></td></tr></table>"
}