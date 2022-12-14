import { useCallback, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrint = ({ fileName = 'file' } = {}) => {
  const componentToPrintRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);

  const [loadingPrint, setLoadingPrint] = useState(false);
  const [text, setText] = useState('old boring text');

  const handleAfterPrint = useCallback(() => {
    console.log('`onAfterPrint` called'); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log('`onBeforePrint` called'); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    console.log('`onBeforeGetContent` called'); // tslint:disable-line no-console
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
    removeAfterPrint: true
  });

  useEffect(() => {
    if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
      onBeforeGetContentResolve.current();
    }
  }, [text]);

  // return (
  //   <div>
  //     {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
  //     <button onClick={handlePrint}>Print using a Functional Component with the useReactToPrint hook</button>
  //     <ComponentToPrint ref={componentRef} text={text} />
  //   </div>
  // );
  return { loadingPrint, handlePrint, componentToPrintRef };
};
