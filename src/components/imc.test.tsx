import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

import IMC from './imc';

describe('IMC component', () => {
  it('renders inputs and button', () => {
    render(<IMC />);
    const pesoInput = screen.getByPlaceholderText('Ex: 70.5');
    const alturaInput = screen.getByPlaceholderText('Ex: 1.75');
    const calcularButton = screen.getByRole('button', { name: /Calcular IMC/i });

    expect(pesoInput).toBeInTheDocument();
    expect(alturaInput).toBeInTheDocument();
    expect(calcularButton).toBeInTheDocument();
  });

  it('shows "Abaixo do peso" for IMC < 18.5 and formats to two decimals', async () => {
    render(<IMC />);

    const pesoInput = screen.getByPlaceholderText('Ex: 70.5');
    const alturaInput = screen.getByPlaceholderText('Ex: 1.75');
    const calcularButton = screen.getByRole('button', { name: /Calcular IMC/i });

    await userEvent.type(pesoInput, '50');
    await userEvent.type(alturaInput, '1.80');
    await userEvent.click(calcularButton);

    const resultado = await screen.findByText(/Seu IMC é 15.43 - Abaixo do peso/i);
    expect(resultado).toBeInTheDocument();

  });

  it('classifies Peso normal, Sobrepeso and Obesidade categories correctly', async () => {
    render(<IMC />);

    const pesoInput = screen.getByPlaceholderText('Ex: 70.5');
    const alturaInput = screen.getByPlaceholderText('Ex: 1.75');
    const calcularButton = screen.getByRole('button', { name: /Calcular IMC/i });

    await userEvent.clear(pesoInput);
    await userEvent.clear(alturaInput);
    await userEvent.type(pesoInput, '70');
    await userEvent.type(alturaInput, '1.75');
    await userEvent.click(calcularButton);
    let resultado = await screen.findByText(/Seu IMC é 22.86 - Peso normal/i);
    expect(resultado).toBeInTheDocument();

    await userEvent.clear(pesoInput);
    await userEvent.clear(alturaInput);
    await userEvent.type(pesoInput, '80');
    await userEvent.type(alturaInput, '1.75');
    await userEvent.click(calcularButton);
    resultado = await screen.findByText(/Seu IMC é 26.12 - Sobrepeso/i);
    expect(resultado).toBeInTheDocument();

    await userEvent.clear(pesoInput);
    await userEvent.clear(alturaInput);
    await userEvent.type(pesoInput, '95');
    await userEvent.type(alturaInput, '1.75');
    await userEvent.click(calcularButton);
    resultado = await screen.findByText(/Seu IMC é 31.02 - Obesidade grau I/i);
    expect(resultado).toBeInTheDocument();

    await userEvent.clear(pesoInput);
    await userEvent.clear(alturaInput);
    await userEvent.type(pesoInput, '110');
    await userEvent.type(alturaInput, '1.75');
    await userEvent.click(calcularButton);
    resultado = await screen.findByText(/Seu IMC é 35.92 - Obesidade grau II/i);
    expect(resultado).toBeInTheDocument();

    await userEvent.clear(pesoInput);
    await userEvent.clear(alturaInput);
    await userEvent.type(pesoInput, '130');
    await userEvent.type(alturaInput, '1.75');
    await userEvent.click(calcularButton);
    resultado = await screen.findByText(/Seu IMC é 42.45 - Obesidade grau III/i);
    expect(resultado).toBeInTheDocument();
  });

  it('shows Obesidade grau III for very high IMC', async () => {
    render(<IMC />);

    const pesoInput = screen.getByPlaceholderText('Ex: 70.5');
    const alturaInput = screen.getByPlaceholderText('Ex: 1.75');
    const calcularButton = screen.getByRole('button', { name: /Calcular IMC/i });

    await userEvent.type(pesoInput, '150');
    await userEvent.type(alturaInput, '1.60');
    await userEvent.click(calcularButton);

    const resultado = await screen.findByText(/Seu IMC é 58.59 - Obesidade grau III/i);
    expect(resultado).toBeInTheDocument();
  });

  it('shows error when peso is non-positive', async () => {
    render(<IMC />);
    
    const pesoInput = screen.getByPlaceholderText('Ex: 70.5');
    const alturaInput = screen.getByPlaceholderText('Ex: 1.75');
    const calcularButton = screen.getByRole('button', { name: /Calcular IMC/i });

    await userEvent.type(pesoInput, '-70');
    await userEvent.type(alturaInput, '1.75');
    await userEvent.click(calcularButton);

    expect(await screen.findByText('O peso deve ser um valor positivo')).toBeInTheDocument();
  });

  it('shows error when altura is non-positive', async () => {
    render(<IMC />);
    
    const pesoInput = screen.getByPlaceholderText('Ex: 70.5');
    const alturaInput = screen.getByPlaceholderText('Ex: 1.75');
    const calcularButton = screen.getByRole('button', { name: /Calcular IMC/i });

    await userEvent.type(pesoInput, '70');
    await userEvent.type(alturaInput, '-1.75');
    await userEvent.click(calcularButton);

    expect(await screen.findByText('A altura deve ser um valor positivo')).toBeInTheDocument();
  });
});
