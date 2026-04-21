// Mock Data and State Management for MOM Portal

window.MOCK_DATA = {
    users: [
        { id: 'u1', name: 'Sachin Bijwar', role: 'Society Manager', email: 'sachin@society.com' },
        { id: 'u2', name: 'Amit Sharma', role: 'Chairman', email: 'amit@society.com' },
        { id: 'u3', name: 'Priya Verma', role: 'Secretary', email: 'priya@society.com' },
        { id: 'u4', name: 'Rahul Gupta', role: 'Treasurer', email: 'rahul@society.com' },
    ],
    wings: ['A Wing', 'B Wing', 'C Wing', 'Clubhouse', 'General Area'],
    moms: [
        {
            id: 'mom-1',
            title: 'Annual General Body Meeting 2024',
            date: '2024-03-15',
            time: '18:30',
            wings: ['General Area'],
            agenda: 'Financial audit review and security agency contract renewal.',
            content: 'The meeting started at 6:30 PM. Treasurer presented the annual audit report. 90% of members voted for renewal of current security agency...',
            status: 'Fully Signed',
            createdBy: 'u1',
            createdAt: '2024-03-15T20:00:00Z',
            officeBearers: ['u2', 'u3', 'u4'],
            signatures: [
                { userId: 'u2', timestamp: '2024-03-16T10:00:00Z', type: 'typed' },
                { userId: 'u3', timestamp: '2024-03-16T11:30:00Z', type: 'drawn' },
                { userId: 'u4', timestamp: '2024-03-17T09:15:00Z', type: 'typed' },
            ],
            comments: [
                { id: 'c1', userId: 'u2', text: 'Looks good. Audit values verified.', timestamp: '2024-03-16T09:45:00Z' }
            ],
            auditTrail: [
                { action: 'Created', user: 'Sachin Bijwar', timestamp: '2024-03-15T20:00:00Z' },
                { action: 'Published', user: 'Sachin Bijwar', timestamp: '2024-03-15T20:05:00Z' },
                { action: 'Signed', user: 'Amit Sharma', timestamp: '2024-03-16T10:00:00Z' }
            ]
        },
        {
            id: 'mom-2',
            title: 'Monthly Committee Meeting - April',
            date: '2024-04-10',
            time: '20:00',
            wings: ['A Wing', 'B Wing'],
            agenda: 'Leaking pipes in B wing and Lift maintenance in A wing.',
            content: 'Discussed the urgent need for plumbing repairs in B wing. Quotations from three vendors were reviewed...',
            status: 'Under Review',
            createdBy: 'u1',
            createdAt: '2024-04-10T22:00:00Z',
            officeBearers: ['u2', 'u3'],
            signatures: [],
            comments: [
                { id: 'c2', userId: 'u3', text: 'Can we add the pipe specifications to the notes?', timestamp: '2024-04-11T09:00:00Z' }
            ],
            auditTrail: [
                { action: 'Created', user: 'Sachin Bijwar', timestamp: '2024-04-10T22:00:00Z' },
                { action: 'Published', user: 'Sachin Bijwar', timestamp: '2024-04-11T08:00:00Z' }
            ]
        }
    ]
};

// Simple global state if needed
window.APP_STATE = {
    currentUser: window.MOCK_DATA.users[0], // Default to Manager for demo
    notifications: [
        { id: 1, text: 'New MOM published: Monthly Committee Meeting', read: false, time: '2h ago' },
        { id: 2, text: 'Amit Sharma signed the AGM 2024 MOM', read: true, time: '1d ago' }
    ]
};
