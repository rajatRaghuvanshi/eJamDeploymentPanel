
const isNull = data => {
    return data === null || data === undefined;
}

const isDataEmpty = data => {
    if (isNull(data)) return true;
    if (
        data.constructor === String &&
        (data.length === 0 || data === ' ')
      ) {
        return true;
    }
    if (
        (data.constructor === Object && Object.keys(data).length === 0) ||
        (data.constructor === Array && data.length === 0)
    ) {
        return true;
    }
    return false;
}

module.exports ={
    isNull,
    isDataEmpty
}