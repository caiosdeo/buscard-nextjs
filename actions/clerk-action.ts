"use server";

export async function deleteUser(user: string) {
  try {
    const response = await fetch(`https://api.clerk.com/v1/users/${user}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });
  
    if (response.ok) {
      console.log('Usuário excluído com sucesso.');
    } else {
      console.error('Erro ao excluir o usuário:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error);
  }
}