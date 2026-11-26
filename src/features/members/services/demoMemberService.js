import { roleLevels } from '../domain/roles.js';

export const schemes = ['Default scheme', 'Special scheme'];

export function eligibleParents(members, role) {
  const index = roleLevels.findIndex(([code]) => code === role);
  return index > 0 ? members.filter(member => member.role === roleLevels[index - 1][0] && member.status === 'Active') : [];
}

export function validateMember(members, draft, excludeId) {
  if (draft.name.trim().length < 2) return 'Enter a member name of at least two characters.';
  if (!/^[^\s@]+@example\.invalid$/i.test(draft.email.trim())) return 'Use a fictional email ending in @example.invalid.';
  if (!/^90000\d{5}$/.test(draft.mobile.trim())) return 'Use a fictional 10-digit mobile number beginning 90000.';
  if (!draft.region.trim()) return 'Enter a region.';
  if (members.some(member => member.id !== excludeId && (member.email.toLowerCase() === draft.email.trim().toLowerCase() || member.mobile === draft.mobile.trim()))) {
    return 'This demo email or mobile number is already assigned.';
  }
  return '';
}

export function createMemberRecord(members, draft) {
  const error = validateMember(members, draft);
  if (error) throw new Error(error);
  if (!roleLevels.some(([code]) => code === draft.role)) throw new Error('Select a valid role.');
  if (draft.role !== 'SA' && !eligibleParents(members, draft.role).some(member => member.id === draft.parent)) {
    throw new Error('Select an active parent from the preceding demo role.');
  }
  if (!schemes.includes(draft.scheme)) throw new Error('Choose a demo scheme.');
  const id = `N${Math.max(100, ...members.map(member => Number(member.id.slice(1)))) + 1}`;
  return {
    ...draft, ...editableFields(draft), id,
    parent: draft.role === 'SA' ? null : draft.parent,
    status: 'Active', kyc: 'Pending',
  };
}

export function editableFields(draft) {
  return {
    name: draft.name.trim(), email: draft.email.trim(), mobile: draft.mobile.trim(),
    region: draft.region.trim(), shop: draft.shop.trim(), address: draft.address.trim(), dob: draft.dob,
  };
}
