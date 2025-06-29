import { useUser } from '../context/UserContextApi';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, LogOut, LogIn } from 'lucide-react';
import { useRef } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { loggedInUser, setLoggedInUser } = useUser();
    const navigate = useNavigate();

    const drawerToggleRef = useRef();

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.get('/logout');
            if (res.status === 200) {
                setLoggedInUser(null);
                if (drawerToggleRef.current) drawerToggleRef.current.checked = false;
                toast.success(res.data.message);
                navigate('/login');
                console.log(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrawerClose = () => {
        if (drawerToggleRef.current) drawerToggleRef.current.checked = false;
    };

    return (
        <div className="drawer drawer-end z-50">
            <input id="nav-drawer" type="checkbox" className="drawer-toggle" ref={drawerToggleRef} />

            {/* Page Content */}
            <div className="drawer-content w-full">
                <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50 px-4">
                    <div className="flex-1">
                        <Link to="/" className="text-xl normal-case">
                            🧑‍💻 UserManager
                        </Link>
                    </div>

                    <div className="flex-none flex gap-3 items-center">
                        <div className="hidden lg:flex gap-3">
                            {!loggedInUser ? (
                                <Link to="/login" className="btn btn-sm btn-primary">
                                    <LogIn size={16} className="mr-1" />
                                    Login
                                </Link>
                            ) : (
                                <>
                                    <span className="text-sm font-medium text-gray-600 self-center">
                                        {loggedInUser.email}
                                    </span>
                                    <Link to="/user-list" className="btn btn-sm btn-outline">
                                        Users
                                    </Link>

                                    <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
                                        <LogOut size={16} className="mr-1" />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>

                        <label htmlFor="nav-drawer" className="btn btn-square btn-ghost lg:hidden">
                            <Menu size={20} />
                        </label>
                    </div>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="nav-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-64 min-h-full bg-base-200 space-y-2 text-base-content pt-16 mt-5">
                    {!loggedInUser ? (
                        <li>
                            <Link
                                to="/login"
                                onClick={handleDrawerClose}
                                className="btn btn-sm btn-primary w-full"
                            >
                                Login
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li className="text-sm font-medium text-gray-600 px-2">{loggedInUser.email}</li>
                            <li>
                                <Link
                                    to="/user-list"
                                    onClick={handleDrawerClose}
                                    className="btn btn-sm btn-outline w-full"
                                >
                                    Users
                                </Link>
                            </li>

                            <li>
                                <button onClick={handleLogout} className="btn btn-sm btn-error text-white w-full">
                                    <LogOut size={16} className="mr-1" />
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
