import {prisma} from "../../src/db/client";

describe('Prisma client', () => {
  it('должен быть инициализирован', () => {
    expect(prisma).toBeDefined();
  });
});