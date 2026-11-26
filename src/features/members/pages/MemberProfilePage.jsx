import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { roleName } from '@features/members/domain/roles.js';
import { initials } from '@shared/lib/initials.js';
import { MembersPage } from './MembersPage.jsx';
import { ProfileDetailsTab } from '../components/profile/ProfileDetailsTab.jsx';
import { SchemeAssignmentTab } from '../components/profile/SchemeAssignmentTab.jsx';
import { ParentMappingTab } from '../components/profile/ParentMappingTab.jsx';
import { SecurityTab } from '../components/profile/SecurityTab.jsx';
import { KycTab } from '../components/profile/KycTab.jsx';
import { WalletLockTab } from '../components/profile/WalletLockTab.jsx';
import { DeviceMappingTab } from '../components/profile/DeviceMappingTab.jsx';
const PROFILE_TABS = {
  'Profile': ProfileDetailsTab,
  'Schemes': SchemeAssignmentTab,
  'Parent mapping': ParentMappingTab,
  'Security': SecurityTab,
  'KYC upload': KycTab,
  'Wallet lock': WalletLockTab,
  'Device mapping': DeviceMappingTab,
};

export function MemberProfilePage({ state, actions }) {
  const member = state.members.find(x => x.id === state.memberId);
  if (!member)
    return <MembersPage state={state} actions={actions} />;
  const parent = state.members.find(x => x.id === member.parent), children = state.members.filter(x => x.parent === member.id);
  const tabs = [['Profile', 'users'], ['Schemes', 'grid'], ['Security', 'shield'], ['KYC upload', 'check'], ['Wallet lock', 'lock'], ['Parent mapping', 'transfer'], ['Device mapping', 'panel']];
  const contentProps = { state, actions, member, children };
  const ProfileTab = PROFILE_TABS[state.profileTab] || DeviceMappingTab;
  const content = <ProfileTab {...contentProps} />;
  return <div className="page-content profile-page">
    <div className="profile-backline">
      <Button
        label="Back to members"
        onClick={() => actions.selectRole(state.memberRole)}
        className="text-btn"
        iconName="back"
      />
      <span className="demo-pill">
        <i />
        Demo account
      </span>
    </div>
    <section className="surface profile-hero">
      <div className="profile-person">
        <span className="member-avatar profile-avatar">
          {initials(member.name)}
        </span>
        <div>
          <div className="overline">MEMBER PROFILE</div>
          <h1>{member.name}</h1>
          <p>{`${member.id} · ${roleName(member.role)} · ${member.region}`}</p>
          <div className="profile-badges">
            <span className={`member-status ${member.status.toLowerCase()}`}>
              <i className="status-dot" />
              {member.status}
            </span>
            <span className={`member-kyc ${member.kyc.toLowerCase()}`}>
              <Icon name={member.kyc === 'Verified' ? 'shield' : 'clock'} size={14} />
              {member.kyc + ' KYC'}
            </span>
          </div>
        </div>
      </div>
      <div className="profile-hero-meta">
        <span className="eyebrow">REPORTS TO</span>
        {parent ? <Button
          label={parent.name}
          onClick={() => actions.memberDetail(parent)}
          className="text-btn"
          iconName="chevron"
        /> : <b>Top demo level</b>}
        <span className="muted">{`${children.length} direct report${children.length === 1 ? '' : 's'}`}</span>
      </div>
    </section>
    <section className="surface profile-surface">
      <div className="profile-tabs" aria-label="Profile sections">
        {tabs.map(([t, ic]) => <button
          key={t}
          className={`profile-tab ${state.profileTab === t ? 'selected' : ''}`}
          aria-pressed={state.profileTab === t}
          onClick={() => actions.setState({ profileTab: t, profileDraft: { ...member }, memberError: '' })}
        >
          <Icon name={ic} size={17} />
          {t}
        </button>)}
      </div>
      <div key={`${member.id}-${state.profileTab}`} className="profile-tab-content">{content}</div>
    </section>
  </div>;
}
