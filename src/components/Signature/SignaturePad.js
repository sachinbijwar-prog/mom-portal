// Digital Signature Module

const { Icon, Button } = window.UI;

const SignaturePad = ({ onSign, onCancel, userName, userRole }) => {
    const [mode, setMode] = React.useState('draw'); // draw, type, upload
    const [typedName, setTypedName] = React.useState(userName || '');
    const canvasRef = React.useRef(null);
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [hasDraft, setHasDraft] = React.useState(false);

    // Canvas Logic
    React.useEffect(() => {
        if (mode === 'draw' && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // Adjust for DPI
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            
            ctx.strokeStyle = '#0f172a'; // Slate-900
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }, [mode]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        setHasDraft(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasDraft(false);
    };

    const handleConfirm = () => {
        let signatureData = '';
        if (mode === 'draw') {
            signatureData = canvasRef.current.toDataURL();
        } else if (mode === 'type') {
            signatureData = typedName;
        } else {
            signatureData = 'upload_placeholder';
        }
        
        onSign({
            type: mode,
            data: signatureData,
            timestamp: new Date().toISOString(),
            userName,
            userRole
        });
    };

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl">
                {['draw', 'type', 'upload'].map(m => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                            mode === m ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'
                        }`}
                    >
                        {m}
                    </button>
                ))}
            </div>

            {/* Signature Area */}
            <div className="min-h-[200px] flex flex-col">
                {mode === 'draw' && (
                    <div className="relative flex-1 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden touch-none">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            className="w-full h-[200px] cursor-crosshair"
                        />
                        <button 
                            onClick={clearCanvas}
                            className="absolute top-2 right-2 p-2 text-slate-400 hover:text-red-500"
                        >
                            <Icon name="refresh-ccw" size={16} />
                        </button>
                        {!hasDraft && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 text-sm">
                                Sign here with your finger
                            </div>
                        )}
                    </div>
                )}

                {mode === 'type' && (
                    <div className="flex-1 space-y-4">
                        <input
                            type="text"
                            value={typedName}
                            onChange={(e) => setTypedName(e.target.value)}
                            className="w-full px-4 py-4 text-center text-3xl font-signature text-primary-900 bg-primary-50/50 rounded-2xl border-2 border-primary-100 outline-none placeholder:text-slate-300"
                            placeholder="Type your name..."
                        />
                        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">Preview of digital signature</p>
                    </div>
                )}

                {mode === 'upload' && (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-6 text-center cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-3 text-slate-500">
                            <Icon name="upload-cloud" size={24} />
                        </div>
                        <p className="text-sm font-semibold text-slate-700">Upload Signature Image</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                        <input type="file" className="hidden" id="sig-upload" />
                    </div>
                )}
            </div>

            {/* Legal Consent */}
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <div className="flex gap-3">
                    <Icon name="shield-check" size={18} className="text-amber-600 flex-shrink-0" />
                    <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                        By clicking "Confirm Signature", I acknowledge that this is a legally binding electronic signature for the Society Meeting Minutes.
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={onCancel}>Cancel</Button>
                <Button 
                    variant="primary" 
                    className="flex-1" 
                    onClick={handleConfirm}
                    disabled={mode === 'draw' && !hasDraft || mode === 'type' && !typedName}
                >
                    Confirm Signature
                </Button>
            </div>
        </div>
    );
};

window.SignaturePad = SignaturePad;
