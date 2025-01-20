import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { email, name, address } = body;
  
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        address: address ? {
          street:address.street ? address.street : '',
          city:address.city? address.city: '',
          state: address.state? address.state: '',
          zip: address.zip? address.zip: ''
        } : null,  
      },
    });

    return {data: newUser};
  } catch (error) {
    console.error('Error creating user:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to create user' });
  }
});
