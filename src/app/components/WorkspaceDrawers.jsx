import React from 'react';
import { Drawer } from '@shared/ui/Drawer.jsx';
import { Button } from '@shared/ui/Button.jsx';
import { TransactionReceipt } from '@features/transactions/components/TransactionReceipt.jsx';
import { PayoutDrawer } from '@features/payments/components/PayoutDrawer.jsx';
import { AddMoneyDrawer } from '@features/payments/components/AddMoneyDrawer.jsx';
import { CreateMemberDrawer } from '@features/members/components/CreateMemberDrawer.jsx';
import { UnavailableServiceDrawer } from '@features/services/components/UnavailableServiceDrawer.jsx';
import { SearchDrawer } from './SearchDrawer.jsx';
import { AccountDrawer } from './AccountDrawer.jsx';
import { NotificationsDrawer } from './NotificationsDrawer.jsx';
import { HelpDrawer } from './HelpDrawer.jsx';

export function WorkspaceDrawers({ drawer, ui, financeState, paymentActions, memberState, memberActions, actions }) {
  switch (drawer) {
    case 'payout': return <PayoutDrawer state={financeState} actions={paymentActions} />;
    case 'add': return <AddMoneyDrawer state={financeState} actions={paymentActions} />;
    case 'create-user': return <CreateMemberDrawer state={memberState} actions={memberActions} />;
    case 'detail': return (
      <Drawer title="Transaction details" subtitle="Demo transaction record" onClose={actions.close}>
        <TransactionReceipt tx={ui.selectedTransaction} hidden={ui.hidden} />
        <Button label="Close" onClick={actions.close} className="btn primary-btn wide" />
      </Drawer>
    );
    case 'search': return <SearchDrawer state={ui} actions={actions} />;
    case 'notifications': return <NotificationsDrawer state={ui} actions={actions} />;
    case 'profile': return <AccountDrawer state={ui} actions={actions} />;
    case 'unavailable': return <UnavailableServiceDrawer state={ui} actions={actions} />;
    case 'help': return <HelpDrawer actions={actions} />;
    default: return null;
  }
}
