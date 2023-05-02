const IsInternal = (profileName) => {
  const internalProfiles = ['ADMIN', 'WORKER'];

  if (internalProfiles.find(profile => profile === profileName)) return true;

  return false;
};

export default IsInternal;
