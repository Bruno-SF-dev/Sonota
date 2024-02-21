import { useEffect, useState } from "react";
import { getNewData } from "./get";

export const useCustom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Array<{ title: string }>>([]);

  useEffect(() => {
    const exec = async () => {
      const response = await getNewData();

      if (response.length > 0) {
        setItems(response);
        setIsLoading(false);
      }
    };

    exec();
  }, []);

  return {
    isLoading,
    items,
  };
};
