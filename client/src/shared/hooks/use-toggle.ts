import React from 'react';

export function useToggle(openByDefault = false) {
  const [isOpen, setOpen] = React.useState(openByDefault);

  const open = React.useCallback(() => {
    setOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return { open, close, toggle, isOpen };
}
