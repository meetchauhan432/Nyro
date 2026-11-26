import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
export function NotificationsDrawer({ state, actions }) {
  const close = actions.close;
  return <Drawer title="Notifications" subtitle="Workspace updates" onClose={close}>
    <div className="notice">
      <Icon name="info" size={21} />
      <div>
        <b>Welcome to NYRO</b>
        <p>You are viewing a local demonstration. No live account notifications are connected.</p>
      </div>
    </div>
    <Button label="Close" onClick={close} className="btn outline-btn wide" />
  </Drawer>;
}
