import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { roleName } from '../../domain/roles.js';
import { MemberField } from '../MemberFields.jsx';
export function ProfileDetailsTab({ state, actions, member, children }) {
  const memberField = (kind, label, field, placeholder, type = 'text') => <MemberField
    draft={state[kind]}
    onChange={(field, value) => actions.changeMemberDraft(kind, field, value)}
    {...{ label, field, placeholder, type }}
  />;
  const error = state.memberError && <p className="form-error" role="alert">{state.memberError}</p>;
  return <form onSubmit={e => actions.saveMember(e)} className="member-form">
    <SectionTitle title={'Personal & business information'} desc="Edit the fictional member record." />
    <div className="form-grid profile-form-grid">
      {memberField('profileDraft', 'Full name', 'name', 'Full name')}
      {memberField('profileDraft', 'Email address', 'email', 'member@example.invalid', 'email')}
      {memberField('profileDraft', 'Mobile number', 'mobile', '9000001234')}
      {memberField('profileDraft', 'Region', 'region', 'Region')}
      {memberField('profileDraft', 'Shop / business name', 'shop', 'Business name')}
      {memberField('profileDraft', 'Date of birth (demo, optional)', 'dob', '', 'date')}
      <label className="field address-field">
        <span className="field-label">Address (demo, optional)</span>
        <textarea
          value={state.profileDraft.address || ''}
          onChange={e => actions.changeMemberDraft('profileDraft', 'address', e.target.value)}
          placeholder="Fictional address"
          rows={2}
        />
      </label>
      <div className="field">
        <span className="field-label">Role</span>
        <p className="field-static">
          {roleName(member.role)}
        </p>
      </div>
    </div>
    {error}
    <div className="form-actions">
      <Button
        label="Discard changes"
        onClick={() => actions.setState({ profileDraft: { ...member }, memberError: '' })}
        className="btn outline-btn"
      />
      <button type="submit" className="btn primary-btn">
        <Icon name="check" size={18} />
        Save profile
      </button>
    </div>
  </form>;
}
