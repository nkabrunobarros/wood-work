import { useSelector } from 'react-redux';

export const getMe = async () => {
  const auth = useSelector((state) => state.auth);

  if (auth.me) return auth.me;

  // const u = await me();

  return 'u.payload.data.data;';
};
