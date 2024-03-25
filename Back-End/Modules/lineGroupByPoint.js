const lineGroupByPoint = (linePoints) => {
    const lineCategory = linePoints.reduce((acc, obj) => {
        const key = obj.lineIndex;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
    const group = Object.values(lineCategory).map((value, index) => { return {line: index, points: value}})
    return group
}

module.exports = lineGroupByPoint