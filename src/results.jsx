import React, { useState, useEffect } from "react";
import { chatSession } from "./gemini";
import { Ai_prompt } from "./AIprompt";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink ,PaginationEllipsis} from "@/components/ui/pagination";

export function Results() {
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDefinitions, setSelectedDefinitions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const language = localStorage.getItem("language");
      const fluency = localStorage.getItem("fluency");
      const userId = localStorage.getItem("userId");

      const updatedPrompt = Ai_prompt
        .replace(/{language}/g, language)
        .replace(/{fluency}/g, fluency);

      try {
        const result = await chatSession.sendMessage(updatedPrompt);
        const rawText = await result.response.text();
        const cleanedText = rawText.replace(/```json|```/g, "");
        const responseData = JSON.parse(cleanedText);

        if (Array.isArray(responseData)) {
          setResultData(responseData);
        } else {
          console.error("Response data is not an array:", responseData);
        }

        if (userId && fluency) {
          const userDocRef = doc(db, "users", userId, fluency, "vocabulary");
          await setDoc(userDocRef, { words: responseData });

          console.log(`Data added to ${fluency} collection for user: ${userId}`);
        } else {
          console.error("User ID or Fluency is not available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDefinitionSelect = (itemIndex, defIndex, isCorrect) => {
    setSelectedDefinitions((prevState) => ({
      ...prevState,
      [itemIndex]: {
        selected: defIndex,
        isCorrect: isCorrect,
      },
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, resultData.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (resultData.length === 0) {
    return <div>No data available</div>;
  }

  // Determine the range of pagination links to display
  const numPagesToShow = 3; // Number of pagination links to show
  const startIndex = Math.max(currentIndex - 1, 0);
  const endIndex = Math.min(startIndex + numPagesToShow - 1, resultData.length - 1);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Carousel selectedIndex={currentIndex} className="w-full max-w-md">
        <CarouselContent>
          {resultData.map((item, itemIndex) => (
            <CarouselItem key={itemIndex} className="w-full flex flex-col items-center">
              <div className="flex flex-col gap-2 w-full max-w-md p-4">
                <div className="text-xl font-bold mb-2 text-center">{item.word}</div>

                {item.incorrect_definitions.map((def, defIndex) => (
                  <div
                    key={`def-${defIndex}`}
                    onClick={() => handleDefinitionSelect(itemIndex, defIndex, false)}
                    className={`text-lg text-center p-2 cursor-pointer ${
                      selectedDefinitions[itemIndex]?.selected === defIndex
                        ? selectedDefinitions[itemIndex].isCorrect
                          ? 'bg-green-300'
                          : 'bg-red-300'
                        : ''
                    }`}
                  >
                    {def}
                  </div>
                ))}

                <div
                  onClick={() => handleDefinitionSelect(itemIndex, 'correct', true)}
                  className={`text-lg font-semibold mt-2 text-center p-2 cursor-pointer ${
                    selectedDefinitions[itemIndex]?.selected === 'correct'
                      ? 'bg-green-300'
                      : ''
                  }`}
                >
                  {item.correct_definition}
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                {currentIndex + 1} of {resultData.length}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={handlePrevious} aria-label="Previous" />
        <CarouselNext onClick={handleNext} aria-label="Next" />
      </Carousel>

      {/* Pagination component */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} href="#" />
          </PaginationItem>
          {Array.from({ length: Math.min(numPagesToShow, resultData.length) }, (_, index) => {
            const pageIndex = startIndex + index;
            return (
              pageIndex <= endIndex && (
                <PaginationItem key={pageIndex}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentIndex(pageIndex)}
                    className={pageIndex === currentIndex ? 'bg-blue-500 text-white' : ''}
                  >
                    {pageIndex + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            );
          })}
          {endIndex < resultData.length - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext onClick={handleNext} href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
