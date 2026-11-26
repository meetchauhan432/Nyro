import test from 'node:test';
import assert from 'node:assert/strict';
import {parseAmount,validatePayout} from '../src/features/payments/domain/paymentRules.js';
import {simulatePayout,debitFor} from '../src/features/payments/services/demoFinanceService.js';
import {beneficiaries} from '../src/features/payments/mocks/beneficiaries.js';
test('strict INR decimal parsing',()=>{assert.equal(parseAmount('10.25'),1025);assert.equal(parseAmount('10.2'),1020);for(const v of ['1.234','-1','1e4','abc',''])assert.equal(parseAmount(v),null)});
test('fee included in available-balance validation',()=>{assert.equal(validatePayout('50',6000),'');assert.match(validatePayout('50.01',6000),/Insufficient/);assert.match(validatePayout('0',10000),/at least/)});
test('success, pending and failed settlement effects',()=>{for(const outcome of ['Completed','Pending','Failed']){const tx=simulatePayout({amount:500000,beneficiary:beneficiaries[0],outcome,sequence:1});assert.equal(debitFor(tx),outcome==='Failed'?0:501000);assert.equal(tx.status,outcome);assert.equal(tx.id,'NYR-10501')}});
