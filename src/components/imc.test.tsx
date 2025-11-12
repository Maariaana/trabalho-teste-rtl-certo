import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

import IMC from './imc';

describe('IMC component', () => {
  it('renders inputs and button', () => {});

  it('shows "Abaixo do peso" for IMC < 18.5 and formats to two decimals', async () => {});

  it('classifies Peso normal, Sobrepeso and Obesidade categories correctly', async () => {});

  it('shows Obesidade grau III for very high IMC', async () => {});

  it('shows error when peso is non-positive', async () => {});

  it('shows error when altura is non-positive', async () => {});
});
