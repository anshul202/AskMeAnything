import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import LocalSearchBar from '@/components/shared/Search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'

const Page = async({searchParams}:SearchParamsProps) => {
  const result=await getAllUsers({
    searchQuery:searchParams.q,
  });
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
      route="/community"
      iconPosition="left"
      imgSrc="/assets/icons/search.svg"
      placeHolder="Search for users.."
      otherClasses="flex-1"
      /> 
      <Filter filters={UserFilters}
      otherClasses="min-h-[56px] sm:min-w-[170px]"
     
      />
    </div>
    <section className='mt-11 flex flex-wrap gap-4'>
        {(result.users.length>0)?(result.users.map((user)=>{
          return <UserCard key={user._id} user={user}/>
        })):(
          <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
            <p>No Users Found!</p>
            <Link href={'/sign-up'} className='mt-2 font-bold text-accent-blue'>
              Join to be the first!
            </Link>
          </div>
        )}
        
    </section>
    </>
  )
}

export default Page