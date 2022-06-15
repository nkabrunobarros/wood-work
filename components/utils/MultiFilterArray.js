function MultiFilterArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    // flipped around, and item[key] forced to a string
    return filterKeys.every(
      (key) => !!~String(item[key]).indexOf(filters[key])
    );
  });
}
export { MultiFilterArray };