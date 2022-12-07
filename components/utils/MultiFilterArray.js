function MultiFilterArray(array, filters) {
  const filterKeys = Object.keys(filters);


  return array.filter((item) => {

    return filterKeys.every(
      (key) => {
        if (String(item[key]).toLowerCase().includes(filters[key].toLowerCase())) return item;
        // return !!~String(item[key.toLowerCase()]).indexOf(filters[key.toLowerCase()]);
      }
    );
  });
}

export { MultiFilterArray };
