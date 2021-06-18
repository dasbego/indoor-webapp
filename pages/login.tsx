import React, { useState } from "react";
import firebaseClient from "../firebase/client";
import firebase from "firebase/app";
import "firebase/auth";
import { LockClosedIcon } from '@heroicons/react/solid';
import Alert from '../components/Alert';
import { useAuth } from "../contexts/Auth";
import { useRouter } from 'next/router';

const Login = () => {
  firebaseClient();
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [pwd, setPwd] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(event);
  }

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.auth().signInWithEmailAndPassword(email || '', pwd || '')
    .then((response) => {
      router.push('/records');
    }).catch(err => {
      setError(err.message);
    });
  }

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && pwd) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email || "", pwd || "")
        .then((e) => {
          console.log(e)
          debugger;
          window.location.href = "/";
        })
        .catch((error) => {
          const message = error.message;
          console.log(message);
        });
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto w-auto h-12"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-gray-900 text-3xl font-extrabold">
            Bienvenido a Indoor v1
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => onSubmit(e)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Usuario
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="placeholder-gray-500 focus:ring-skyblue-500 relative focus:z-10 block px-3 py-2 w-full text-gray-900 border border-gray-300 focus:border-indigo-500 rounded-none rounded-t-md focus:outline-none appearance-none sm:text-sm"
                placeholder="Usuario"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="placeholder-gray-500 focus:ring-skyblue-500 focus:border-skyblue-500 relative focus:z-10 block px-3 py-2 w-full text-gray-900 border border-gray-300 rounded-b-md rounded-none focus:outline-none appearance-none sm:text-sm"
                placeholder="Contraseña"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPwd(e.currentTarget.value)
                }
              />
            </div>
          </div>

          { error && <Alert variant="error" items={[error]} />
          }
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="text-skyblue-600 focus:ring-skyblue-500 w-4 h-4 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="block ml-2 text-gray-900 text-sm"
              >
                Recuerdame
              </label>
            </div>

            {/*<div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Olvidaste tu contraseña
              </a>
              </div>*/}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex justify-center px-4 py-2 w-full text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-white-500 group-hover:text-white-400" aria-hidden="true" />
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
