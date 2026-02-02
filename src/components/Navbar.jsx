import { Link } from 'react-router-dom';
import { Scan, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: '1.5rem',
            zIndex: 50,
            backdropFilter: 'blur(10px)',
            background: 'var(--color-glass-strong)',
            borderBottom: '1px solid var(--color-glass-border)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text)' }}>
                    <Scan color="var(--color-primary)" /> Facts<span className="text-gradient">Scan</span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ color: 'var(--color-text)' }}>Home</Link>
                    <Link to="/scan" style={{ color: 'var(--color-text)' }}>Scanner</Link>
                    <Link to="/how-it-works" style={{ color: 'var(--color-text)' }}>How It Works</Link>

                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--color-glass-border)',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link to="/scan" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                        Scan Now
                    </Link>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
