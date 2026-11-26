import { usePatchState } from '@shared/hooks/usePatchState.js';
import { initialMembers } from '../mocks/members.js';
import { eligibleParents, validateMember, createMemberRecord, editableFields, schemes } from '../services/demoMemberService.js';

const copyMembers = () => initialMembers.map(member => ({ ...member }));
const clearFilters = { memberQuery: '', memberStatus: 'All', memberKyc: 'All' };
const createInitialState = () => ({
  members: copyMembers(), memberRole: 'All', ...clearFilters,
  memberId: null, profileTab: 'Profile', profileDraft: null, createDraft: null, memberError: '',
});

export function useMembers(notify) {
  const [state, patch] = usePatchState(createInitialState);

  function reset() {
    patch(createInitialState());
  }
  function selectRole(role) {
    patch({ memberRole: role, ...clearFilters });
  }
  function selectMember(member) {
    patch({ memberId: member.id, profileTab: 'Profile', profileDraft: { ...member }, memberError: '' });
  }
  function parentsFor(role) {
    return eligibleParents(state.members, role);
  }
  function startCreate() {
    const role = state.memberRole === 'All' ? 'RT' : state.memberRole;
    patch({ createDraft: { name: '', email: '', mobile: '', region: '', shop: '', address: '', dob: '', role, parent: '', scheme: 'Default scheme' }, memberError: '' });
  }
  function changeMemberDraft(kind, field, value) {
    patch(previous => ({ [kind]: { ...previous[kind], [field]: value, ...(field === 'role' ? { parent: '' } : {}) }, memberError: '' }));
  }
  function createMember(event) {
    event.preventDefault();
    let member;
    try {
      member = createMemberRecord(state.members, state.createDraft);
    } catch (error) {
      patch({ memberError: error.message });
      return null;
    }
    patch(previous => ({ members: [member, ...previous.members], memberRole: member.role, ...clearFilters, createDraft: null, memberError: '' }));
    notify('Demo user created successfully.');
    return member;
  }
  function saveMember(event) {
    event.preventDefault();
    const draft = state.profileDraft;
    const error = validateMember(state.members, draft, draft.id);
    if (error) {
      patch({ memberError: error });
      return;
    }
    patch(previous => ({ members: previous.members.map(member => member.id === draft.id ? { ...member, ...editableFields(draft) } : member), memberError: '' }));
    notify('Demo profile saved.');
  }
  function saveAssignment(field) {
    const draft = state.profileDraft;
    if (field === 'parent' && draft.role !== 'SA' && !parentsFor(draft.role).some(member => member.id === draft.parent)) {
      patch({ memberError: 'Choose an eligible parent account.' });
      return;
    }
    if (field === 'scheme' && !schemes.includes(draft.scheme)) {
      patch({ memberError: 'Choose a demo scheme.' });
      return;
    }
    if (!['parent', 'scheme'].includes(field)) return;
    patch(previous => ({ members: previous.members.map(member => member.id === draft.id ? { ...member, [field]: draft[field] } : member), memberError: '' }));
    notify(field === 'parent' ? 'Demo parent mapping saved.' : 'Demo scheme saved.');
  }
  return { state, patch, reset, selectRole, selectMember, parentsFor, startCreate, changeMemberDraft, createMember, saveMember, saveAssignment };
}
