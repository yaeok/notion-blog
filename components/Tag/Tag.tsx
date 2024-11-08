type TagProps = {
  tag: string
}

const Tag = ({ tag }: TagProps) => {
  return (
    <span className='text-white bg-sky-900 rounded-xl px-2 pb-1 font-medium'>
      {tag}
    </span>
  )
}

export default Tag
