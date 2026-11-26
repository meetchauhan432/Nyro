import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
import { roleLevels } from '@features/members/domain/roles.js';
import { MemberField, MemberSelect } from './MemberFields.jsx';
export function CreateMemberDrawer({ state, actions }) {
  const memberField = (kind, label, field, placeholder, type = 'text') => <MemberField
    draft={state[kind]}
    onChange={(field, value) => actions.changeMemberDraft(kind, field, value)}
    {...{ label, field, placeholder, type }}
  />;
  const memberSelect = (kind, label, field, options) => <MemberSelect
    draft={state[kind]}
    onChange={(field, value) => actions.changeMemberDraft(kind, field, value)}
    {...{ label, field, options }}
  />;
  const d = state.createDraft;
  return <Drawer
    title="Create user"
    subtitle="Add a fictional member to your network"
    onClose={() => actions.close()}
    kind="drawer member-create-drawer"
  >
    <form onSubmit={e => actions.createMember(e)} className="member-form">
      <div className="form-section-label">
        <Icon name="users" size={18} />
        Account information
      </div>
      <div className="form-grid">
        {memberField('createDraft', 'Full name', 'name', 'e.g. Demo Member')}
        {memberField('createDraft', 'Mobile number', 'mobile', '9000001234')}
        {memberField('createDraft', 'Email address', 'email', 'member@example.invalid', 'email')}
        {memberField('createDraft', 'Region', 'region', 'e.g. Ahmedabad')}
        {memberField('createDraft', 'Shop / business name (optional)', 'shop', 'Business name')}
      </div>
      <div className="form-section-label">
        <Icon name="grid" size={18} />
        Network assignment
      </div>
      <div className="form-grid">
        {memberSelect('createDraft', 'Role', 'role', roleLevels)}
        {d.role === 'SA' ? <div className="field">
          <span className="field-label">Parent account</span>
          <p className="field-static">Top demo level</p>
        </div> : memberSelect('createDraft', 'Parent account', 'parent', [['', 'Select parent'], ...actions.parentsFor(d.role).map(m => [m.id, `${m.name} · ${m.id}`])])}
        {memberSelect('createDraft', 'Scheme', 'scheme', [['Default scheme', 'Default scheme'], ['Special scheme', 'Special scheme']])}
      </div>
      <div className="hint-box">
        <Icon name="info" size={17} />
        Demo only. Creates a local record with pending KYC; no credentials, messages or API calls.
      </div>
      {state.memberError && <p className="form-error" role="alert">{state.memberError}</p>}
      <div className="form-actions">
        <Button label="Cancel" onClick={() => actions.close()} className="btn outline-btn" />
        <button type="submit" className="btn primary-btn">
          <Icon name="plus" size={18} />
          Create demo user
        </button>
      </div>
    </form>
  </Drawer>;
}
