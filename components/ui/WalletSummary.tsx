import React from 'react'
import Card from './Card'
import Button from './Button'

export default function WalletSummary({ balance = 0 }: { balance?: number }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-yellow-700">Wallet balance</div>
          <div className="text-3xl font-extrabold">${balance.toFixed(2)}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">Top up</Button>
          <Button variant="primary">Withdraw</Button>
        </div>
      </div>
    </Card>
  )
}
