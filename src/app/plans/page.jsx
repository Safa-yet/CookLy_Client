import PlansPage from '@/component/Item/PlansPage';
import { getUserSession } from '@/lib/Reuseable/session';
import { redirect } from 'next/navigation';
import React from 'react';

const Plans = async () => {

    const user = await getUserSession();

  if (!user) {
    redirect("/auth/signin?redirect=/plans");
  }

  return (
    <div>
      <PlansPage></PlansPage>
    </div>
  );
};

export default Plans;