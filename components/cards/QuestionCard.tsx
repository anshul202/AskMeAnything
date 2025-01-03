import Link from 'next/link'
import React from 'react'
import RenderTag from '../shared/Search/RenderTag'
import Metric from '../shared/Search/Metric'
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils'
import { ObjectId } from 'mongoose'
import { SignedIn } from '@clerk/nextjs'
import EditDeleteAction from '../shared/EditDeleteAction'



interface props {
  _id: ObjectId,
  title: string,
  tags: {
    _id: string,
    name: string
  }[],
  author: {
    _id: string,
    name: string,
    picture: string
    clerkId:string
  },
  upvotes: ObjectId[],
  views: number,
  answers: Array<object>,
  createdAt: Date
  clerkId?:string
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  clerkId
}: props) => {
  const showActionButtons=clerkId && clerkId===author.clerkId; 
  return (
    <div className=' card-wrapper p-9 sm:px-11 rounded-[10px]'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div>
          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>{String(createdAt)}</span>
          <Link href={`/questions/${_id}`}>
            <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
              {title}
            </h3>
          </Link>
        </div>
        {/* {if signed in add edit delete actions} */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className='mt-3.5 flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} title={tag.name}/>
        ))
        }
      </div>
      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
      <Metric
        imgUrl={author.picture}
        alt="user"
        value={author.name}
        title={getTimestamp(createdAt)}
        href={`/profile/${author._id}`}
        isAuthor
        textStyles="body-medium text-dark400_light700"
        />
        <Metric
        imgUrl="/assets/icons/like.svg"
        alt="upvote"
        value={formatAndDivideNumber(upvotes.length)}
        title="votes"
        textStyles="small-medium text-dark400_light800"
        />
        <Metric
        imgUrl="/assets/icons/message.svg"
        alt="message"
        value={formatAndDivideNumber(answers.length)}
        title="Answers"
        textStyles="small-medium text-dark400_light800"
        />
        <Metric
        imgUrl="/assets/icons/eye.svg"
        alt="eye"
        value={formatAndDivideNumber(views)}
        title="Views"
        textStyles="small-medium text-dark400_light800"
        />
      </div>

    </div>
  )
}


export default QuestionCard