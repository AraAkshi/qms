import React, { useState, useEffect } from 'react';

const WordFlick = (props: { textString: string }) => {
	const { textString } = props;
	const [words, setWords] = useState(textString); // list of words to cycle through
	const [i, setI] = useState(0); // current word index
	const [offset, setOffset] = useState(0); // current offset in word
	const [forwards, setForwards] = useState(true); // direction of animation
	const [skipCount, setSkipCount] = useState(0); // number of times to skip a word
	const skipDelay = 2; // number of times to skip a word before reversing direction
	const speed = 70; // speed of animation in milliseconds

	useEffect(() => {
		const interval = setInterval(() => {
			if (forwards) {
				if (offset >= words.length) {
					setSkipCount(skipCount + 1);
					if (skipCount === skipDelay) {
						setForwards(false);
						setSkipCount(0);
					}
				} else {
					setOffset(offset + 1);
				}
			}
		}, speed);

		return () => clearInterval(interval);
	}, [words, i, offset, forwards, skipCount]);

	return <div className='sub-text'>{words.substr(0, offset)}</div>;
};

export default WordFlick;
