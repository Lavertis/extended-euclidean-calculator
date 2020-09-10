/**
 * Sends a request for GCD calculation after checking for valid input.
 */
function buttonClick() {
    document.getElementById("table").innerHTML = ""
    const m = parseInt(document.getElementById("number-1").value, 10)
    const n = parseInt(document.getElementById("number-2").value, 10)

    const inputValidator = new InputValidator(m, n)

    if (!inputValidator.valid)
        showErrorMessage(inputValidator.errorMsg)
    else
        showResultOnPage(m, n)
}

/**
 * Creates a new InputValidator. Validates the input at the moment of object creation.
 * @class
 */
class InputValidator {
    #m = 0
    #n = 0

    constructor(m, n) {
        this.#m = m
        this.#n = n
        this.valid = false
        this.errorMsg = ""
        this.#validate()
    }

    // By default the input is invalid, which can be only changed at the moment of object creation by this function
    #validate() {
        if (!(Number.isInteger(this.#m) && Number.isInteger(this.#n))) // Check if both numbers are integers
            this.errorMsg = "Incorrect data"
        else if (this.#m < 1 || this.#n < 1) // Check if numbers are greater than 0
            this.errorMsg = "Numbers must be greater than 0"
        else // Mark the input as valid
            this.valid = true
    }
}

/**
 * Displays error message.
 * @param {String} msg Error message
 */
function showErrorMessage(msg) {
    document.getElementById("equation").innerText = msg
}

/**
 * Shows whole result on page.
 * @param {Number} num1 The first number
 * @param {Number} num2 The second number
 */
function showResultOnPage(num1, num2) {
    const resultArray = getGCDTable(num1, num2)
    const final_s = resultArray[resultArray.length - 1].s
    const final_t = resultArray[resultArray.length - 1].t
    const final_d = resultArray[resultArray.length - 1].d

    displayEquation(num1, num2, final_s, final_t, final_d)
    displayTable(resultArray, final_d, final_s, final_t)
}

/**
 * Displays equation.
 * @param {Number}  num1 The first number
 * @param {Number}  num2 The second number
 * @param {Number}  s    First multiplier
 * @param {Number}  t    Second multiplier
 * @param {Number}  d    GCD result
 */
function displayEquation(num1, num2, s, t, d) {
    document.getElementById("equation").innerHTML =
        "GCD(" + num1 + ", " + num2 + ") = " + num1 + " × <strong>" + s + "</strong> + " + num2 + " × <strong>" + t + "</strong> = " + d
}

/**
 * Displays the GCD table.
 * @param {Array}   tableArray Array of TableRow objects
 * @param {Number}  d GCD result
 * @param {Number}  s First multiplier
 * @param {Number}  t Second multiplier
 */
function displayTable(tableArray, d, s, t) {
    let table = ""
    table += openTable()
    table += fillTable(tableArray)
    table += closeTable(d, s, t)
    document.getElementById("table").innerHTML = table
}

/**
 * Creates rows of the table.
 * @param   {Array} tableArray Array of TableRow objects
 * @return  {String}           Rows of the GCD table with html tr, td tags
 */
function fillTable(tableArray) {
    let table = ""
    for (let i = 0; i < tableArray.length - 1; i++) {
        table += "<tr><td>" + tableArray[i].d + "</td><td>" + tableArray[i].d_prime + "</td>"
        table += "<td>" + tableArray[i].s + "</td><td>" + tableArray[i].s_prime + "</td>"
        table += "<td>" + tableArray[i].t + "</td><td>" + tableArray[i].t_prime + "</td>"
        table += "<td>" + tableArray[i].q + "</td></tr>"
    }
    return table
}

/**
 * Creates table header.
 * @return {string} Table header with html th tags
 */
function openTable() {
    return "<table><tr><th><strong>d</strong></th><th><strong>d'</strong></th><th>" +
        "<strong>s</strong></th><th><strong>s'</strong>" + "</th><th><strong>t</strong>" +
        "</th><th><strong>t'</strong></th><th><strong>q</strong></th></tr>"
}

/**
 * Creates last table row.
 * @param {Number}  d GCD result
 * @param {Number}  s First multiplier
 * @param {Number}  t Second multiplier
 * @return {string}   Last table row with table closing html tags
 */
function closeTable(d, s, t) {
    return "<tr><td><strong>" + d + "</strong></td>" + "<td>" + 0 + "</td>" + "<td><strong>" + s +
        "</strong></td>" + "<td></td>" + "<td><strong>" + t + "</strong></td><td></td><td></td></tr></table>"
}