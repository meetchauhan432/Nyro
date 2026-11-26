import { roleName } from './roles.js';

export function membersInRole(members, role) {
  return members.filter(member => role === 'All' || member.role === role);
}

export function filterMembers(members, filters) {
  const search = filters.memberQuery.toLowerCase();
  return membersInRole(members, filters.memberRole).filter(member => {
    const matchesStatus = filters.memberStatus === 'All' || member.status === filters.memberStatus;
    const matchesKyc = filters.memberKyc === 'All' || member.kyc === filters.memberKyc;
    const text = `${member.name} ${member.id} ${member.region} ${member.email} ${member.mobile} ${roleName(member.role)}`.toLowerCase();
    return matchesStatus && matchesKyc && text.includes(search);
  });
}
