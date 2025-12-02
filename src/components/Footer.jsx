import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../config/company';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">V</span>
                            </div>
                            <span className="text-2xl font-bold text-white">{COMPANY_INFO.name}</span>
                        </div>
                        <p className="text-slate-400 mb-6">
                            Transformando la gestión empresarial con soluciones integrales en construcción y contabilidad.
                        </p>
                        <div className="flex space-x-4">
                            <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Enlaces Rápidos</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link></li>
                            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Servicios</Link></li>
                            <li><Link to="/portfolio" className="hover:text-blue-400 transition-colors">Proyectos</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Carreras</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Servicios</h3>
                        <ul className="space-y-4">
                            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Gestión de Proyectos</Link></li>
                            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Consultoría Contable</Link></li>
                            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Recursos Humanos</Link></li>
                            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Auditoría Financiera</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                <span>{COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>{COMPANY_INFO.phones.main}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <a href={`mailto:${COMPANY_INFO.emails.general}`} className="hover:text-blue-400 transition-colors">
                                    {COMPANY_INFO.emails.general}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} {COMPANY_INFO.legalName} Todos los derechos reservados.
                    </p>
                    <div className="flex space-x-6 text-sm text-slate-500">
                        <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacidad</Link>
                        <Link to="/terms" className="hover:text-blue-400 transition-colors">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
