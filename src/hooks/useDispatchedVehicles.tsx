import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { getInventoryItems, getVehicles } from "../helpers/apiFunctions";
import { VehiclesAndDestination } from "../types/db";
import { App } from "antd";
import { inventoryItemsKeys, vehiclesKeys } from "../constants/QUERY_KEYS";
import { FieldConfig, SelectOption } from "../types/comps";
import { useState } from "react";
import { STATES } from "../constants/ENUMS";

interface HookReturn {
  vehicles: VehiclesAndDestination[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<VehiclesAndDestination[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  filterFormConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
}

function useDispatchedVehicles(): HookReturn {
  // Renamed the hook
  const { message } = App.useApp();
  const [filterItem, setFilterItem] = useState<string>("all");
  const [filterDestination, setFilterDestination] = useState<string>("all");
  const [filterOrigin, setFilterOrigin] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async ({ pageParam = 1 }) => {
    const vehicles = await getVehicles(
      "delivered",
      pageParam,
      filterItem,
      filterDestination,
      searchTerm,
      filterOrigin
    );
    return vehicles;
  };

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getAllItems,
    queryFn: async (): Promise<SelectOption[]> => {
      const items = await getInventoryItems();
      return items.map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => {
      message.error("Failed to Load Inventory Items");
    },
  });

  const filterFormConfig: FieldConfig[] = [
    {
      name: "search",
      label: "Search By Truck Number",
      type: "search",
      noLabel: true,
      required: false,
      onSearch: (value) => {
        setSearchTerm(value);
      },
    },
    {
      name: "item",
      label: "Item",
      type: "select",
      onSelect: (value) => {
        setFilterItem(value);
      },
      noLabel: true,
      options: [{ label: "All", value: "all" }, ...(items || [])],
      required: false,
    },
    {
      name: "origin",
      label: "Origin",
      type: "select",
      onSelect: (value) => {
        setFilterOrigin(value);
      },
      noLabel: true,
      options: [
        { label: "All", value: "all" },
        ...STATES.map((state) => ({
          label: state.charAt(0).toUpperCase() + state.slice(1).toLowerCase(),
          value: state,
        })),
      ],
      required: false,
    },
  ];

  const handleSubmit = (values: any) => {
    setFilterItem(values.item);
    setFilterDestination(values.destination);
    setFilterOrigin(values.origin);
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [
      vehiclesKeys.getDispatchedVehicles,
      filterItem,
      filterDestination,
      searchTerm,
      filterOrigin,
    ],
    fetchData,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 50) {
          return allPages.length + 1; // Increment page number
        }
        return undefined; // No more pages to fetch
      },
      onError: (error) => {
        message.error(error as string);
      },
    }
  );

  const vehicles = data?.pages.flatMap((page) => page);

  return {
    vehicles: vehicles || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    filterFormConfig,
    handleSubmit,
  };
}

export default useDispatchedVehicles; // Updated the export
