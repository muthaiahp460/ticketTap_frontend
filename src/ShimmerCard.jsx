const ShimmerCard = () => {
  return (
    <div className="w-[170px] lg:w-[208px] rounded-2xl shadow-md m-8 overflow-hidden">
        <div className="h-[200px] lg:h-[260px] shimmer"></div>
        <div className="px-3 pt-2 pb-3 flex flex-wrap gap-2">
            <div className='w-full h-4 shimmer'></div>
            <div className='w-full h-4 shimmer'></div>
        </div>
    </div>
  )
}

export default ShimmerCard
