function calculate_gcd() {
    let a = parseInt(document.getElementById("number_1").value, 10);
    let b = parseInt(document.getElementById("number_2").value, 10);

    if (a === 0 && b === 0) return;
    if (a !== a || b !== b) return;
    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) return;
    if ((a % 1 !== 0) || (b % 1 !== 0)) return;

    const a1 = a;
    const b1 = b;
    const signX = (a < 0) ? -1 : 1;
    const signY = (b < 0) ? -1 : 1;
    let x = 0;
    let y = 1;
    let u = 1;
    let v = 0;
    let q, r, m, n;
    a = Math.abs(a);
    b = Math.abs(b);

    while (a !== 0) {
        q = Math.floor(b / a);
        r = b % a;
        m = x - u * q;
        n = y - v * q;
        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }

    document.getElementById("result_nwd").innerText = "NWD = " + a1 + " × " + signX * x + " + " + b1 + " × " + signY * y + " = " + b;
    document.getElementById("result_s").innerText = "s: " + signX * x;
    document.getElementById("result_t").innerText = "t: " + signY * y;
}