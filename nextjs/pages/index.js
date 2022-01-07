import * as React from 'react';
import { BsPlusCircleFill } from 'react-icons/bs'

export default function Index() {
  return (
    <div className="font-fancy">
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
        <div className='mt-6 text-light-blue hover:text-white hover:cursor-pointer'><BsPlusCircleFill size={'36px'} /></div>
      </div>
      <div className="mt-6 ml-auto mr-auto w-3/5">
        <div className="flex justify-between">
          <div className="mt-6 flex justify-center text-2xl text-yellow font-bold tracking-wider">Patient Information</div>
          <button type="button" className="mt-6 text-white bg-red focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove Patient</button>
        </div>
        <div className="border-2 rounded-sm border-light-blue py-6 flex">
          <div className="px-4">
            <label for="gender" className="text-white">Gender</label>
            <select id="gender">
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </div>
          <div className="px-4">
            <label for="age" className="text-white">Age</label>
            <input type="text" />
          </div>
          <div className="px-4">
            <label for="occupation" className="text-white">Occupation</label>
            <input type="text" />
          </div>
        
        </div>
      </div>
      <div className="mt-6 ml-auto mr-auto w-3/5">
        <div className="flex justify-left">
          <div className="mt-6 flex justify-center text-2xl text-yellow font-bold tracking-wider">Timeline</div>
        </div>
      </div>
      <div className="mt-6 ml-auto mr-auto w-3/5 flex">
        <div className="flex flex-col w-3/5 border rounded-sm border-yellow py-6">
          <div className="bg-yellow rounded-full w-1/4 ml-auto mr-auto">
            <div className="text-center text-xs">Female</div>
            <div className="text-center">32 years old</div>
            <div className="text-center text-xs">Software Engineer</div>
          </div>
        </div>
        <div className="flex flex-col w-2/5">
          <div>Female</div>
          <div>32 years old</div>
          <div>Software Engineer</div>
        </div>
      </div>
    </div>
  );
}
