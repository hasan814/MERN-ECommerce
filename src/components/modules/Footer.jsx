const Footer = () => {
  return (
    <footer className="h-16 bg-white shadow-md flex items-center text-xl">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <p>
            Development by{" "}
            <span className="text-red-600 font-semibold">Hasan Moosavi</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
