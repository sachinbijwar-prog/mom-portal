// Dashboard Component

const { Icon, Card, Badge, Button } = window.UI;

const Dashboard = ({ moms, onCreateClick, onMOMClick }) => {
    const stats = [
        { label: 'Total MOMs', value: moms.length, icon: 'file-text', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Reviews', value: moms.filter(m => m.status === 'Under Review').length, icon: 'clock', color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Fully Signed', value: moms.filter(m => m.status === 'Fully Signed').length, icon: 'check-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 text-sm">Welcome back, Society Manager</p>
                </div>
                <Button onClick={onCreateClick} icon="plus">Create MOM</Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-4 flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <Icon name={stat.icon} size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent MOMs */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Documents</h2>
                    <button className="text-primary-600 text-sm font-medium hover:underline">View All</button>
                </div>
                
                <div className="space-y-3">
                    {moms.map((mom) => (
                        <Card key={mom.id} className="p-4 active:bg-slate-50 cursor-pointer transition-colors" onClick={() => onMOMClick(mom)}>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-slate-900 line-clamp-1">{mom.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Icon name="calendar" size={14} /> {mom.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Icon name="users" size={14} /> {mom.officeBearers.length} Office Bearers
                                        </span>
                                    </div>
                                </div>
                                <Badge status={mom.status}>{mom.status}</Badge>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

window.Dashboard = Dashboard;
