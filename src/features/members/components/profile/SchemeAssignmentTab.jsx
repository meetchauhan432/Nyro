import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { MemberSelect } from '../MemberFields.jsx';
export function SchemeAssignmentTab({ state, actions, member, children }) {
  const memberSelect = (kind, label, field, options) => <MemberSelect
    draft={state[kind]}
    onChange={(field, value) => actions.changeMemberDraft(kind, field, value)}
    {...{ label, field, options }}
  />;
  const note = text => <div className="hint-box">
    <Icon name="info" size={17} />
    {text}
  </div>;
  const error = state.memberError && <p className="form-error" role="alert">{state.memberError}</p>;
  return <div className="member-form">
    <SectionTitle title="Scheme assignment" desc="Select a demonstration scheme for this member." />
    {memberSelect('profileDraft', 'Assigned scheme', 'scheme', [['Default scheme', 'Default scheme'], ['Special scheme', 'Special scheme']])}
    {note('Scheme assignment is local only; no charges or commissions are calculated.')}
    {error}
    <div className="form-actions">
      <Button
        label="Save scheme"
        onClick={() => actions.saveAssignment('scheme')}
        className="btn primary-btn"
        iconName="check"
      />
    </div>
  </div>;
}
