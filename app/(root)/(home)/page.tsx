import HomeFilters from '@/components/home/HomeFilters'
import QuestionCard from '@/components/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResults from '@/components/shared/NoResults'
import LocalSearchBar from '@/components/shared/Search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'
import React from 'react'

const questions=[
  // {
  //   id:1,
  //   title:'How to create a new project in React?',
  //   tags:[{id:1,name:'React'},{id:2,name:'JavaScript'},{id:3,name:'Frontend'}],
  //   author:'John doe',
  //   upvotes:10,
  //   views:10,
  //   answers:2,
  //   createdAt:'2021-10-10',
  // },
  // {
  //   id:2,
  //   title:'How to ccenter a div?',
  //   tags:[{id:1,name:'React'},{id:2,name:'JavaScript'},{id:4,name:'css'}],
  //   author:'John doe',
  //   upvotes:10,
  //   views:10,
  //   answers:2,
  //   createdAt:'2021-10-10',
  // }
]

const Home = () => {
  return (
    <>
    <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center  '>
      <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
      <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
      <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
        Ask Something..
      </Button>
      </Link>
    </div>
    <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
      <LocalSearchBar
      route="/"
      iconPosition="left"
      imgSrc="/assets/icons/search.svg"
      placeHolder="Search for questions"
      otherClasses="flex-1"
      /> 
      <Filter filters={HomePageFilters}
      otherClasses="min-h-[56px] sm:min-w-[170px]"
      containerClasses="hidden max-md:flex"
      />
    </div>
    <HomeFilters/>
    <div className='mt-10 flex w-full flex-col gap-6'>
      {(questions.length>0)?questions.map((item)=>(<QuestionCard/>)):(<NoResults/>)}
      
    </div>
    </>
  )
}

export default Home