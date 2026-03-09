const { useState, useEffect } = React;

// ── Configuration ─────────────────────────────────────────────
const API_URL = 'https://cardiocare-1wh0.onrender.com';

// ── SVG Icons ─────────────────────────────────────────────────
const HeartIcon = ({ size = 24, className = '' }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const RefreshIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4v6h-6" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
);

// ── Components ────────────────────────────────────────────────

function Login({ onLogin }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(data.access_token);
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            alert('Error connecting to Server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full admin-card p-10">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
                        <HeartIcon size={32} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Admin Portal</h2>
                <p className="text-center text-slate-500 mb-8">Sign in to manage appointments</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5 active:translate-y-0 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function Dashboard({ token, onLogout }) {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/appointments`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else if (response.status === 401) {
                onLogout();
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [token]);

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/appointments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status }),
            });
            if (response.ok) {
                setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
            }
        } catch (error) {
            alert('Failed to update status.');
        }
    };

    const deleteAppointment = async (id) => {
        if (!confirm('Are you sure you want to delete this appointment?')) return;
        try {
            const response = await fetch(`${API_URL}/appointments/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setAppointments(appointments.filter(a => a.id !== id));
            }
        } catch (error) {
            alert('Failed to delete appointment.');
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
                            <HeartIcon size={22} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">CardioCare Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchAppointments}
                            className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                            title="Refresh Data"
                        >
                            <RefreshIcon />
                        </button>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-600 font-semibold text-sm hover:bg-red-50 transition"
                        >
                            <LogoutIcon /> Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Manage Appointments</h2>
                        <p className="text-slate-500">Track and respond to patient requests.</p>
                    </div>
                    <div className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl shadow-lg flex items-center gap-3">
                        <span className="text-2xl font-bold">{appointments.length}</span>
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Total<br />Bookings</span>
                    </div>
                </div>

                <div className="admin-card overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center text-slate-400">Loading data...</div>
                    ) : appointments.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-bold text-slate-800">No appointments found</h3>
                            <p className="text-slate-500">New bookings will appear here automatically.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto p-6 pt-0">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th>Patient Details</th>
                                        <th>Appointment Date</th>
                                        <th>Status</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((a) => (
                                        <tr key={a.id}>
                                            <td>
                                                <div className="font-bold text-slate-900">{a.name}</div>
                                                <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                                    <span>📞 {a.phone}</span>
                                                </div>
                                                <div className="mt-2 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded inline-block max-w-[200px] truncate" title={a.symptoms}>
                                                    {a.symptoms || 'No symptoms specified'}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-semibold text-blue-800">{new Date(a.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                                <div className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">Preferred Date</div>
                                            </td>
                                            <td>
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${a.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                    a.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {a.status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {a.status !== 'confirmed' && (
                                                        <button
                                                            onClick={() => updateStatus(a.id, 'confirmed')}
                                                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition"
                                                        >
                                                            Confirm
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteAppointment(a.id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function App() {
    const [token, setToken] = useState(localStorage.getItem('adminToken'));

    const handleLogin = (newToken) => {
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {!token ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Dashboard token={token} onLogout={handleLogout} />
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
