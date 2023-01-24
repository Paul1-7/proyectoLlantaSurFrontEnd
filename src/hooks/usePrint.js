import { useCallback, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrint = ({ fileName = 'file' } = {}) => {
  const componentToPrintRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);

  const [loadingPrint, setLoadingPrint] = useState(false);
  const [text, setText] = useState('old boring text');

  const handleAfterPrint = useCallback(() => {}, []);

  const handleBeforePrint = useCallback(() => {}, []);

  const handleOnBeforeGetContent = useCallback(() => {
    setLoadingPrint(true);
    setText('Loading new text...');

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoadingPrint(false);
        setText('New, Updated Text!');
        resolve();
      }, 2000);
    });
  }, [setLoadingPrint, setText]);

  const reactToPrintContent = useCallback(() => componentToPrintRef.current, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: fileName,
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  useEffect(() => {
    if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
      onBeforeGetContentResolve.current();
    }
  }, [text]);
  return { loadingPrint, handlePrint, componentToPrintRef };
};
