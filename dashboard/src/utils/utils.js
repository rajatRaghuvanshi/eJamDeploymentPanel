
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

const sortDataByDate = (data, keyToSort) => {
    // expecting data as "array of objects"
    if (isDataEmpty(data)) return [];
    return data.sort((itemA, itemB) => {
      //getting sorted data in descending order
      return new Date(itemB[keyToSort]) - new Date(itemA[keyToSort]);
    });
};

module.exports ={
    isNull,
    isDataEmpty,
    sortDataByDate
}