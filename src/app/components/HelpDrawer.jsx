import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
export function HelpDrawer({ actions }) {
  const close = actions.close;
  return <Drawer title="About NYRO" subtitle="Financial workspace prototype" onClose={close}>
    <p className="muted">This is a local, fictional frontend demonstration inspired by AquaPay workflows and designed for NYRO Technologies. It does not connect to a bank, payment gateway or production API.</p>
    <Button label="Close" onClick={close} className="btn outline-btn wide" />
  </Drawer>;
}
