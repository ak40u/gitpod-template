import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getChild from '@wasp/queries/getChild';

export function Dashboard() {
  const { data: child, isLoading, error } = useQuery(getChild);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='text-2xl font-bold'>Child's Balance: {child.balance}</div>
      <div className='text-xl font-bold'>Weekly Allowance: {child.allowance}</div>
      <Link to='/settings' className='text-blue-500 underline'>Settings</Link>
      <Link to='/transactions' className='text-blue-500 underline'>Transactions</Link>
    </div>
  );
}