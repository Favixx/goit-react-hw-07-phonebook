import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../../redux/contactsSlice';
import { filterSearchSelector } from 'redux/selectors';

const ContactsList = () => {
    const visibleContacts = useSelector(filterSearchSelector)
    const dispatch = useDispatch();
    return (
        <div>
            <ul className="divide-y divide-gray-200 flex justify-center gap-3">
                {visibleContacts.map((contact) => (
                    <li key={contact.id} className="py-4">
                        <span className="text-lg font-semibold">{contact.name}</span>
                        <span className="text-gray-500"> : {contact.phone}</span>
                        <button
                            className="ml-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                            onClick={() => dispatch(removeContact(contact.id))}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactsList;
