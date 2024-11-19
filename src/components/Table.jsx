import React from 'react';
import Button from './Button';

const Table = ({data}) => {
  return (
    <section className="w-full overflow-x-auto pb-4">
        <table className="table-fixed min-w-[700px] w-full text-center text-textPrimary">
            <thead>
            <tr className="font-inter">
                <th>ID</th>
                <th>Report Name</th>
                <th>Date Created</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody className='font-inter text-center'>
            {data.map((row) => (
                <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.date}</td>
                    <td className='flex gap-4 justify-center'> 
                        <Button onclick={null} style="font-inter text-textSecondary underline">View</Button>
                        <Button onclick={null} style="font-inter text-red-400">Delete</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </section>
  );
}

export default Table;



