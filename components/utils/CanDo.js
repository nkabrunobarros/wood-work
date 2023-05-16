import { useSelector } from 'react-redux';

const CanDo = (props) => {
  const permissions = useSelector((state) => state.auth.userPermissions.permissions_orion);

  return permissions.find(ele => ele === props);
};

export default CanDo;
