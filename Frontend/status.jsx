const { useState } = React;

const API_URL = 'https://cardiocare-1wh0.onrender.com';

function StatusCheck() {
    const [formData, setFormData] = useState({ phone: '', id: '' });
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setAppointment(null);

        try {
            const response = await fetch(`${API_URL}/appointments/status?phone=${formData.phone}&appointment_id=${formData.id}`);
            if (response.ok) {
                const data = await response.json();
                setAppointment(data);
            } else {
                const err = await response.json();
                setError(err.detail || 'Appointment not found.');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <span className="text-xl">💓</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CardioCare</h1>
            </div>

            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-card border border-slate-100">
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Check Appointment</h2>
                <p className="text-center text-slate-500 mb-8">Enter details to see your status</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                            placeholder="+91 00000 00000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Appointment ID</label>
                        <input
                            type="number"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                            placeholder="e.g. 101"
                            value={formData.id}
                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5 active:translate-y-0 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Searching...' : 'Check Status'}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center text-sm font-medium">
                        {error}
                    </div>
                )}

                {appointment && (
                    <div className="mt-8 pt-8 border-t border-slate-100 animate-fade-in text-center">
                        <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">Current Status</div>
                        <div className={`inline-block px-5 py-2 rounded-full text-lg font-bold uppercase tracking-wider mb-4 ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                appointment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                    'bg-amber-100 text-amber-700'
                            }`}>
                            {appointment.status || 'pending'}
                        </div>
                        <div className="text-slate-900 font-bold text-xl">{appointment.name}</div>
                        <div className="text-slate-500 mt-1">
                            {new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                )}
            </div>

            <a href="index.html" className="mt-8 text-blue-600 font-semibold hover:underline">
                ← Back to Home
            </a>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StatusCheck />);
