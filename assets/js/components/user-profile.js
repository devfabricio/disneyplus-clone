const UserProfile = (props) => {
    return `
        <li class="user-menu-item" data-id="${props.id}">
            <div class="user-profile user-profile">
                <img class="user-profile-avatar" src="${props.avatar}"/>
                <span class="user-profile-title">${props.name}</span>
            </div>
        </li>
    `
}

export default UserProfile