// Main App Component

const { useState, useEffect } = React;
const { Icon, Card, Button, Modal } = window.UI;

const App = () => {
    const [view, setView] = useState('dashboard'); // dashboard, create, detail
    const [moms, setMoms] = useState(window.MOCK_DATA.moms);
    const [selectedMOM, setSelectedMOM] = useState(null);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(window.APP_STATE.currentUser);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleCreateMOM = () => setView('create');
    const handleViewMOM = (mom) => {
        setSelectedMOM(mom);
        setView('detail');
    };

    const handleSaveMOM = (newMOM) => {
        setMoms([newMOM, ...moms]);
        setView('dashboard');
    };

    const handleSignMOM = (signatureData) => {
        const updatedMoms = moms.map(m => {
            if (m.id === selectedMOM.id) {
                const newSignatures = [...m.signatures, {
                    userId: currentUser.id,
                    timestamp: signatureData.timestamp,
                    type: signatureData.type
                }];
                
                // If all office bearers have signed, mark as Fully Signed
                const isFullySigned = m.officeBearers.every(obId => 
                    newSignatures.some(s => s.userId === obId)
                );

                return {
                    ...m,
                    signatures: newSignatures,
                    status: isFullySigned ? 'Fully Signed' : 'Partially Signed',
                    auditTrail: [
                        ...m.auditTrail,
                        { action: 'Signed', user: currentUser.name, timestamp: signatureData.timestamp }
                    ]
                };
            }
            return m;
        });

        setMoms(updatedMoms);
        setSelectedMOM(updatedMoms.find(m => m.id === selectedMOM.id));
        setIsSignatureModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Icon name="shield" size={18} />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-900 leading-none">Smart MOM</h2>
                        <span className="text-[10px] text-slate-400 font-medium">Digital Portal</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-slate-400 hover:text-slate-600 active:scale-90 transition-all"
                    >
                        <Icon name="bell" size={22} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=random`} alt="profile" />
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
                {view === 'dashboard' && (
                    <window.Dashboard 
                        moms={moms} 
                        onCreateClick={handleCreateMOM}
                        onMOMClick={handleViewMOM}
                    />
                )}
                
                {view === 'create' && (
                    <window.CreateMOM 
                        onBack={() => setView('dashboard')}
                        onSave={handleSaveMOM}
                    />
                )}

                {view === 'detail' && (
                    <window.MOMDetail 
                        mom={selectedMOM}
                        onBack={() => setView('dashboard')}
                        onSignClick={() => setIsSignatureModalOpen(true)}
                    />
                )}
            </main>

            {/* Notifications Panel */}
            {showNotifications && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    <div className="absolute top-14 right-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 pointer-events-auto animate-in slide-in-from-top-4 duration-300">
                        <h3 className="text-sm font-bold text-slate-900 mb-3">Notifications</h3>
                        <div className="space-y-3">
                            {window.APP_STATE.notifications.map(n => (
                                <div key={n.id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <Icon name="info" size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-700 leading-tight">{n.text}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-transparent pointer-events-auto" onClick={() => setShowNotifications(false)}></div>
                </div>
            )}

            {/* Signature Modal */}
            <Modal
                isOpen={isSignatureModalOpen}
                onClose={() => setIsSignatureModalOpen(false)}
                title="Digital Signature"
            >
                <window.SignaturePad 
                    userName={currentUser.name}
                    userRole={currentUser.role}
                    onSign={handleSignMOM}
                    onCancel={() => setIsSignatureModalOpen(false)}
                />
            </Modal>

            {/* Bottom Menu (Only on Dashboard) */}
            {view === 'dashboard' && (
                <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-around px-2 py-3 pb-safe z-40">
                    <button className="flex flex-col items-center gap-1 text-primary-600 px-4">
                        <Icon name="layout-dashboard" size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Home</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-slate-400 px-4" onClick={() => setView('create')}>
                        <Icon name="plus-circle" size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Create</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-slate-400 px-4">
                        <Icon name="history" size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Audits</span>
                    </button>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
