import test from 'node:test';
import assert from 'node:assert/strict';
import { initialMembers } from '../src/features/members/mocks/members.js';
import { createMemberRecord, validateMember, eligibleParents } from '../src/features/members/services/demoMemberService.js';
import { filterMembers } from '../src/features/members/domain/memberFilters.js';

const draft = () => ({ name: 'Demo New Member', email: 'new@example.invalid', mobile: '9000004321', region: 'Gujarat', shop: '', address: '', dob: '', role: 'RT', parent: 'N106', scheme: 'Default scheme' });

test('role hierarchy only returns active immediate parents', () => {
  assert.equal(eligibleParents(initialMembers, 'SA').length, 0);
  assert.deepEqual(eligibleParents(initialMembers, 'RT').map(member => member.id), ['N106', 'N109']);
  assert.deepEqual(eligibleParents(initialMembers, 'CNF').map(member => member.id), ['N103']);
});

test('member creation assigns a unique ID, active status and pending KYC', () => {
  const member = createMemberRecord(initialMembers, draft());
  assert.equal(member.id, 'N113');
  assert.equal(member.kyc, 'Pending');
  assert.equal(member.status, 'Active');
  assert.equal(member.parent, 'N106');
  assert.equal(initialMembers.length, 12);
});

test('reject duplicate identifiers, invalid roles, parent assignments and real-data formats', () => {
  assert.throws(() => createMemberRecord(initialMembers, { ...draft(), email: initialMembers[0].email }), /already assigned/);
  assert.throws(() => createMemberRecord(initialMembers, { ...draft(), role: 'bad' }), /valid role/);
  assert.throws(() => createMemberRecord(initialMembers, { ...draft(), parent: 'N101' }), /preceding demo role/);
  assert.match(validateMember(initialMembers, { ...draft(), email: 'real@example.com' }), /fictional email/);
  assert.equal(validateMember(initialMembers, initialMembers[0], initialMembers[0].id), '');
});

test('member filters combine role, account status, KYC and search', () => {
  const filtered = filterMembers(initialMembers, { memberRole: 'RT', memberStatus: 'Inactive', memberKyc: 'Pending', memberQuery: 'kiara' });
  assert.deepEqual(filtered.map(member => member.id), ['N108']);
});
