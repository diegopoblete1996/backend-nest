/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesService } from './operaciones.service';
import { OperacionesController } from './operaciones.controller';

describe('OperacionesService', () => {
  let service: OperacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionesService],
    }).compile();

    service = module.get<OperacionesService>(OperacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('operacion deberia sumar', () => {
    let a: any = 10;
    let b = 30;

    expect(service.operar('suma', a, b)).toBe(40);

    a = -10;
    b = 50;
    expect(service.operar('suma', a, b)).toBe(40);

    a = -10;
    b = -50;
    expect(service.operar('suma', a, b)).not.toBe(-100);

    a = Math.PI;
    b = 30;
    expect(service.operar('suma', a, b)).toBeCloseTo(33.14, 2);

    a = 'texto';
    b = 50;
    expect(service.operar('suma', a, b)).toBeNaN();

    a = '10';
    b = 50;
    expect(service.operar('suma', a, b)).toBeNaN();

    a = undefined;
    b = 50;
    expect(() => {
      service.operar('suma', a, b);
    }).toThrow('No se puede llamar con números indefinidos.');
  });

  //Nuevas pruebas
   it('debe restar correctamente', () => {
    expect(service.operar('resta', 10, 4)).toBe(6);

    expect(() => {
      service.operar('resta', 50, undefined);
    }).toThrow('No se puede llamar con números indefinidos.');

    let a: any = 'texto';
    expect(service.operar('resta', a, 50)).toBeNaN();
  });

  it('debe multiplicar correctamente', () => {
    expect(service.operar('multiplicacion', 3, 7)).toBe(21);

    expect(() => {
      service.operar('multiplicacion', 50, undefined);
    }).toThrow('No se puede llamar con números indefinidos.');

    let a: any = 'texto';
    expect(service.operar('multiplicacion', a, 50)).toBeNaN();
  });

  it('debe dividir correctamente', () => {
    expect(service.operar('division', 20, 4)).toBe(5);

    expect(() => {
      service.operar('division', 50, undefined);
    }).toThrow('No se puede llamar con números indefinidos.');

    expect(() => service.operar('division', 10, 0)).toThrow('División por cero no permitida');

    let a: any = 'texto';
    expect(service.operar('division', a, 50)).toBeNaN();
  });

  it('debe calcular potencia correctamente', () => {
    expect(service.operar('potencia', 2, 3)).toBe(8);

    expect(() => {
      service.operar('potencia', 50, undefined);
    }).toThrow('No se puede llamar con números indefinidos.');

    let a: any = 'texto';
    expect(service.operar('potencia', a, 50)).toBeNaN();
  });

  it('debe calcular factorial correctamente', () => {
    expect(service.operar('factorial', 5)).toBe(120);

    expect(() => service.operar('factorial', -2)).toThrow();

    let a: any = undefined;
    expect(() => {
      service.operar('factorial', a);
    }).toThrow('Número indefinido');
  });

  it('debe lanzar error si operación no existe', () => {
    expect(() => service.operar('noexiste', 1, 2)).toThrow('Operación no implementada');
  });

  it('debe lanzar error si a o b es undefined', () => {
    expect(() => service.operar('suma', undefined as any, 2)).toThrow();
    expect(() => service.operar('suma', 2, undefined as any)).toThrow();
  });
});


describe('OperacionesController', () => {
  let controller: OperacionesController;

  beforeEach(() => {
    controller = new OperacionesController(new OperacionesService());
  });

  it('debería devolver resultado exitoso (suma)', () => {
    const res = controller.operar('suma', 10 as any, 5 as any);
    expect(res).toEqual({
      resultado: 15,
      mensaje: 'operacion exitosa',
    });
  });

  it('debería devolver resultado NaN con mensaje de error', () => {
    const res = controller.operar('suma', 'texto' as any, 5 as any);
    expect(res.resultado).toBeNaN();
    expect(res.mensaje).toBe('operacion no pudo ser calculada');
  });

});