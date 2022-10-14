function MultiFilterArray(array, filters) {
  const filterKeys = Object.keys(filters);

  console.log(filters)

  return array.filter((item) => {
    return filterKeys.every(
      (key) => !!~String(item[key]).indexOf(filters[key])
    );
  });
}

export { MultiFilterArray };
