import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTransactions from '@wasp/queries/getTransactions';
import updateBalance from '@wasp/actions/updateBalance';

export function Transactions() {
  const { data: transactions, isLoading, error } = useQuery(getTransactions);
  const updateBalanceFn = useAction(updateBalance);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateBalance = (childId, amount, description) => {
    updateBalanceFn({ childId, amount, description });
  };

  return (
    <div className='p-4'>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{transaction.description}</div>
          <div>{transaction.amount}</div>
          <div>{transaction.type}</div>
          <div>{transaction.child.name}</div>
          <button
            onClick={() => handleUpdateBalance(transaction.childId, transaction.amount, 'Adjusted balance')}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Adjust Balance
          </button>
        </div>
      ))}
    </div>
  );
}