
const CanDo = (props) => {
  return !!props[2].permissions.find(ele => ele.action === props[0].toUpperCase() && ele?.subject === props[1]?.toLowerCase());
};

export default CanDo;
