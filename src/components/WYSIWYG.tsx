import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

interface WYSIWYGProps {
    placeholder?: string;
	content: string;
	setContent: ({question, answer}: val) => void
}

type val= {
	question: string,
	answer: string
}

const WYSIWYG: React.FC<WYSIWYGProps>= ({ placeholder,content,setContent }) => {

    const editor = useRef(null);
	// const [content, setContent] = useState('');

	const config = useMemo(() => ({
			readonly: false,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);

    return(
        <JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent((prev) => ({ ...prev, answer:newContent }))}
		/>
    );
}

export default WYSIWYG;