/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class OperacionesService {
  operar(operacion: string = '', a: number, b?: number) {
    switch (operacion) {
      case 'suma':
        return this.#suma(a, b!);
      case 'resta':
        return this.#resta(a, b!);
      case 'multiplicacion':
        return this.#multiplicacion(a, b!);
      case 'division':
        return this.#division(a, b!);
      case 'potencia':
        return this.#potencia(a, b!);
      case 'factorial':
        return this.#factorial(a);
      default:
        throw new Error('Operación no implementada');
    }
  }


  #suma(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a + b;
  }

  #resta(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a - b;
  }

  #multiplicacion(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a * b;
  }

  #division(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    if (b === 0) throw new Error('División por cero no permitida');
    return a / b;
  }

  #potencia(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return Math.pow(a, b);
  }

  #factorial(n: number) {
    if (n === undefined) throw new Error('Número indefinido');
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new Error('Número inválido para factorial');
    }

    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

}
