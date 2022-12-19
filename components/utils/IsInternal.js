const IsInternal = (profileName) => {
    const internalProfiles = ['Admin'];

    if (internalProfiles.find(profile => profile === profileName)) return true;

    return false;
};

export default IsInternal;
