export default function GameStartShell({
    setGameStart,
    gameResume
    }) {
        function handleClick() {
            setGameStart(true);
        }

        return (
            <button className='startButton' onClick={handleClick} >{gameResume ? "Resume" : "Play"}</button>
        );
    }