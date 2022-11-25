const CanDo = (props) => {
    const me = JSON.parse(localStorage.getItem('user'));

    // TODO: Quando tiver no fireware, trocar isto para aceitar novos campos
    return !!me.profile.object.permissions.find(ele => ele.action === props[0].toUpperCase() && ele?.subject === props[1]?.toLowerCase());
};

export default CanDo;
