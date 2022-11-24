const IsInternal = (profileName) => {
    const internalProfiles = ['Admin'];

    if (internalProfiles.find(profile => profile === profileName)) return true;
    else return false;

};

export default IsInternal;
