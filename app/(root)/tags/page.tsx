import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import NoResults from '@/components/shared/NoResults'
import LocalSearchBar from '@/components/shared/Search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { UserFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'

const Page = async({searchParams}:SearchParamsProps) => {
  const result=await getAllTags({
    searchQuery:searchParams.q,
  });
  
  return (
    <>
    {/* <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center  '>
    </div> */}
    <h1 className='h1-bold text-dark100_light900'>All Tags</h1>
    <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
      <LocalSearchBar
      route="/tags"
      iconPosition="left"
      imgSrc="/assets/icons/search.svg"
      placeHolder="Search for tags.."
      otherClasses="flex-1"
      /> 
      <Filter filters={UserFilters}
      otherClasses="min-h-[56px] sm:min-w-[170px]"
      />

    </div>
    <section className='mt-11 flex flex-wrap gap-4'>
        {(result.length>0)?(result.map((tag)=>{
          return <Link href={`/tags/${tag._id}`} key={tag._id} className='shadow-light100_darknone'>
            <article className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
              <div className='background-light800_dark400 w-fit rounded-sm px-5 py-1.5'>
                <p className='paragraph-semibold text-dark300_light900'>
                  {tag.name}
                </p>
              </div>
              <p className='small-medium mt-3.5 text-dark400_light500'>
                <span className='body-semibold primary-text-gradient mr-2.5'>{tag.questions.length}+ </span>Questions
              </p>
            </article>
          </Link>
        })):(
          <NoResults title='No tags found' 
          description='it looks like there are no tags found' 
          link='/ask-question' 
          linkTitle='Ask a Question'/>
        )}
        
    </section>
    </>
  )
}

export default Page