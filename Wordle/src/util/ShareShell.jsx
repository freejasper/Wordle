export default function ShareShell({
    inputStatus,
    currentGuess
    }) {
    async function copyText(textToCopy) {
        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
    }

    function handleShare() {
        const shareText = inputStatus.map((statusGroup, index) => {
            if ((currentGuess - 1) >= index) {
                return statusGroup.map((status) => {
                    if (status === 'green') return '🟩';
                    if (status === 'yellow') return '🟨';
                    return '⬜';
                });
            }
        }).filter(Boolean);

        const score = `Your score: (${currentGuess > 6 ? '6' : currentGuess}/6)`;
        return copyText(`${score}\n${shareText.map(group => group.join('')).join('\n')}`);
    }

    return (
        <>
            <button className='shareButton' onClick={handleShare}>Share score</button>
        </>
    )
}