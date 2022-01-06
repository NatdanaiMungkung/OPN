export default function Home() {
  return (
    <div>
      <div className="mt-6 flex justify-center text-4xl text-yellow font-bold tracking-wider">Covid Timeline Generator</div>

      <div className="mt-6 flex justify-center text-white w-4/5">
        <div className="mt-6 flex flex-col">
          <div className="border-2 rounded-md border-light-blue">
            <div>Patient</div>
            <div>1</div>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="border-2 rounded-md border-light-blue">
            <div>Patient</div>
            <div>2</div>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="border-2 rounded-md border-light-blue">
            <div>Patient</div>
            <div>3</div>
          </div>
        </div>
      </div>
    </div>
  );
}