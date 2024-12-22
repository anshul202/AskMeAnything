import HomeFilters from '@/components/home/HomeFilters'
import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResults from '@/components/shared/NoResults'
import LocalSearchBar from '@/components/shared/Search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'
import React from 'react'
import { getQuestions } from '@/lib/actions/question.action'
import { SearchParamsProps } from '@/types'
import Pagination from '@/components/shared/Pagination'


const Home = async({searchParams}:SearchParamsProps) => {
  const result=await getQuestions({
    searchQuery:searchParams.q,
    filter:searchParams.filter,
    page:searchParams.page?Number(searchParams.page):1
  });
 //recommended
 
  return (
    <>
    <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center  '>
      <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
      <Link href='/ask-questions' className='flex justify-end max-sm:w-full'>
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
      {(result.questions.length>0)?result.questions.map((item)=>(
      <QuestionCard
      _id={item._id}
      key={item._id}
      title={item.title}
      tags={item.tags} 
      views={item.views}
      author={item.author}
      upvotes={item.upvotes}
      answers={item.answers}
      createdAt={item.createdAt}
      />)):(<NoResults
      title="No Questions found!"
      description="Maybe you can be the first one.."
      link="/ask-questions"
      linkTitle="Ask Question"
      />)}
    </div>
    <div className='mt-10'>
    <Pagination
    pageNumber={searchParams?.page?+searchParams.page:1}
    isNext={result.isNext}
    />
    </div>
    </>
  )
}

export default Home