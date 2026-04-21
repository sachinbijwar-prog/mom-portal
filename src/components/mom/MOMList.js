// MOM List Component (Simplified)

const { Icon, Card, Badge } = window.UI;

const MOMList = ({ moms, onMOMClick }) => {
    return (
        <div className="space-y-3">
            {moms.map((mom) => (
                <Card key={mom.id} className="p-4 active:bg-slate-50 cursor-pointer" onClick={() => onMOMClick(mom)}>
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <h3 className="font-semibold text-slate-900">{mom.title}</h3>
                            <p className="text-xs text-slate-500">{mom.date}</p>
                        </div>
                        <Badge status={mom.status}>{mom.status}</Badge>
                    </div>
                </Card>
            ))}
        </div>
    );
};

window.MOMList = MOMList;
