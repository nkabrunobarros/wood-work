/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
function MultiFilterArray(array, filters) {
  const filterKeys = Object.keys(filters);

  return array.filter((item) => {
    const isMatch = filterKeys.every((key) => {
      if (Array.isArray(filters[key])) {
        return filters[key].some((filterValue) => {
          return String(item[key]).toLowerCase()?.includes(String(filterValue)?.toLowerCase());
        });
      }

      return String(item[key]).toLowerCase()?.includes(filters[key]?.toLowerCase());
    });

    return isMatch;
  });
}

export { MultiFilterArray };
