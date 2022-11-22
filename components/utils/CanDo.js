const CanDo = (props) => {
    const me = JSON.parse(localStorage.getItem('user'));

    // TODO: Quando tiver no fireware, trocar isto para aceitar novos campos
    return !!me.perfil.permissoes.find(ele => ele.accao === props[0].toUpperCase() && ele.sujeito === props[1]);
};

export default CanDo;
