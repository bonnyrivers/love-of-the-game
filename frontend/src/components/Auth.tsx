// @ts-nocheck
import { useState } from 'react';
import { Btn, Mono, Rule, Screen } from './UI.tsx';
import { registerUser, signInUser } from '../services/profileApi.ts';
import './Auth.css';

type AuthProps = {
  go: (screen: string) => void;
  set: (data: Partial<Record<string, any>>) => void;
  mode: 'register' | 'signin';
};

export default function Auth({ go, set, mode }: AuthProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const isRegister = mode === 'register';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextName = name.trim();
    const nextEmail = email.trim().toLowerCase();

    if ((!nextName && isRegister) || !nextEmail || !password) {
      setError(
        isRegister ? 'Name, email, and password are required.' : 'Email and password are required.'
      );
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      if (isRegister) {
        const { authToken, profile } = await registerUser({
          name: nextName,
          email: nextEmail,
          password,
        });

        set({
          ...profile,
          authToken,
          password,
        });
        go('ob-identity');
      } else {
        const { authToken, profile } = await signInUser({
          email: nextEmail,
          password,
        });

        set({
          ...profile,
          authToken,
          password,
        });
        go('home');
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : isRegister
            ? 'Registration failed.'
            : 'Sign in failed.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen className="auth-screen">
      <div className="fu d1 auth-header">
        <Mono>{isRegister ? 'Create account' : 'Sign in'}</Mono>
        <h1 className="auth-title">
          {isRegister
            ? 'Register your user before onboarding.'
            : 'Sign in with your saved credentials.'}
        </h1>
        <p className="auth-subtitle">
          {isRegister
            ? 'This stores a simple local session in the browser and creates your backend user record.'
            : 'This verifies your email and password against the backend before restoring your profile.'}
        </p>
      </div>

      <form className="fu d3 auth-form" onSubmit={handleSubmit}>
        {isRegister ? (
          <label className="auth-field">
            <Mono>Name</Mono>
            <input
              className="auth-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Avery"
              autoComplete="name"
            />
          </label>
        ) : null}

        <label className="auth-field">
          <Mono>Email</Mono>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="avery@example.com"
            autoComplete="email"
          />
        </label>

        <label className="auth-field">
          <Mono>Password</Mono>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={isRegister ? 'Minimum 1 character' : 'Your password'}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />
        </label>

        <Rule className="auth-rule" />

        {error ? <p className="auth-error">{error}</p> : null}

        <div className="auth-actions">
          <Btn disabled={submitting}>
            {submitting
              ? isRegister
                ? 'Creating account...'
                : 'Signing in...'
              : isRegister
                ? 'Create account'
                : 'Sign in'}
          </Btn>
          <Btn
            ghost
            onClick={(event) => {
              event.preventDefault();
              go('splash');
            }}
          >
            Back
          </Btn>
        </div>

        <button
          className="auth-switch"
          type="button"
          onClick={() => go(isRegister ? 'auth-signin' : 'auth-register')}
        >
          {isRegister ? 'Already have an account? Sign in.' : 'Need an account? Create one.'}
        </button>
      </form>
    </Screen>
  );
}
