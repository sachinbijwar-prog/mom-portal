// MOM Detail & Review Component

const { Icon, Card, Badge, Button, Modal } = window.UI;

const MOMDetail = ({ mom, onBack, onSignClick }) => {
    const [comment, setComment] = React.useState('');
    const [localComments, setLocalComments] = React.useState(mom.comments || []);

    const userMap = React.useMemo(() => {
        const map = {};
        window.MOCK_DATA.users.forEach(u => map[u.id] = u);
        return map;
    }, []);

    const addComment = () => {
        if (!comment.trim()) return;
        const newComment = {
            id: 'c' + Date.now(),
            userId: window.APP_STATE.currentUser.id,
            text: comment,
            timestamp: new Date().toISOString()
        };
        setLocalComments([...localComments, newComment]);
        setComment('');
    };

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="p-2 -ml-2 text-slate-500">
                    <Icon name="arrow-left" size={24} />
                </button>
                <div className="flex gap-2">
                    <Button variant="secondary" icon="share">Share</Button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Header Info */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge status={mom.status}>{mom.status}</Badge>
                        <span className="text-xs text-slate-400">• Published {new Date(mom.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">{mom.title}</h1>
                </div>

                {/* Quick Info Card */}
                <Card className="p-4 grid grid-cols-2 gap-4 bg-slate-50/50">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Meeting Date</p>
                        <p className="text-sm font-semibold text-slate-700">{mom.date} at {mom.time}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Wings</p>
                        <p className="text-sm font-semibold text-slate-700">{mom.wings.join(', ')}</p>
                    </div>
                </Card>

                {/* Content Sections */}
                <div className="space-y-6">
                    <section>
                        <h2 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Icon name="target" size={16} className="text-primary-500" /> Agenda
                        </h2>
                        <div className="text-slate-600 bg-white p-4 rounded-xl border border-slate-100 leading-relaxed italic">
                            "{mom.agenda}"
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Icon name="file-text" size={16} className="text-primary-500" /> MOM Notes
                        </h2>
                        <div className="text-slate-700 bg-white p-4 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap">
                            {mom.content}
                        </div>
                    </section>
                </div>

                {/* Comments Section */}
                <section className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 text-slate-500 uppercase tracking-widest">
                        Discussion ({localComments.length})
                    </h2>
                    
                    <div className="space-y-4">
                        {localComments.map(c => {
                            const user = userMap[c.userId];
                            return (
                                <div key={c.id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-500">
                                        {user?.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-slate-900">{user?.name}</span>
                                            <span className="text-[10px] text-slate-400">{new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <p className="text-sm text-slate-600">{c.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-2 items-center bg-white p-2 rounded-2xl border border-slate-200">
                        <input 
                            type="text" 
                            placeholder="Add a suggestion..." 
                            className="flex-1 bg-transparent px-2 outline-none text-sm"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <button 
                            onClick={addComment}
                            className="p-2 bg-primary-600 text-white rounded-xl active:scale-95 transition-transform"
                        >
                            <Icon name="send" size={18} />
                        </button>
                    </div>
                </section>

                {/* Office Bearer Status */}
                <section className="space-y-3 pb-8">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Signatures</h2>
                    <div className="space-y-2">
                        {mom.officeBearers.map(userId => {
                            const user = userMap[userId];
                            const sig = mom.signatures.find(s => s.userId === userId);
                            return (
                                <div key={userId} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-50">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${sig ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
                                            <p className="text-[10px] text-slate-400">{user?.role}</p>
                                        </div>
                                    </div>
                                    {sig ? (
                                        <div className="flex flex-col items-end">
                                            <span className="text-[8px] font-bold text-emerald-600 uppercase">Signed digitally</span>
                                            <span className="text-[10px] text-slate-500">{new Date(sig.timestamp).toLocaleDateString()}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] font-medium text-slate-400">Waiting...</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* Bottom Signature Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500">Your Action Required</p>
                    <p className="text-sm font-bold text-slate-900">Review & Sign MOM</p>
                </div>
                <Button 
                    variant="primary" 
                    className="px-8 shadow-indigo-200"
                    onClick={onSignClick}
                    icon="pen-tool"
                >
                    Sign Now
                </Button>
            </div>
        </div>
    );
};

window.MOMDetail = MOMDetail;
