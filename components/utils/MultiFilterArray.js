/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
function MultiFilterArray (array, filters) {
  const filterKeys = Object.keys(filters);

  return array.filter((item) => {
    return filterKeys.every(
      (key) => {
        if (String(item[key]).toLowerCase().includes(filters[key].toLowerCase())) return item;
      }
    );
  });
}

export { MultiFilterArray };
