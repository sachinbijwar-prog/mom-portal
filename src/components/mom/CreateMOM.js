// Create MOM Component

const { Icon, Card, Button, Input, Modal } = window.UI;

const CreateMOM = ({ onBack, onSave }) => {
    const [formData, setFormData] = React.useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        wings: [],
        agenda: '',
        content: '',
        officeBearers: []
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const toggleWing = (wing) => {
        setFormData(prev => ({
            ...prev,
            wings: prev.wings.includes(wing) 
                ? prev.wings.filter(w => w !== wing)
                : [...prev.wings, wing]
        }));
    };

    const toggleUser = (userId) => {
        setFormData(prev => ({
            ...prev,
            officeBearers: prev.officeBearers.includes(userId)
                ? prev.officeBearers.filter(u => u !== userId)
                : [...prev.officeBearers, userId]
        }));
    };

    const handleSubmit = (status) => {
        setIsSubmitting(true);
        setTimeout(() => {
            onSave({ ...formData, status, id: 'mom-' + Date.now() });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-right duration-300">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={onBack} className="p-2 -ml-2 text-slate-500">
                    <Icon name="arrow-left" size={24} />
                </button>
                <h1 className="text-2xl font-bold text-slate-900">New MOM</h1>
            </div>

            <div className="space-y-6">
                {/* Basic Details */}
                <section className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Basic Details</h2>
                    <Input 
                        label="Meeting Title / Subject" 
                        placeholder="e.g. Monthly Maintenance Discussion"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Date" 
                            type="date"
                            value={formData.date}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                        <Input 
                            label="Time" 
                            type="time"
                            value={formData.time}
                            onChange={e => setFormData({...formData, time: e.target.value})}
                        />
                    </div>
                </section>

                {/* Wing Selection */}
                <section className="space-y-3">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Target Wings</h2>
                    <div className="flex flex-wrap gap-2">
                        {window.MOCK_DATA.wings.map(wing => (
                            <button
                                key={wing}
                                onClick={() => toggleWing(wing)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    formData.wings.includes(wing)
                                        ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'
                                }`}
                            >
                                {wing}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Agenda & Content */}
                <section className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Notes & Content</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 ml-1">Agenda</label>
                        <textarea 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all min-h-[100px]"
                            placeholder="What is the meeting about?"
                            value={formData.agenda}
                            onChange={e => setFormData({...formData, agenda: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 ml-1">Detailed MOM Content</label>
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
                                <button className="p-1.5 rounded hover:bg-slate-200"><Icon name="bold" size={16} /></button>
                                <button className="p-1.5 rounded hover:bg-slate-200"><Icon name="italic" size={16} /></button>
                                <button className="p-1.5 rounded hover:bg-slate-200"><Icon name="list" size={16} /></button>
                                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                <button className="p-1.5 rounded hover:bg-slate-200"><Icon name="link" size={16} /></button>
                            </div>
                            <textarea 
                                className="w-full px-4 py-3 outline-none min-h-[200px]"
                                placeholder="Start typing the minutes of meeting..."
                                value={formData.content}
                                onChange={e => setFormData({...formData, content: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* Office Bearers */}
                <section className="space-y-3">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Select Office Bearers to Sign</h2>
                    <div className="space-y-2">
                        {window.MOCK_DATA.users.filter(u => u.role !== 'Society Manager').map(user => (
                            <div 
                                key={user.id}
                                onClick={() => toggleUser(user.id)}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                                    formData.officeBearers.includes(user.id)
                                        ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-100'
                                        : 'bg-white border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.role}</p>
                                    </div>
                                </div>
                                {formData.officeBearers.includes(user.id) ? (
                                    <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white">
                                        <Icon name="check" size={14} />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-white border-t border-slate-100 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <Button 
                    variant="secondary" 
                    className="flex-1 py-3" 
                    onClick={() => handleSubmit('Draft')}
                    disabled={isSubmitting}
                >
                    Save Draft
                </Button>
                <Button 
                    variant="primary" 
                    className="flex-[1.5] py-3" 
                    onClick={() => handleSubmit('Under Review')}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Publishing...' : 'Publish for Review'}
                </Button>
            </div>
        </div>
    );
};

window.CreateMOM = CreateMOM;
