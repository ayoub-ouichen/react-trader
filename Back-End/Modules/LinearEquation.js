// Linear Equation Function
const linearEquation = (point_1, point_2, x) => {

    // Trouver la pente m
    const x_zero = point_2.x - point_1.x
    const y_zero = point_2.y - point_1.y
    const m = y_zero/x_zero

    // Trouver la constante b
    const b = point_1.y - (m * point_1.x)

    // Trouver le y
    const y = m * x + b

    return y
}

module.exports = linearEquation