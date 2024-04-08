import React from 'react'
import {
  AddClipIcon,
  AddEraserIcon,
  AddExponentIcon,
  AddGearIcon,
  AddListIcon,
  AddMarkerIcon,
  AddMicIcon,
  AddNumberedListIcon,
  AddParagraphIcon,
  AddSubscriptIcon
} from './add_card_window/OptionIcons'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ExpertToolA = () => {
  return (
    <div title="For UI demonstration purposes only" className="flex flex-wrap">
      <span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md text-white p-1">
        <button
          title="For UI demonstration purposes only"
          className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4"
        >
          Templates...
        </button>
      </span>
      <span
        title="For UI demonstration purposes only"
        className="bg-gray-700 border border-gray-800 rounded-lg shadow-md text-white p-1"
      >
        <button
          title="For UI demonstration purposes only"
          className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4"
        >
          Type
        </button>
      </span>
      <span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1">
        <button
          title="For UI demonstration purposes only"
          className="bg-gray-700 border-gray-900 rounded-lg shadow-md flex items-center py-1 px-1 "
        >
          <AddGearIcon width="20px" height="20px" />
        </button>
      </span>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ExpertToolB = () => {
  return (
    <div title="For UI demonstration purposes only" className="flex flex-wrap">
      <div title="For UI demonstration purposes only" className="flex mb-5">
        <span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white font-bold"
          >
            B
          </button>
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white italic"
          >
            I
          </button>
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white underline"
          >
            U
          </button>
        </span>
        <span
          title="For UI demonstration purposes only"
          className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex"
        >
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-1 p-4 w-9 flex items-center justify-center"
          >
            <AddExponentIcon width="13px" height="13px" />
          </button>
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 w-9 flex items-center justify-center"
          >
            <AddSubscriptIcon width="13px" height="13px" />
          </button>
        </span>
        <span
          title="For UI demonstration purposes only"
          className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex"
        >
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 text-white underline "
          >
            A
          </button>
          <button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center">
            <AddMarkerIcon width="13px" height="13px" />
          </button>
        </span>
        <span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"
          >
            <AddEraserIcon width="13px" height="13px" colour="#FFFFFF" />
          </button>
        </span>
        <span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"
          >
            <AddListIcon width="13px" height="13px" colour="#FFFFFF" />
          </button>
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"
          >
            <AddNumberedListIcon width="13px" height="15px" colour="#FFFFFF" />
          </button>
          <button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center">
            <AddParagraphIcon width="13px" height="13px" colour="#FFFFFF" />
          </button>
        </span>
        <span
          title="For UI demonstration purposes only"
          className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-2 flex"
        >
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"
          >
            <AddClipIcon width="13px" height="13px" colour="#FFFFFF" />
          </button>
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"
          >
            <AddMicIcon width="13px" height="13px" colour="#FFFFFF" />
          </button>
          <button
            title="For UI demonstration purposes only"
            className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white italic"
          >
            fx
          </button>
        </span>
      </div>
    </div>
  )
}
export { ExpertToolA, ExpertToolB }
