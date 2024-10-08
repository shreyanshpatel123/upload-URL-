
import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { HiPlus, HiX, HiTrash } from "react-icons/hi";

interface CreateRequestMainComponentProps {}

export function CreateRequestMainComponent(
  props: CreateRequestMainComponentProps
) {
  const [urlList, setUrlList] = useState<string[]>([""]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleUrlChange = (index: number, newUrl: string) => {
    const updatedUrlList = [...urlList];
    updatedUrlList[index] = newUrl;
    setUrlList(updatedUrlList);
    validateUrls(updatedUrlList); // Validate URLs 
  };

  const handleAddUrl = () => {
    setUrlList([...urlList, ""]); 
    setErrorMessages([...errorMessages, ""]); 
  };

  const handleRemoveUrl = () => {
    const updatedUrlList = [...urlList];
    updatedUrlList.pop(); // Remove the last URL
    setUrlList(updatedUrlList);
    setErrorMessages(updatedUrlList.map(url => "")); // Update error messages
  };

  const validateUrls = (urls: string[]) => {
    const messages = urls.map(url => {
      // Check if the URL is valid using a regular expression
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)([\\w.-]+)([\\w.,@?^=%&:;#~+\\/-]*)?$"
      );
      if (!url) {
        return "URL cannot be empty.";
      }
      if (!urlPattern.test(url)) {
        return "Please enter a valid URL.";
      }
      return "";
    });
    setErrorMessages(messages);
  };

  const handleSubmit = () => {
    validateUrls(urlList);
    // Check if there are any error messages before submitting
    if (errorMessages.every(msg => msg === "")) {
      console.log("URLs submitted:", urlList);
      // Handle submission logic here
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2 border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-extrabold">
          Create New Request
        </h3>
        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6 m-auto">
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            Add videos or folders
          </h4>
          <p className="text-sm text-gray-900 dark:text-gray-400">
            These videos would be cut, labeled, and made available in your
            Recharm video library.
          </p>
        </div>

        {/* Display dynamic URL input fields */}
        <div className="space-y-4">
          {urlList.map((url, index) => (
            <div key={index} className="relative">
              <TextInput
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder={`Video/Folder URL ${index + 1}`}
                required
                className="pr-10" // Add space for the delete icon
              />
              {/* Only show delete icon for the last URL */}
              {index === urlList.length - 1 && urlList.length > 1 && (
                <button
                    className="absolute bottom-[15px] left-[455px]  pr-3 flex items-center text-back-1000 hover:text-red-700"
                  onClick={handleRemoveUrl}
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              )}
              {/* Display error message if exists */}
              {errorMessages[index] && (
                <p className="text-red-500 text-sm mt-1">{errorMessages[index]}</p>
              )}
            </div>
          ))}
          <Button
            color="light"
            className="text-sm font-medium hover:text-purple-800 bg-white hover:bg-gray-50 border border-gray-300"
            onClick={handleAddUrl}
          >
            <span className="flex items-center">
              <span className="bg-purple-800 rounded-full p-0.5 mr-2">
                <HiPlus className="h-3 w-3 text-white" />
              </span>
              Add URL
            </span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
        <Button
          color="primary"
          className="text-sm font-medium bg-purple-700 hover:bg-purple-800"
          onClick={handleSubmit}
        >
          Create Request
        </Button>
      </div>
    </div>
  );
}



