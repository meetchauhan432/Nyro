export const roleLevels = [['SA', 'Sub Admin'], ['NSM', 'NSM'], ['SH', 'SH'], ['CNF', 'CNF'], ['MD', 'Master Distributor'], ['DT', 'Distributor'], ['RT', 'Retailer']];
export const roleName = r => (roleLevels.find(([id]) => id === r) || [r, r])[1];
