// delete  successive local max/min points


const deleteMaxMinSuite = (pointsArry) => {
    const newPointsArry = []
    for (let i = 0; i < pointsArry.length; i++) {
        const current = pointsArry[i];
        const next = pointsArry[i + 1];
        const previous = pointsArry[i - 1];

        if (i === 0 || i === pointsArry.length - 1) {
            newPointsArry.push(current);
        } else if (current.type === 'max' && (current.y > next.y) && (current.y >= previous.y)) {
            newPointsArry.push(current);
        } else if (current.type === 'min' && (current.y < next.y) && (current.y <= previous.y)) {
            newPointsArry.push(current);
        }
    }
    return newPointsArry
}

module.exports = deleteMaxMinSuite