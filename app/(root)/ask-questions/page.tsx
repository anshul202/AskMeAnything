import Questions from '@/components/forms/Questions'
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'



const AskQuestions = async() => {
  // const {userId}=auth();
  const userId='user_2nbQQ5feXxuyV0NmRYAzLsZc38D';
  if(!userId){
    redirect('/sign-in')
  }
  const mongoUser= await getUserById({userId});
  console.log(mongoUser);  
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a Question</h1>
      <div className='mt-9'>
        <Questions mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  )
}

export default AskQuestions