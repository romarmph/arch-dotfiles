import { Variable } from 'resource:///com/github/Aylur/ags/variable.js'
import { allRevealers } from 'src/Panels/revealers';

export default function(revealer: Variable<boolean>) {
  const hide = () => {
    allRevealers.forEach((variable) => {
      if (revealer === variable) return;
      variable.value = false;
    });
  }
  return {
    toggle: () => {
      hide();
      revealer.value = !revealer.value;
    },
    open: () => {
      hide();
      revealer.value = true;
    },
    close: () => {
      revealer.value = false;
    },
  }
}

