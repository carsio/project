
const ControlBar = () => (
  <Container>
    <Box>
      <Grabber />
    </Box>
    <Divisor />
    <Box>
      <button className="bg-primary-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 flex items-center justify-center">Enter</button>
    </Box>
  </Container>
);

const Container = ({children}: {children: React.ReactNode})  => (
  <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    {children}
  </div>
);

const Box = ({children}: {children: React.ReactNode}) => (
  <div className="flex m-2">
    {children}
  </div>
);

const Grabber = () => (
  <div className="w-1 h-6 bg-gray-500 rounded-full my-2" />
);

const Divisor = () => (
  <div className="w-px bg-gray-300" />
);

export default ControlBar;