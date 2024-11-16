import { useState } from 'react';

function useReloadingButton(handleSubmit) {
  const [buttonText, setButtonText] = useState('Save Changes');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    setButtonText('Reloading...');
    setIsDisabled(true);

    await handleSubmit(event);

    setTimeout(() => {
      setButtonText('Save Changes');
      setIsDisabled(false);
    }, 2000);
  };

  return { buttonText, isDisabled, handleClick };
}

export default useReloadingButton;
