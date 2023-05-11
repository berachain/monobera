export const Button = () => {
  return (
    <div className="rounded-md ">
      <a href="https://turbo.build/repo/docs">
        <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-black no-underline hover:bg-gray-300 md:px-10 md:py-3 md:text-lg md:leading-6">
          Read the docs
          <span className="ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent">
            →
          </span>
        </div>
      </a>
    </div>
  );
};
