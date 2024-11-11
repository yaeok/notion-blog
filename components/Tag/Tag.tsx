type TagProps = {
  tag: string
}

const Tag = ({ tag }: TagProps) => {
  return (
    <span className='text-sm font-medium text-white bg-orange-500 rounded-xl px-2 pb-1'>
      {tag}
    </span>
  )
}

export default Tag
