import { Spinner as Loading } from "@chakra-ui/spinner";

const Spinner = () => {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loading thickness="3px" speed="0.65s" color="#b23d43" />
      </div>
    </div>
  );
};

export default Spinner;
