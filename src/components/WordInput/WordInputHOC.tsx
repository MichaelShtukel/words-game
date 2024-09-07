import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { useDeviceSelectors } from 'react-device-detect';
import MobileWordInput from './MobileWordInput';
import WordInput from './WordInput';

interface Props {
  letters: string[];
  setSelectedWord: Dispatch<SetStateAction<string>>
}

const WordInputHOC: FC<PropsWithChildren<Props>> = ({children, ...props}) => {
  const [{ isMobile }] = useDeviceSelectors(window.navigator.userAgent)

  if (isMobile) {
    return (
      <MobileWordInput {...props}>
        {children}
      </MobileWordInput>
    );
  }

  return (
    <WordInput {...props}>
      {children}
    </WordInput>
  );
}

export default WordInputHOC;
