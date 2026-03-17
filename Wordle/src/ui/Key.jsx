export default function Key({
    icon,
    handlePress, 
    handleDel, 
    handleSubmit, 
    status
}) {
    if (icon === 'ENTER') {
        return (
            <button id={icon} className={status} onClick={handleSubmit}>{icon}</button>
        )
    }
    if (icon === 'DEL') {
        return (
            <button id={icon} className={status} onClick={handleDel}>{icon}</button>
        )
    }

    return (
        <button id={icon} className={status} onClick={handlePress}>{icon}</button>
    )
}