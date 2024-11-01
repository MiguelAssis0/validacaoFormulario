"use client";
import React from 'react';
import { useForm, Resolver, FieldErrors } from 'react-hook-form';
import styles from "./page.module.css";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: FieldErrors<FormValues> = {};

  // Verifica se o e-mail é fornecido
  if (!values.email) {
    errors.email = {
      type: 'required',
      message: 'Email é obrigatório.',
    };
  } else if (!/\S+@\S+\.\S+/.test(values.email)) { // Validação básica de e-mail
    errors.email = {
      type: 'pattern',
      message: 'Email não é válido.',
    };
  }

  // Verifica se a senha é fornecida
  if (!values.password) {
    errors.password = {
      type: 'required',
      message: 'Senha é obrigatória.',
    };
  } else if (values.password.length < 6) {
    errors.password = {
      type: 'minLength',
      message: 'A senha deve ter pelo menos 6 caracteres.',
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1>Login</h1>
        
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Senha"
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Entrar</button>
      </form>
    </div>
  );
}
