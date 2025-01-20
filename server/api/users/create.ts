import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get the request body
  const body = await readBody(event);

  const { email, name, address , posts} = body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        address: address ? {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip
        } : null,  
        posts: posts ? posts : []
      },
    });

    return {data: newUser};
  } catch (error) {
    console.error('Error creating user:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to create user' });
  }
});
