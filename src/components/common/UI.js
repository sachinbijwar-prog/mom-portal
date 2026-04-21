// Common UI Components

const { useState, useEffect, useRef } = React;

const Icon = ({ name, size = 20, className = "" }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (iconRef.current) {
            // Clear previous icon
            iconRef.current.innerHTML = `<i data-lucide="${name}" style="width: ${size}px; height: ${size}px;" class="${className}"></i>`;
            lucide.createIcons({
                attrs: {
                    'stroke-width': 2,
                },
                nameAttr: 'data-lucide',
                icons: lucide.icons
            });
        }
    }, [name, size, className]);

    return <span ref={iconRef} className={`inline-flex items-center justify-center ${className}`}></span>;
};

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const Button = ({ children, variant = "primary", className = "", onClick, icon, disabled }) => {
    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-200",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
        danger: "bg-red-500 text-white hover:bg-red-600",
        ghost: "bg-transparent text-slate-500 hover:bg-slate-100",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 ${variants[variant]} ${className}`}
        >
            {icon && <Icon name={icon} size={18} />}
            {children}
        </button>
    );
};

const Badge = ({ children, status }) => {
    const colors = {
        Draft: "bg-slate-100 text-slate-600",
        "Under Review": "bg-amber-100 text-amber-700",
        "Partially Signed": "bg-blue-100 text-blue-700",
        "Fully Signed": "bg-emerald-100 text-emerald-700",
        "Reviewed": "bg-indigo-100 text-indigo-700",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[status] || "bg-slate-100"}`}>
            {children}
        </span>
    );
};

const Input = ({ label, placeholder, type = "text", value, onChange, className = "" }) => (
    <div className={`space-y-1.5 ${className}`}>
        {label && <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>}
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-400"
        />
    </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600">
                        <Icon name="x" size={24} />
                    </button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

window.UI = { Icon, Card, Button, Badge, Input, Modal };
