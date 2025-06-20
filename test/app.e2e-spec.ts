import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!!');
  });

  it('/operaciones (GET)', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 10, b: 30 })
      .expect(200)
      .expect('Content-type', /application\/json/)
      .then((response) => {
        expect(response.body.resultado).toBe(40);
      });
  });

  it('/operaciones (GET)', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 100, b: 100 })
      .expect(200)
      .expect('Content-type', /application\/json/)
      .then((response) => {
        expect(response.body.resultado).toBe(200);
      });
  });

  it('/operaciones (GET)', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: "a", b: 100 })
      .expect(502);
  });

  //Nuevas pruebas
  it('/operaciones suma válida (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'suma', a: 4, b: 5 })
    .expect(200)
    .expect('Content-type', /json/)
    .then((res) => {
      expect(res.body.resultado).toBe(9);
    });
});

it('/operaciones resta válida (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'resta', a: 10, b: 3 })
    .expect(200)
    .then((res) => {
      expect(res.body.resultado).toBe(7);
    });
});

it('/operaciones multiplicación válida (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'multiplicacion', a: 3, b: 4 })
    .expect(200)
    .then((res) => {
      expect(res.body.resultado).toBe(12);
    });
});

it('/operaciones división válida (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'division', a: 20, b: 4 })
    .expect(200)
    .then((res) => {
      expect(res.body.resultado).toBe(5);
    });
});

it('/operaciones potencia válida (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'potencia', a: 2, b: 3 })
    .expect(200)
    .then((res) => {
      expect(res.body.resultado).toBe(8);
    });
});

it('/operaciones factorial válida (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'factorial', a: 5 })
    .expect(200)
    .then((res) => {
      expect(res.body.resultado).toBe(120);
    });
});


it('/operaciones división por cero (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'division', a: 10, b: 0 })
    .expect((res) => {
  expect([500, 502]).toContain(res.status);
});
});

it('/operaciones sin parámetro b (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'suma', a: 2 })
    .expect((res) => {
  expect([500, 502]).toContain(res.status);
});
});

it('/operaciones con a no numérico (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'suma', a: 'hola', b: 5 })
    .expect((res) => {
  expect([500, 502]).toContain(res.status);
});
});

it('/operaciones con b no numérico (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'potencia', a: 2, b: 'xyz' })
    .expect((res) => {
  expect([500, 502]).toContain(res.status);
});
});

it('/operaciones factorial con número negativo (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'factorial', a: -1 })
    .expect((res) => {
  expect([500, 502]).toContain(res.status);
});
});

it('/operaciones factorial con decimal (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'factorial', a: 3.5 })
    .expect((res) => {
  expect([500, 502]).toContain(res.status);
});
});

it('/operaciones con operación no soportada (GET)', () => {
  return request(app.getHttpServer())
    .get('/operaciones')
    .query({ operacion: 'modulo', a: 10, b: 3 })
    .expect((res) => {
  expect([500, 502]).toContain(res.status);
});
});

});
