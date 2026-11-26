import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { roleName } from '../../domain/roles.js';
import { initials } from '@shared/lib/initials.js';
import { MemberSelect } from '../MemberFields.jsx';
export function ParentMappingTab({ state, actions, member, children }) {
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
    <SectionTitle title="Reporting relationship" desc="Manage the illustrative parent mapping." />
    {member.role === 'SA' ? note('Sub Admin is the top level in this demonstration.') : memberSelect('profileDraft', 'Parent account', 'parent', [['', 'Select parent'], ...actions.parentsFor(member.role).map(x => [x.id, `${x.name} · ${x.id}`])])}
    {error}
    {member.role !== 'SA' && <div className="form-actions">
      <Button
        label="Save mapping"
        onClick={() => actions.saveAssignment('parent')}
        className="btn primary-btn"
        iconName="check"
      />
    </div>}
    <h3 className="form-heading">Direct reports</h3>
    {children.length ? <div className="direct-reports">
      {children.map(c => <button key={c.id} className="report-link" onClick={() => actions.memberDetail(c)}>
        <span className="member-avatar">
          {initials(c.name)}
        </span>
        <span>
          <b>{c.name}</b>
          <small>
            {roleName(c.role)}
          </small>
        </span>
        <Icon name="chevron" size={15} />
      </button>)}
    </div> : <p className="muted">No direct reports.</p>}
  </div>;
}
