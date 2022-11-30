function MultiFilterArray(array, filters) {
  const filterKeys = Object.keys(filters);


  return array.filter((item) => {
    return filterKeys.every(
      (key) => !!~String(item[key.toLowerCase()]).indexOf(filters[key.toLowerCase()])
    );
  });
}

export { MultiFilterArray };
