import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getChild from '@wasp/queries/getChild';
import updateAllowance from '@wasp/actions/updateAllowance';

export function Settings() {
  const { data: child, isLoading, error } = useQuery(getChild, { id: 1 });
  const updateAllowanceFn = useAction(updateAllowance);
  const [newAllowance, setNewAllowance] = useState(child.allowance);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateAllowance = () => {
    updateAllowanceFn({ childId: child.id, newAllowance });
  };

  return (
    <div className='p-4'>
      <div>
        <div>Child Name: {child.name}</div>
        <div>Current Allowance: {child.allowance}</div>
        <div>
          <input
            type='number'
            placeholder='New Allowance'
            className='px-1 py-2 border rounded text-lg'
            value={newAllowance}
            onChange={(e) => setNewAllowance(parseFloat(e.target.value))}
          />
          <button
            onClick={handleUpdateAllowance}
            className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
          >
            Update Allowance
          </button>
        </div>
        <div>
          <Link to='/dashboard' className='text-blue-500 hover:underline'>Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}