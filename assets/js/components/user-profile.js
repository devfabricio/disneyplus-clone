const UserProfile = (props) => {
    return `
        <li class="user-menu__item" data-id="${props.id}">
            <div class="user-profile user-profile">
                <img src="${props.avatar}" alt="imagem do perfil" class="user-profile__avatar">
                <span class="user-profile__title">${props.name}</span>
            </div>
        </li>
    `;
};

export default UserProfile
