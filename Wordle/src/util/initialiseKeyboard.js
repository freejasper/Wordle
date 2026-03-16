export function initialiseKeyboard(press, submit, del) {
    const lineOne = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const lineTwo = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const lineThree = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

    let tempOne = [];
    let tempTwo = [];
    let tempThree = [];

    lineOne.forEach((letter) => {
      tempOne.push(<button id={letter} className='keyboard' onClick={press}>
        {letter.toUpperCase()}
      </button>);
    });
    lineTwo.forEach((letter) => {
      tempTwo.push(<button id={letter} className='keyboard' onClick={press}>
        {letter.toUpperCase()}
      </button>);
    });
    lineThree.forEach((letter) => {
      tempThree.push(<button id={letter} className='keyboard' onClick={press}>
        {letter.toUpperCase()}
      </button>);
    });

    const enter = <button id="enter" className="key" onClick={submit}>
      Enter
    </button>;
    const backspace = <button id="backspace" className="key" onClick={del}>
      Backspace
    </button>;

    tempThree.shift(enter);
    tempThree.push(backspace);

    return [tempOne, tempTwo, tempThree];
  }