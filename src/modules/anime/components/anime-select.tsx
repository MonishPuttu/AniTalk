export const AnimeSelect = () => {
  return (
    <div className="h-screen p-8">
      <div className="grid grid-cols-2 gap-6 w-full h-full">
        <div
          className="bg-accent-foreground flex items-center justify-center hover:bg-white
         text-white hover:text-black border shadow-md rounded-xl hover:scale-105
         transition-all duration-300"
        >
          <span>Box 1</span>
        </div>
        <div
          className="bg-accent-foreground flex items-center justify-center hover:bg-white
         text-white hover:text-black border shadow-md rounded-xl hover:scale-105
         transition-all duration-200"
        >
          <span>Box 2</span>
        </div>
        <div
          className="bg-accent-foreground flex items-center justify-center hover:bg-white
         text-white hover:text-black border shadow-md rounded-xl hover:scale-105
         transition-all duration-200"
        >
          <span>Box 3</span>
        </div>
        <div
          className="bg-accent-foreground flex items-center justify-center hover:bg-white
         text-white hover:text-black border shadow-md rounded-xl hover:scale-105
         transition-all duration-200"
        >
          <span>Box 4</span>
        </div>
      </div>
    </div>
  );
};
