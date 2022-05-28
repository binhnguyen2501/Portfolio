const NotFound = () => {
  return (
    <div className="h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="md:w-full md:h-full w-[300px] h-[300px]">
          <img
            src={require("../../assets/images/404.png")}
            alt="404"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:text-6xl md:text-3xl text-xl text-[#b23d43] text-center">
          Woops. Looks like this page doesn't exist.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
