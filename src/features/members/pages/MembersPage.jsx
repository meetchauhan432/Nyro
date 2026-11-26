import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { roleName } from '../domain/roles.js';
import { filterMembers, membersInRole } from '../domain/memberFilters.js';
import { NetworkSummary } from '../components/NetworkSummary.jsx';
import { MemberFilters } from '../components/MemberFilters.jsx';
import { MemberTable } from '../components/MemberTable.jsx';

export function MembersPage({ state, actions }) {
  const { members, memberRole } = state;
  const rows = filterMembers(members, state);
  const scope = membersInRole(members, memberRole);
  const allRoles = memberRole === 'All';
  return (
    <div className="page-content members-page">
      <div className="page-heading">
        <div>
          <div className="overline"><span className="overline-line" />{' NETWORK MANAGEMENT'}</div>
          <h1>{allRoles ? 'Your network.' : roleName(memberRole)}</h1>
          <p>Manage your distribution network and member accounts.</p>
        </div>
        <div className="member-page-actions">
          <span className="demo-pill"><i />Demo data</span>
          <Button
            label="Create user"
            onClick={actions.startCreate}
            className="btn primary-btn create-user-btn"
            iconName="plus"
          />
        </div>
      </div>
      <NetworkSummary members={scope} role={memberRole} />
      <section className="surface member-directory">
        <SectionTitle title={allRoles ? 'All members' : `${roleName(memberRole)} members`} desc="Search, filter and inspect member profiles." />
        <MemberFilters filters={state} onChange={actions.setState} />
        <div className="list-meta">{`${rows.length} member${rows.length === 1 ? '' : 's'} · demonstration records`}</div>
        <MemberTable rows={rows} members={members} onSelect={actions.memberDetail}
          onClear={() => actions.setState({ memberQuery: '', memberStatus: 'All', memberKyc: 'All', memberRole: 'All' })} />
      </section>
    </div>
  );
}
