import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
export function AccountDrawer({ state, actions }) {
  const close = actions.close;
  return <Drawer title="Demo account" subtitle="Local workspace preferences" onClose={close}>
    <div className="notice">
      <span className="avatar">JD</span>
      <div>
        <b>Jordan Davis</b>
        <p>Fictional operator account</p>
      </div>
    </div>
    <Button
      label={state.hidden ? 'Show wallet amounts' : 'Hide wallet amounts'}
      onClick={() => actions.setState({ hidden: !state.hidden })}
      className="btn outline-btn wide"
      iconName={state.hidden ? 'eye' : 'eyeoff'}
    />
    <button
      className="btn outline-btn wide"
      onClick={() => actions.setState({ ambientMotion: !state.ambientMotion })}
      aria-pressed={!state.ambientMotion}
    >
      {state.ambientMotion ? 'Pause wallet background motion' : 'Resume wallet background motion'}
    </button>
    <Button
      label="Reset demo data"
      onClick={actions.resetDemo}
      className="btn outline-btn wide"
      iconName="refresh"
    />
  </Drawer>;
}
