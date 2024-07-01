import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = () => {
  const route = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('email ou senha inválido');
    } else {
      route.push('/')
    }
  };

  return (
    <section className="text-transparent-black flex h-screen items-center justify-center">
      <div className="m-10 flex w-96 flex-col justify-between gap-4 p-8 align-middle">
        <h1 className="text-3xl font-extrabold text-black dark:text-white">
          Fazer login
        </h1>
        <div className="flex flex-col gap-2">
          <Input
            value={email}
            type="email"
            placeholder="Insira seu endereço de email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="•••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <button
          className="rounded-md bg-fruit-salad-600 p-2 text-white shadow-sm"
          onClick={handleSignIn}
          type='submit'
        >
          Entrar
        </button>

        <div className="flex justify-center gap-2 text-center text-sm">
          <Link href="/forgot_password" className="tracking-wide underline">
            Esqueceu sua senha?
          </Link>
          <span>•</span>
          <Link href="/register" className="tracking-wide underline">
            Criar uma conta
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
