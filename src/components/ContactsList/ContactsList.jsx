import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

const ContactsList = () => {
    const contacts = useSelector(state => state.contacts.contacts);
    const filter = useSelector(state => state.filter.filter);
    const dispatch = useDispatch();

    const getVisibleContact = () => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    const visibleContacts = getVisibleContact();
    return (
        <div>
            <ul className="divide-y divide-gray-200 flex justify-center gap-3">
                {visibleContacts.map(contact => (
                    <li key={contact.id} className="py-4">
                        <span className="text-lg font-semibold">{contact.name}</span>
                        <span className="text-gray-500"> : {contact.number}</span>
                        <button
                            className="ml-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                            onClick={() => dispatch(deleteContact(contact.id))}
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
