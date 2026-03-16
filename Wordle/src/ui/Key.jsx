export default function Key({
    key,
    handlePress, 
    handleDel, 
    handleSubmit, 
    status
}) {
    if (key === 'ENTER') {
        return (
            <button className={status} onClick={handleSubmit}>{key}</button>
        )
    }
    if (key === 'DEL') {
        return (
            <button className={status} onClick={handleDel}>{key}</button>
        )
    }

    return (
        <button className={status} onClick={handlePress}>{key}</button>
    )
}