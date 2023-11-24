import { getAddresses } from "@/pages/Registration/api";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";

export const useAddressSearch = () => {
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [addresses, setAddresses] = useState<string[]>([]);

  const fetchAddresses = async (query: string) => {
    try {
      const response = await getAddresses(query);
      setAddresses(response.data.map((item) => item.full_path_rus));
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const debouncedFetchAddresses = useCallback(
    debounce(fetchAddresses, 500),
    []
  );

  useEffect(() => {
    if (searchAddress) {
      debouncedFetchAddresses(searchAddress);
    }
  }, [searchAddress, debouncedFetchAddresses]);

  return { searchAddress, setSearchAddress, addresses };
};
