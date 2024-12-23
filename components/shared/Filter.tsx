"use client";
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { FormUrlQuery } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface props{
    filters:{
        name:string,
        value:string,
    }[],
    otherClasses?:string,
    containerClasses?:string
}

const Filter = ({ filters, otherClasses, containerClasses }: props) => {
    const searchParams=useSearchParams();
    const router=useRouter();
    const paramFilter=searchParams.get('filter');

    const handleUpdateParams=(value:string)=>{
        const newUrl=FormUrlQuery({
            params:searchParams.toString(),
            key:'filter',
            value
        })
        router.push(newUrl,{scroll:false});
    }
    return (
        <div className={`relative ${containerClasses}`}>
            <Select onValueChange={(value)=>handleUpdateParams(value)}
            defaultValue={paramFilter || undefined}
                >
                <SelectTrigger className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
                    <div className='line-clamp-1 flex-1 text-left'>
                        <SelectValue placeholder="Select a Filter" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {filters.map((item)=>(<SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    ) 
}

export default Filter    