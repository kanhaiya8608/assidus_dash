import { FaBell } from 'react-icons/fa';

function BellIcon() {
  return (
    <div className='p-2 px-6'>
    <div className="notification-icon inline-block align-middle">
      <FaBell size={20} />
      <div className="notification-dot"></div>
    </div>
    </div>
  );
}

export default BellIcon;
