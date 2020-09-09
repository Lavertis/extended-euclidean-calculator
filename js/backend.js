class InputValidator {
    constructor(valid = true, errorMessage = "") {
        this.valid = valid
        this.errorMessage = errorMessage
    }

    isCorrect(m, n) {
        const reg = /^[-]?\d+$/;

        if (!(reg.test(m) && reg.test(n))) {
            this.valid = false
            this.errorMessage = "Incorrect data"
        } else if (m < 1 || n < 1) {
            this.valid = false
            this.errorMessage = "Numbers must be greater than 0"
        } else {
            this.valid = true
            this.errorMessage = ""
        }
    }
}

function calculateGCD(m, n) {
    let inputValidator = new InputValidator()
    inputValidator.isCorrect(m, n)

    if (!inputValidator.valid) {
        return inputValidator
    }

    const mToInt = parseInt(m, 10)
    const nToInt = parseInt(n, 10)
    let resultArray = calculateTable(mToInt, nToInt)
    displayTable(resultArray, m, n)
    return new InputValidator(true)
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

function calculateTable(m, n) {
    let tableArray = []
    let d = m
    let d_prime = n
    let d_prime_temp
    let s = 1
    let s_prime = 0
    let s_prime_temp
    let t = 0
    let t_prime = 1
    let t_prime_temp
    let q = Math.floor(d / d_prime)

    while (d_prime !== 0) {
        addCurrentRowToArray(tableArray, d, d_prime, s, s_prime, t, t_prime, q)

        d_prime_temp = d_prime
        d_prime = d - q * d_prime
        d = d_prime_temp

        s_prime_temp = s_prime
        s_prime = s - s_prime * q
        s = s_prime_temp

        t_prime_temp = t_prime
        t_prime = t - t_prime * q
        t = t_prime_temp

        q = Math.floor(d / d_prime)
    }

    return [fillTable(tableArray), s, t, d]
}

function addCurrentRowToArray(tableArray, d, d_prime, s, s_prime, t, t_prime, q) {
    let currentRow = new TableRow(d, d_prime, s, s_prime, t, t_prime, q)
    tableArray.push(currentRow)
}