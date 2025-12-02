import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../config/company';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simular pequeño delay para efecto de carga
        setTimeout(() => {
            const result = login(email, password);

            if (result.success) {
                // Redirección basada en el rol
                switch (result.role) {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'manager':
                        navigate('/manager');
                        break;
                    case 'client':
                        navigate('/client/dashboard');
                        break;
                    case 'worker':
                        navigate('/portal');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError(result.message || 'Error al iniciar sesión');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex bg-slate-900">
            {/* Lado Izquierdo - Imagen y Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-transparent to-transparent z-20" />
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Corporate Building"
                    className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 p-16 z-30 text-white w-full">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                            <span className="font-bold text-2xl">V</span>
                        </div>
                        <span className="text-3xl font-bold tracking-tight">{COMPANY_INFO.name}</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 leading-tight">
                        Gestión Empresarial <br />
                        <span className="text-blue-400">Inteligente y Segura</span>
                    </h2>
                    <p className="text-slate-300 text-lg max-w-md leading-relaxed">
                        Accede a tu portal exclusivo para gestionar proyectos, finanzas y operaciones en tiempo real.
                    </p>
                </div>
            </div>

            {/* Lado Derecho - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                {/* Botón volver */}
                <Link to="/" className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors flex items-center space-x-2 text-sm font-medium">
                    <span>Volver al inicio</span>
                    <ArrowRight size={16} />
                </Link>

                <div className="max-w-md w-full space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden flex justify-center mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                                <span className="text-white font-bold text-2xl">V</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h2>
                        <p className="text-slate-400">Ingresa tus credenciales para acceder al sistema.</p>
                    </div>

                    {/* Credenciales de Demo (Solo visible en desarrollo/demo) */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-xs text-slate-400 space-y-1">
                        <p className="font-semibold text-slate-300 mb-2 flex items-center">
                            <CheckCircle2 size={14} className="mr-2 text-green-500" />
                            Credenciales de Prueba (Demo):
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-blue-400">Admin:</span> admin@nexus.com
                            </div>
                            <div>
                                <span className="text-slate-500">Pass:</span> admin
                            </div>
                            <div>
                                <span className="text-blue-400">Cliente:</span> cliente@empresa.com
                            </div>
                            <div>
                                <span className="text-slate-500">Pass:</span> cliente
                            </div>
                            <div>
                                <span className="text-blue-400">Trabajador:</span> trabajador@vixo.com
                            </div>
                            <div>
                                <span className="text-slate-500">Pass:</span> trabajador
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                                    placeholder="Correo electrónico"
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                                    placeholder="Contraseña"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center p-4 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-700 rounded bg-slate-800"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    <p className="mt-2 text-center text-sm text-slate-500">
                        ¿No tienes acceso?{' '}
                        <a href={`mailto:${COMPANY_INFO.emails.support}`} className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                            Contactar a Soporte
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
