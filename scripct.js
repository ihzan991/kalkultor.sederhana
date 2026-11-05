
const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteNumber() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;

        // Validasi karakter yang diperbolehkan
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Input tidak valid");
        }

        if (!expression.trim()) return;

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Hasil tidak valid");
        }

        display.value = Number(result.toFixed(10)).toString();

    } catch (error) {
        display.value = "Error";
    }
}

// Dukungan keyboard
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/^[0-9.+\-*/%]$/.test(key)) {
        appendValue(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        deleteNumber();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
