const CanDo = (props) => {
    
    const me = JSON.parse(localStorage.getItem('user'));

    return !!me.perfil.permissoes.find(ele => ele.accao === props[0].toUpperCase() && ele.sujeito === props[1])

}

export default CanDo;
