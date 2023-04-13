const calculateBmi = (height: number, weight: number):String => {
    const bmi = weight / ((height / 100)**2)
    if (bmi <= 25) {
        return "Normal (healthy weight)"
    }
    if (bmi <= 29) {
        return "Overweight"
    }
    return "Obese"
}

console.log(calculateBmi(180, 74))
console.log(calculateBmi(184, 150))