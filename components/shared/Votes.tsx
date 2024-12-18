"use client"
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface props{
    type:string;
    userId:string;
    itemId:string;
    upvotes:number;
    downvotes:number;
    hasUpVoted:boolean;
    hasDownVoted:boolean;
    hasSaved?:boolean;
}


const  Votes = ({type,userId,itemId,upvotes,downvotes,hasUpVoted,hasSaved,hasDownVoted}:props) => {
  const router=useRouter();
  const path=usePathname();
  const handleVote=async(action:string)=>{
    if(!userId){
      return;
    }
    if(action==='upvote'){
      if(type==='Question'){
        await upvoteQuestion({
          questionId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted:hasUpVoted,
          hasdownVoted:hasDownVoted,
          path:path
        });
      }else if(type==='Answer'){
        await upvoteAnswer({
          answerId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted:hasUpVoted,
          hasdownVoted:hasDownVoted,
          path:path
        })
      }
      return;
    }
    if(action==='downvote'){
      if(type==='Question'){
        await downvoteQuestion({
          questionId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted:hasUpVoted,
          hasdownVoted:hasDownVoted,
          path:path
        })
      }else if(type==='Answer'){
        await downvoteAnswer({
          answerId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted:hasUpVoted,
          hasdownVoted:hasDownVoted,
          path:path
        })
      }
      //todo: show a toast
      return;
    }
    
  }
  const handleSave=async()=>{
    await toggleSaveQuestion({
      userId:JSON.parse(userId),
      questionId:JSON.parse(itemId),
      path:path
    })
  }

  useEffect(() => {
    viewQuestion({
      questionId:JSON.parse(itemId),
      userId:userId?JSON.parse(userId):undefined
    });
  }, [itemId,userId,path,router])
  

  return (
    <div className='flex gap-5'>
        <div className='flex-center gap-2.5'>
            <div className='flex-center gap-1.5'>
                <Image
                src={hasUpVoted?'/assets/icons/upvoted.svg':'/assets/icons/upvote.svg'}
                height={18}
                width={18}
                alt='upvote'
                className='cursor-pointer'
                onClick={()=>handleVote('upvote')}
                />
                <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
                  <p className='subtle-medium text-dark400_light900'>
                    {formatAndDivideNumber(upvotes)}
                  </p>
                </div>
            </div>
            
            <div className='flex-center gap-1.5'>
                <Image
                src={hasDownVoted?'/assets/icons/downvoted.svg':'/assets/icons/downvote.svg'}
                height={18}
                width={18}
                alt='downvote'
                className='cursor-pointer'
                onClick={()=>handleVote('downvote')}
                />
                <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
                  <p className='subtle-medium text-dark400_light900'>
                    {formatAndDivideNumber(downvotes)}
                  </p>
                </div>
            </div>
        </div> 
        {type==='Question' && (
          <Image
          src={hasSaved?'/assets/icons/star-filled.svg':'/assets/icons/star-red.svg'}
          height={18}
          width={18}
          alt='star'
          className='cursor-pointer'
          onClick={handleSave}
        />
        )}
        
    </div>
  )
}

export default  Votes