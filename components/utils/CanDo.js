
const CanDo = (props) => {
  return !!props[2]?.permissions_orion.find(ele => ele === props[0].toUpperCase() && ele?.subject === props[1]?.toLowerCase());
};

export default CanDo;
