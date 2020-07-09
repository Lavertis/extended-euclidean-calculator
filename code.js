function calculate_gcd() {
    const m = parseInt(document.getElementById("number_1").value, 10);
    const n = parseInt(document.getElementById("number_2").value, 10);
    if (!input_is_correct(m, n))
        return;

    let table = ""
    table += open_table()
    let result_array = fill_table(m, n)
    table += result_array[0]
    const s = result_array[1]
    const t = result_array[2]
    const d = result_array[3]
    table += close_table(d, s, t)

    document.getElementById("result_gcd").innerText = "NWD = " + m + " × (" + s + ") + " + n + " × (" + t + ") = " + d;
    document.getElementById("table").innerHTML = "";
    document.getElementById("table").innerHTML = table;
}

function input_is_correct(m, n) {
    let x = 1;
    if (m % 1 !== 0 || n % 1 !== 0 || m === Infinity || m === -Infinity || n === Infinity || n === -Infinity) {
        document.getElementById("result_gcd").innerText = "Niepoprawne dane"
        x = 0;
    } else if (m < 1 || n < 1) {
        document.getElementById("result_gcd").innerText = "Liczby muszą być większe od 0";
        x = 0;
    }
    document.getElementById("table").innerHTML = "";
    return Boolean(x)
}

function fill_table(m, n) {
    let table = "";
    let d = m;
    let d_prime = n;
    let d_prime_temp;
    let s = 1;
    let s_prime = 0;
    let s_prime_temp;
    let t = 0;
    let t_prime = 1;
    let t_prime_temp;
    let q;

    while (d_prime !== 0) {
        table += "<tr><td>" + d + "</td><td>" + d_prime + "</td>";
        q = Math.floor(d / d_prime);
        d_prime_temp = d_prime;
        d_prime = d - q * d_prime;
        d = d_prime_temp;
        table += "<td>" + s + "</td><td>" + s_prime + "</td>";
        s_prime_temp = s_prime;
        s_prime = s - s_prime * q;
        s = s_prime_temp;
        table += "<td>" + t + "</td><td>" + t_prime + "</td>";
        t_prime_temp = t_prime;
        t_prime = t - t_prime * q;
        t = t_prime_temp;
        table += "<td>" + q + "</td></tr>";
    }
    return [table, s, t, d]
}

function open_table() {
    return "<table><tr><th><span class='bold'>d</span></th><th><span class='bold'>d'</span></th><th>" +
        "<span class='bold'>s</span></th><th><span class='bold'>s'</span>" + "</th><th><span class='bold'>t</span>" +
        "</th><th><span class='bold'>t'</span></th><th><span class='bold'>q</span></th></tr>";
}

function close_table(d, s, t) {
    return "<tr><td>" + d + "</td>" + "<td>" + 0 + "</td>" + "<td>" + s + "</td>" + "<td></td>" + "<td>" + t +
        "</td><td></td><td></td></tr></table>";
}