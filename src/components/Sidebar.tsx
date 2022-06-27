import { Lesson } from './Lesson'
import { useGetLessonsQuery } from '../graphql/generated'

export const Sidebar = () => {
  const {data} = useGetLessonsQuery()
  
  
  return (
    <div className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">Class schedule</span>
      
      <div className="flex flex-col gap-8">
        { data?.lessons.map( lesson => {
          return (
            <Lesson
              key={ lesson.id }
              title={ lesson.title }
              type={ lesson.lessonType }
              slug={ lesson.slug }
              availableAt={ new Date( lesson.availableAt ) }
            />
          )
          
        } ) }
      
      </div>
    </div>
  )
}