import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from './RenderTag'
const hotQuestions=[
    {
        _id:1,
        title:"How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
    },
    {
        _id:2,
        title:"How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
    },
    {
        _id:3,
        title:"How to backlsk Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
    }
]
const popularTags=[
    {
        _id:'1',
        title:"React",
        totalQuestions:100
    },
    {
        _id:'2',
        title:"javascript",
        totalQuestions:100
    },
    {
        _id:'3',
        title:"html",
        totalQuestions:100
    }
]


const RightSidebar = () => {
    
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
         <div className="">
            <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
                {hotQuestions.map((question)=>{
                    return (
                        <Link href={`/questions/${question._id}`} key={question._id} className='flex cursor-pointer items-center justify-betweengap-7'>
                            <p className='body-medium text-dark500_light700'>{question.title}</p>
                            <Image src='/assets/icons/chevron-right.svg' alt='arrow-right' width={20} height={20 }/>
                        </Link>
                    )
                })}
            </div>
         </div>
         <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>Popular tags</h3> 
            <div className='mt-7 flex flex-col gap-4'>
                {popularTags.map((tag)=>(<RenderTag key={tag._id} _id={tag._id} title={tag.title} totalQuestions={tag.totalQuestions} showCount/>))}
            </div>
         </div>
    </section>
    )
}

export default RightSidebar