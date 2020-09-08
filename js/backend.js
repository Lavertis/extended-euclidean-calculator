class InputValidator {
    constructor(valid = null, errorMessage = null) {
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
            this.errorMessage = null
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
    createTable(resultArray, m, n)
    return new InputValidator(true)
}

class Table {
    constructor() {
        this.d = []
        this.d_prime = []
        this.s = []
        this.s_prime = []
        this.t = []
        this.t_prime = []
        this.q = []
    }
}

function calculateTable(m, n) {
    let table = new Table()
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
        table.d.push(d)
        table.d_prime.push(d_prime)
        q = Math.floor(d / d_prime)
        table.q.push(q)
        d_prime_temp = d_prime
        d_prime = d - q * d_prime
        d = d_prime_temp
        table.s.push(s)
        table.s_prime.push(s_prime)
        s_prime_temp = s_prime
        s_prime = s - s_prime * q
        s = s_prime_temp
        table.t.push(t)
        table.t_prime.push(t_prime)
        t_prime_temp = t_prime
        t_prime = t - t_prime * q
        t = t_prime_temp
    }
    table.s_prime.push("")

    return [fillTable(table), s, t, d]
}