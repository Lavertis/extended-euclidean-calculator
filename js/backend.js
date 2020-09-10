function getGCDTable(m, n) {
    return calculateTable(m, n)
}

function calculateTable(m, n) {
    let tableArray = []
    let temp
    let d = m
    let d_prime = n
    let s = 1
    let s_prime = 0
    let t = 0
    let t_prime = 1
    let q = Math.floor(d / d_prime)

    while (d_prime !== 0) {
        addCurrentRowToArray(tableArray, d, d_prime, s, s_prime, t, t_prime, q)

        temp = d_prime
        d_prime = d - q * d_prime
        d = temp

        temp = s_prime
        s_prime = s - s_prime * q
        s = temp

        temp = t_prime
        t_prime = t - t_prime * q
        t = temp

        q = Math.floor(d / d_prime)
    }
    addCurrentRowToArray(tableArray, d, d_prime, s, s_prime, t, t_prime, q)

    return tableArray
}

class TableRow {
    constructor(d, d_prime, s, s_prime, t, t_prime, q) {
        this.d = d
        this.d_prime = d_prime
        this.s = s
        this.s_prime = s_prime
        this.t = t
        this.t_prime = t_prime
        this.q = q
    }
}

function addCurrentRowToArray(tableArray, d, d_prime, s, s_prime, t, t_prime, q) {
    const currentRow = new TableRow(d, d_prime, s, s_prime, t, t_prime, q)
    tableArray.push(currentRow)
}