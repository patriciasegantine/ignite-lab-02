import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { Link, useParams } from 'react-router-dom'

interface LessonPage {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export const Lesson = ( props: LessonPage ) => {
  const {slug} = useParams<{ slug: string }>()
  
  const isLessonAvailable = isPast( props.availableAt )
  const availableDateFormatted = format( props.availableAt, 'EEEE\' • \'do MMMM y \'•\' k\'pm\' ' )
  
  const isActiveLesson = slug === props.slug
  
  return (
    <Link to={ `/event/lesson/${ props.slug }` } className="group">
      <span className="text-gray-300">
        { availableDateFormatted }
      </span>
      
      <div className={ `rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500
      ${ isActiveLesson
        ? 'bg-green-500'
        : ''
      }`
      }>
        
        <header className="flex items-center justify-between">
          
          { isLessonAvailable ? (
            <span
              className={ `flex items-center gap-2 text-sm font-medium
              ${ !isActiveLesson
                ? 'text-blue-500'
                : 'text-white' }`
              }>
            <CheckCircle size={ 20 }/>
            Content released
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
            <Lock size={ 20 }/>
            Soon
            </span>
          ) }
          
          <span
            className={ `text-xs rounded px-2 py-[0.125rem] text-white border font-bold
          ${ !isActiveLesson
              ? 'border-green-300'
              : 'border-white' }` }>
            { props.type === 'live' ? 'Live' : 'Practical class' }
          </span>
        </header>
        
        <strong className={ ` mt-5 block
        ${ !isActiveLesson
          ? 'text-gray-200'
          : 'text-white' } ` }>
          { props.title }
        </strong>
      </div>
    </Link>
  )
}