export default function LoadingTodoList() {
  return (
    <>
      <div className="m-4 flex animate-pulse rounded-3xl border-2 border-gray-100">
        <div className="m-4 grid w-full gap-8">
          <div className="flex flex-col gap-4 p-2 shadow-sm">
            <div className="grid w-full grid-rows-4 items-center gap-1 md:grid-cols-[repeat(3,_1fr),_auto] md:grid-rows-1">
              <div className="flex items-center justify-start">
                <span className="h-8 w-40 animate-pulse rounded-2xl bg-gray-200"></span>
              </div>

              <div className="flex md:justify-center">
                <span className="h-8 w-20 animate-pulse rounded-2xl bg-gray-200"></span>
              </div>

              <div className="flex md:justify-center">
                <span className="h-9 w-36 animate-pulse rounded-2xl bg-gray-200"></span>
              </div>

              <div className="flex items-center gap-4 md:justify-center">
                <span className="h-10 w-24 animate-pulse rounded-2xl bg-gray-200"></span>
                <span className="h-10 w-24 animate-pulse rounded-2xl bg-gray-200"></span>
              </div>
            </div>

            <div className="flex">
              <span className="h-12 w-32 animate-pulse rounded-2xl bg-gray-200"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
