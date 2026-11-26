// Fictional demo records only.
export const initialMembers = [
  ['N101', 'Anika Rao', 'SA', null, 'Active', 'Verified', 'West region'],
  ['N102', 'Dev Mehta', 'NSM', 'N101', 'Active', 'Verified', 'West region'],
  ['N103', 'Ishaan Verma', 'SH', 'N102', 'Active', 'Verified', 'Gujarat'],
  ['N104', 'Meera Patel', 'CNF', 'N103', 'Active', 'Verified', 'Ahmedabad'],
  ['N105', 'Nikhil Shah', 'MD', 'N104', 'Active', 'Verified', 'Ahmedabad'],
  ['N106', 'Riya Desai', 'DT', 'N105', 'Active', 'Pending', 'Anand'],
  ['N107', 'Aarav Joshi', 'RT', 'N106', 'Active', 'Verified', 'Anand'],
  ['N108', 'Kiara Jain', 'RT', 'N106', 'Inactive', 'Pending', 'Vadodara'],
  ['N109', 'Vihaan Roy', 'DT', 'N105', 'Active', 'Verified', 'Vadodara'],
  ['N110', 'Sana Kapoor', 'RT', 'N109', 'Active', 'Verified', 'Vadodara'],
  ['N111', 'Neel Gupta', 'NSM', 'N101', 'Active', 'Verified', 'North region'],
  ['N112', 'Maya Singh', 'SH', 'N111', 'Inactive', 'Pending', 'North region']
].map(([id, name, role, parent, status, kyc, region]) => ({ id, name, role, parent, status, kyc, region, email: `${id.toLowerCase()}@example.invalid`, mobile: `90000${id.slice(1).padStart(5, "0")}`, shop: "", address: "", dob: "", scheme: "Default scheme" }));
