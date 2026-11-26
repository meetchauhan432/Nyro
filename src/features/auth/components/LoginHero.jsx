import React, { useState } from 'react';
import { ArrowLeftRight, ChartNoAxesCombined, Users, Pause, Play } from 'lucide-react';

const highlights = [
  { Icon: ArrowLeftRight, title: 'Payment operations', text: 'Manage your payment workflows.' },
  { Icon: ChartNoAxesCombined, title: 'Financial insights', text: 'Track your financial activity.' },
  { Icon: Users, title: 'Team management', text: 'Manage teams in one place.' },
];

export function LoginHero({ dialogOpen }) {
  const [paused, setPaused] = useState(false);
  return (
    <aside className={`auth-frame${paused || dialogOpen ? ' is-paused' : ''}`} aria-label="NYRO workspace">
      <div className="auth-hero-art" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}nyro-login-hero.webp`} alt="" fetchPriority="high" decoding="async" />
      </div>
      <div className="auth-hero-shade" aria-hidden="true" />
      <div className="auth-frame-copy">
        <span className="auth-hero-accent" aria-hidden="true" />
        <p className="auth-hero-eyebrow">NYRO TECHNOLOGIES</p>
        <h1>Run your whole payment workspace from one place.</h1>
        <p className="auth-hero-description">Bring payment operations, financial insights and team management together in one workspace.</p>
      </div>
      <div className="auth-hero-bottom">
        <div className="auth-hero-features">
          {highlights.map(({ Icon, title, text }) => (
            <div className="auth-hero-feature" key={title}>
              <span className="auth-hero-feature-icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
              <div><strong>{title}</strong><p>{text}</p></div>
            </div>
          ))}
        </div>
        <button className="auth-motion-control" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? 'Resume background motion' : 'Pause background motion'}
        </button>
      </div>
    </aside>
  );
}
