"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AnswerSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState } from 'react'
import { useTheme } from '@/app/context/ThemeProvider'
import { Button } from '../ui/button';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';

interface props{
    question:string;
    questionId:string;
    authorId:string;
}

const Answer = ({question,questionId,authorId}:props) => {
    const [isSubmitting, setisSubmitting] = useState(false)
    const [isSubmittingAI, setisSubmittingAI] = useState(false)

    const {mode}=useTheme();   
    const pathName=usePathname();
    const editorRef=useRef(null)
   
    const form=useForm<z.infer<typeof AnswerSchema>>({
        resolver:zodResolver(AnswerSchema),
        defaultValues:{
            answer:''
        }
    })

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setisSubmitting(true);
    let answerContent = values.answer;
    if (editorRef.current) {
      answerContent = editorRef.current.getContent({ format: "text" });
    }

    answerContent = answerContent.replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#?\w+;/g, '')
      .replace(/<[^>]+>/g, '');

    const wordCount = answerContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .length;
      
      console.log(wordCount)
    if (wordCount < 30) {
      alert("Answer should be at least 30 words.");
      setisSubmitting(false);
      return;
    }
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathName,
      })
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current;
        editor.setContent('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false)
    }
  }

    const generateAIAnswer=async()=>{
      if(!authorId)return;
      setisSubmittingAI(true); 
      try {
        const response=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/gemini`,{
          method:'POST',
          body:JSON.stringify({
            question
          })
        })
        const aiAnswer=await response.json();

        const formattedAnswer=aiAnswer.answer.replace(/\n/g, '<br/>');
        if(editorRef.current){
          const editor=editorRef.current as any;
          editor.setContent(formattedAnswer);
        }
        //toast notification
        console.log(aiAnswer.answer)
      } catch (error) {
        console.log(error)
      }finally{
        setisSubmittingAI(false)
      }
    }
  return (
    <div>
        <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center smg:gap-2'>
            <h4 className='paragraph-semibold text-dark400_light800'>Write your answer here</h4>
            <Button className='btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow_none dark:text-primary-500'
             onClick={generateAIAnswer} disabled={isSubmittingAI}
            >
               {isSubmittingAI?(<>
              Generating....
            </>):(<>
                <Image src='/assets/icons/stars.svg' 
                alt='start'
                width={12}
                height={12} 
                className='object-contain'
                />
                Generate from AI
            </>)}
            </Button>
        </div>
    <Form {...form}>
        <form className='flex w-full mt-6 flex-col gap-10' onSubmit={form.handleSubmit(handleCreateAnswer)}>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>     
              <FormControl className='mt-3.5'>
                {/* formeditor  */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYKEY}
                  onInit={(_evt, editor) => {
                    //@ts-ignore
                    editorRef.current = editor ;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content)=>field.onChange(content)}
                  
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                      'insertdatetime', 'media', 'table','wordcount'],
                    toolbar: 'undo redo |  ' +
                      'codesample bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent',
                    content_style: 'body { font-family:Inter; font-size:16px }',
                    skin:mode==='dark'?'oxide-dark':'oxide',
                    content_css:mode==='dark'?'dark':'light',
                    
                  }}
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <div className='flex justify-end '>
            <Button type='submit' className='primary-gradient w-fit text-white' disabled={isSubmitting}>
                {isSubmitting?'Submitting...':'Submit'}
            </Button>
        </div>
        </form>
    </Form>
    </div>
  )
}

export default Answer