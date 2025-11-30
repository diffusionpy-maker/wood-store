import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth/options';

import AdminDashboard from './AdminDashboard';

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin-login');
  }
  return (
    <AdminDashboard
      user={{
        ...session.user,
        name: session.user?.name ?? undefined,
        email: session.user?.email ?? undefined,
      }}
    />
  );
}
